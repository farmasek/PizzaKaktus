package cz.osu.pizzakaktus.endpoints.mappers;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

/**
 * Created by Farmas on 04.12.2016.
 */
@Service
public class MapToDTO {


    public PizzaDTO mapPizza(PizzaDb pizzaDb) {

        return PizzaDTO.builder()
                .id(pizzaDb.getId())
                .title(pizzaDb.getTitle())
                .categoryId(pizzaDb.getCategory().getId())
                .ingredientsId(pizzaDb.getIngredients().stream().map(IngredientDb::getId).collect(Collectors.toList()))
                .price(pizzaDb.getPrice())
                .active(pizzaDb.isActive())
                .build();
    }

}
