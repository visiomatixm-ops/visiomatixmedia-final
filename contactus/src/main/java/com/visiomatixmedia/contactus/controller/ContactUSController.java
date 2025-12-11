package com.visiomatixmedia.contactus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @PostMapping(value = "/contactus", consumes = "multipart/form-data")
    public ResponseEntity<?> createContactUS(
            @RequestPart("fullName") String fullName,
            @RequestPart("email") String email,
            @RequestPart("subject") String subject,
            @RequestPart("message") String message,
            @RequestPart(value = "resume", required = false) MultipartFile resume
    ) {
        try {

            ContactUSEntity contact = new ContactUSEntity();
            contact.setFullName(fullName);
            contact.setEmail(email);
            contact.setSubject(subject);
            contact.setMessage(message);

            ContactUSEntity savedContact = service.saveContactUSEntity(contact);

            // Email sending
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo("ganvirtine@gmail.com");
            helper.setSubject(subject);
            helper.setText(
                "Name: " + fullName + "\n" +
                "Email: " + email + "\n" +
                "Message: " + message
            );

            if (resume != null) {
                helper.addAttachment(resume.getOriginalFilename(), resume);
            }

            mailSender.send(mimeMessage);

            return ResponseEntity.ok(
                new ContactUSResponse("Email sent successfully", savedContact)
            );

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ContactUSResponse(
                        "Failed to send email: " + e.getMessage(), null
                    ));
        }
    }
}
