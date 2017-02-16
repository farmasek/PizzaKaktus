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
    Page<PizzaDb> findAll(Pageable pageable, String filterBy);

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
     * Returns newly made order
     *
     * @param OrderDTO - order to be made
     * @return newly made order
     */
     void createOrder(OrderDTO order) throws DatabaseException;

    /**
     * Returns list (exactly 1, because ID is fucking unique) of pizzas found by ID
     *
     * @param Long - id of pizza to be found in db
     * @return list (exactly 1, because ID is fucking unique) of pizzas found by ID
     */
     List<PizzaDb> findById(Integer id) throws DatabaseException;

    /**
     * Returns total cost of pizzas in list
     *
     * @param List - list of pizzas for which it counts total cost
     * @return total cost of pizzas in list
     */
     int countTotalPizzasCost(List<PizzaDb> pizzas) throws DatabaseException;

    /**
     * Returns void
     *
     * @param String - recipient of email
     * @param String - text/body of email
     * @return void
     */
     void orderAcceptedMail(String recipient, String text);

    /**
     * Returns String - body of email
     *
     * @param Customer - recipient of email used for extraction of name, surname and other parameters
     * @param List<PizzaDb> - list of ordered pizzas
     * @return String - body of email
     */
     String makeOrderMailBody(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException;
}
