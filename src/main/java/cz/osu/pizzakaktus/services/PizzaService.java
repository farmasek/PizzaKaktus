package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
public interface PizzaService {

    /**
     * Inserts pizza into database
     *
     * @param pizzaDTO - pizza to be inserted in database
     * @return inserted pizza
     */
    Optional<PizzaDb> insert(PizzaDTO pizzaDTO);

    /**
     * Updates pizza data based on its ID
     *
     * @param pizzaDb - the pizza to be updated in database
     * @return updated pizza based on its ID
     */
    Optional<PizzaDb> update(PizzaDb pizzaDb);

    /**
     * Returns list of all pizzas
     *
     * @return List of pizzas
     */
    List<PizzaDb> findAll();

    boolean isCategoryValid(CategoryDb categoryDb);

    boolean isTitleTaken(String title);
}
