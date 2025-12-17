package org.visiomatix.jobOpening.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.visiomatix.jobOpening.dto.JobOpeningApp;
import org.visiomatix.jobOpening.repository.JobOpeningApplicationRepository;

@Service
public class JobOpeningApplicationServices {
	@Autowired
	private JobOpeningApplicationRepository repository;

	public JobOpeningApp saveApplication(JobOpeningApp application) {
		return repository.save(application);
	}
} 