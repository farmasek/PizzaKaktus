package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.OrderStatusRepository;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.OrderStatusService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 23. 2. 2017.
 */
@Service
public class OrdesStatusServiceImpl implements OrderStatusService {

    @Autowired
    OrderStatusRepository orderStatusRepository;

    @Override
    public Optional<OrderStatus> insert(String orderStatus) throws DatabaseException {
        OrderStatus found = orderStatusRepository.findByStatus(orderStatus);

        if(found == null) {
            OrderStatus savedObject = orderStatusRepository.save(new OrderStatus(orderStatus));
            return Optional.of(savedObject);
        } else {
            throw new DatabaseException("Stav " + orderStatus + " již existuje.");
        }
    }

    @Override
    public List<OrderStatus> findAll() throws DatabaseException {
        Iterable<OrderStatus> all = orderStatusRepository.findAll();
        ArrayList<OrderStatus> listAll = Lists.newArrayList(all);
        if(listAll.isEmpty()) {
            throw new DatabaseException("Nebylo možné najít všechny stavy objednávek.");
        } else {
            return listAll;
        }
    }

    @Override
    public OrderStatus findById(Integer id) throws DatabaseException {
        OrderStatus orderStatus = orderStatusRepository.findById(id);
        if(orderStatus != null) {
            return orderStatus;
        } else {
            throw new DatabaseException("Nebylo možné nalézt stav objednávky s id " + id + ".");
        }
    }

    @Override
    public OrderStatus findByStatus(String status) throws DatabaseException {
        OrderStatus orderStatus = orderStatusRepository.findByStatus(status);
        if(orderStatus != null) {
            return orderStatus;
        } else {
            throw new DatabaseException("Nebylo možné nalézt stav objednávky se stavem " + status + ".");
        }
    }
}
