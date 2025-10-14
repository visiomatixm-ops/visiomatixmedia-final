package com.visiomatix.chat.chat.config;

import jakarta.annotation.PostConstruct; // Use jakarta.annotation
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration; // Spring Configuration
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * File: DatabaseConfig.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Configuration class to test MySQL database connection on application startup.
 *   Uses JdbcTemplate to execute a simple query.
 */

@Configuration
public class DatabaseConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Method runs after Spring Boot context initialization.
     * Executes a simple query to test database connectivity.
     */
    @PostConstruct
    public void testDatabaseConnection() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (result != null && result == 1) {
                System.out.println("✅ MySQL Database connection successful!");
            } else {
                System.out.println("❌ Database connection failed!");
            }
        } catch (Exception e) {
            System.err.println("❌ Error connecting to DB: " + e.getMessage());
        }
    }
}
