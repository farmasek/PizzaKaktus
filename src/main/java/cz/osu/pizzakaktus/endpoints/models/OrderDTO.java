package cz.osu.pizzakaktus.endpoints.models;

import cz.osu.pizzakaktus.repositories.models.OrderDb;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderDTO  {
    private Integer id;
    private List<OrderPizzaDTO> orderCart = new ArrayList<>();
    private CustomerDTO customer;
    private String orderStatus;
    private Timestamp dateCreated;
    private Timestamp dateModified;


    public OrderDTO(OrderDb orderDb)
    {
        this.id = orderDb.getId();
        makeCart(orderDb.getPizzasIds());
        //this.pizzasIds = orderDb.getPizzasIds();
        this.customer = new CustomerDTO(orderDb.getCustomer());
        this.orderStatus = orderDb.getOrderStatus().getStatus();
        this.dateCreated = orderDb.getDateCreated();
        this.dateModified = orderDb.getDateModified();
    }

    private void makeCart(List<Integer> pizzasId)
    {
        for (Integer id : pizzasId) {
            this.orderCart.add(new OrderPizzaDTO(id, new ArrayList<>()));
        }
    }
}
