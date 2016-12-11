package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CustomerDTO
{
    private String name;
    private String surname;
    private String email;
    private String city;
    private String street;
    private String psc;
}
