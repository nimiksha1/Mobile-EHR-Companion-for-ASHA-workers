package com.example.EHR.service;

import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.EHR.dto.PatientDTO;
import com.example.EHR.entity.Patient;
import com.example.EHR.entity.User;
import com.example.EHR.repository.PatientRepository;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {
 private static final Logger logger = LoggerFactory.getLogger(PatientService.class);
 private final PatientRepository repo;
 private final UserRepository userRepository;

    public Patient save(Patient p){
        return repo.save(p);
    }

    public List<Patient> getAll(){
        return repo.findAll();
    }

    public List<PatientDTO> getPatientsByAsha(String email) {
        logger.info("Looking for ASHA worker with email: {}", email);
        
        User asha = userRepository.findByEmail(email)
            .orElseThrow(() -> {
                logger.error("ASHA worker not found with email: {}", email);
                return new RuntimeException("ASHA worker not found with email: " + email);
            });
        
        logger.info("Found ASHA worker: {} with role: {}", asha.getName(), asha.getRole());
        
        List<Patient> patients = repo.findByAssignedAsha(asha);
        logger.info("Found {} patients assigned to ASHA: {}", patients.size(), asha.getName());
        
        return patients.stream()
                .map(PatientDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<PatientDTO> getPatientsByAshaId(Long ashaId) {
        User asha = userRepository.findById(ashaId)
            .orElseThrow(() -> new RuntimeException("ASHA worker not found with ID: " + ashaId));
        
        if (asha.getRole() != User.UserRole.ASHA) {
            throw new RuntimeException("User is not an ASHA worker");
        }
        
        List<Patient> patients = repo.findByAssignedAsha(asha);
        return patients.stream()
                .map(PatientDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Patient update(Long id, Patient updated){
    Patient existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    BeanUtils.copyProperties(updated, existing, "id");
    return repo.save(existing);
}

public void delete(Long id){
    if (!repo.existsById(id)) {
        throw new RuntimeException("Patient not found with id: " + id);
    }
    repo.deleteById(id);
}
}

