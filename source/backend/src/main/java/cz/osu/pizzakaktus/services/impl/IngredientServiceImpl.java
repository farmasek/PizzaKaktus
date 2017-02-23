package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.IngredientService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    // Hokus pokus triple exception
    public Optional<IngredientDb> insert(IngredientDb ingredientDb) throws DatabaseException {

        try{
            IngredientDb found = ingredientRepository.findByName(ingredientDb.getName());
            if(found == null)
            {
                IngredientDb savedObject = ingredientRepository.save(ingredientDb);
                return Optional.of(savedObject);
            }
            else
            {
                throw new DatabaseException("Ingredience s názvem " + ingredientDb.getName() + " již existuje.");
            }
        }
        catch(DatabaseException ex)
        {
            throw ex;
        }
    }

    @Override
    public List<IngredientDb> findAll() throws DatabaseException{
        Iterable<IngredientDb> all = ingredientRepository.findAll();
        ArrayList<IngredientDb> listAll = Lists.newArrayList(all);
        if(listAll.isEmpty())
        {
            throw new DatabaseException("Nebylo možné najít všechny ingredience.");
        }
        else
        {
            return listAll;
        }
    }

    @Override
    public List<IngredientDb> findAllById(List<Integer> ids)throws DatabaseException {
        Iterable<IngredientDb> all = ingredientRepository.findAll(ids);
        ArrayList<IngredientDb> listAll = Lists.newArrayList(all);
        if(listAll.isEmpty())
        {
            throw new DatabaseException("Nebylo možné najít všechny ingredience dle zadaných ID.");
        }
        else
        {
            return listAll;
        }
    }
}
