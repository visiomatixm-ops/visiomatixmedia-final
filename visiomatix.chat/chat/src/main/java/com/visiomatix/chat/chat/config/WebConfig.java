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
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; // Marks this class as a configuration bean
import java.util.List;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
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
                // Allow both local dev frontends + deployed domains
                .allowedOriginPatterns("http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:*", "http://localhost:3000", "http://localhost:5173/", "http://localhost:5174/")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Content-Type", "Cache-Control")
                .allowCredentials(true)
                .maxAge(3600);
    }


    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Allow both your React apps - be more permissive
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:*",
            "http://127.0.0.1:*",
            "http://0.0.0.0:*"
        ));

        // Allow necessary HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Allow necessary headers (including Authorization)
        config.setAllowedHeaders(List.of("*"));

        // Expose necessary headers
        config.setExposedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));

        // Allow sending credentials (JWT or cookies)
        config.setAllowCredentials(true);

        // Cache preflight responses for 1 hour
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
