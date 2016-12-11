package cz.osu.pizzakaktus.repositories.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class OrderStatus
{
    public static String CREATED = "CREATED";
    public static String OPEN = "OPEN";
    public static String CLOSED = "CLOSED";
    public static String CANCELED = "CANCELED";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String Order;
}
