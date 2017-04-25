package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.*;
import cz.osu.pizzakaktus.repositories.IngredientRepository;
import cz.osu.pizzakaktus.repositories.OrderRepository;
import cz.osu.pizzakaktus.repositories.OrderStatusRepository;
import cz.osu.pizzakaktus.repositories.PizzaRepository;
import cz.osu.pizzakaktus.repositories.models.*;
import cz.osu.pizzakaktus.services.*;
import cz.osu.pizzakaktus.services.Exceptions.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
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
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

/**
 * Created by Vojta on 20.2.2017.
 */
@Service
public class OrderServiceImpl implements OrderService {
    private static final String ORDER_EMAIL_ADRESS = "justtestingpizza@gmail.com";
    private static final int DOUGH_PRICE = 80;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderStatusRepository orderStatusRepository;

    @Autowired
    PizzaService pizzaService;

    @Autowired
    PizzaRepository pizzaRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    MapToDTO mapToDTO;

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
        OrderStatus orderStatus = orderStatusRepository.findById(1);
        long now = System.currentTimeMillis();
        Timestamp dateCreated = new Timestamp(now);
        Timestamp dateModified = new Timestamp(now);


        // Opravit, posilaji se vsecky ???
        List<OrderPizzaDTO> origPizzas = new ArrayList<>();
        List<OrderPizzaDTO> customPizzas = new ArrayList<>();
        //List<Integer> customPizzasIds = new ArrayList<>();
        List<Integer> allPizzasIds = new ArrayList<>();

        for (OrderPizzaDTO pizza : order.getOrderCart()) {

            if (pizza.getIngredientsIds().isEmpty()) {
                origPizzas.add(pizza);
                allPizzasIds.add(pizza.getPizzaId());
            } else {
                customPizzas.add(pizza);
                String email = order.getCustomer().getEmail();
                allPizzasIds.add(saveCustomPizza(pizza, email));
            }
        }

