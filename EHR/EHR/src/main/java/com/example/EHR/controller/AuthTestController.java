package com.example.EHR.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth-test")
public class AuthTestController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthTestController.class);
    
    @GetMapping("/check")
    public Map<String, Object> checkAuth(Principal principal) {
        Map<String, Object> response = new HashMap<>();
        
        logger.info("Auth check endpoint called");
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        response.put("principalExists", principal != null);
        response.put("principalName", principal != null ? principal.getName() : "null");
        response.put("authExists", auth != null);
        response.put("authName", auth != null ? auth.getName() : "null");
        response.put("authenticated", auth != null ? auth.isAuthenticated() : false);
        response.put("authorities", auth != null ? auth.getAuthorities().toString() : "null");
        
        logger.info("Principal: {}", principal != null ? principal.getName() : "null");
        logger.info("Authorities: {}", auth != null ? auth.getAuthorities() : "null");
        
        return response;
    }
}