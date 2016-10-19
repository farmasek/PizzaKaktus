package cz.osu.pizzakaktus.repositories.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by Farmas on 18.10.2016.
 */

@Entity
@NoArgsConstructor
@Getter
public class IngredientDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private Integer weight;

    public IngredientDb(String name, Integer weight) {
        this.name = name;
        this.weight = weight;
    }
}
