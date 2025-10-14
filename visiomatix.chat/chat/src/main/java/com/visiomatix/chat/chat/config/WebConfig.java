/**
 * ===========================================================
 * File: WebConfig.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Configures cross-origin settings for frontend integration.
 *  - Enables React frontend to communicate with backend APIs.
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.context.annotation.Configuration; // Marks as config class
import org.springframework.web.servlet.config.annotation.CorsRegistry; // Manages CORS rules
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Custom web MVC settings

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow frontend (React/Next.js etc.) to access backend APIs
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Change this to your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
