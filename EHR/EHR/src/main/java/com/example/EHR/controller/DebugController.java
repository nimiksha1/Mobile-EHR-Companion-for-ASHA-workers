package com.example.EHR.controller;

import com.example.EHR.entity.Patient;
import com.example.EHR.entity.User;
import com.example.EHR.repository.PatientRepository;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {
    
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    
    @GetMapping("/asha-workers")
    public List<User> getAllAshaWorkers() {
        return userRepository.findByRole(User.UserRole.ASHA);
    }
    
    @GetMapping("/patients-with-asha")
    public List<Patient> getPatientsWithAsha() {
        return patientRepository.findAll().stream()
                .filter(p -> p.getAssignedAsha() != null)
                .toList();
    }
    
    @GetMapping("/patient-assignments")
    public Map<String, Object> getPatientAssignments() {
        Map<String, Object> result = new HashMap<>();
        
        List<User> ashaWorkers = userRepository.findByRole(User.UserRole.ASHA);
        List<Patient> allPatients = patientRepository.findAll();
        List<Patient> assignedPatients = allPatients.stream()
                .filter(p -> p.getAssignedAsha() != null)
                .toList();
        
        result.put("totalAshaWorkers", ashaWorkers.size());
        result.put("totalPatients", allPatients.size());
        result.put("assignedPatients", assignedPatients.size());
        result.put("unassignedPatients", allPatients.size() - assignedPatients.size());
        
        Map<String, Integer> assignmentsByAsha = new HashMap<>();
        for (User asha : ashaWorkers) {
            int count = patientRepository.findByAssignedAsha(asha).size();
            assignmentsByAsha.put(asha.getName() + " (" + asha.getEmail() + ")", count);
        }
        result.put("assignmentsByAsha", assignmentsByAsha);
        
        return result;
    }
    
    @GetMapping("/user/{email}")
    public Map<String, Object> getUserInfo(@PathVariable String email) {
        Map<String, Object> result = new HashMap<>();
        
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            result.put("found", true);
            result.put("id", user.getId());
            result.put("name", user.getName());
            result.put("email", user.getEmail());
            result.put("role", user.getRole());
            result.put("active", user.getActive());
            
            if (user.getRole() == User.UserRole.ASHA) {
                List<Patient> assignedPatients = patientRepository.findByAssignedAsha(user);
                result.put("assignedPatientsCount", assignedPatients.size());
                result.put("assignedPatients", assignedPatients.stream()
                        .map(p -> Map.of(
                                "id", p.getId(),
                                "patientId", p.getPatientId(),
                                "name", p.getName(),
                                "type", p.getPatientType()
                        )).toList());
            }
        } else {
            result.put("found", false);
        }
        
        return result;
    }
}