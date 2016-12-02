package cz.osu.pizzakaktus;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

// Imports for mail
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PizzaKaktusApplicationTests {

	@Test
	public void contextLoads()
	{

	}

	@Test
	public void sendMail()
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
			InternetAddress.parse("gaulus@seznam.cz"));
			message.setSubject("Order Accepted");
			message.setText("Order Accepted");

			Transport.send(message);

			System.out.println("Done");

		} catch (MessagingException e)
		{
			throw new RuntimeException(e);
		}
	}

}
