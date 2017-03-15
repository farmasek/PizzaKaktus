package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 23. 2. 2017.
 */
public interface OrderStatusService {

    Optional<OrderStatus> insert(String orderStatus)throws DatabaseException;
    /**
     * Returns all order statuses in database
     *
     * @return list of order statuses
     */
    List<OrderStatus> findAll()throws DatabaseException;

    /**
     * Finds order status based on its ID
     *
     * @return order status based on its ID
     */
    OrderStatus findById(Integer id)throws DatabaseException;

    /**
     * Finds order status based on its status
     *
     * @return order status based on its status
     */
    OrderStatus findByStatus(String status)throws DatabaseException;

}
