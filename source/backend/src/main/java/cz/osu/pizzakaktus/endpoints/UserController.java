package cz.osu.pizzakaktus.endpoints;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@RestController
@CrossOrigin(origins = "http://localhost:1337") // TODO Implement global cross origin settings :)
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
        List<UserDb> allUsers = userService.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    /**
     * Insert user into database
     *
     * @param user - Json of ingredient
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addUser(@RequestBody UserDTO user) {

        Optional<UserDb> insertedUser = userService.insert(new UserDb(user));
        return insertedUser.isPresent() ?
                new ResponseEntity<>(insertedUser.get(), HttpStatus.OK)
                :
                new ResponseEntity<>("Error inserting to database", HttpStatus.NOT_ACCEPTABLE);
    }

    private boolean isUserValid(UserDTO user) {
        boolean valid = true;
        if (user.getRole().isEmpty() &&
                user.getFirstName().isEmpty() &&
                user.getLastName().isEmpty() &&
                user.getLogin().isEmpty() &&
                user.getPhone().isEmpty()) {
            valid = false;
        }
        return valid;
    }
}
