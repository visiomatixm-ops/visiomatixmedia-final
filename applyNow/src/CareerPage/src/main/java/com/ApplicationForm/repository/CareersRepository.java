package com.ApplicationForm.repository;

import com.ApplicationForm.model.CareersApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CareersRepository extends JpaRepository<CareersApplication,Long> {
}
