package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class OrderDb
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column
    @ElementCollection(targetClass=Integer.class)
    private List<Integer> pizzas;
    //private List<PizzaDb> pizzas;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CustomerDb customerDb;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private OrderStatus orderStatus;

    public OrderDb(List<Integer> pizzas, CustomerDb customerDb, OrderStatus orderStatus) {
        this.pizzas = pizzas;
        this.customerDb = customerDb;
        this.orderStatus = orderStatus;
    }
}
