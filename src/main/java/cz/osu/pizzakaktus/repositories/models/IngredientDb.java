package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.IngredientDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.DoubleSummaryStatistics;

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
    private String amount;
    private Double cost;
    private Double costCustom;

    public IngredientDb(String name, String amount, Double cost, Double costCustom) {
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.costCustom = costCustom;
    }

    public IngredientDb(IngredientDTO ingredient) {
        this.name = ingredient.getName();
        this.amount = ingredient.getWeight();
        this.cost = ingredient.getCost();
        this.costCustom = ingredient.getCostCustom();
    }
}
