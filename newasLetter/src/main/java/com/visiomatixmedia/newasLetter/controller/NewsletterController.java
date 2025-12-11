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
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NewsletterController {

    @Autowired
    private NewsletterServices service;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody NewsletterEntity request) {
        try {
            NewsletterEntity saved = service.saveNewsletterEntity(request);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo("ganvirtine@gmail.com");
            helper.setSubject("New Subscriber");
            helper.setText("New subscriber email: " + request.getEmail());

            mailSender.send(mimeMessage);

            return ResponseEntity.ok(new NewsletterResponse("Successfully Subscribed", saved));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
