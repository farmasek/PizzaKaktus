package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.PizzaRepository;
import cz.osu.pizzakaktus.repositories.models.*;
import cz.osu.pizzakaktus.services.CategoryService;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.IngredientService;
import cz.osu.pizzakaktus.services.PizzaService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Optional<PizzaDb> insert(PizzaDTO pizzaDTO) throws DatabaseException {
        List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
        CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
        if (isCategoryValid(categoryDb) && (!isTitleTaken(pizzaDTO.getTitle()))) {
            PizzaDb insertedPizza = pizzaRepository.save(
                    new PizzaDb(null, pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
            return Optional.of(insertedPizza);
        } else {
            throw new DatabaseException("Pizza s názvem " + pizzaDTO.getTitle() + " již existuje.");
        }
    }

    @Override
    public Optional<PizzaDb> update(PizzaDTO pizzaDTO) throws DatabaseException {
        try {
            List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
            CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
            PizzaDb updatedPizza = pizzaRepository.save(
                    new PizzaDb(pizzaDTO.getId(), pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
            return Optional.of(updatedPizza);
        } catch (DatabaseException e) {
            throw new DatabaseException("Nebylo možné aktualizovat pizzu s názvem " + pizzaDTO.getTitle() + ".");
        }
    }

    @Override
    public List<PizzaDb> findAll() throws DatabaseException {
        Iterable<PizzaDb> pizzas = pizzaRepository.findAll();
        ArrayList<PizzaDb> listPizzas = Lists.newArrayList(pizzas);
        if(listPizzas.isEmpty()) {
            throw new DatabaseException("Nebylo možné najít všechny pizzy.");
        } else {
            return listPizzas;
        }
    }

    @Override
    public Page<PizzaDb> findAll(Pageable pageable, String filterBy) throws DatabaseException {
        Page<PizzaDb> pizzasPage = pizzaRepository.findAll(QPizzaDb.pizzaDb.title.containsIgnoreCase(filterBy), pageable);
        if(pizzasPage.getSize() == 0) {
            throw new DatabaseException("Nebylo možné najít pizzy podle filtru " + filterBy + ".");
        } else {
            return pizzasPage;
        }
    }

    @Override
    public List<PizzaDb> findActive() throws DatabaseException {
        Iterable<PizzaDb> pizzas = pizzaRepository.findByActive(true);
        ArrayList<PizzaDb> listPizzas =  Lists.newArrayList(pizzas);
        if(listPizzas.isEmpty()) {
            throw new DatabaseException("Nebylo možné najít aktivní pizzy.");
        } else {
            return listPizzas;
        }
    }

    @Override
    public boolean isCategoryValid(CategoryDb categoryDb) throws DatabaseException {
        return !(categoryDb == null);
    }

    @Override
    public boolean isTitleTaken(String title) throws DatabaseException {
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

    @Override
    public List<PizzaDb> findById(Integer id) throws DatabaseException {
        List<PizzaDb> pizza = pizzaRepository.findById(id);
        if(pizza.isEmpty()) {
            throw new DatabaseException("Nebylo možné najít pizzu podle id " + id + ".");
        } else {
            return pizza;
        }
    }
}
