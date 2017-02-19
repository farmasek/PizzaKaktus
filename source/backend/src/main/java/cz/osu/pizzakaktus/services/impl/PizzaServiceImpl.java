package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.endpoints.models.PizzaDTO;
import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.PizzaRepository;
import cz.osu.pizzakaktus.repositories.models.*;
import cz.osu.pizzakaktus.services.CategoryService;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import cz.osu.pizzakaktus.services.IngredientService;
import cz.osu.pizzakaktus.services.PizzaService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import static java.lang.Math.toIntExact;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Service
public class PizzaServiceImpl implements PizzaService {
    @Autowired
    PizzaRepository pizzaRepository;

    @Autowired
    IngredientService ingredientService;

    @Autowired
    CategoryService categoryService;

    @Override
    public Optional<PizzaDb> insert(PizzaDTO pizzaDTO) throws DatabaseException {
        List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
        CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
        if (isCategoryValid(categoryDb) && (!isTitleTaken(pizzaDTO.getTitle()))) {
            PizzaDb insertedPizza = pizzaRepository.save(
                    new PizzaDb(null, pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
            return Optional.of(insertedPizza);
        }
        else
        {
            throw new DatabaseException("Pizza s nazvem " + pizzaDTO.getTitle() + " již existuje.");
        }
    }

    @Override
    public Optional<PizzaDb> update(PizzaDTO pizzaDTO) throws DatabaseException {
        try {
            List<IngredientDb> ingredientsById = ingredientService.findAllById(pizzaDTO.getIngredientsId());
            CategoryDb categoryDb = categoryService.findById(pizzaDTO.getCategoryId());
            PizzaDb updatedPizza = pizzaRepository.save(
                    new PizzaDb(pizzaDTO.getId(), pizzaDTO.getTitle(), categoryDb, ingredientsById, pizzaDTO.getPrice(), pizzaDTO.isActive()));
            return Optional.of(updatedPizza);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public List<PizzaDb> findAll() throws DatabaseException{
        Iterable<PizzaDb> pizzasList = pizzaRepository.findAll();
        return Lists.newArrayList(pizzasList);
    }

    @Override
    public Page<PizzaDb> findAll(Pageable pageable, String filterBy) {
        return pizzaRepository.findAll(QPizzaDb.pizzaDb.title.containsIgnoreCase(filterBy), pageable);
    }

    @Override
    public List<PizzaDb> findActive() throws DatabaseException {
        Iterable<PizzaDb> pizzasList = pizzaRepository.findByActive(true);
        return Lists.newArrayList(pizzasList);
    }

    @Override
    public boolean isCategoryValid(CategoryDb categoryDb)throws DatabaseException {
        return !(categoryDb == null);
    }

    @Override
    public boolean isTitleTaken(String title)throws DatabaseException {
        boolean isActive = false;
        List<PizzaDb> foundByTitle = pizzaRepository.findByTitle(title);
        if (foundByTitle.isEmpty()) {
            return !foundByTitle.isEmpty();
        }
        for (PizzaDb pizza : foundByTitle) {
            if (pizza.isActive()) {
                isActive = true;
            }
        }
        return isActive;
    }

    @Override
    public List<PizzaDb> findById(Integer id) throws DatabaseException
    {
        List<PizzaDb> pizza = pizzaRepository.findById(id);
        return pizza;
    }

    @Override
    public int countTotalPizzasCost(List<PizzaDb> pizzas) throws DatabaseException
    {
        PizzaDb pizza;
        int totalCost = 0;

        for(int i = 0; i < pizzas.size(); i++)
        {
            pizza = pizzas.get(i);
            totalCost += pizza.getPrice();
        }

        return totalCost;
    }

    @Override
    public void createOrder(OrderDTO order) throws DatabaseException
    {
        CustomerDb customer = new CustomerDb(order.getCustomer());
        OrderDb orderDb = new OrderDb(order.getPizzasId(), customer, OrderStatus.CREATED);
        List<PizzaDb> pizzas = new ArrayList<>();
        List<Integer> pizzasIDs = orderDb.getPizzasId();

        for (int i = 0; i < pizzasIDs.size(); i++)
        {
            Integer id = pizzasIDs.get(i);
            pizzas.addAll(findById(id));
        }

        // testovaci mail
        //orderAcceptedMail("justtestingpizza@gmail.com", makeOrderMailBody(customer, pizzas));
        // konkretni zakaznik
        orderAcceptedMail(customer.getEmail(), makeOrderMailBody(customer, pizzas));
    }

    @Override
    public String makeOrderMailBody(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException
    {
        String orderedPizzas = "";
        for (int i = 0; i < pizzas.size(); i++)
        {
            orderedPizzas += "- " + pizzas.get(i).getTitle() + " " + (int)Math.round(pizzas.get(i).getPrice()) + "kč\n";
        }

        int totalCost = countTotalPizzasCost(pizzas);

        String mailBody =  "Dobrý den " + customer.getName() + " " + customer.getSurname() + ". Vaše objednávka byla přijata.\n\n" +
        "Vaše objednávka zahrnuje tyto položky: \n" + orderedPizzas + "\nCelková cena činí: " + totalCost + "kč\n\nS přáním pěkného dne, tým PizzaKaktus.";

        return mailBody;
    }

    @Override
    //public void orderAcceptedMail(String recipient, String subject, String text)
    public void orderAcceptedMail(String recipient, String mailBody)
    {
        final String username = "justtestingpizza@gmail.com";
        final String password = "pizzakaktus";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("pizzakaktus@kaktus.cz"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(recipient));
            message.setSubject("Objednávka přijata"); // String subject
            message.setText(mailBody);

            Transport.send(message);

            System.out.println("Order accepted mail sent.");

        } catch (MessagingException e)
        {
            throw new RuntimeException(e);
        }
    }
}
