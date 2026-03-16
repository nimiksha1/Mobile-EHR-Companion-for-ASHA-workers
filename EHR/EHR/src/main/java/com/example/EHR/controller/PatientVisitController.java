package com.example.EHR.controller;

import com.example.EHR.dto.PatientVisitRequest;
import com.example.EHR.dto.PatientVisitResponse;
import com.example.EHR.service.PatientVisitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientVisitController {
    
    private final PatientVisitService visitService;
    
    @PostMapping("/{patientId}/visit")
    public ResponseEntity<PatientVisitResponse> addVisit(
            @PathVariable Long patientId,
            @Valid @RequestBody PatientVisitRequest request,
            @RequestParam Long doctorId) {
        System.out.println("POST /api/patients/" + patientId + "/visit - doctorId: " + doctorId);
        PatientVisitResponse visit = visitService.addVisit(patientId, request, doctorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(visit);
    }
    
    @GetMapping("/{patientId}/history")
    public ResponseEntity<List<PatientVisitResponse>> getPatientHistory(@PathVariable Long patientId) {
        System.out.println("GET /api/patients/" + patientId + "/history");
        List<PatientVisitResponse> history = visitService.getPatientHistory(patientId);
        System.out.println("Returning " + history.size() + " visit records");
        return ResponseEntity.ok(history);
    }
}
