package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.repositories.CustomerRepository;
import cz.osu.pizzakaktus.repositories.OrderRepository;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.services.CustomerService;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Created by Vojta on 20.2.2017.
 */
@Service
public class CustomerServiceImpl implements CustomerService
{
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public CustomerDb saveCustomer(CustomerDb customerDb) throws DatabaseException
    {
        if(findExistingCustomerByEmail(customerDb.getEmail()).isPresent())
        {
            // Aktualizuje zakaznika
            Optional<CustomerDb> customer = findExistingCustomerByEmail(customerDb.getEmail());
            customerDb.setId(customer.get().getId());
            return customerRepository.save(customerDb);
        }
        else
        {
            // Vytvori noveho zakaznika
            return customerRepository.save(customerDb);
        }
    }

    @Override
    public Optional<CustomerDb> findExistingCustomerByEmail(String email)
    {
        return Optional.of(customerRepository.findByEmail(email));
    }

    @Override
    public Optional<CustomerDb> updateCustomer(CustomerDb customer)
    {
       return Optional.of(customerRepository.save(customer));
    }
}
