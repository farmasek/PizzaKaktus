package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.IngredientDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
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
    private String title;
    private String category;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IngredientDb> ingredients;

    public PizzaDb(String title, String category, List<IngredientDTO> ingredients) {
        this.title = title;
        this.category = category;
        List<IngredientDb> ingredientDb = new ArrayList<>(ingredients.size());
        for (IngredientDTO ingredient : ingredients) {
            ingredientDb.add(new IngredientDb(ingredient));
        }
        this.ingredients = ingredientDb;
    }

    public PizzaDb(PizzaDTO pizza) {
        this.title = pizza.getTitle();
        this.category = pizza.getCategory();
        List<IngredientDb> ingredientDb = new ArrayList<>(pizza.getIngredients().size());
        for (IngredientDTO ingredient : pizza.getIngredients()) {
            ingredientDb.add(new IngredientDb(ingredient));
        }
        this.ingredients = ingredientDb;
    }
}
