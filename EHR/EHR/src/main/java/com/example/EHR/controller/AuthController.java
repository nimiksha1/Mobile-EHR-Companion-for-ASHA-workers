package com.example.EHR.controller;

import com.example.EHR.dto.LoginRequestDTO;
import com.example.EHR.dto.LoginResponseDTO;
import com.example.EHR.dto.CreateUserRequestDTO;
import com.example.EHR.entity.User;
import com.example.EHR.repository.UserRepository;
import com.example.EHR.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody CreateUserRequestDTO request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Email already exists");
                return ResponseEntity.badRequest().body(error);
            }
            
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(User.UserRole.ASHA);
            
            userRepository.save(user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Signup successful!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
            
            // Support both plain text (old) and encrypted (new) passwords
            boolean passwordMatch = false;
            if (user.getPassword().startsWith("$2a$") || user.getPassword().startsWith("$2b$")) {
                // BCrypt encrypted password
                passwordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
            } else {
                // Plain text password (legacy)
                passwordMatch = request.getPassword().equals(user.getPassword());
            }
            
            if (!passwordMatch) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid credentials");
                return ResponseEntity.badRequest().body(error);
            }
            
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            
            LoginResponseDTO response = new LoginResponseDTO();
            response.setToken(token);
            response.setEmail(user.getEmail());
            response.setName(user.getName());
            response.setRole(user.getRole().name());
            response.setUserId(user.getId());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
