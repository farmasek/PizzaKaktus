package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@RestController
@CrossOrigin
@RequestMapping("/pizza")
public class PizzaController {
    @Autowired
    PizzaService pizzaService;
    @Autowired
    MapToDTO mapToDTO;

    /**
     * Return all pizzas
     *
     * @return Json list of all pizzas
     */
    @RequestMapping(value = "/all-pizzas", method = RequestMethod.GET)
    public HttpEntity<?> findAllPizzas(@RequestParam(value = "filterBy", required = false)
                                               String filterBy, Pageable pageable) {
        Page<PizzaDb> allPizzas = pizzaService.findAll(pageable, filterBy);
        Page<PizzaDTO> pizzaDTOs = allPizzas.map(pizzaDb -> mapToDTO.mapPizza(pizzaDb));
        return new ResponseEntity<>(pizzaDTOs, HttpStatus.OK);
    }

    /**
     * Return all active pizzas
     *
     * @return Json list of all active pizzas
     */
    @RequestMapping(value = "/active-pizzas", method = RequestMethod.GET)
    public HttpEntity<?> findActivePizzas() {
        try {
            List<PizzaDb> activePizzasDb = pizzaService.findActive();
            List<PizzaDTO> activePizzasDTO = new ArrayList<>();
            activePizzasDb.forEach(pizzaDb -> activePizzasDTO.add(mapToDTO.mapPizza(pizzaDb)));
            return new ResponseEntity<>(activePizzasDTO, HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new Gson().toJson(e.getMessage()), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**
     * Insert pizza into database
     *
     * @param pizza - Json of Pizza
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addPizza(@RequestBody PizzaDTO pizza) {
        Optional<PizzaDb> insertedPizza = Optional.empty();
        String error = "";
        try {
            insertedPizza = pizzaService.insert(pizza);
        } catch (DatabaseException e) {
           error = e.getMessage();
        }
        return insertedPizza.isPresent() ?
                new ResponseEntity<>(insertedPizza.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(new Gson().toJson(error), HttpStatus.NOT_ACCEPTABLE);
    }

    /**
     * Update user in database
     *
     * @param pizza - Json of Pizza
     * @return if successful then updated object, if not successful then error message
     */
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public HttpEntity<?> updateUser(@RequestBody PizzaDTO pizza) {

        Optional<PizzaDb> updatedPizza = Optional.empty();
        String error = "";
        try {
            updatedPizza = pizzaService.update(pizza);
        } catch (DatabaseException e) {
            error = e.getMessage();
        }
        return updatedPizza.isPresent() ?
                new ResponseEntity<>(updatedPizza.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(new Gson().toJson(error), HttpStatus.NOT_ACCEPTABLE);
    }

}
