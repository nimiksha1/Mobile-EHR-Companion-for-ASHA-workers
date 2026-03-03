package com.example.EHR.controller;

import com.example.EHR.dto.*;
import com.example.EHR.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;
    
    @PostMapping("/users")
    public ResponseEntity<UserResponseDTO> addUser(@Valid @RequestBody CreateUserRequestDTO request) {
        UserResponseDTO user = adminService.addUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @PostMapping("/create-doctor")
    public ResponseEntity<?> createDoctor(@Valid @RequestBody CreateUserRequestDTO request) {
        try {
            System.out.println("Creating doctor: " + request.getEmail());
            UserResponseDTO user = adminService.createDoctor(request);
            System.out.println("Doctor created with ID: " + user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/create-asha")
    public ResponseEntity<UserResponseDTO> createAshaWorker(@Valid @RequestBody CreateUserRequestDTO request) {
        UserResponseDTO user = adminService.createAshaWorker(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<UserResponseDTO>> getUsersByRole(@PathVariable String role) {
        List<UserResponseDTO> users = adminService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponseDTO>> searchUsers(@RequestParam String query) {
        List<UserResponseDTO> users = adminService.searchUsers(query);
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @Valid @RequestBody CreateUserRequestDTO request) {
        UserResponseDTO user = adminService.updateUser(id, request);
        return ResponseEntity.ok(user);
    }
    
    @PatchMapping("/users/{id}/toggle-status")
    public ResponseEntity<UserResponseDTO> toggleUserStatus(@PathVariable Long id) {
        UserResponseDTO user = adminService.toggleUserStatus(id);
        return ResponseEntity.ok(user);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/assign-doctor")
    public ResponseEntity<UserResponseDTO> assignDoctorToAsha(@Valid @RequestBody AssignDoctorDTO request) {
        UserResponseDTO user = adminService.assignDoctorToAsha(request);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/doctors")
    public ResponseEntity<List<UserResponseDTO>> getDoctors() {
        List<UserResponseDTO> doctors = adminService.getDoctors();
        return ResponseEntity.ok(doctors);
    }
}
