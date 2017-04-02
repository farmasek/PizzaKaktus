package cz.osu.pizzakaktus.repositories.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@Setter
@Getter
public class OrderStatus {
    public static final String CREATED = "Vytvořená";
    public static final String OPENED = "Otevřená";
    public static final String CLOSED = "Zavřená";
    public static final String CANCELLED = "Stornovaná";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true, length = 20)
    private String status;

    public OrderStatus() {
        this.status = CREATED;
    }

    public OrderStatus(String status) {
        this.status = status;
    }

}
