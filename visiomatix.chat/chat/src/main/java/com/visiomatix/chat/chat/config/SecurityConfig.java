/**
 * ===========================================================
 * File: SecurityConfig.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Configures application-wide security policies.
 *  - Allows /api/users/register and /api/users/login without authentication
 *  - Enables BCrypt password encoding
 *  - Configures AuthenticationManager with DaoAuthenticationProvider
 *  - Disables CSRF and form login for API usage
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity; 
import org.springframework.security.web.SecurityFilterChain; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; 
import org.springframework.security.authentication.ProviderManager;

@Configuration
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // ===========================================================
    // Bean Declaration - Password Encoder
    // ===========================================================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ===========================================================
    // Bean Declaration - Authentication Manager
    // ===========================================================
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }

    // ===========================================================
    // Bean Declaration - Security Filter Chain
    // ===========================================================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for API usage
            .csrf(csrf -> csrf.disable())
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Permit user registration and login endpoints
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                // Optional: permit H2 console if used
                .requestMatchers("/h2-console/**").permitAll()
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            // Disable HTTP Basic and form login (API only)
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        // For H2 console (if used during development)
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
