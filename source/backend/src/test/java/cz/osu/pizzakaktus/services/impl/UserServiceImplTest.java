package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

/**
 * Created by Farmas on 13.11.2016.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {

    @Autowired
    UserService userService;

    @Test
    public void insert() throws Exception {

        UserDTO userToInsert = UserDTO.builder()
                .roles(new ArrayList() {{
                    add("ADMIN");
                    add("EMPLOYEE");
                }})
                .phone("153123123")
                .login("nickino3")
                .firstName("First name")
                .lastName("Last Name")
                .password("Passworda")
                .build();

        Optional<UserDb> insertedUser = userService.insert(userToInsert);
        assertTrue("returned category optional is empty, user already exists", insertedUser.isPresent());
        assertEquals(userToInsert.getFirstName(), insertedUser.get().getFirstName());
        assertEquals(userToInsert.getLastName(), insertedUser.get().getLastName());
        assertEquals(userToInsert.getLogin(), insertedUser.get().getLogin());
        assertEquals(userToInsert.getPhone(), insertedUser.get().getPhone());
    }

    @Test
    public void update() throws Exception {


        List<UserDb> all = userService.findAll();
        if (!all.isEmpty()) {
            UserDb userDb = all.get(0);

            UserDTO userToInsert = UserDTO.builder()
                    .id(userDb.getId())
                    .phone(userDb.getPhone())
                    .login(userDb.getLogin())
                    .firstName(userDb.getFirstName() + "update")
                    .lastName(userDb.getLastName())
                    .roles(new ArrayList() {{
                        add("ADMIN");
                        add("EMPLOYEE");
                    }})
                    .build();

            Optional<UserDb> updatedUser = userService.update(userToInsert);

            assertTrue("returned category optional is empty", updatedUser.isPresent());
            assertEquals(userToInsert.getFirstName(), updatedUser.get().getFirstName());
            assertEquals(userToInsert.getLastName(), updatedUser.get().getLastName());
            assertEquals(userToInsert.getLogin(), updatedUser.get().getLogin());
            assertEquals(userToInsert.getPhone(), updatedUser.get().getPhone());
        }
    }

    @Test
    public void findAll() throws Exception {
        List<UserDb> all = userService.findAll();
        assertNotNull(all);

        if (!all.isEmpty()) {
            UserDb userDb = all.get(0);
            assertNotNull(userDb);
        }
    }

    @Test
    public void isLoginTaken() throws Exception {

        List<UserDb> all = userService.findAll();
        if (!all.isEmpty()) {
            UserDb userDb = all.get(0);

            UserDTO userToInsert = UserDTO.builder()
                    .id(userDb.getId())
                    .phone(userDb.getPhone())
                    .login(userDb.getLogin())
                    .firstName(userDb.getFirstName())
                    .lastName(userDb.getLastName())
                    .roles(new ArrayList() {{
                        add("ADMIN");
                        add("EMPLOYEE");
                    }})
                    .build();

            Optional<UserDb> updatedUser = userService.insert(userToInsert);

            assertFalse("returned category optional login is not taken", updatedUser.isPresent());

        }
    }

    @Test
    public void deleteById() throws Exception {

        UserDTO userToInsert = UserDTO.builder()
                .roles(new ArrayList() {{
                    add("ADMIN");
                    add("EMPLOYEE");
                }})
                .phone("153123123")
                .login("deletingNickTest")
                .firstName("First name")
                .lastName("Last Name")
                .password("Passworda")
                .build();

        Optional<UserDb> insertedUser = userService.insert(userToInsert);

        assertTrue("User insert phase", insertedUser.isPresent());

        List<UserDb> all = userService.findAll();

        Optional<UserDb> first = all.stream()
                .filter(userDb -> userDb.getId() == insertedUser.get().getId())
                .findFirst();

        assertTrue("inserted user is in db", first.isPresent());

        if (first.isPresent()) {
            userService.deleteById(first.get().getId());


            List<UserDb> allWithoutDeleted = userService.findAll();

            Optional<UserDb> none = allWithoutDeleted.stream()
                    .filter(userDb -> userDb.getId() == insertedUser.get().getId())
                    .findFirst();

            assertTrue("user deleted from database ", !none.isPresent());
        }
    }


}