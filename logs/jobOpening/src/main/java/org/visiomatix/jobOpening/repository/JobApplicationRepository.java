package org.visiomatix.jobOpening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.visiomatix.jobOpening.dto.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
}