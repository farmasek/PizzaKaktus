package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

/**
 * Created by e-myslivost-ACER on 17.4.2017.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class StatisticDTO {

    private Timestamp day;
    private int sold;


}
