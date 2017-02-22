package cz.osu.pizzakaktus.repositories.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.criteria.Order;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@Setter
@Getter
public class OrderStatus {
    public static final String CREATED = "CREATED";
    public static final String OPENED = "OPENED";
    public static final String CLOSED = "CLOSED";
    public static final String CANCELLED = "CANCELLED";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String status;

    public OrderStatus() {
        this.status = CREATED;
    }

    public OrderStatus(String status) {
        this.status = status;
    }

}
