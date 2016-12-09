package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
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
import org.springframework.web.bind.annotation.*;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        } catch (DatabaseException e) {
            error = e.getMessage();
        }

        List<UserDTO> collect = allUsers.stream()
                .map(userDb -> UserDTO.builder()
                        .id(userDb.getId())
                        .firstName(userDb.getFirstName())
                        .lastName(userDb.getLastName())
                        .login(userDb.getLogin())
                        .phone(userDb.getPhone())
                        .roles(userDb.getRoles().stream().map(Role::getRole).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        if(collect.isEmpty())
        {
            return new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
        }
        else
        {
            return new ResponseEntity<>(collect, HttpStatus.OK);
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
            error = e.getMessage();
        }
        return insertedUser.isPresent() ?
                new ResponseEntity<>(insertedUser.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(error , HttpStatus.NOT_ACCEPTABLE);
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
            error = e.getMessage();
        }
        return insertedUser.isPresent() ?
                new ResponseEntity<>(insertedUser.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
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
            error = e.getMessage();
        }
        return successfullyDeleted ?
                new ResponseEntity<>("Successfully deleted user", HttpStatus.OK)
                :
                new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
    }

    //TODO use validator
    private boolean isUserValid(UserDTO user) {
        boolean valid = true;

        if (user.getRoles().isEmpty() &&
                user.getFirstName().isEmpty() &&
                user.getLastName().isEmpty() &&
                user.getLogin().isEmpty() &&
                user.getPhone().isEmpty())
        {
            valid = false;
        }
        return valid;
    }


}
