package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.IngredientDTO;
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
    private String name;
    private String login;
    private String role;
    private String phone;

    public UserDb(String name, String login, String role, String phone) {
        this.name = name;
        this.login = login;
        this.role = role;
        this.phone = phone;
    }



    public UserDb(UserDTO user) {


        this.name = user.getName();
        this.login = user.getLogin();
        this.role = user.getRole();
        this.phone = user.getPhone();


    }


}
