package org.visiomatix.jobOpening.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.visiomatix.jobOpening.dto.JobApplicationResponse;
import org.visiomatix.jobOpening.dto.JobOpeningApp;
import org.visiomatix.jobOpening.service.JobOpeningApplicationServices;

import jakarta.mail.internet.MimeMessage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class JobOpeningApplicationController {
	@Autowired
	private JobOpeningApplicationServices service;
	
	@Autowired
    private JavaMailSender mailSender;
	
	@PostMapping("/jobapplications")
	public ResponseEntity<?> createJobApplication(
			@RequestParam("title") String title,
			@RequestParam("experience") String experience,
			@RequestParam("location") String location,
			@RequestParam("skills") String skills,
			@RequestParam("resume") MultipartFile resume) {
		try {
			
			
			// Save the uploaded file
			String uploadDir = "uploads/"; 
			String fileName = resume.getOriginalFilename();
			Path path = Paths.get(uploadDir + fileName);
			Files.createDirectories(Paths.get(uploadDir));
			Files.copy(resume.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

			// Create a new JobApplication entity
			JobOpeningApp application = new JobOpeningApp();
			application.setTitle(title);
			application.setExprience(experience);
			application.setLocation(location);
			application.setSkill(skills);
			application.setResume_path(path.toString()); // Save the file path
			
			// Save to database
		    JobOpeningApp savedApplication = service.saveApplication(application);
			
			// Send Email
//			 SimpleMailMessage message = new SimpleMailMessage();
			 MimeMessage mimeMessage = mailSender.createMimeMessage();
			 MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
			    helper.setTo("rs5337473@gmail.com");
			    helper.setSubject("New Job Application");
			    helper.setText(
			        "Title: " + title + "\n" +
			        "Experience: " + experience + "\n" +
			        "Location: " + location + "\n" + 
			        "Skills: " + skills+
			        "Resume is attached."
			    );
			    // For attach File 
			    Path filePath = Paths.get(uploadDir + fileName);
			    helper.addAttachment(fileName, filePath.toFile());
			    
			    mailSender.send(mimeMessage);			    
			    
			    return ResponseEntity.ok(new JobApplicationResponse(
			            "Job application saved and email sent successfully!",
			            savedApplication
			    ));
			
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing request: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email: " + e.getMessage());
		}
	}
}
