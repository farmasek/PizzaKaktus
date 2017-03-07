package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

/**
 * Created by e-myslivost-ACER on 7.3.2017.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserAuthDTO {

        private Integer id;
        private String firstName;
        private String lastName;
        private String password;
        private String login;
        private Set<String> roles;
        private String phone;
        private boolean active;



}
