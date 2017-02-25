package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.OrderDTO;
import cz.osu.pizzakaktus.repositories.OrderRepository;
import cz.osu.pizzakaktus.repositories.OrderStatusRepository;
import cz.osu.pizzakaktus.repositories.models.*;
import cz.osu.pizzakaktus.services.*;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.xml.crypto.Data;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
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
    private static final String ORDER_EMAIL_ADRESS = "justtestingpizza@gmail.com";
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderStatusRepository orderStatusRepository;

    @Autowired
    PizzaService pizzaService;

    @Autowired
    CustomerService customerService;

    @Override
    public Page<OrderDb> findAll(Pageable pageable, String filterAttribute, String filterPhrase,
                                 Timestamp filterStartDate, Timestamp filterEndDate) throws DatabaseException {
        Page<OrderDb> orderPage = orderRepository.findAll(
                QOrderDb.orderDb.orderStatus.status.containsIgnoreCase(filterPhrase)
                        .or(QOrderDb.orderDb.customer.email.containsIgnoreCase(filterPhrase))
                        .and(
                                QOrderDb.orderDb.dateCreated.between(filterStartDate, filterEndDate)
                                        .or(QOrderDb.orderDb.dateModified.between(filterStartDate, filterEndDate))
                        )
                , pageable);
        if (orderPage.getSize() == 0) {
            if (filterPhrase.isEmpty()) {
                throw new DatabaseException("Nebylo možné najít objednávky.");
            }
            throw new DatabaseException("Nebylo možné najít objednávky podle vybraného filtru s frází " + filterPhrase + ".");
        } else {
            return orderPage;
        }
    }

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
            sendEmail(customer, pizzas);
        } catch (DatabaseException e) {
            throw e;
        }
        return insertedOrder.get();
    }

    @Override
    public void sendEmail(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException {
        String useExternal = System.getProperty("use-external-email");
        if (useExternal != null && useExternal.equals("true")) {
            String send = this.Send("Objednávka přijata", makeOrderMailBody(customer, pizzas), customer.getEmail());
            System.out.println(send);
        } else {
            orderAcceptedMail(customer.getEmail(), makeOrderMailBody(customer, pizzas));

        }
    }

    private String Send(String subject, String body, String to) throws DatabaseException {
        String emailApiKey = System.getProperty("email-api");
        if (emailApiKey == null) {
            throw new DatabaseException("Chyba při kontaktování email serveru");
        }
        try {
            String encoding = "UTF-8";
            String data = "apikey=" + URLEncoder.encode(emailApiKey, encoding);
            data += "&from=" + URLEncoder.encode(ORDER_EMAIL_ADRESS, encoding);
            data += "&fromName=" + URLEncoder.encode("Pizza kaktus team", encoding);
            data += "&subject=" + URLEncoder.encode(subject, encoding);
            data += "&bodyHtml=" + URLEncoder.encode(body, encoding);
            data += "&to=" + URLEncoder.encode(to, encoding);
            data += "&isTransactional=" + URLEncoder.encode("true", encoding);

            URL url = new URL("https://api.elasticemail.com/v2/email/send");
            URLConnection conn = url.openConnection();
            conn.setDoOutput(true);
            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(data);
            wr.flush();
            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String result = rd.readLine();
            wr.close();
            rd.close();
            return result;
        } catch (Exception e) {
            throw new DatabaseException("Chyba při zasílání emailu, je emailová adresa správná?");
        }
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
    public void orderAcceptedMail(String recipient, String mailBody) throws DatabaseException {
        try {
            final String password = "pizzakaktus";

            Properties props = new Properties();
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "465");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.socketFactory.fallback", "false");

            Session session = Session.getDefaultInstance(props,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(ORDER_EMAIL_ADRESS, password);
                        }
                    });

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("pizzakaktus@kaktus.cz"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(recipient));
            message.setSubject("Objednávka přijata."); // String subject
            message.setText(mailBody);

            Transport.send(message);

            System.out.println("Order accepted mail sent.");

        } catch (Exception e) {
            throw new DatabaseException("Chyba pri posíláni emailu z lokálního serveru");
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
