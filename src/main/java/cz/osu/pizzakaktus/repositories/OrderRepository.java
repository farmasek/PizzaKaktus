package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.OrderDb;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by baranvoj on 2/19/2017.
 */
public interface OrderRepository extends PagingAndSortingRepository<OrderDb, Integer>, QueryDslPredicateExecutor<OrderDb> {

}
