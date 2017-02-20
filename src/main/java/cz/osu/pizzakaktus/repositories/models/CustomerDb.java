package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CustomerDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
    private String name;
    private String surname;
    private String email;
    private String city;
    private String street;
    private String psc;

    public CustomerDb(String name ,String surname, String email, String city, String street, String psc) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.city = city;
        this.street = street;
        this.psc = psc;
    }

    public CustomerDb(CustomerDTO customerDTO) {
        this.surname = customerDTO.getSurname();
        this.name = customerDTO.getName();
        this.email = customerDTO.getEmail();
        this.city = customerDTO.getCity();
        this.street = customerDTO.getStreet();
        this.psc = customerDTO.getPsc();
    }

    public void setId(int id)
    {
        this.id = id;
    }
}
