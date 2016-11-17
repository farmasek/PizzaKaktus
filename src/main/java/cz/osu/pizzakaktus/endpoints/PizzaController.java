package cz.osu.pizzakaktus.endpoints;

import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.repositories.models.PizzaDb;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Return all pizzas
     *
     * @return Json list of all pizzas
     */
    @RequestMapping(value = "/all-pizzas", method = RequestMethod.GET)
    public HttpEntity<?> findAllPizzas() {
        List<PizzaDb> allPizzas = pizzaService.findAll();
        List<PizzaDTO> collect = allPizzas.stream()
                .map(pizzaDb -> PizzaDTO.builder()
                        .id(pizzaDb.getId())
                        .title(pizzaDb.getTitle())
                        .categoryId(pizzaDb.getCategoryId().getId())
                        .ingredientsId(pizzaDb.getIngredients().stream().map(IngredientDb::getId).collect(Collectors.toList()))
                        .active(pizzaDb.isActive())
                        .build())
                .collect(Collectors.toList());
        return new ResponseEntity<>(collect, HttpStatus.OK);
    }

    /**
     * Insert pizza into database
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
                new ResponseEntity<>("Error inserting into database", HttpStatus.NOT_ACCEPTABLE);
    }

    /**
     * Update user in database
     *
     * @param pizza - Json of Pizza
     * @return if successful then updated object, if not successful then error message
     */
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public HttpEntity<?> updateUser(@RequestBody PizzaDTO pizza) {

        Optional<PizzaDb> updatedPizza = pizzaService.update(pizza);
        return updatedPizza.isPresent() ?
                new ResponseEntity<>(updatedPizza.get(), HttpStatus.OK)
                :
                new ResponseEntity<>("Error updating in database", HttpStatus.NOT_ACCEPTABLE);
    }

}
