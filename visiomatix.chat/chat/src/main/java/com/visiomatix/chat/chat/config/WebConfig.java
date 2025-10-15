/**
 * ===========================================================
 * File        : WebConfig.java
 * Location    : com.visiomatix.chat.chat.config
 * Author      : Viral Prajapati
 * Date        : 14-Oct-2025
 * Description :
 *   Configures cross-origin settings for frontend integration.
 *   Enables React/Next.js frontend to communicate with backend APIs.
 *   - Allows specific origins, HTTP methods, and headers.
 *   - Supports credentials in CORS requests.
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.context.annotation.Configuration; // Marks this class as a configuration bean
import org.springframework.web.servlet.config.annotation.CorsRegistry; // Used to define CORS rules
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Interface for customizing Spring MVC configuration

// ===========================================================
// Class Declaration
// ===========================================================
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // =======================================================
    // Method: addCorsMappings
    // Description:
    //   Overrides the default CORS mapping behavior to allow
    //   frontend applications (like React) to access backend APIs.
    // Parameters:
    //   CorsRegistry registry - registry for configuring CORS rules
    // =======================================================
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // =======================================================
        // Configure CORS mapping
        // - Apply to all backend endpoints: /** 
        // - Allow frontend origin http://localhost:5173 (no trailing slash)
        // - Allow common HTTP methods: GET, POST, PUT, DELETE, OPTIONS
        // - Allow all headers
        // - Support credentials (cookies, authorization headers)
        // =======================================================
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Update this for your deployed frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
