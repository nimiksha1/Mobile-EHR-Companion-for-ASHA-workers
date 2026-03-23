package com.example.EHR.controller;

import java.security.Principal;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.EHR.dto.PatientDTO;
import com.example.EHR.entity.Patient;
import com.example.EHR.service.PatientService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);
    private final PatientService service;

    @PostMapping
    public Patient add(@RequestBody Patient p){
        return service.save(p);
    }

    @GetMapping
    public List<Patient> list(){
        return service.getAll();
    }

    @GetMapping("/asha")
    public ResponseEntity<List<PatientDTO>> getPatientsForAsha(Principal principal) {
        String email = principal.getName();
        logger.info("ASHA patients request for: {}", email);
        List<PatientDTO> patients = service.getPatientsByAsha(email);
        logger.info("Found {} patients for ASHA: {}", patients.size(), email);
        return ResponseEntity.ok(patients);
    }
    
    @GetMapping("/asha/{ashaId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public List<PatientDTO> getPatientsByAshaId(@PathVariable Long ashaId) {
        return service.getPatientsByAshaId(ashaId);
    }

    @PutMapping("/{id}")
    public Patient update(@PathVariable Long id, @RequestBody Patient updated){
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Patient deleted successfully";
    }
}

