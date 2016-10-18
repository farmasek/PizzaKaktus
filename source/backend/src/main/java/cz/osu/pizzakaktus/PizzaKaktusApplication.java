package cz.osu.pizzakaktus;

import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PizzaKaktusApplication {

    public static void main(String[] args) {
        SpringApplication.run(PizzaKaktusApplication.class, args);

    }
    @Bean
    public CommandLineRunner demo(IngredientRepository repository) {
        return (args) -> {
            // save a couple of customers
            repository.save(new IngredientDb("Jack", 5));
            repository.save(new IngredientDb("Zou", 5));
            repository.save(new IngredientDb("Kek", 5));
            repository.save(new IngredientDb("Lul", 5));
            repository.save(new IngredientDb("Rekt", 5));
        };
    }

}
