package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Vojta on 20.2.2017.
 */

@Repository
public interface CustomerRepository extends CrudRepository<CustomerDb, Integer>
{
    CustomerDb findByEmail(String email);
}
