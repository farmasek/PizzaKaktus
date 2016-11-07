package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.repositories.models.IngredientDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 19.10.2016.
 */
public interface IngredientService {

    /**
     * Inserts ingredient into database
     *
     * @param ingredientDb - ingredient to be inserted in database
     * @return inserted ingredient
     */
    Optional<IngredientDb> insert(IngredientDb ingredientDb);

    /**
     * Returns all ingredients in database
     *
     * @return list of ingredients
     */
    List<IngredientDb> findAll();

    /**
     * Returns all ingredients in database by ID
     *
     * @return list of ingredients
     */
    List<IngredientDb> findAllById(List<Integer> ids);
}
