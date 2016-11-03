package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class UserDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String password;
    private String login;
    private String role;
    private String phone;

    public UserDb(String firstName, String lastName, String password, String login, String role, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.login = login;
        this.role = role;
        this.phone = phone;
    }

    public UserDb(UserDTO user)    {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.password = user.getPassword();
        this.login = user.getLogin();
        this.role = user.getRole();
        this.phone = user.getPhone();
    }


}
