package com.vyapaarmall.util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailHelper {
	
	
	public static void sendEmail()  {
		String smtpServer = "smtp.gmail.com";
		int smtpPort = 587;
		String smtpUsername = "shivji1999@gmail.com";
		String smtpPassword = "mooneobdwvjnxjzq";
		String fromAddress = "shivji1999@gmail.com";
		String toAddress = "gamershiv1999@gmail.com";
		String subject = "Subject of email";
		String body = "Body of email";

		Properties props = new Properties();
		
		props.put("mail.smtp.host", smtpServer);
		props.put("mail.smtp.port", smtpPort);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");

		
		try {
			Session session = Session.getInstance(props, null);
		Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(fromAddress));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(toAddress));
        message.setSubject(subject);
        message.setText(body);
        
        Transport transport = session.getTransport("smtp");
        transport.connect(smtpServer, smtpUsername, smtpPassword);
        transport.sendMessage(message, message.getAllRecipients());
        transport.close();
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}

	

}
