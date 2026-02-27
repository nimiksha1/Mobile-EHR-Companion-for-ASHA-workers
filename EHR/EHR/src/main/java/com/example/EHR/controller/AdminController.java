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
@CrossOrigin(origins = "*")
public class AdminController {
    
    private final AdminService adminService;
    
    @PostMapping("/create-doctor")
    public ResponseEntity<UserResponseDTO> createDoctor(@Valid @RequestBody CreateUserRequestDTO request) {
        UserResponseDTO user = adminService.createDoctor(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @PostMapping("/create-asha")
    public ResponseEntity<UserResponseDTO> createAshaWorker(@Valid @RequestBody CreateUserRequestDTO request) {
        UserResponseDTO user = adminService.createAshaWorker(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @PutMapping("/assign-doctor")
    public ResponseEntity<UserResponseDTO> assignDoctorToAsha(@Valid @RequestBody AssignDoctorDTO request) {
        UserResponseDTO user = adminService.assignDoctorToAsha(request);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/doctors")
    public ResponseEntity<List<UserResponseDTO>> getDoctors() {
        List<UserResponseDTO> doctors = adminService.getDoctors();
        return ResponseEntity.ok(doctors);
    }
}
