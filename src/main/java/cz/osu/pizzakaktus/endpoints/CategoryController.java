package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.services.CategoryService;
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
@CrossOrigin(origins = "http://localhost:1337")
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    /**
     * Return all categories
     *
     * @return Json list of all categories
     */
    @RequestMapping(value = "/all-categories", method = RequestMethod.GET)
    public HttpEntity<?> findAllCategories() {
        List<CategoryDb> allCategories = categoryService.findAll();
        return new ResponseEntity<>(new Gson().toJson(allCategories), HttpStatus.OK);
    }

    /**
     * Insert category into database
     *
     * @param category - Json of category
     * @return if successful then inserted object, if not successful then error message
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public HttpEntity<?> addCategory(@RequestBody CategoryDTO category) {
        Optional<CategoryDb> insertedCategory = categoryService.insert(category);
        return insertedCategory.isPresent() ?
                new ResponseEntity<>(insertedCategory.get(), HttpStatus.OK)
                :
                new ResponseEntity<>("Error inserting to database", HttpStatus.NOT_ACCEPTABLE);
    }
}
