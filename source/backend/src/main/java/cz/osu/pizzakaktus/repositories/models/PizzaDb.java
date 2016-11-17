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
    private CategoryDb categoryId;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IngredientDb> ingredients;
    private boolean active;

    public PizzaDb(Integer id, String title, CategoryDb categoryId, List<IngredientDb> ingredients, boolean active) {
        this.id = id;
        this.title = title;
        this.categoryId = categoryId;
//        List<IngredientDb> ingredientDb = new ArrayList<>(ingredients.size());
//        ingredientDb.addAll(ingredients.stream().map(IngredientDb::new).collect(Collectors.toList()));
        this.ingredients = ingredients;
        this.active = active;
    }

//    public PizzaDb(PizzaDTO pizza) {
//        this.title = pizza.getTitle();
//        this.categoryId = pizza.getCategoryId();
//        List<IngredientDb> ingredientDb = new ArrayList<>(pizza.getIngredients().size());
//        ingredientDb.addAll(pizza.getIngredients().stream().map(IngredientDb::new).collect(Collectors.toList()));
//        this.ingredients = ingredientDb;
    //    this.active = pizza.getActive();
//    }
}
