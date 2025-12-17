package com.ApplicationForm.controller;

import com.ApplicationForm.model.CareersApplication;
import com.ApplicationForm.service.CareersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:3000"})
public class CareerController {

    @Autowired
    private CareersService careersService;

    @PostMapping("/careers")
    public ResponseEntity<?> submitCareerForm(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String email,
            @RequestParam String contact,
            @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate dob,
            @RequestParam String role,
            @RequestParam String qualificationJson,
            @RequestParam String experienceJson,
            @RequestParam MultipartFile resume
    ) throws Exception {

        CareersApplication saved =
         careersService.saveApplication(
                firstName,
                lastName,
                email,
                contact,
                dob != null ? dob.toString() : null,
                role,
                qualificationJson,
                experienceJson,
                resume
        );
        return ResponseEntity.ok("Application submitted successfully!");
    }



}
