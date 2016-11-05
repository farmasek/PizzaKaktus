package cz.osu.pizzakaktus.endpoints.models;

import cz.osu.pizzakaktus.repositories.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

/**
 * Created by e-myslivost on 26.10.2016.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDTO {

    private String firstName;
    private String lastName;
    private String password;
    private String login;
    private List<String> roles;
    private String phone;
}
