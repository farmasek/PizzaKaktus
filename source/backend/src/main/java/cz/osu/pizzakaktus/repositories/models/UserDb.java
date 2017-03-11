package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import lombok.*;
import lombok.experimental.Wither;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.*;
import java.net.ConnectException;
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
    @Column(length = 50)
    private String firstName;
    @Column(length = 50)
    private String lastName;
    @Column(length = 100)
    private String passwordHash;
    @Column(length = 30)
    private String login;
    @ManyToMany(cascade = {CascadeType.MERGE})
    private Set<Role> roles;
    @Column(length = 20)
    private String phone;
    private boolean active ;


    public UserDb(String firstName, String lastName, String passwordHash, String login, Set<Role> roles, String phone,boolean active) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.login = login;
        this.roles = roles;
        this.phone = phone;
        this.active = active;

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
