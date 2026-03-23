package com.example.EHR.controller;

import com.example.EHR.dto.PatientRequest;
import com.example.EHR.dto.PatientResponse;
import com.example.EHR.entity.Patient;
import com.example.EHR.service.AshaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/asha")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AshaController {
    
    private final AshaService ashaService;
    
    @GetMapping("/assigned-patients")
    public ResponseEntity<List<PatientResponse>> getAssignedPatients(Principal principal) {
        List<PatientResponse> patients = ashaService.getAssignedPatientsByEmail(principal.getName());
        return ResponseEntity.ok(patients);
    }
    
    @GetMapping("/patients")
    public ResponseEntity<List<PatientResponse>> getPatientsByAshaId(@RequestParam Long ashaId) {
        List<PatientResponse> patients = ashaService.getAssignedPatients(ashaId);
        return ResponseEntity.ok(patients);
    }
    
    @PutMapping("/update/{patientId}")
    public ResponseEntity<Patient> updatePatientDetails(
            @PathVariable Long patientId,
            @Valid @RequestBody PatientRequest request,
            @RequestParam Long ashaId) {
        Patient patient = ashaService.updatePatientDetails(patientId, request, ashaId);
        return ResponseEntity.ok(patient);
    }
}
