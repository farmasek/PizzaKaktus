package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.IngredientDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    @ManyToOne
    private CategoryDb category;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IngredientDb> ingredients;

    public PizzaDb(String title, CategoryDb category, List<IngredientDb> ingredients) {
        this.title = title;
        this.category = category;
//        List<IngredientDb> ingredientDb = new ArrayList<>(ingredients.size());
//        ingredientDb.addAll(ingredients.stream().map(IngredientDb::new).collect(Collectors.toList()));
        this.ingredients = ingredients;
    }

//    public PizzaDb(PizzaDTO pizza) {
//        this.title = pizza.getTitle();
//        this.category = pizza.getCategory();
//        List<IngredientDb> ingredientDb = new ArrayList<>(pizza.getIngredients().size());
//        ingredientDb.addAll(pizza.getIngredients().stream().map(IngredientDb::new).collect(Collectors.toList()));
//        this.ingredients = ingredientDb;
//    }
}
