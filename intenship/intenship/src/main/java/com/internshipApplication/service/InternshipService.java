package com.internshipApplication.service;

import com.internshipApplication.dto.InternshipDTO;
import com.internshipApplication.entity.InternApplicant;
import com.internshipApplication.repository.InternApplicantRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class InternshipService {


    @Autowired
    private final InternApplicantRepository repo;
    @Autowired
    private final MailService mailService;

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    @Value("${app.hr.email}")
    private String hrEmail;

    public InternshipService(InternApplicantRepository repo, MailService mailService, MailService mailService1) {
        this.repo = repo;
        this.mailService = mailService1;
    }

    public InternApplicant saveApplication(InternshipDTO dto, MultipartFile resume) throws Exception {
        // ensure directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String filename = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        resume.transferTo(filePath.toFile());

        InternApplicant a = new InternApplicant();
        a.setFullName(dto.getFullName());
        a.setEmail(dto.getEmail());
        a.setCountryCode(dto.getCountryCode());
        a.setPhoneNumber(dto.getPhoneNumber());
        a.setEducation(dto.getEducation());
        a.setTechnicalSkills(dto.getTechnicalSkills());
        a.setGithubProfile(dto.getGithubProfile());
        a.setWhy(dto.getWhy());
        a.setResumeFile(dto.getResumeFile());
        a.setResumeFileName(dto.getResumeFileName());
        a.setResumeFile(dto.getResumeFile());

        InternApplicant saved = repo.save(a);

        // Compose email body for HR
        String hrBody = new StringBuilder()
                .append("New Internship Application received\n\n")
                .append("Name: ").append(dto.getFullName()).append("\n")
                .append("Email: ").append(dto.getEmail()).append("\n")
                .append("Phone: ").append(dto.getCountryCode()).append(" ").append(dto.getPhoneNumber()).append("\n")
                .append("Education: ").append(dto.getEducation()).append("\n")
                .append("Technical Skills: ").append(dto.getTechnicalSkills()).append("\n")
                .append("Github: ").append(dto.getGithubProfile()).append("\n\n")
                .append("Resume").append(dto.getResumeFile()).append("\n\n")
                .append("Why: ").append(dto.getWhy()).append("\n\n")
                .toString();

        // Send to HR with attachment
        try {
            mailService.sendMailWithAttachment(hrEmail,
                    "New Internship Application - " + dto.getFullName(),
                    hrBody,
                    filePath.toFile());
        } catch (MessagingException e) {
            // log and continue: sending to HR failed
            e.printStackTrace();
        }

        // Send confirmation to applicant (no attachment)
        String applicantBody = "Hi " + dto.getFullName() + ",\n\n" +
                "Thank you for applying. We received your application. We will contact you soon.\n\nRegards,\nTeam";


        mailService.sendSimpleMail(dto.getEmail(), "Application Received", applicantBody);

        return saved;
    }
}