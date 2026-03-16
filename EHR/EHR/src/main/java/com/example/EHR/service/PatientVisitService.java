package com.example.EHR.service;

import com.example.EHR.dto.PatientVisitRequest;
import com.example.EHR.dto.PatientVisitResponse;
import com.example.EHR.entity.Patient;
import com.example.EHR.entity.PatientVisit;
import com.example.EHR.entity.User;
import com.example.EHR.exception.UnauthorizedException;
import com.example.EHR.repository.PatientRepository;
import com.example.EHR.repository.PatientVisitRepository;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientVisitService {
    
    private final PatientVisitRepository visitRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public PatientVisitResponse addVisit(Long patientId, PatientVisitRequest request, Long doctorId) {
        System.out.println("Adding visit for patient: " + patientId + ", visitDate: " + request.getVisitDate());
        
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        User doctor = userRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctor.getRole() != User.UserRole.DOCTOR) {
            throw new UnauthorizedException("Only doctors can add visit records");
        }
        
        PatientVisit visit = new PatientVisit();
        visit.setPatient(patient);
        visit.setDoctor(doctor);
        visit.setVisitDate(request.getVisitDate());
        visit.setBloodPressure(request.getBloodPressure());
        visit.setSugarLevel(request.getSugarLevel());
        visit.setCholesterol(request.getCholesterol());
        visit.setHeartRate(request.getHeartRate());
        visit.setOxygenLevel(request.getOxygenLevel());
        visit.setWeight(request.getWeight());
        visit.setTemperature(request.getTemperature());
        visit.setPulseRate(request.getPulseRate());
        visit.setNumberOfWeeks(request.getNumberOfWeeks());
        visit.setHemoglobin(request.getHemoglobin());
        visit.setAddress(request.getAddress());
        visit.setSymptoms(request.getSymptoms());
        visit.setDiagnosis(request.getDiagnosis());
        visit.setPrescription(request.getPrescription());
        visit.setLabReports(request.getLabReports());
        visit.setFollowUpDate(request.getFollowUpDate());
        visit.setNotes(request.getNotes());
        
        PatientVisit saved = visitRepository.save(visit);
        System.out.println("Visit saved with ID: " + saved.getId());
        return PatientVisitResponse.fromEntity(saved);
    }
    
    public List<PatientVisitResponse> getPatientHistory(Long patientId) {
        List<PatientVisitResponse> history = visitRepository.findByPatientIdOrderByVisitDateDesc(patientId).stream()
            .map(PatientVisitResponse::fromEntity)
            .collect(Collectors.toList());
        System.out.println("Fetched " + history.size() + " visits for patient: " + patientId);
        return history;
    }
}
