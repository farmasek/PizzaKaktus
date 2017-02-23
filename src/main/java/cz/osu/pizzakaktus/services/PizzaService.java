package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
public interface PizzaService {

    /**
     * Inserts pizza into database
     *
     * @param pizzaDTO - pizza to be inserted in database
     * @return inserted pizza
     */
    Optional<PizzaDb> insert(PizzaDTO pizzaDTO)throws DatabaseException;

    /**
     * Updates pizza data based on its ID
     *
     * @param pizzaDTO - the pizza to be updated in database
     * @return updated pizza based on its ID
     */
    Optional<PizzaDb> update(PizzaDTO pizzaDTO)throws DatabaseException;

    /**
     * Returns list of all pizzas
     *
     * @return List of pizzas
     */
    List<PizzaDb> findAll() throws DatabaseException;

    boolean isCategoryValid(CategoryDb categoryDb)throws DatabaseException;
    /**
     * Returns list of all pizzas with pagination and filtered
     *
     * @return List of pizzas
     */
    Page<PizzaDb> findAll(Pageable pageable, String filterBy) throws DatabaseException;

    /**
     * Returns list of all active pizzas
     *
     * @return List of active pizzas
     */
    List<PizzaDb> findActive() throws DatabaseException;

    /**
     * Returns boolean if title is taken
     *
     * @return boolean if title is taken
     */
    boolean isTitleTaken(String title)throws DatabaseException;


    /**
     * Returns list (exactly 1, because ID is fucking unique) of pizzas found by ID
     *
     * @param Integer - id of pizza to be found in db
     * @return list (exactly 1, because ID is fucking unique) of pizzas found by ID
     */
    List<PizzaDb> findById(Integer id) throws DatabaseException;

}
