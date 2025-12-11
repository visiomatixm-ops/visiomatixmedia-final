package com.ApplicationForm.service;

import com.ApplicationForm.model.CareersApplication;
import com.ApplicationForm.repository.CareersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CareersService {

    @Autowired
    private CareersRepository repo;

    @Autowired
    private EmailService emailService;

    public CareersApplication saveApplication(
            String firstName,
            String lastName,
            String email,
            String contact,
            String dob,
            String role,
            String qualificationJson,
            String experienceJson,
            MultipartFile resumeFile
    ) {

        CareersApplication app = new CareersApplication();

        // Basic fields
        app.setFirstName(firstName);
        app.setLastName(lastName);
        app.setEmail(email);
        app.setContact(contact);
        app.setDob(dob);
        app.setRole(role);

        // JSON fields
        app.setQualificationJson(qualificationJson);
        app.setExperienceJson(experienceJson);

        // Store File in DATABASE
        if (resumeFile != null && !resumeFile.isEmpty()) {
            try {
                app.setResumeFile(resumeFile.getBytes());
                app.setResumeFileName(resumeFile.getOriginalFilename());
                app.setResumeFileType(resumeFile.getContentType());
            } catch (Exception e) {
                // Handle file processing error
                System.err.println("Failed to process resume file: " + e.getMessage());
                throw new RuntimeException("Failed to process resume file", e);
            }
        }

        // Save to DB
        CareersApplication saved = repo.save(app);

        // Send Email with Attachment
        if (resumeFile != null && !resumeFile.isEmpty()) {
            try {
                emailService.sendEmailWithResume(
                        "ganvirtine@gmail.com", // CHANGE THIS TO HR EMAIL
                        firstName,
                        resumeFile.getBytes(),
                        resumeFile.getOriginalFilename(),
                        resumeFile.getContentType()

                );
            } catch (Exception e) {
                // Log the error but don't fail the application save
                System.err.println("Failed to send email: " + e.getMessage());
            }
        }

        return saved;
    }
}
