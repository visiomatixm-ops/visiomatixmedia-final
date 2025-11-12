/**

===========================================================

Filename: JwtUtil.java

Location: com.visiomatix.chat.chat.user.util

Author: Viral Prajapati

Date: 30-Oct-2025

Description:

Enhanced JWT utility for dynamic Role & Permission embedding.

Includes roles and permissions claims directly in the token.

Compatible with existing JWT-based authentication system.

Uses HS256 signing with 256-bit secret key from properties.

===========================================================
*/

package com.visiomatix.chat.chat.user.util;

// ===========================================================
// Import Statements
// ===========================================================
import io.jsonwebtoken.Claims; // Represents JWT claims
import io.jsonwebtoken.Jwts; // JWT builder and parser
import io.jsonwebtoken.SignatureAlgorithm; // JWT signing algorithm
import io.jsonwebtoken.security.Keys; // Utility for key management
import org.springframework.beans.factory.annotation.Value; // Inject property values
import org.springframework.stereotype.Component; // Spring-managed component

import javax.crypto.SecretKey; // Secret key for signing
import java.util.Base64; // For decoding the secret key
import java.util.Date; // Represents issue & expiry time
import java.util.List; // For roles and permissions
import java.util.Map; // For claim map
import java.util.function.Function; // Functional interface for claims extraction
import java.util.UUID; // For session ID generation
import java.util.HashMap; // For HashMap creation
import java.util.stream.Collectors; // For stream operations
import com.visiomatix.chat.chat.user.model.User; // User entity for ABAC context
import com.visiomatix.chat.chat.user.service.AbacPolicyEngine; // ABAC policy engine
import org.springframework.beans.factory.annotation.Autowired; // For dependency injection

@Component
public class JwtUtil {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    @Autowired
    private AbacPolicyEngine abacPolicyEngine;

    // ===========================================================
    // Private Helper: Get Signing Key
    // ===========================================================
    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // ===========================================================
    // Overloaded Method: Generate Token (Dynamic)
    // Description:
    //   Generates JWT with username, roles, and permissions claims.
    // ===========================================================
    public String generateToken(String username, List<String> roles, List<String> permissions) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        claims.put("permissions", permissions);

        // Add ABAC context if available
        addAbacContextToClaims(claims, username, roles, permissions);

        return Jwts.builder()
                .setSubject(username) // Username as subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Issued time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // Expiration
                .addClaims(claims) // Dynamic custom claims with ABAC
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Secure HS256 key
                .compact(); // Build and return
    }

    /**
     * Add ABAC context to JWT claims
     */
    private void addAbacContextToClaims(Map<String, Object> claims, String username, List<String> roles, List<String> permissions) {
        Map<String, Object> abacContext = new HashMap<>();
        abacContext.put("user_id", username); // Simplified, would be actual user ID in production
        abacContext.put("login_time", System.currentTimeMillis());
        abacContext.put("session_id", UUID.randomUUID().toString());

        // Add roles and permissions to ABAC context
        if (roles != null && !roles.isEmpty()) {
            abacContext.put("roles", roles);
        }
        if (permissions != null && !permissions.isEmpty()) {
            abacContext.put("permissions", permissions);
        }

        claims.put("abac_context", abacContext);

        // Flatten key attributes for easy access
        Map<String, String> flattenedAttributes = new HashMap<>();
        flattenedAttributes.put("user_id", username);
        flattenedAttributes.put("login_time", String.valueOf(System.currentTimeMillis()));
        claims.put("abac_attributes", flattenedAttributes);
    }

    // ===========================================================
    // New Method: Generate Token with Authorities (ABAC Support)
    // ===========================================================
    public String generateTokenWithAuthorities(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", authorities);

        // Add ABAC context for comprehensive access control
        addAbacContextToClaims(claims, username, new java.util.ArrayList<>(), new java.util.ArrayList<>());

        return Jwts.builder()
                .setSubject(username) // Username as subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Issued time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // Expiration
                .addClaims(claims) // Authorities claim with ABAC context
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Secure HS256 key
                .compact(); // Build and return
    }

    // ===========================================================
    // Backward-Compatible Fallback (old signature)
    // ===========================================================
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ===========================================================
    // Extraction Helpers
    // ===========================================================
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public List<String> extractRoles(String token) {
        return extractClaim(token, claims -> claims.get("roles", List.class));
    }

    public List<String> extractPermissions(String token) {
        return extractClaim(token, claims -> claims.get("permissions", List.class));
    }

    // Combined extractor (used by filter)
    public List<String> extractAuthorities(String token) {
        List<String> combined = new java.util.ArrayList<>();
        List<String> roles = extractRoles(token);
        List<String> permissions = extractPermissions(token);

        if (roles != null) combined.addAll(roles);
        if (permissions != null) combined.addAll(permissions);

        return combined;
    }

    // New method: Extract authorities from ABAC-enabled tokens
    public List<String> extractAuthoritiesFromAbacToken(String token) {
        return extractClaim(token, claims -> claims.get("authorities", List.class));
    }

    // ===========================================================
    // Validation Methods
    // ===========================================================
    public boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ===========================================================
    // Claims Extraction
    // ===========================================================
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
