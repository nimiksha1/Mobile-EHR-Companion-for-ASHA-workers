package com.example.EHR.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/auth")
    public Map<String, Object> testAuth(Principal principal) {
        Map<String, Object> response = new HashMap<>();
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        response.put("principalName", principal != null ? principal.getName() : "null");
        response.put("authName", auth != null ? auth.getName() : "null");
        response.put("authorities", auth != null ? auth.getAuthorities().toString() : "null");
        response.put("authenticated", auth != null ? auth.isAuthenticated() : false);
        
        return response;
    }
    
    @GetMapping("/asha-test")
    public Map<String, Object> testAshaAccess(Principal principal) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "ASHA endpoint accessible");
        response.put("userEmail", principal.getName());
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
}