package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by e-myslivost-ACER on 4.4.2017.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderPizzaDTO {
    private Integer pizzaId;
    private List<Integer> ingredientsIds;
}
