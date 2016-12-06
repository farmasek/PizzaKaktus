package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
public interface CategoryService {

    /**
     * Inserts category into database
     *
     * @param categoryDTO - category to be inserted in database
     * @return inserted category
     */
    Optional<CategoryDb> insert(CategoryDTO categoryDTO)throws DatabaseException;

    /**
     * Returns all categories in database
     *
     * @return list of categories
     */
    List<CategoryDb> findAll()throws DatabaseException;

    /**
     * Finds category based on its IDs
     *
     * @return category based on its IDs
     */
    CategoryDb findById(Integer id)throws DatabaseException;

    /**
     * Returns list of categories based on its IDs
     *
     * @return list of categories based on its IDs
     */
    List<CategoryDb> findAllById(List<Integer> ids)throws DatabaseException;
}
