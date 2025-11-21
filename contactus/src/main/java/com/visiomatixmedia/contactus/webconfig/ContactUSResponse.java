package com.visiomatixmedia.contactus.webconfig;

import com.visiomatixmedia.contactus.entity.ContactUSEntity;

public class ContactUSResponse {
	
	private String message;
	private ContactUSEntity application;
	
	public ContactUSResponse(String message, ContactUSEntity application) {
		this.message = message;
		this.application = application;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ContactUSEntity getApplication() {
		return application;
	}

	public void setApplication(ContactUSEntity application) {
		this.application = application;
	}
		
	
}
