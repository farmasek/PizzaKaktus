package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.IngredientService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

/**
 * Created by Farmas on 13.11.2016.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class IngredientServiceImplTest {

    @Autowired
    IngredientService ingredientService;

    @Test
    public void insert() throws Exception {
        IngredientDb ingredientDb = new IngredientDb("Ingredient name","200kg", 200.0, 250.0);
        Optional<IngredientDb> insertedIngredient = ingredientService.insert(ingredientDb);
        assertTrue("returned ingredient optional is not empty", insertedIngredient.isPresent());
        assertEquals(insertedIngredient.get(), ingredientDb);
    }

    @Test
    public void findAll() throws Exception {
        List<IngredientDb> all = ingredientService.findAll();
        assertNotNull(all);

        if (!all.isEmpty()) {
            IngredientDb ingredientDb = all.get(0);
            assertNotNull(ingredientDb);
        }
    }

}