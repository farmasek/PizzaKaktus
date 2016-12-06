package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.hibernate.exception.GenericJDBCException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.ConnectException;
import java.util.List;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Repository

public interface UserRepository extends CrudRepository<UserDb, Integer>  {
    List<UserDb> findById(Integer Id);

    List<UserDb> findByLogin(String login);

    @Transactional
    void deleteById (Integer userId)throws DatabaseException;
}
