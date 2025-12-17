package com.internshipApplication.repository;

import com.internshipApplication.IntenshipApplication;
import com.internshipApplication.entity.InternApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternApplicantRepository extends JpaRepository<InternApplicant,Long> {
}
