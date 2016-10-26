package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by e-myslivost on 26.10.2016.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDTO {

    private String name;
    private String login;
    private String role;
    private String phone;
}
