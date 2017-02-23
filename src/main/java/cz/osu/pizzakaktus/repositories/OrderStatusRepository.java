package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Mish.k.a on 23. 2. 2017.
 */
@Repository
public interface OrderStatusRepository extends CrudRepository<OrderStatus, Integer> {

    List<OrderStatus> findAll();

    OrderStatus findById(Integer id);

    OrderStatus findByStatus(String status);

}
