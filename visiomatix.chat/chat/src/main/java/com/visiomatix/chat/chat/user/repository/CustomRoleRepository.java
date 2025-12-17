/**
* ===========================================================
* Filename: CustomRoleRepository.java
* Location: com.visiomatix.chat.chat.user.repository
* Author: Viral Prajapati
* Date: 30-Oct-2025
* Description:
* Spring Data JPA repository for CustomRole entity.
* ===========================================================
*/


package com.visiomatix.chat.chat.user.repository;


import com.visiomatix.chat.chat.user.model.CustomRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface CustomRoleRepository extends JpaRepository<CustomRole, Long> {
        Optional<CustomRole> findByName(String name);
        boolean existsByName(String name);
}