        OrderDb orderDb = new OrderDb(allPizzasIds, customer, orderStatus,
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
    public Integer saveCustomPizza(OrderPizzaDTO pizza, String email) throws DatabaseException {
        PizzaDTO newPizza = new PizzaDTO();
        double price = 0;

        if (pizza.getPizzaId() == null) {
            price = DOUGH_PRICE;
            // Kategorie vlastní
            newPizza.setCategoryId(0);
            newPizza.setTitle("Vlastní (" + email + ")");
        } else {
            PizzaDb orginPizza = pizzaService.findById(pizza.getPizzaId()).get(0);
            newPizza.setTitle(orginPizza.getTitle() + " (upravená)");
            newPizza.setCategoryId(orginPizza.getCategory().getId());
            price = orginPizza.getPrice();
        }

        newPizza.setActive(false);
        List<Integer> newPizzaIngIds = new ArrayList<>();

        //přidaní nových ingrediencí do listu
        for (int newIng : pizza.getIngredientsIds()) {
            IngredientDb ingredient = ingredientRepository.findOne(newIng);
            price += ingredient.getCostCustom();
            newPizzaIngIds.add(ingredient.getId());
        }
        newPizza.setIngredientsId(newPizzaIngIds);
        newPizza.setPrice(price);
        Optional<PizzaDb> insertedNewPizza = pizzaService.insert(newPizza);

        return insertedNewPizza.get().getId();
    }

    @Override
    public void sendEmail(CustomerDb customer, List<PizzaDb> pizzas) throws DatabaseException {
        String useExternal = System.getenv("use-external-email");
        if (useExternal != null && useExternal.equals("true")) {
            String send = this.Send("Objednávka přijata", makeOrderMailBody(customer, pizzas), customer.getEmail());
            System.out.println(send);
        } else {
            orderAcceptedMail(customer.getEmail(), makeOrderMailBody(customer, pizzas));
        }
    }

    private String Send(String subject, String body, String to) throws DatabaseException {
        String emailApiKey = System.getenv("email-api");
        if (emailApiKey == null) {
            throw new DatabaseException("Chyba při kontaktování emailového serveru.");
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
            orderedPizzas += "- " + pizzas.get(i).getTitle() + " (";

            for (int j = 0; j < pizzas.get(i).getIngredients().size(); j++) {
                IngredientDb ingredient = pizzas.get(i).getIngredients().get(j);
                if (j == pizzas.get(i).getIngredients().size() - 1) {
                    orderedPizzas += ingredient.getName();
                } else {
                    orderedPizzas += ingredient.getName() + ", ";
                }
            }
            orderedPizzas += ") " + (int) Math.round(pizzas.get(i).getPrice()) + "kč\n";
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
            throw new DatabaseException("Chyba při posíláni emailu z lokálního serveru.");
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

    @Override
    public List<OrderDb> findAllCreatedAndOpened() throws DatabaseException {
        try {
            OrderStatus openedStatus = orderStatusRepository.findById(2);
            OrderStatus createdStatus = orderStatusRepository.findById(1);

            List<OrderDb> openedAndCreatedOrders = orderRepository.findByOrderStatusId(openedStatus.getId());
            openedAndCreatedOrders.addAll(orderRepository.findByOrderStatusId(createdStatus.getId()));
            openedAndCreatedOrders.sort(Comparator.comparing(OrderDb::getDateCreated).reversed());

            return openedAndCreatedOrders;
        } catch (Exception e) {
            throw new DatabaseException("Nebylo možné získat vytvořené a otevřené objednávky.");
        }
    }

    @Override
    public List<OrderDb> findAllOpened() throws DatabaseException {
        try {
            OrderStatus openedStatus = orderStatusRepository.findById(2);
            return orderRepository.findByOrderStatusId(openedStatus.getId());
        } catch (Exception e) {
            throw new DatabaseException("Nebylo možné získat otevřené objednávky.");
        }
    }

    @Override
    public List<OrderDTO> changeOrderStatus(List<ChangeOrderStatusDTO> orders) throws DatabaseException {
        try {

            List<OrderDTO> listOfOrders = new ArrayList<>();
            for (ChangeOrderStatusDTO order : orders) {

                OrderDb orderToChange = orderRepository.findById(order.getId());
                OrderStatus orderStatus = orderStatusRepository.findByStatus(order.getOrderStatus());
                orderToChange.setOrderStatus(orderStatus);
                listOfOrders.add(new OrderDTO(orderRepository.findById(order.getId())));
                orderRepository.save(orderToChange);
            }
            return listOfOrders;
        } catch (Exception e) {
            throw new DatabaseException("Nebylo možno změnit status objednávky.", e);
        }

    }

    // God please no...
    @Override
    public List<StatisticDTO> getStatisFromTo(Timestamp from, Timestamp to) throws DatabaseException {
        List<StatisticDTO> statisticDTOS = new ArrayList<>();

        List<OrderDb> ordersBetween = orderRepository.findByDateCreatedBetween(from, to);

        LocalDate ldtFrom =
                LocalDate.from(from.toLocalDateTime());
        LocalDate ldtTo =
                LocalDate.from(to.toLocalDateTime());

        while (ldtFrom.isBefore(ldtTo)) {
            Timestamp today = Timestamp.valueOf(ldtFrom.atStartOfDay());
            Timestamp tomorrow = Timestamp.valueOf(ldtFrom.atStartOfDay().plusDays(1));
            long count = ordersBetween.stream().filter(orderDb -> orderDb.getDateCreated().after(today) && orderDb.getDateCreated().before(tomorrow)).count();
            statisticDTOS.add(new StatisticDTO(today, (int) count));
            ldtFrom = ldtFrom.plusDays(1);
        }
        return statisticDTOS;
    }

    @Override
    public Statistic2DTO getStatis(Timestamp from, Timestamp to) throws DatabaseException {
        Statistic2DTO ret = new Statistic2DTO();
        long od = from.getTime();
        long po = to.getTime();

        List<OrderDb> allOrders = orderRepository.findAll();
        List<OrderDb> ordersFromTo = new ArrayList<>();
        for (OrderDb order : allOrders) {
            if (from.getTime() <= order.getDateCreated().getTime() && order.getDateCreated().getTime() <= to.getTime()) {
                ordersFromTo.add(order);
            }
        }
        double totalPrice = 0;
        String nejprodavanejsi = "gg";

        for (OrderDb order : ordersFromTo) {
            for (int pizzaId : order.getPizzasIds()) {
                totalPrice += pizzaRepository.findOne(pizzaId).getPrice();
            }
        }

        int max = 0;
        int actual = 0;
        for (PizzaDb pizzaDb : pizzaRepository.findAll()) {

            for (OrderDb order : ordersFromTo) {
                for (int pizzaId : order.getPizzasIds()) {
                    if (pizzaDb.getId() == pizzaId) {
                        actual++;
                    }
                }
            }
            if (actual >= max) {
                max = actual;
                actual = 0;
                nejprodavanejsi = pizzaDb.getTitle();
            }
        }


        ret.setSoldPizzaCount(ordersFromTo.size());
        ret.setSoldPizzaMoney(totalPrice);
        ret.setMostSoldPizza(nejprodavanejsi);

        return ret;
    }

}
