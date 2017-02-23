package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@NoArgsConstructor
@Getter
@Setter
public class OrderDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column
    @ElementCollection(targetClass = Integer.class)
    private List<Integer> pizzasIds;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CustomerDb customer;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private OrderStatus orderStatus;
    private Timestamp creationDate;
    private Timestamp updateDate;

    public OrderDb(List<Integer> pizzasIds, CustomerDb customerDb, OrderStatus orderStatus,
                   Timestamp creationDate, Timestamp updateDate) {
        this.pizzasIds = pizzasIds;
        this.customer = customerDb;
        this.orderStatus = orderStatus;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
    }
}
