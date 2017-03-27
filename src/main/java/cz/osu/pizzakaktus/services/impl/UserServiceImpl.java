package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.RoleRepository;
import cz.osu.pizzakaktus.repositories.UserRepository;
import cz.osu.pizzakaktus.repositories.models.Role;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.UserService;
import org.assertj.core.util.Lists;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;


    @Override
    public Optional<UserDb> insert(UserDTO userDTO) throws DatabaseException {
        if (isLoginTaken(userDTO.getLogin())) {
            throw new DatabaseException("Login " + userDTO.getLogin() + " již existuje.");
        } else {
            UserDb userWithRoles = mapToUserDBWithPassword(userDTO);
            UserDb insertedUser = userRepository.save(userWithRoles);
            return Optional.of(insertedUser);
        }
    }


    @Override
    public Optional<UserDb> update(UserDTO userDTO) throws DatabaseException {
        try {
            UserDb userDb = mapToUserDBWitoutPassword(userDTO);
            UserDb updatedUser = userRepository.save(userDb);
            return Optional.of(updatedUser);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public List<UserDb> findAll() throws DatabaseException {
        Iterable<UserDb> usersList = userRepository.findAllByOrderByActiveDescLoginAsc();
        return Lists.newArrayList(usersList);
    }

    @Override
    public List<UserDb> findByLogin(String login) throws DatabaseException {
        List<UserDb> user = userRepository.findByLogin(login);
        if (user.isEmpty()) {
            throw new DatabaseException("Nebylo možné najít uživatele s loginem " + login + ".");
        } else {
            return user;
        }
    }

    @Override
    public boolean isLoginTaken(String login) throws DatabaseException {
        List<UserDb> byLogin = userRepository.findByLogin(login);
        return !byLogin.isEmpty();
    }

    @Override
    public boolean deleteById(int userId) throws DatabaseException {
        boolean successfullyDeleted = true;
        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            System.out.println(e.toString());
            successfullyDeleted = false;
        }

        return successfullyDeleted;
    }

    @Override
    public boolean changePassword(String login, String userOldPassword, String userNewPassword) throws DatabaseException {
        try {
            List<UserDb> byId = userRepository.findByLogin(login);
            UserDb user = byId.get(0);

            if(user!=null && checkPassword(userOldPassword, user.getPasswordHash())){
                UserDb userDb = user.withPasswordHash(hashPassword(userNewPassword));
                userRepository.save(userDb);
                return true;
            }else{
                throw new DatabaseException("Hesla nejsou stejná");
          }
        } catch (Exception e) {
            System.out.println(e.toString());
            throw e;
        }
    }


    private String hashPassword(String passwordPlainText) {
        String salt = BCrypt.gensalt(12);
        return BCrypt.hashpw(passwordPlainText, salt);
    }


    public boolean checkPassword(String passwordPlainText, String storedHash) {
        return !(null == storedHash || !storedHash.startsWith("$2a$"))
                && BCrypt.checkpw(passwordPlainText, storedHash);
    }

    @Override
    public UserDb mapToUserDBWithPassword(UserDTO userDTO) throws DatabaseException {
        Set<Role> roleStream = userDTO.getRoles().stream().map(role -> roleRepository.findByRole(role)).collect(Collectors.toSet());
        return UserDb.builder()
                .id(userDTO.getId())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .login(userDTO.getLogin())
                .roles(roleStream)
                .phone(userDTO.getPhone())
                .active(userDTO.isActive())
                .passwordHash(hashPassword(userDTO.getPassword()))
                .build();
    }

    @Override
    public UserDb mapToUserDBWitoutPassword(UserDTO userDTO) throws DatabaseException {
        Set<Role> roleStream = userDTO.getRoles().stream().map(role -> roleRepository.findByRole(role)).collect(Collectors.toSet());
        List<UserDb> byLogin = userRepository.findByLogin(userDTO.getLogin());
        if (byLogin.get(0) == null) {
            throw new DatabaseException("Nebyl nalezen uživatel");
        }
        return UserDb.builder()
                .id(userDTO.getId())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .login(userDTO.getLogin())
                .roles(roleStream)
                .phone(userDTO.getPhone())
                .active(userDTO.isActive())
                .passwordHash(byLogin.get(0).getPasswordHash())
                .build();
    }


}
