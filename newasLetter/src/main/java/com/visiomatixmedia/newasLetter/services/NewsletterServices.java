package com.visiomatixmedia.newasLetter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.visiomatixmedia.newasLetter.entity.NewsletterEntity;
import com.visiomatixmedia.newasLetter.repository.NewsletterRepository;

@Service
public class NewsletterServices {
	@Autowired
	 private NewsletterRepository repository;
	 
	 public NewsletterEntity saveNewsletterEntity(NewsletterEntity application) {
			return repository.save(application); 
		}

//	    public NewsletterServices(NewsletterRepository repository) {
//		this.repository = repository;
//	}

//		public void subscribe(String email) {
//	        if (repository.existsByEmail(email)) {
//	            throw new RuntimeException("Email already subscribed");
//	        }
//
//	        NewsletterEntity subscriber = new NewsletterEntity();
//	        subscriber.setEmail(email);
//	        repository.save(subscriber);
//	    }
}
