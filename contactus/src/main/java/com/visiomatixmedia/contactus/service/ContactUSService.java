package com.visiomatixmedia.contactus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.visiomatixmedia.contactus.entity.ContactUSEntity;
import com.visiomatixmedia.contactus.repository.ContactUSRepository;

@Service
public class ContactUSService {
	
	@Autowired
	private ContactUSRepository repository;
	
	public ContactUSEntity saveContactUSEntity(ContactUSEntity application) {
		return repository.save(application);
	}

}
