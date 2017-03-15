package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.xml.crypto.Data;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 2/19/2017.
 */

public interface OrderService
{
    /**
     * Returns list of all orders with pagination and filtered
     *
     * @return List of orders
     */
    Page<OrderDb> findAll(Pageable pageable, String filterAttribute, String filterPhrase,
                          Timestamp filterStartDate, Timestamp filterEndDate) throws DatabaseException;
    /**
     * Returns newly made order
     *
     * @param OrderDTO - order to be made
     * @return newly made order
     */
     OrderDb createOrder(OrderDTO order) throws DatabaseException;

    /**
     * Send email depending on environments.
     * @param Customer - recipient of email used for extraction of name, surname and other parameters
     * @param List<PizzaDb> - list of ordered pizzas
     * @throws DatabaseException
     */
     void sendEmail(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException;
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
    void orderAcceptedMail(String recipient, String text) throws DatabaseException;

    /**
     * Returns String - body of email
     *
     * @param Customer - recipient of email used for extraction of name, surname and other parameters
     * @param List<PizzaDb> - list of ordered pizzas
     * @return String - body of email
     */
    String makeOrderMailBody(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException;

    /**
     * Returns OrderDb - inserted order
     *
     * @param OrderDb - order to be inserted
     * @return OrderDb - inserted order
     */
    Optional<OrderDb> insertOrderToDatabase(OrderDb orderDb) throws DatabaseException;

    /**
     * Returns list of OrderDb - all active orders
     *
     * @return list of OrderDb - all active orders
     */
    List<OrderDb> findAllActive() throws DatabaseException;
}
