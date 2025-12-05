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
    ) throws Exception {

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
            app.setResumeFile(resumeFile.getBytes());
            app.setResumeFileName(resumeFile.getOriginalFilename());
            app.setResumeFileType(resumeFile.getContentType());
        }

        // Save to DB
        CareersApplication saved = repo.save(app);

        // Send Email with Attachment
        if (resumeFile != null && !resumeFile.isEmpty()) {
            emailService.sendEmailWithResume(
                    "ganvirtine@gmail.com", // CHANGE THIS TO HR EMAIL
                    firstName,
                    resumeFile.getBytes(),
                    resumeFile.getOriginalFilename(),
                    resumeFile.getContentType()
                    
            );
        }

        return saved;
    }
}
