package cz.osu.pizzakaktus.endpoints.models;

import lombok.*;

/**
 * Created by e-myslivost-ACER on 17.4.2017.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Statistic2DTO {
    private int soldPizzaCount;
    private Double soldPizzaMoney;
    private String mostSoldPizza;
}
