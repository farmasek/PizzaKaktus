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
    private String title;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private CategoryDb category;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IngredientDb> ingredients;
    private boolean active;

    public PizzaDb(String title, CategoryDb category, List<IngredientDb> ingredients, boolean active) {
        this.title = title;
        this.category = category;
//        List<IngredientDb> ingredientDb = new ArrayList<>(ingredients.size());
//        ingredientDb.addAll(ingredients.stream().map(IngredientDb::new).collect(Collectors.toList()));
        this.ingredients = ingredients;
        this.active = active;
    }

//    public PizzaDb(PizzaDTO pizza) {
//        this.title = pizza.getTitle();
//        this.category = pizza.getCategory();
//        List<IngredientDb> ingredientDb = new ArrayList<>(pizza.getIngredients().size());
//        ingredientDb.addAll(pizza.getIngredients().stream().map(IngredientDb::new).collect(Collectors.toList()));
//        this.ingredients = ingredientDb;
    //    this.active = pizza.getActive();
//    }
}
