package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class CustomerDb
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(length = 50)
    private String name;
    @Column(length = 50)
    private String surname;
    @Column(length = 50)
    private String email;
    @Column(length = 20)
    private String phone;
    @Column(length = 30)
    private String city;
    @Column(length = 40)
    private String street;
    @Column(length = 10)
    private String zip;

    public CustomerDb(String name, String surname, String email, String phone, String city, String street, String zip) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.street = street;
        this.zip = zip;
    }

    public CustomerDb(CustomerDTO customerDTO) {
        this.surname = customerDTO.getSurname();
        this.name = customerDTO.getName();
        this.email = customerDTO.getEmail();
        this.phone = customerDTO.getPhone();
        this.city = customerDTO.getCity();
        this.street = customerDTO.getStreet();
        this.zip = customerDTO.getZip();
    }

    public void setId(int id) {
        this.id = id;
    }
}
