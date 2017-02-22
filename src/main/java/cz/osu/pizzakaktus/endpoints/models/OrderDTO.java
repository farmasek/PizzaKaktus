package cz.osu.pizzakaktus.endpoints.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderDTO
{
    private List<Integer> pizzasIds;
    private CustomerDTO customer;
    private OrderStatus orderStatus;

    public OrderDTO(OrderDb orderDb) {
        this.pizzasIds = orderDb.getPizzasIds();
        this.customer = new CustomerDTO(orderDb.getCustomer());
        this.orderStatus = orderDb.getOrderStatus();
    }
}
