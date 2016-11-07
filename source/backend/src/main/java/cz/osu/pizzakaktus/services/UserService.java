package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.UserDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by e-myslivost on 26.10.2016.
 */
public interface UserService {

    /**
     * Inserts user into database
     *
     * @param userDTO - user to be inserted in database
     * @return inserted User
     */
    Optional<UserDb> insert(UserDTO userDTO);

    /**
     * Updates user data based on his ID
     *
     * @param userDTO - the user to be updated in database
     * @return updated user based on his ID
     */
    Optional<UserDb> update(UserDTO userDTO);

    /**
     * Returns list of all users
     *
     * @return List of users
     */
    List<UserDb> findAll();

    boolean isLoginTaken(String login);
}
