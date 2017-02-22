package cz.osu.pizzakaktus.endpoints.models;

import cz.osu.pizzakaktus.repositories.models.CustomerDb;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by e-myslivost on 6.12.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CustomerDTO {
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String city;
    private String street;
    private String zip;

    public CustomerDTO(CustomerDb customerDb) {
        this.name = customerDb.getName();
        this.surname = customerDb.getSurname();
        this.email = customerDb.getEmail();
        this.phone = customerDb.getPhone();
        this.city = customerDb.getCity();
        this.street = customerDb.getStreet();
        this.zip = customerDb.getZip();
    }
}
