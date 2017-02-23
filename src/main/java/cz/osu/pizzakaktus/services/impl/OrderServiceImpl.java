package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.OrderRepository;
import cz.osu.pizzakaktus.repositories.OrderStatusRepository;
import cz.osu.pizzakaktus.repositories.models.*;
import cz.osu.pizzakaktus.services.*;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

/**
 * Created by Vojta on 20.2.2017.
 */
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderStatusRepository orderStatusRepository;

    @Autowired
    PizzaService pizzaService;

    @Autowired
    CustomerService customerService;

    @Override
    public int countTotalPizzasCost(List<PizzaDb> pizzas) throws DatabaseException {
        PizzaDb pizza;
        int totalCost = 0;

        for (int i = 0; i < pizzas.size(); i++) {
            pizza = pizzas.get(i);
            totalCost += pizza.getPrice();
        }

        return totalCost;
    }

    @Override
    public OrderDb createOrder(OrderDTO order) throws DatabaseException {
        CustomerDb customer = new CustomerDb(order.getCustomer());
        OrderStatus orderStatus = orderStatusRepository.findByStatus(OrderStatus.CREATED);
        long now = System.currentTimeMillis();
        Timestamp dateCreated = new Timestamp(now);
        Timestamp dateModified = new Timestamp(now);
        OrderDb orderDb = new OrderDb(order.getPizzasIds(), customer, orderStatus,
                                      dateCreated, dateModified);
        List<PizzaDb> pizzas = new ArrayList<>();
        List<Integer> pizzasIDs = orderDb.getPizzasIds();

        for (Integer id : pizzasIDs) {
            pizzas.addAll(pizzaService.findById(id));
        }

        CustomerDb insertedCustomer = customerService.saveCustomer(customer);

        orderDb.setCustomer(insertedCustomer);
        Optional<OrderDb> insertedOrder = insertOrderToDatabase(orderDb);

        // testovaci mail
        //orderAcceptedMail("justtestingpizza@gmail.com", makeOrderMailBody(customer, pizzas));
        // konkretni zakaznik
        try {
            orderAcceptedMail(customer.getEmail(), makeOrderMailBody(customer, pizzas));
        } catch (Exception e) {
            throw new DatabaseException("Nastala chyba při odesílání emailu.");
        }

        return insertedOrder.get();
    }

    @Override
    public String makeOrderMailBody(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException {
        String orderedPizzas = "";
        for (int i = 0; i < pizzas.size(); i++) {
            orderedPizzas += "- " + pizzas.get(i).getTitle() + " " + (int) Math.round(pizzas.get(i).getPrice()) + "kč\n";
        }

        int totalCost = countTotalPizzasCost(pizzas);

        String mailBody = "Dobrý den, " + customer.getName() + " " + customer.getSurname() + ". Vaše objednávka byla přijata.\n\n" +
                "Vaše objednávka zahrnuje tyto položky: \n" + orderedPizzas + "\nCelková cena činí: " + totalCost + "kč\n\nS přáním pěkného dne, tým PizzaKaktus.";

        return mailBody;
    }

    @Override
    public void orderAcceptedMail(String recipient, String mailBody) {
        final String username = "justtestingpizza@gmail.com";
        final String password = "pizzakaktus";

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "465");
        props.put("mail.smtp.starttls.enable","true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.socketFactory.fallback", "false");

        Session session = Session.getDefaultInstance(props,
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
            message.setSubject("Objednávka přijata."); // String subject
            message.setText(mailBody);

            Transport.send(message);

            System.out.println("Order accepted mail sent.");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<OrderDb> insertOrderToDatabase(OrderDb orderDb) throws DatabaseException {
        try {
            OrderDb insertedOrder = orderRepository.save(orderDb);
            return Optional.of(insertedOrder);
        } catch (Exception e) {
            throw new DatabaseException("Objednávku nebylo možno uložit.");
        }
    }
}
