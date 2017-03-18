package cz.osu.pizzakaktus.endpoints;

import com.google.gson.Gson;
import com.google.gson.LongSerializationPolicy;
import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.ChangeOrderStatusDTO;
import cz.osu.pizzakaktus.endpoints.models.ErrorDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.models.OrderDb;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.OrderService;
import cz.osu.pizzakaktus.services.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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

    @Autowired
    MapToDTO mapToDTO;

    /**
     * Return Json of accepted order
     *
     * @return Json of accepted order
     */
    @RequestMapping(value = "/create-order", method = RequestMethod.POST)
    public HttpEntity<?> sendOrder(@RequestBody OrderDTO order) {
        try {
            OrderDb insertedOrder = orderService.createOrder(order);
            return new ResponseEntity<>(mapToDTO.mapOrder(insertedOrder), HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return all orders
     *
     * @return Json list of all orders
     */
    @RequestMapping(value = "/all-orders", method = RequestMethod.GET)
    public HttpEntity<?> findAllOrders(@RequestParam(value = "filterAttribute", required = false) String filterAttribute,
                                       @RequestParam(value = "filterPhrase", required = false) String filterPhrase,
                                       @RequestParam(value = "filterStartDate", required = false) String filterStartDate,
                                       @RequestParam(value = "filterEndDate", required = false) String filterEndDate,
                                       Pageable pageable) {
        Page<OrderDb> allOrders = null;
        Timestamp startDate = new Timestamp(Long.valueOf(filterStartDate));
        Timestamp endDate = new Timestamp(Long.valueOf(filterEndDate));
        try {
            allOrders = orderService.findAll(pageable, filterAttribute, filterPhrase, startDate, endDate);
            Page<OrderDTO> orderDTOs = allOrders.map(orderDb -> mapToDTO.mapOrder(orderDb));
            return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Change order status
     *
     * @return Json order with change status
     */
    @RequestMapping(value = "/change-order-status", method = RequestMethod.POST)
    public HttpEntity<?> changeOrderStatus(@RequestBody ChangeOrderStatusDTO order)throws DatabaseException {
        try {
        OrderDb orderWithChangeStatus = orderService.changeOrderStatus(order);
        return new ResponseEntity<>(mapToDTO.mapOrder(orderWithChangeStatus), HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Return all active orders
     *
     * @return Json list of all active orders
     */
    @RequestMapping(value = "/all-opened-orders", method = RequestMethod.GET)
    public HttpEntity<?> findAllActiveOrders() {
        List<OrderDb> createdAndOpenedOrders = new ArrayList();
        List<OrderDTO> createdAndOpenedOrdersDTO = new ArrayList();

        try {
            createdAndOpenedOrders = orderService.findAllCreatedAndOpened();
            for (OrderDb order : createdAndOpenedOrders) {
                createdAndOpenedOrdersDTO.add(new OrderDTO(order));
            }
            return new ResponseEntity<>(createdAndOpenedOrdersDTO, HttpStatus.OK);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
