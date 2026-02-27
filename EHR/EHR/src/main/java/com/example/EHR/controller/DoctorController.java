package com.example.EHR.controller;

import com.example.EHR.dto.PatientRequest;
import com.example.EHR.dto.PrescriptionRequest;
import com.example.EHR.entity.Patient;
import com.example.EHR.entity.Prescription;
import com.example.EHR.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DoctorController {
    
    private final DoctorService doctorService;
    
    @PostMapping("/patient")
    public ResponseEntity<Patient> createPatient(
            @Valid @RequestBody PatientRequest request,
            @RequestParam Long doctorId) {
        Patient patient = doctorService.createPatient(request, doctorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(patient);
    }
    
    @PutMapping("/patient/{id}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequest request) {
        Patient patient = doctorService.updatePatient(id, request);
        return ResponseEntity.ok(patient);
    }
    
    @GetMapping("/patients")
    public ResponseEntity<Page<Patient>> getPatientsByDate(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Patient> patients = doctorService.getPatientsByDate(date, pageable);
        return ResponseEntity.ok(patients);
    }
    
    @PostMapping("/prescription/{patientId}")
    public ResponseEntity<Prescription> createPrescription(
            @PathVariable Long patientId,
            @Valid @RequestBody PrescriptionRequest request,
            @RequestParam Long doctorId) {
        Prescription prescription = doctorService.createPrescription(patientId, request, doctorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(prescription);
    }
}
