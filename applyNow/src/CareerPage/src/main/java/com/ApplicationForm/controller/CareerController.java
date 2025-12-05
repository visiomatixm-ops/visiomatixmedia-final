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
@RequestMapping("/api/careers")
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:3000"})
public class CareerController {

    @Autowired
    private CareersService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submit(
            @RequestParam String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam String contact,
            @RequestParam String email,
            @RequestParam(required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String qualificationJson,
            @RequestParam(required = false) String experienceJson,
            @RequestPart(required = false) MultipartFile resume
    ) throws Exception {

        CareersApplication saved=
         service.saveApplication(
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
