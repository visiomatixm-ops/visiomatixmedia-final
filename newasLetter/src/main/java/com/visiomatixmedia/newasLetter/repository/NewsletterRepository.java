package com.visiomatixmedia.newasLetter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.visiomatixmedia.newasLetter.entity.NewsletterEntity;

public interface NewsletterRepository extends JpaRepository<NewsletterEntity, Long>{
    boolean existsByEmail(String email);

}
