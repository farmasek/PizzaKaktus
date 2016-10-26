package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.UserRepository;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.UserService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<UserDb> insert(UserDb userDb) {
       if (isLoginTaken(userDb.getLogin()))
            return Optional.empty();
        else
        {
            UserDb insertedUser = userRepository.save(userDb);
            return Optional.of(insertedUser);
        }
    }

    @Override
    public List<UserDb> findAll() {
        Iterable<UserDb> usersList = userRepository.findAll();
        return Lists.newArrayList(usersList);
    }

    @Override
    public boolean isLoginTaken(String login) {

        List<UserDb> byLogin = userRepository.findByLogin(login);
        return !byLogin.isEmpty();
    }


}
