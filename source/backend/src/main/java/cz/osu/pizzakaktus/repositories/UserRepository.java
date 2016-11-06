package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.UserDb;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Repository
public interface UserRepository extends CrudRepository<UserDb, Integer> {
    List<UserDb> findById(Integer Id);
    List<UserDb> findByLogin(String login);
}
