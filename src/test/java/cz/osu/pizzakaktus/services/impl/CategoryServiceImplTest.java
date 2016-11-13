package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.services.CategoryService;
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
public class CategoryServiceImplTest {

    @Autowired
    CategoryService categoryService;

    @Test
    public void insert() throws Exception {
        CategoryDTO categoryToInsert = CategoryDTO.builder()
                .name("tName")
                .build();
        Optional<CategoryDb> insert = categoryService.insert(categoryToInsert);
        assertTrue("returned category optional is not empty", insert.isPresent());
        assertEquals(insert.get().getName(), categoryToInsert.getName());
    }

    @Test
    public void findAll() throws Exception {

        List<CategoryDb> all = categoryService.findAll();
        assertNotNull(all);

        if (!all.isEmpty()) {
            CategoryDb categoryDb = all.get(0);
            assertNotNull(categoryDb);
        }
    }

}