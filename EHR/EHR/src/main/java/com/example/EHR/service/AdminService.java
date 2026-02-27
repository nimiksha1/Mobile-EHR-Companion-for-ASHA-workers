package com.example.EHR.service;

import com.example.EHR.dto.*;
import com.example.EHR.entity.User;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserResponseDTO createDoctor(CreateUserRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.UserRole.DOCTOR);
        
        User saved = userRepository.save(user);
        return mapToDTO(saved);
    }
    
    @Transactional
    public UserResponseDTO createAshaWorker(CreateUserRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.UserRole.ASHA);
        
        User saved = userRepository.save(user);
        return mapToDTO(saved);
    }
    
    @Transactional
    public UserResponseDTO assignDoctorToAsha(AssignDoctorDTO request) {
        User asha = userRepository.findById(request.getAshaWorkerId())
            .orElseThrow(() -> new RuntimeException("ASHA worker not found"));
        
        if (asha.getRole() != User.UserRole.ASHA) {
            throw new RuntimeException("User is not an ASHA worker");
        }
        
        User doctor = userRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctor.getRole() != User.UserRole.DOCTOR) {
            throw new RuntimeException("User is not a doctor");
        }
        
        asha.setAssignedDoctor(doctor);
        User saved = userRepository.save(asha);
        return mapToDTO(saved);
    }
    
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }
    
    public List<UserResponseDTO> getDoctors() {
        return userRepository.findByRole(User.UserRole.DOCTOR).stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }
    
    private UserResponseDTO mapToDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setCreatedDate(user.getCreatedDate());
        
        if (user.getAssignedDoctor() != null) {
            dto.setAssignedDoctorId(user.getAssignedDoctor().getId());
            dto.setAssignedDoctorName(user.getAssignedDoctor().getName());
        }
        
        return dto;
    }
}
