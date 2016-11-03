package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
public interface PizzaService {

    /**
     *
     * @param pizzaDTO
     * @return insert Pizza
     */
    Optional<PizzaDb> insert(PizzaDTO pizzaDTO);

    /**
     *
     * @param pizzaDb
     * @return pizza user based on ID
     */
    Optional<PizzaDb> update(PizzaDb pizzaDb);

    /**
     *
     * @return List of pizzas
     */
    List<PizzaDb> findAll();
}
