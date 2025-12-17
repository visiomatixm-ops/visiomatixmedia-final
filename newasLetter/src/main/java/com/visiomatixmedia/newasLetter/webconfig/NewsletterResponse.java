package com.visiomatixmedia.newasLetter.webconfig;

import com.visiomatixmedia.newasLetter.entity.NewsletterEntity;

public class NewsletterResponse {
	private String message;
	private NewsletterEntity application;
	
	public NewsletterResponse(String message, NewsletterEntity application) {
		this.message = message;
		this.application = application;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public NewsletterEntity getApplication() {
		return application;
	}

	public void setApplication(NewsletterEntity application) {
		this.application = application;
	}
}
