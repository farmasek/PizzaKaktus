package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.ErrorDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.OrderService;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Created by Vojta on 20.2.2017.
 */

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    /**
     * Return Json of accepted order
     *
     * @return Json of accepted order
     */
    @RequestMapping(value = "/create-order", method = RequestMethod.POST)
    public HttpEntity<?> sendOrder(@RequestBody OrderDTO order) {
        try {
            OrderDb insertedOrder = orderService.createOrder(order);
            return new ResponseEntity<>(new OrderDTO(insertedOrder), HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
