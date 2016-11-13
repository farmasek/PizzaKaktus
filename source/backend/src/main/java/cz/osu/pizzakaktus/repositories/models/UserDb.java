package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import lombok.*;
import lombok.experimental.Wither;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by e-myslivost on 26.10.2016.
 */
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Wither
public class UserDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    @Column(updatable = false)
    private String passwordHash;
    private String login;
    @ManyToMany(cascade = {CascadeType.MERGE})
    private Set<Role> roles;
    private String phone;


    public UserDb(String firstName, String lastName, String passwordHash, String login, Set<Role> roles, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.login = login;
        this.roles = roles;
        this.phone = phone;
    }

//    public UserDb(UserDTO user)    {
//        this.firstName = user.getFirstName();
//        this.lastName = user.getLastName();
//        this.passwordHash = user.getPassword();
//        this.login = user.getLogin();
//        this.role = user.getRole();
//        this.phone = user.getPhone();
//    }


}
