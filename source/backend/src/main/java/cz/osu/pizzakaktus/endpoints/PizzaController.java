package cz.osu.pizzakaktus.endpoints;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@RestController
//@CrossOrigin(origins = "http://localhost:1337")
@RequestMapping("/pizza")
public class PizzaController {
    @Autowired
    PizzaService pizzaService;

    /**
     * Return all users
     *
     * @return Json list of all users
     */
    @RequestMapping(value = "/all-pizzas", method = RequestMethod.GET)
    public HttpEntity<?> findAllUsers() {
        List<PizzaDb> allPizzas = pizzaService.findAll();
        return new ResponseEntity<>(allPizzas, HttpStatus.OK);
    }

    /**
     * Insert user into database
     *
     * @param pizza - Json of Pizza
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addPizza(@RequestBody PizzaDTO pizza) {

        Optional<PizzaDb> insertedPizza = pizzaService.insert(pizza);
        return insertedPizza.isPresent() ?
                new ResponseEntity<>(insertedPizza.get(), HttpStatus.OK)
                :
                new ResponseEntity<>("Error inserting to database", HttpStatus.NOT_ACCEPTABLE);
    }

    /**
     * Update user in database
     *
     * @param pizza - Json of Pizza
     * @return if successful then updated object, if not successful then error message
     */
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public HttpEntity<?> updateUser(@RequestBody PizzaDb pizza) {

        Optional<PizzaDb> updatedPizza = pizzaService.update(pizza);
        return updatedPizza.isPresent() ?
                new ResponseEntity<>(updatedPizza.get(), HttpStatus.OK)
                :
                new ResponseEntity<>("Error updating in database", HttpStatus.NOT_ACCEPTABLE);
    }

}
