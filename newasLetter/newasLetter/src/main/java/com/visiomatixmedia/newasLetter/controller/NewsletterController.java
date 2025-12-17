package com.visiomatixmedia.newasLetter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.visiomatixmedia.newasLetter.entity.NewsletterEntity;
import com.visiomatixmedia.newasLetter.services.NewsletterServices;
import com.visiomatixmedia.newasLetter.webconfig.NewsletterResponse;

import jakarta.mail.internet.MimeMessage;
import lombok.Data;

@RestController
@RequestMapping("/api/subscribe")
@CrossOrigin(origins = "*")
public class NewsletterController {
	@Autowired
	private final NewsletterServices service;

	@Autowired
	private JavaMailSender mailSender;

	public NewsletterController(NewsletterServices service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<?> subscribe(@RequestBody NewsletterEntity request) {
		try {

			String email = request.getEmail();
			NewsletterEntity saveNewsletter = service.saveNewsletterEntity(request);

			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo("rs5337473@gmail.com");
			mimeMessageHelper.setSubject("You resive a new subscriber email.");
			mimeMessageHelper.setText("You have received a new subscriber:\n\n" + "Email: " + email + "\n");

			mailSender.send(mimeMessage);

			return ResponseEntity.ok(new NewsletterResponse("Successfull Subscribed.", saveNewsletter));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@Data
	static class SubscribeRequest {
		private String email;
	}
}
