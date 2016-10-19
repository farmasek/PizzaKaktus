package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.IngredientService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 19.10.2016.
 */
@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    IngredientRepository ingredientRepository;

    @Override
    public Optional<IngredientDb> insert(IngredientDb ingredientDb) {
        IngredientDb savedObject = ingredientRepository.save(ingredientDb);
        return Optional.of(savedObject);
    }

    @Override
    public List<IngredientDb> findAll() {
        Iterable<IngredientDb> all = ingredientRepository.findAll();
        return Lists.newArrayList(all);
    }
}
