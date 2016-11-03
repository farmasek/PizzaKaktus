package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.repositories.models.IngredientDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 19.10.2016.
 */
public interface IngredientService {

    /**
     * Insert ingredient into database
     *
     * @param ingredientDb - ingredient to be put in database
     * @return inserted ingredient
     */
    Optional<IngredientDb> insert(IngredientDb ingredientDb);

    /**
     * Find all ingredients in database
     *
     * @return list of ingredients
     */
    List<IngredientDb> findAll();

    List<IngredientDb> findAllById(List<Integer> ids);
}
