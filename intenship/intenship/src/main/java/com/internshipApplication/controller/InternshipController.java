package com.internshipApplication.controller;

import com.internshipApplication.entity.InternApplicant;
import com.internshipApplication.repository.InternApplicantRepository;
import com.internshipApplication.service.InternshipService;
import com.internshipApplication.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;


@RestController
@RequestMapping("api/intenship")
@CrossOrigin(origins = "*")
@Validated
public class InternshipController {

    private final InternshipService service;
    private final InternApplicantRepository internRepository;
    private final MailService emailService;

    @Autowired
    public InternshipController(
            InternshipService service,
            InternApplicantRepository internRepository,
            MailService emailService
    ) {
        this.service = service;
        this.internRepository = internRepository;
        this.emailService = emailService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> applyInternship(
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String countryCode,
            @RequestParam String phoneNumber,
            @RequestParam String education,
            @RequestParam String technicalSkills,
            @RequestParam String githubProfile,
            @RequestParam String why,
            @RequestParam("resumeFile") MultipartFile resumeFile
    ) {

        try {
            InternApplicant applicant = new InternApplicant();

            applicant.setFullName(fullName);
            applicant.setEmail(email);
            applicant.setCountryCode(countryCode);
            applicant.setPhoneNumber(phoneNumber);
            applicant.setEducation(education);
            applicant.setTechnicalSkills(technicalSkills);
            applicant.setGithubProfile(githubProfile);
            applicant.setWhy(why);

            applicant.setResumeFile(resumeFile.getBytes());
            applicant.setResumeFileName(resumeFile.getOriginalFilename());
            applicant.setResumeFileType(resumeFile.getContentType());

            internRepository.save(applicant);

            // Prepare HR mail
            String hrEmail = "ganvirtine@gmail.com"; // CHANGE THIS
            String subject = "New Internship Application:";

            String hrMessage =
                    "A new applicant has submitted an internship application.\n\n" +
                            "Full Name: " + fullName + "\n" +
                            "Email: " + email + "\n" +
                            "Phone: " + countryCode + " " + phoneNumber + "\n" +
                            "Education: " + education + "\n" +
                            "Skills: " + technicalSkills + "\n" +
                            "Github: " + githubProfile + "\n" +
                            "Why: " + why + "\n";

            // Save temporary file for attachment
            File tempFile = File.createTempFile("resume-", resumeFile.getOriginalFilename());
            resumeFile.transferTo(tempFile);

            // Send email to HR
            emailService.sendMailWithAttachment(hrEmail, subject, hrMessage, tempFile);

            // Send confirmation mail to applicant
            emailService.sendSimpleMail(
                    email,
                    "Your Internship Application Has Been Received",
                    "Hi " + fullName + ",\n\nThank you for applying!\nWe will contact you soon.\n\n- Visiomatix Team"
            );

            return ResponseEntity.ok("Application submitted successfully and mail sent.");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed: " + e.getMessage());
        }
    }
}
