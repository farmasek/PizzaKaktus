package cz.osu.pizzakaktus.endpoints.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderDTO
{
    private List<Integer> pizzasId;
    private CustomerDTO customer;
}
