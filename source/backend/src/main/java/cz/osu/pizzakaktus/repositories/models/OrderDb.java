package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
public class OrderDb
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<Integer> pizzasId;
    //private List<PizzaDb> pizzas;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CustomerDb customer;
//    @ManyToOne(optional = false, fetch = FetchType.LAZY, targetEntity = OrderStatus.class)
    private String orderStatus;
    private boolean isActive;

    public OrderDb(List<Integer> pizzas, CustomerDb customerDb, String orderStatus)
    {
        this.pizzasId = pizzas;
        this.customer = customerDb;
        this.orderStatus = orderStatus;
        this.isActive = true;
    }
}
