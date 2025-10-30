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

@Component
public class JwtUtil {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

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
        return Jwts.builder()
                .setSubject(username) // Username as subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Issued time
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // Expiration
                .addClaims(Map.of( // Dynamic custom claims
                        "roles", roles,
                        "permissions", permissions
                ))
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
