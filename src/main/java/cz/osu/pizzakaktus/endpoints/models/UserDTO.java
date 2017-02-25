package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

/**
 * Created by e-myslivost on 26.10.2016.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String password;
    private String login;
    private List<String> roles;
    private String phone;
    private boolean active;
}
