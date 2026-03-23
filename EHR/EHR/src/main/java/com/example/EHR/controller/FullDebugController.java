package com.example.EHR.controller;

import com.example.EHR.entity.Patient;
import com.example.EHR.entity.User;
import com.example.EHR.repository.PatientRepository;
import com.example.EHR.repository.UserRepository;
import com.example.EHR.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug-full")
@RequiredArgsConstructor
public class FullDebugController {
    
    private static final Logger logger = LoggerFactory.getLogger(FullDebugController.class);
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    
    @GetMapping("/complete-check")
    public Map<String, Object> completeDebugCheck(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            Principal principal) {
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 1. Check Authorization Header
            result.put("authHeaderPresent", authHeader != null);
            result.put("authHeaderValue", authHeader != null ? authHeader.substring(0, Math.min(20, authHeader.length())) + "..." : "null");
            
            // 2. Check JWT Token
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                result.put("tokenValid", jwtUtil.validateToken(token));
                if (jwtUtil.validateToken(token)) {
                    result.put("tokenEmail", jwtUtil.extractEmail(token));
                    result.put("tokenRole", jwtUtil.extractRole(token));
                }
            }
            
            // 3. Check Principal
            result.put("principalPresent", principal != null);
            result.put("principalName", principal != null ? principal.getName() : "null");
            
            // 4. Check Authentication
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            result.put("authenticationPresent", auth != null);
            result.put("authenticationName", auth != null ? auth.getName() : "null");
            result.put("authorities", auth != null ? auth.getAuthorities().toString() : "null");
            result.put("authenticated", auth != null ? auth.isAuthenticated() : false);
            
            // 5. Database Checks
            List<User> ashaUsers = userRepository.findByRole(User.UserRole.ASHA);
            result.put("totalAshaUsers", ashaUsers.size());
            
            List<Patient> allPatients = patientRepository.findAll();
            result.put("totalPatients", allPatients.size());
            
            long assignedPatients = allPatients.stream()
                    .filter(p -> p.getAssignedAsha() != null)
                    .count();
            result.put("assignedPatients", assignedPatients);
            
            // 6. If we have a valid principal, check their specific data
            if (principal != null) {
                String email = principal.getName();
                User user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    result.put("userFound", true);
                    result.put("userRole", user.getRole().name());
                    result.put("userName", user.getName());
                    
                    if (user.getRole() == User.UserRole.ASHA) {
                        List<Patient> userPatients = patientRepository.findByAssignedAsha(user);
                        result.put("userAssignedPatients", userPatients.size());
                        result.put("patientDetails", userPatients.stream()
                                .map(p -> Map.of(
                                        "id", p.getId(),
                                        "patientId", p.getPatientId(),
                                        "name", p.getName(),
                                        "type", p.getPatientType().name()
                                )).toList());
                    }
                } else {
                    result.put("userFound", false);
                }
            }
            
            result.put("status", "SUCCESS");
            
        } catch (Exception e) {
            logger.error("Debug check failed", e);
            result.put("status", "ERROR");
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    @GetMapping("/test-asha-endpoint")
    public Map<String, Object> testAshaEndpoint(Principal principal) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            if (principal == null) {
                result.put("error", "Principal is null");
                return result;
            }
            
            String email = principal.getName();
            User asha = userRepository.findByEmail(email).orElse(null);
            
            if (asha == null) {
                result.put("error", "ASHA user not found with email: " + email);
                return result;
            }
            
            if (asha.getRole() != User.UserRole.ASHA) {
                result.put("error", "User is not ASHA, role is: " + asha.getRole());
                return result;
            }
            
            List<Patient> patients = patientRepository.findByAssignedAsha(asha);
            result.put("success", true);
            result.put("patientCount", patients.size());
            result.put("ashaName", asha.getName());
            result.put("ashaEmail", asha.getEmail());
            
        } catch (Exception e) {
            result.put("error", e.getMessage());
        }
        
        return result;
    }
}