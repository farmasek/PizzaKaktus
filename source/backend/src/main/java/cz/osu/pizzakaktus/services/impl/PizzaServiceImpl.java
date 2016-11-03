package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.PizzaRepository;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.PizzaService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Service
public class PizzaServiceImpl implements PizzaService {
    @Autowired
    PizzaRepository pizzaRepository;

    @Override
    public Optional<PizzaDb> insert(PizzaDb pizzaDb) {
        PizzaDb insertedPizza = pizzaRepository.save(pizzaDb);
        return Optional.of(insertedPizza);
    }

    @Override
    public Optional<PizzaDb> update(PizzaDb pizzaDb) {
        try {
            PizzaDb updatedPizza = pizzaRepository.save(pizzaDb);
            return Optional.of(updatedPizza);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public List<PizzaDb> findAll() {
        Iterable<PizzaDb> pizzasList = pizzaRepository.findAll();
        return Lists.newArrayList(pizzasList);
    }
}
