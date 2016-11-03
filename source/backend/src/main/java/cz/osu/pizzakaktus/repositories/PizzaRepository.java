package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Repository
public interface PizzaRepository extends CrudRepository<PizzaDb, Long> {
    List<PizzaDb> findById(Long Id);
    List<PizzaDb> findByCategory(String category);
}
