/**
 * ===========================================================
 * File: JwtUtil.java
 * Location: com.visiomatix.chat.chat.user.util
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Utility class to generate and validate JWT tokens securely.
 *  - Uses HS256 algorithm with a secure 256-bit secret key.
 *  - Generates JWT tokens with 1-hour expiration.
 *  - Supports claim extraction and validation.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.util;

// ===========================================================
// Import Statements
// ===========================================================
import io.jsonwebtoken.Claims; // Represents JWT claims
import io.jsonwebtoken.Jwts; // JWT builder and parser
import io.jsonwebtoken.SignatureAlgorithm; // JWT signing algorithm
import io.jsonwebtoken.security.Keys; // Utility to generate secure keys
import javax.crypto.SecretKey; // Secret key for signing
import org.springframework.stereotype.Component; // Marks class as Spring bean
import java.util.Date; // Represents issuedAt and expiration
import java.util.function.Function; // Functional interface for claims extraction

@Component
public class JwtUtil {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    
    // Secure 256-bit secret key for HS256 signing (randomly generated)
    // NOTE: In production, store this key in environment variables or secure vault
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // JWT expiration time: 1 hour (in milliseconds)
    private final long JWT_EXPIRATION_MS = 1000 * 60 * 60;

    // ===========================================================
    // Method: extractUsername
    // Description: Extracts the username (subject) from the token
    // ===========================================================
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ===========================================================
    // Method: extractClaim
    // Description: Extracts any claim from the token using the provided function
    // ===========================================================
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ===========================================================
    // Method: generateToken
    // Description: Generates a JWT token for the given username
    // ===========================================================
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set username as subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Set issued timestamp
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS)) // Set expiration
                .signWith(SECRET_KEY) // Sign with secure 256-bit key
                .compact(); // Build token
    }

    // ===========================================================
    // Method: validateToken
    // Description: Validates JWT token against username and expiration
    // ===========================================================
    public boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token); // Extract username from token
        return (tokenUsername.equals(username) && !isTokenExpired(token)); // Valid if matches and not expired
    }

    // ===========================================================
    // Private Helper Methods
    // ===========================================================

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Use secure signing key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
