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
 *  - Adds JWT filter and stateless session policy
 *  - Handles unauthorized access via custom entry point
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.visiomatix.chat.chat.config.JwtAuthenticationFilter; // Ensure correct import

@Configuration
public class SecurityConfig {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationEntryPoint unauthorizedHandler;

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    public SecurityConfig(
            UserDetailsService userDetailsService,
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationEntryPoint unauthorizedHandler) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.unauthorizedHandler = unauthorizedHandler;
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

            // Handle unauthorized access (prevents "Pre-auth entry point called")
            .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))

            // Enforce stateless session (no HTTP session maintained)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Permit registration and login endpoints
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                // Optional: permit WebSocket handshake if using JWT over STOMP
                .requestMatchers("/ws/**").permitAll()
                // Permit H2 console during dev (optional)
                .requestMatchers("/h2-console/**").permitAll()
                // Require authentication for all others
                .anyRequest().authenticated()
            )

            // Disable default login mechanisms (API only)
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        // Insert JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Allow frames for H2 console
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
