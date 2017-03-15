package cz.osu.pizzakaktus.endpoints.models;

import cz.osu.pizzakaktus.repositories.models.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by e-myslivost-ACER on 9.3.2017.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ChangeOrderStatusDTO {
    private Integer id;
    private OrderStatus orderStatus;
}
