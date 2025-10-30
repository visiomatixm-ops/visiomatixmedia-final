/**
 * ===========================================================
 * Filename: JwtAuthenticationFilter.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 30-Oct-2025
 * Description:
 *   Custom security filter that validates JWT tokens for each
 *   incoming HTTP request. Integrates dynamically with the
 *   new role-permission claim structure in JwtUtil.
 * 
 *   Responsibilities:
 *   - Extract JWT token from Authorization header.
 *   - Validate and parse dynamic roles & permissions claims.
 *   - Build Spring Security Authentication object dynamically.
 *   - Attach authenticated context to SecurityContextHolder.
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.user.util.JwtUtil; // Utility class for JWT creation & validation
import jakarta.servlet.FilterChain; // Represents chain of servlet filters
import jakarta.servlet.ServletException; // Handles servlet exceptions
import jakarta.servlet.http.HttpServletRequest; // HTTP request object
import jakarta.servlet.http.HttpServletResponse; // HTTP response object
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Auth token used by Spring Security
import org.springframework.security.core.GrantedAuthority; // Represents user authority
import org.springframework.security.core.authority.SimpleGrantedAuthority; // Simple authority object
import org.springframework.security.core.context.SecurityContextHolder; // Holds current security context
import org.springframework.security.core.userdetails.UserDetailsService; // Loads user-specific data
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource; // Adds web request info to auth token
import org.springframework.stereotype.Component; // Marks this filter as a Spring bean
import org.springframework.util.StringUtils; // Utility class for string checks
import org.springframework.web.filter.OncePerRequestFilter; // Ensures filter executes once per request
import java.io.IOException; // Handles I/O operations
import java.util.List; // Represents authorities list
import java.util.stream.Collectors; // Used for mapping roles to authorities
import org.slf4j.Logger; // Logger interface
import org.slf4j.LoggerFactory; // Logger factory for class

/**
 * ===========================================================
 * Class: JwtAuthenticationFilter
 * Description:
 *   Executes once per request to handle JWT-based authentication.
 *   Dynamically extracts roles and permissions from token claims
 *   and injects them into Spring Security context.
 * ===========================================================
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // ===========================================================
    // Logger Declaration
    // ===========================================================
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    // ===========================================================
    // Dependency Declarations
    // ===========================================================
    private final JwtUtil jwtUtil; // Utility for JWT validation
    private final UserDetailsService userDetailsService; // Used for loading user details if needed

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    // ===========================================================
    // Method: doFilterInternal
    // Description:
    //   Main filter logic for processing JWT-based authentication.
    // ===========================================================
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Step 1: Extract Authorization header
        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Step 2: Validate and extract token from header
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            token = header.substring(7); // Remove "Bearer " prefix
            try {
                username = jwtUtil.extractUsername(token); // Extract username from token
            } catch (Exception e) {
                logger.warn("❌ JWT extraction failed: {}", e.getMessage());
                filterChain.doFilter(request, response);
                return; // Stop further processing if token invalid
            }
        }

        // Step 3: If valid username found and no authentication yet
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                // Validate token expiration and subject
                if (jwtUtil.validateToken(token, username)) {

                    // Step 4: Extract dynamic authorities (roles + permissions)
                    List<String> authorities = jwtUtil.extractAuthorities(token);

                    // Convert to Spring Security GrantedAuthority list
                    List<GrantedAuthority> grantedAuthorities = authorities.stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

                    // Step 5: Build authentication object
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);

                    // Attach web details for auditing/logging
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Step 6: Set authentication in security context
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    logger.debug("✅ JWT authenticated for user: {} | Authorities: {}", username, authorities);
                }
            } catch (Exception e) {
                logger.warn("⚠️ JWT authentication failed for user {}: {}", username, e.getMessage());
                // Allow request to proceed without setting authentication
            }
        }

        // Step 7: Continue with filter chain
        filterChain.doFilter(request, response);
    }
}
