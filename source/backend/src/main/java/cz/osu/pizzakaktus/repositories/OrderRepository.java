package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by baranvoj on 2/19/2017.
 */
@Repository
public interface OrderRepository extends PagingAndSortingRepository<OrderDb, Integer>, QueryDslPredicateExecutor<OrderDb> {

    List<OrderDb> findAll();

    OrderDb findById(Integer id);

    List<OrderDb> findByOrderStatusId(int id);

}
