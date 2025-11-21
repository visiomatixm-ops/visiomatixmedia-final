package org.visiomatix.jobOpening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.visiomatix.jobOpening.dto.JobOpeningApp;

@Repository
public interface JobOpeningApplicationRepository extends JpaRepository<JobOpeningApp , Long>{
}
