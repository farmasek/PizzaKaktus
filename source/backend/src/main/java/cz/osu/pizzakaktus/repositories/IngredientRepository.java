package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

/**
 * Created by Farmas on 18.10.2016.
 */
@Repository
public interface IngredientRepository extends CrudRepository<IngredientDb, Integer> {
    List<IngredientDb> findById(Integer Id);
    IngredientDb findByName(String name);
}
