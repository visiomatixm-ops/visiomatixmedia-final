package org.visiomatix.jobOpening.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.visiomatix.jobOpening.dto.JobApplication;
import org.visiomatix.jobOpening.repository.JobApplicationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @PostMapping("/api/apply")
    public ResponseEntity<?> applyForJob(
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("position") String position,
            @RequestParam("email") String email,
            @RequestParam("schools") String schools,
            @RequestParam("colleges") String colleges,
            @RequestParam("experiences") String experiences,
            @RequestParam("resume") MultipartFile resume) {

        try {
            // Save the resume file
            String fileName = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(resume.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create and save the job application
            JobApplication application = new JobApplication();
            application.setFirstname(firstname);
            application.setLastname(lastname);
            application.setDob(dob);
            application.setGender(gender);
            application.setPosition(position);
            application.setEmail(email);
            application.setSchools(schools);
            application.setColleges(colleges);
            application.setExperiences(experiences);
            application.setResumePath(filePath.toString());

            JobApplication savedApplication = jobApplicationRepository.save(application);

            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Application submitted successfully\"}");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"success\": false, \"message\": \"Failed to save application\"}");
        }
    }
}