package cz.osu.pizzakaktus.repositories;

import com.querydsl.core.types.Predicate;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Repository
public interface PizzaRepository extends PagingAndSortingRepository<PizzaDb, Integer>, QueryDslPredicateExecutor<PizzaDb> {
    List<PizzaDb> findById(int Id);

    List<PizzaDb> findByCategoryId(Integer categoryId);

    List<PizzaDb> findByTitle(String title);

    List<PizzaDb> findByActive(boolean active);

}
