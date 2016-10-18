package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Farmas on 18.10.2016.
 */
public interface IngredientRepository extends CrudRepository<IngredientDb, Long> {
    List<IngredientDb> findById(Long Id);
}
