package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Repository
public interface CategoryRepository extends CrudRepository<CategoryDb, Integer> {
    CategoryDb findById(Integer Id);
    CategoryDb findByName(String name);
}
