package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Repository
public interface PizzaRepository extends PagingAndSortingRepository<PizzaDb, Integer>, QueryDslPredicateExecutor<PizzaDb> {

    List<PizzaDb> findById(Integer id);

    List<PizzaDb> findAll();

    List<PizzaDb> findByTitle(String title);

    List<PizzaDb> findByActive(boolean active);

}
