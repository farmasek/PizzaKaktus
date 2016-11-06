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
     *
     * @param userDTO
     * @return insert Users
     */
    Optional<UserDb> insert(UserDTO userDTO);

  /**
     *
     * @param userDTO
     * @return update user based on his ID
     */
    Optional<UserDb> update(UserDTO userDTO);

    /**
     *
     * @return List of users
     */
    List<UserDb> findAll();

    boolean isLoginTaken(String login);
}