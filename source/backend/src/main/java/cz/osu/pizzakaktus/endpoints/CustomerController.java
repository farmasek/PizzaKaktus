package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.endpoints.models.ErrorDTO;
import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.CustomerService;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by baranvoj on 2/27/2017.
 */
@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/by-email", method = RequestMethod.GET)
    public HttpEntity<?> findCustomerByEamil(@RequestParam(value = "email", required = true)
                                                     String email) {
        Optional<CustomerDb> existingCustomerByEmail = customerService.findExistingCustomerByEmail(email);

        if (existingCustomerByEmail.isPresent()) {
            return new ResponseEntity<>(new CustomerDTO(existingCustomerByEmail.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ErrorDTO("Not existing user"), HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
