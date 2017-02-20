package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 2/19/2017.
 */

public interface OrderService
{
    /**
     * Returns newly made order
     *
     * @param OrderDTO - order to be made
     * @return newly made order
     */
     OrderDb createOrder(OrderDTO order) throws DatabaseException;

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

    /**
     * Returns OrderDb - inserted order
     *
     * @param OrderDb - order to be inserted
     * @return OrderDb - inserted order
     */
    Optional<OrderDb> insert(OrderDb orderDb) throws DatabaseException;
}
