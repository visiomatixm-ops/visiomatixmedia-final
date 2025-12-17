package com.visiomatixmedia.contactus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.visiomatixmedia.contactus.entity.ContactUSEntity;

@Repository
public interface ContactUSRepository extends JpaRepository<ContactUSEntity, Long> {

}
