package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.ErrorDTO;
import cz.osu.pizzakaktus.endpoints.models.UserAuthDTO;
import cz.osu.pizzakaktus.endpoints.models.UserChangePwDTO;
import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.Role;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.UserService;
import org.hibernate.JDBCException;
import org.hibernate.exception.GenericJDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.web.bind.annotation.*;

import java.net.ConnectException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;


    @Autowired
    private DefaultTokenServices defaultTokenServices;

    /**
     * Return all users
     *
     * @return Json list of all users
     */
    @RequestMapping(value = "/all-users", method = RequestMethod.GET)
    public HttpEntity<?> findAllUsers() {
        List<UserDb> allUsers = new ArrayList();
        String error = "";
        try {
            allUsers = userService.findAll();
            List<UserDTO> collect = allUsers.stream()
                    .map(userDb -> UserDTO.builder()
                            .id(userDb.getId())
                            .firstName(userDb.getFirstName())
                            .lastName(userDb.getLastName())
                            .login(userDb.getLogin())
                            .phone(userDb.getPhone())
                            .active(userDb.isActive())
                            .roles(userDb.getRoles().stream().map(Role::getRole).collect(Collectors.toList()))
                            .build())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(collect, HttpStatus.OK);
        } catch (DatabaseException e) {
            error = "Nebylo možné najít všechny uživatele.";
            return new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return user by login
     *
     * @return Json user
     */
    @RequestMapping(value = "/by-login/{login}", method = RequestMethod.GET)
    public HttpEntity<?> findUserByLogin(@PathVariable("login") String login) {
        List<UserDb> allUsers = new ArrayList();
        String error = "";
        try {
            allUsers = userService.findByLogin(login);
            List<UserDTO> collect = allUsers.stream()
                    .map(userDb -> UserDTO.builder()
                            .id(userDb.getId())
                            .firstName(userDb.getFirstName())
                            .lastName(userDb.getLastName())
                            .login(userDb.getLogin())
                            .phone(userDb.getPhone())
                            .active(userDb.isActive())
                            .roles(userDb.getRoles().stream().map(Role::getRole).collect(Collectors.toList()))
                            .build())
                    .collect(Collectors.toList());
            return new ResponseEntity<>(collect, HttpStatus.OK);
        } catch (DatabaseException e) {
            error = "Nebylo možné najít uživatele " + login + ".";
            return new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Insert user into database
     *
     * @param user - Json of User
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addUser(@RequestBody UserDTO user) throws DatabaseException {

        Optional<UserDb> insertedUser = Optional.empty();
        String error = "";
        try {
            insertedUser = userService.insert(user);
        } catch (Exception e) {
            error = "Nebylo možné přidat uživatele.";
        }
        return insertedUser.isPresent() ?
                new ResponseEntity<>(insertedUser.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
    }

    /**
     * Update user in database
     *
     * @param user - Json of user
     * @return if successful then updated object, if not successful then error message
     */
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public HttpEntity<?> updateUser(@RequestBody UserDTO user) {

        Optional<UserDb> insertedUser = Optional.empty();
        String error = "";
        try {
            insertedUser = userService.update(user);
        } catch (DatabaseException e) {
            error = "Nebylo možné aktualizovat uživatele.";
        }
        return insertedUser.isPresent() ?
                new ResponseEntity<>(insertedUser.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
    }

    /**
     * Delete user in database
     *
     * @param userId - Json of user
     * @return if successful then OK HttpStatus, if not successful then error message
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public HttpEntity<?> deleteUser(@PathVariable("id") int userId) throws DatabaseException {

        boolean successfullyDeleted = false;
        String error = "";
        try {
            successfullyDeleted = userService.deleteById(userId);
        } catch (DatabaseException e) {
            error = "Nebylo možné odstranit uživatele.";
        }
        return successfullyDeleted ?
                new ResponseEntity<>("Uživatel byl úspěšně vymazán.", HttpStatus.OK)
                :
                new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
    }

    /**
     * Update  user pw in database
     *
     * @param user - Json of user
     * @return if successful then updated object, if not successful then error message
     */
    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    public HttpEntity<?> changePassword(@RequestBody UserChangePwDTO user) {

        boolean succesfullyChanged = false;
        String error = "Nebylo možné změnit heslo.";
        try {
            succesfullyChanged = userService.changePassword(user.getLogin(), user.getUserOldPassword(), user.getUserNewPassword());
        } catch (DatabaseException e) {
            error = e.getMessage();
        }
        return succesfullyChanged ?
                new ResponseEntity<>(user.getLogin(), HttpStatus.OK)
                :
                new ResponseEntity<>(new ErrorDTO(error), HttpStatus.BAD_REQUEST);
    }


    //TODO use validator
    private boolean isUserValid(UserDTO user) {
        boolean valid = true;

        if (user.getRoles().isEmpty() &&
                user.getFirstName().isEmpty() &&
                user.getLastName().isEmpty() &&
                user.getLogin().isEmpty() &&
                user.getPhone().isEmpty()) {
            valid = false;
        }
        return valid;
    }


    @RequestMapping("/myself")
    public HttpEntity<?> fetchMyself() {
        try {
            SecurityContext context = SecurityContextHolder.getContext();
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDb userDb = new Gson().fromJson(principal.toString(), UserDb.class);
            if (userDb != null) {
                return new ResponseEntity<>(new MapToDTO().mapUser(userDb), HttpStatus.OK);
            }
            return new ResponseEntity<>(new ErrorDTO("Nepodařilo se identifikovat uživatele."), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorDTO("Nepodařilo se identifikovat uživatele."), HttpStatus.BAD_REQUEST);

        }
    }
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public HttpEntity<?> logoutUser(@RequestParam("token") String value) {
        try {
            defaultTokenServices.revokeToken(value);
            return new ResponseEntity<>("Odhlášení proběhlo úspěšně.", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorDTO("Odhlášení se nezdařilo."), HttpStatus.BAD_REQUEST);
        }
    }

}
