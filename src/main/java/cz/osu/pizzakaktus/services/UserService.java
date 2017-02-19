package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;

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
    Optional<UserDb> insert(UserDTO userDTO) throws DatabaseException;

    /**
     * Updates user data based on his ID
     *
     * @param userDTO - the user to be updated in database
     * @return updated user based on his ID
     */
    Optional<UserDb> update(UserDTO userDTO) throws DatabaseException;

    /**
     * Returns list of all users
     *
     * @return List of users
     */
    List<UserDb> findAll() throws DatabaseException;

    boolean isLoginTaken(String login) throws DatabaseException;

    /**
     * Delete user in database
     * @param userId - id of user to be deleted
     * @return - true if successful, false if failed
     */
    boolean deleteById(int userId) throws DatabaseException;



}