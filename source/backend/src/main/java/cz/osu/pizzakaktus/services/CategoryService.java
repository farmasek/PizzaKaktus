package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
public interface CategoryService {

    /**
     * Insert category into database
     *
     * @param categoryDb - ingredient to be put in database
     * @return inserted category
     */
    Optional<CategoryDb> insert(CategoryDTO categoryDTO);

    /**
     * Find all categories in database
     *
     * @return list of categories
     */
    List<CategoryDb> findAll();

    CategoryDb findById(Integer id);

    List<CategoryDb> findAllById(List<Integer> ids);
}
