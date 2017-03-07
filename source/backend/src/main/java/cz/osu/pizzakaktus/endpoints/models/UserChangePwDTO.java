package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by e-myslivost-ACER on 25.2.2017.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserChangePwDTO {
    private String login;
    private String userOldPassword;
    private String userNewPassword;
}