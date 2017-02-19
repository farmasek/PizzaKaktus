package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.repositories.models.OrderDb;

/**
 * Created by baranvoj on 2/19/2017.
 */

// TODO implement interface
public interface OrderService {
    /**
     * Create order and save it to database
     * @param orderDb - order to be saved
     * @return - saved order from db
     */
    OrderDb createOrder(OrderDb orderDb);

    /**
     * Send confirmation order to customer.
     *
     * this should be sent after all database modifications are done
     *
     * @param orderDb - order with customer information.
     */
    void sendConfirmationEmail(OrderDb orderDb);

}
