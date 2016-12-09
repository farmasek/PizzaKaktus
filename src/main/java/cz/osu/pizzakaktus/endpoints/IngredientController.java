package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.models.IngredientDTO;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 19.10.2016.
 */
@RestController
@CrossOrigin
@RequestMapping("/ingredient")
public class IngredientController {

    @Autowired
    IngredientService ingredientService;

    /**
     * Return all ingredients
     *
     * @return Json list of all ingredients
     */
    @RequestMapping(value = "/all-ingredients", method = RequestMethod.GET)
    public HttpEntity<?> findAllIngredients() {
        List<IngredientDb> allIngredients = new ArrayList();
        String error = "";
        try {
            allIngredients = ingredientService.findAll();
        } catch (DatabaseException e) {
            error = e.getMessage();
        }

        if(allIngredients.isEmpty())
        {
            return new ResponseEntity<>(error, HttpStatus.NOT_ACCEPTABLE);
        }
        else
        {
            return new ResponseEntity<>(new Gson().toJson(allIngredients), HttpStatus.OK);
        }
    }

    /**
     * Insert ingredient into database
     *
     * @param ingredient - Json of ingredient
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addIngredient(@RequestBody IngredientDTO ingredient) {
        //TODO implement ingredient validation
        Optional<IngredientDb> insert = Optional.empty();
        String error = "";

        try {
            insert = ingredientService.insert(new IngredientDb(ingredient));
        } catch (DatabaseException e) {
            error = e.getMessage();
        }
        return insert.isPresent() ?
                new ResponseEntity<>(insert.get(), HttpStatus.OK)
                :
                new ResponseEntity<>(error , HttpStatus.NOT_ACCEPTABLE);
    }

}
