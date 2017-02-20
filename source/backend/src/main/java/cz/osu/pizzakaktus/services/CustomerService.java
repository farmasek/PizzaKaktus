package cz.osu.pizzakaktus.services;

import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;

import java.util.Optional;


/**
 * Created by baranvoj on 2/19/2017.
 */
public interface CustomerService {
    /**
     * Saves customer to db, if user already exist it will update him by unique email
     *
     * @param customer - customer to be saved
     * @return - saved customer from db
     */
    CustomerDb saveCustomer(CustomerDb customer) throws DatabaseException;

    /**
     * Find customer by email from database
     *
     * @param email - email for database search
     * @return - Optional of customerDB from database
     */
    Optional<CustomerDb> findExistingCustomerByEmail(String email);

    /**
     * Update existing customer
     *
     * @param customer - customer to be updated
     * @return - Optional of customerDB from database
     */
    Optional<CustomerDb> updateCustomer(CustomerDb customer);
}
