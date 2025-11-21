package org.visiomatix.jobOpening.dto;

public class JobApplicationResponse {
	private String message;
	private JobOpeningApp application;

	public JobApplicationResponse(String message, JobOpeningApp application) {
		this.message = message;
		this.application = application;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public JobOpeningApp getApplication() {
		return application;
	}

	public void setApplication(JobOpeningApp application) {
		this.application = application;
	}
}
