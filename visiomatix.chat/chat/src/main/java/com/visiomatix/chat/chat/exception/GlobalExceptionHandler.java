
/**
 * =====================================================================================
 * File Name   : GlobalExceptionHandler.java
 * Location    : src/main/java/com/visiomatix/chat/exception/
 * Author      : Viral Prajapati
 * Created On  : 14-Oct-2025
 * Description :
 *   Phase 3 Enhancement
 *   -------------------
 *   This class provides centralized exception handling for REST API endpoints.
 *   It ensures that any runtime exceptions or validation errors are returned
 *   in a structured, user-friendly JSON format instead of raw stack traces.
 *
 *   Key Features:
 *     - Handles general RuntimeExceptions with custom message.
 *     - Handles javax.validation constraint violations (@Valid/@Validated errors).
 *     - Provides consistent JSON structure for all API errors.
 *
 *   Example JSON Response:
 *   -----------------------
 *   {
 *       "timestamp": "2025-10-14T10:15:30.123",
 *       "status": 400,
 *       "error": "Bad Request",
 *       "message": "Username is required",
 *       "path": "/api/users/register"
 *   }
 *
 * =====================================================================================
 */

package com.visiomatix.chat.chat.exception;

// ============================================================
// Import Statements
// ============================================================
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

// ============================================================
// Class Declaration
// ============================================================
/**
 * GlobalExceptionHandler
 * ----------------------
 * Handles all exceptions thrown by REST controllers.
 * Centralized exception handling for user-friendly error messages.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    // ============================================================
    // Handle all RuntimeExceptions
    // ============================================================
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Bad Request");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false).replace("uri=", ""));
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    // ============================================================
    // Handle validation errors for @Valid/@Validated DTOs
    // ============================================================
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Validation Error");

        // Collect all field errors
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }
        body.put("message", fieldErrors);
        body.put("path", request.getDescription(false).replace("uri=", ""));
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    // ============================================================
    // Handle any other uncaught exceptions
    // ============================================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "Internal Server Error");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false).replace("uri=", ""));
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
