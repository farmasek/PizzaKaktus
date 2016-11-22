package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.PizzaRepository;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.CategoryService;
import cz.osu.pizzakaktus.services.IngredientService;
import cz.osu.pizzakaktus.services.PizzaService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Service
public class PizzaServiceImpl implements PizzaService {
    @Autowired
    PizzaRepository pizzaRepository;

    @Autowired
    IngredientService ingredientService;

    @Autowired
    CategoryService categoryService;

    @Override
    public Optional<PizzaDb> insert(PizzaDTO pizzaDTO) {
        List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
        CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
        if (isCategoryValid(categoryDb) && (!isTitleTaken(pizzaDTO.getTitle()))) {
            PizzaDb insertedPizza = pizzaRepository.save(
                    new PizzaDb(null, pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
            return Optional.of(insertedPizza);
        }
        return Optional.empty();
    }

    @Override
    public Optional<PizzaDb> update(PizzaDTO pizzaDTO) {
        try {
            List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
            CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
            PizzaDb updatedPizza = pizzaRepository.save(
                new PizzaDb(pizzaDTO.getId(), pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
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

    @Override
    public boolean isCategoryValid(CategoryDb categoryDb) {
        return !(categoryDb == null);
    }

    @Override
    public boolean isTitleTaken(String title) {
        boolean isActive = false;
        List<PizzaDb> foundByTitle = pizzaRepository.findByTitle(title);
        if (foundByTitle.isEmpty()) {
            return !foundByTitle.isEmpty();
        }
        for (PizzaDb pizza : foundByTitle) {
            if (pizza.isActive()) {
                isActive = true;
            }
        }
        return isActive;
    }
}
