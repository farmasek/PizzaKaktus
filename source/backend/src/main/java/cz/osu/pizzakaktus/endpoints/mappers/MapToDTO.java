package cz.osu.pizzakaktus.endpoints.mappers;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.models.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

/**
 * Created by Farmas on 04.12.2016.
 */
@Service
public class MapToDTO {


    public PizzaDTO mapPizza(PizzaDb pizzaDb) {
        return PizzaDTO.builder()
                .id(pizzaDb.getId())
                .title(pizzaDb.getTitle())
                .categoryId(pizzaDb.getCategory().getId())
                .ingredientsId(pizzaDb.getIngredients().stream().map(IngredientDb::getId).collect(Collectors.toList()))
                .price(pizzaDb.getPrice())
                .active(pizzaDb.isActive())
                .build();
    }

    public OrderDTO mapOrder(OrderDb orderDb) {
        return OrderDTO.builder()
                .id(orderDb.getId())
                .customer(mapCustomer(orderDb.getCustomer()))
                .orderStatus(orderDb.getOrderStatus().getStatus())
                .pizzasIds(orderDb.getPizzasIds())
                .dateCreated(orderDb.getDateCreated())
                .dateModified(orderDb.getDateModified())
                .build();
    }

    public CustomerDTO mapCustomer(CustomerDb customerDb) {
        return CustomerDTO.builder()
                .name(customerDb.getName())
                .surname(customerDb.getSurname())
                .email(customerDb.getEmail())
                .phone(customerDb.getPhone())
                .street(customerDb.getStreet())
                .city(customerDb.getCity())
                .zip(customerDb.getZip())
                .build();
    }

    public UserDTO mapUser(UserDb userDb) {
        return UserDTO.builder()
                .active(userDb.isActive())
                .firstName(userDb.getFirstName())
                .lastName(userDb.getLastName())
                .login(userDb.getLogin())
                .id(userDb.getId())
                .phone(userDb.getPhone())
                .password(userDb.getPasswordHash())
                .roles(userDb.getRoles().stream().map(Role::getRole).collect(Collectors.toList()))
                .build();
    }

}
