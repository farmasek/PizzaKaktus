package cz.osu.pizzakaktus.repositories.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class Role {

    public static String ADMIN = "ADMIN";
    public static String EMPLOYEE = "EMPLOYEE";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true, length = 20)
    private String role;

}
