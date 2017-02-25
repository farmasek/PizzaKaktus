package cz.osu.pizzakaktus;

import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.models.IngredientDb;
import cz.osu.pizzakaktus.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PizzaKaktusApplication {
    @Autowired
    IngredientService ingredientService;

    public static void main(String[] args) {

        SpringApplication.run(PizzaKaktusApplication.class, args);

    }

//    @Bean
//    public CommandLineRunner demo(IngredientRepository repository) {
//        return (args) -> {
//            // save a couple of customers
//            ingredientService.insertOrderToDatabase(new IngredientDb("Jacklul", 5, 6.5, 7.0));
//            repository.save(new IngredientDb("Rektkek", 16, 15.0,12.9));
//        };
//    }

}
