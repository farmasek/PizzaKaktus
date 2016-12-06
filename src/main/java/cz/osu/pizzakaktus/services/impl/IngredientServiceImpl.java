package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
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
    public Optional<IngredientDb> insert(IngredientDb ingredientDb) throws DatabaseException {
        IngredientDb savedObject = ingredientRepository.save(ingredientDb);
        return Optional.of(savedObject);
    }

    @Override
    public List<IngredientDb> findAll() throws DatabaseException{
        Iterable<IngredientDb> all = ingredientRepository.findAll();
        return Lists.newArrayList(all);
    }

    @Override
    public List<IngredientDb> findAllById(List<Integer> ids)throws DatabaseException {
        Iterable<IngredientDb> all = ingredientRepository.findAll(ids);
        return Lists.newArrayList(all);
    }
}
