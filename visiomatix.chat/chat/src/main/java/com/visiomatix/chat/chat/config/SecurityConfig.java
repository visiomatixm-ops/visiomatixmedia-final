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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

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
    // Bean Declaration - CORS Configuration Source
    // ===========================================================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:*",
            "http://127.0.0.1:*",
            "http://0.0.0.0:*"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // ===========================================================
    // Bean Declaration - Security Filter Chain
    // ===========================================================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORS configuration - must be first
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Disable CSRF for API usage
            .csrf(csrf -> csrf.disable())

            // Handle unauthorized access
            .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))

            // Enforce stateless session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Configure authorization rules - ABAC + RBAC Hybrid (most specific first)
            .authorizeHttpRequests(auth -> auth
                // Public endpoints - must be FIRST
                .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                .requestMatchers("/ws/**", "/ws-chat/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // ABAC-aware admin endpoints - privilege-based access control
                .requestMatchers("/api/admin/users/*/chat-stats/**").hasAnyAuthority("ACCESS_STATISTICS_TAB", "ROLE_ADMIN")
                .requestMatchers("/api/admin/users/*/sessions").hasAnyAuthority("ACCESS_CHAT_HISTORY_TAB", "ROLE_ADMIN")
                .requestMatchers("/api/admin/sessions/*/details").hasAnyAuthority("ACCESS_CHAT_HISTORY_TAB", "ROLE_ADMIN")

                // Core admin functionality - requires specific privileges
                .requestMatchers("/api/admin/users/**").hasAnyAuthority("ACCESS_USER_MANAGEMENT", "ROLE_ADMIN")
                .requestMatchers("/api/admin/roles/**").hasAnyAuthority("ACCESS_ROLE_MANAGEMENT", "ROLE_ADMIN")
                .requestMatchers("/api/admin/permissions/**").hasAnyAuthority("ACCESS_PERMISSION_MANAGEMENT", "ROLE_ADMIN")
                .requestMatchers("/api/admin/privileges/**").hasAnyAuthority("ACCESS_PRIVILEGE_MANAGEMENT", "ROLE_ADMIN")

                // Statistics and reporting - requires analytics access
                .requestMatchers("/api/admin/statistics", "/api/admin/reports/**").hasAnyAuthority("ACCESS_STATISTICS_TAB", "ROLE_ADMIN")

                // Chat monitoring and supervision - requires chat history access
                .requestMatchers("/api/admin/sessions/**").hasAnyAuthority("ACCESS_CHAT_HISTORY_TAB", "ROLE_ADMIN")

                // Custom role management - requires role management privilege
                .requestMatchers("/api/custom-roles/**").hasAnyAuthority("ACCESS_ROLE_MANAGEMENT", "ROLE_ADMIN")

                // All other admin endpoints require admin role or equivalent privileges
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                // All other API endpoints require authentication
                .requestMatchers("/api/**").authenticated()

                // Static resources and other requests
                .anyRequest().permitAll()
            )

            // Disable default login mechanisms
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable())
            .logout(logout -> logout.disable());

        // JWT filter must be added BEFORE the security filter chain
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Allow frames for H2 console
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
