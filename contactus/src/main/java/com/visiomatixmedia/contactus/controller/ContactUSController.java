package com.visiomatixmedia.contactus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.visiomatixmedia.contactus.entity.ContactUSEntity;
import com.visiomatixmedia.contactus.service.ContactUSService;
import com.visiomatixmedia.contactus.webconfig.ContactUSResponse;

import jakarta.mail.internet.MimeMessage;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactUSController {

	@Autowired
	private ContactUSService service;

	@Autowired
	private JavaMailSender mailSender;

	@PostMapping("/contactus")
	public ResponseEntity<?> createContactUS(@RequestBody ContactUSEntity contact) {
		try {
			
			String fullName = contact.getFullName();
	        String email = contact.getEmail();
	        String subject = contact.getSubject();
	        String message = contact.getMessage();
			
			// Save to Database
			ContactUSEntity saveContact = service.saveContactUSEntity(contact);

			// Email Sender

			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo("ganvirtine@gmail.com");
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setText("You have received a new contact form submission:\n\n" 
					+ "Name: " + fullName + "\n" +
					 "Email: " + email + "\n" +
					 "Message: " + message);

			mailSender.send(mimeMessage);

			return ResponseEntity.ok(
					new ContactUSResponse("Email Send Successfully", saveContact)
				);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ContactUSResponse("Failed to send email: " + e.getMessage(), null));
		}
	}
}