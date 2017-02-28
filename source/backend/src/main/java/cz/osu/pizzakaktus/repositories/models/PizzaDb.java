package cz.osu.pizzakaktus.repositories.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */

@Entity
@NoArgsConstructor
@Getter
public class PizzaDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(length = 50)
    private String title;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CategoryDb category;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IngredientDb> ingredients;
    private Double price;
    private boolean active;

    public PizzaDb(Integer id, String title, CategoryDb category, List<IngredientDb> ingredients, Double price, boolean active) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.ingredients = ingredients;
        this.price = price;
        this.active = active;
    }

}
