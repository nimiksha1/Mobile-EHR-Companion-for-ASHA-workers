package com.example.EHR.service;

import com.example.EHR.dto.PatientRequest;
import com.example.EHR.dto.PatientResponse;
import com.example.EHR.entity.*;
import com.example.EHR.exception.UnauthorizedException;
import com.example.EHR.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AshaService {
    
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PregnancyDetailsRepository pregnancyDetailsRepository;
    private final DiabetesDetailsRepository diabetesDetailsRepository;
    
    public List<PatientResponse> getAssignedPatients(Long ashaId) {
        User asha = userRepository.findById(ashaId)
            .orElseThrow(() -> new RuntimeException("ASHA worker not found"));
        
        if (asha.getRole() != User.UserRole.ASHA) {
            throw new UnauthorizedException("Only ASHA workers can access this endpoint");
        }
        
        List<Patient> patients = patientRepository.findByAssignedAsha(asha);
        
        return patients.stream().map(patient -> {
            PregnancyDetails pregnancyDetails = null;
            DiabetesDetails diabetesDetails = null;
            
            if (patient.getPatientType() == Patient.PatientType.PREGNANCY) {
                pregnancyDetails = pregnancyDetailsRepository.findByPatient(patient).orElse(null);
            } else {
                diabetesDetails = diabetesDetailsRepository.findByPatient(patient).orElse(null);
            }
            
            return PatientResponse.fromEntity(patient, pregnancyDetails, diabetesDetails);
        }).collect(Collectors.toList());
    }
    
    @Transactional
    public Patient updatePatientDetails(Long patientId, PatientRequest request, Long ashaId) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        if (patient.getAssignedAsha() == null || !patient.getAssignedAsha().getId().equals(ashaId)) {
            throw new UnauthorizedException("You can only update your assigned patients");
        }
        
        patient.setLastUpdatedDate(LocalDateTime.now());
        Patient updated = patientRepository.save(patient);
        
        if (patient.getPatientType() == Patient.PatientType.PREGNANCY) {
            if (request.getPregnancyDetails() == null) {
                throw new RuntimeException("Pregnancy details required for pregnancy patient");
            }
            PregnancyDetails details = pregnancyDetailsRepository.findByPatient(patient)
                .orElseThrow(() -> new RuntimeException("Pregnancy details not found"));
            details.setBpSystolic(request.getPregnancyDetails().getBpSystolic());
            details.setBpDiastolic(request.getPregnancyDetails().getBpDiastolic());
            details.setBloodSugar(request.getPregnancyDetails().getBloodSugar());
            details.setBodyTemperature(request.getPregnancyDetails().getBodyTemperature());
            details.setNumberOfWeeks(request.getPregnancyDetails().getNumberOfWeeks());
            details.setHemoglobin(request.getPregnancyDetails().getHemoglobin());
            details.setHeight(request.getPregnancyDetails().getHeight());
            details.setWeight(request.getPregnancyDetails().getWeight());
            details.setBmi(request.getPregnancyDetails().getBmi());
            pregnancyDetailsRepository.save(details);
        } else if (patient.getPatientType() == Patient.PatientType.DIABETES) {
            if (request.getDiabetesDetails() == null) {
                throw new RuntimeException("Diabetes details required for diabetes patient");
            }
            DiabetesDetails details = diabetesDetailsRepository.findByPatient(patient)
                .orElseThrow(() -> new RuntimeException("Diabetes details not found"));
            details.setBpSystolic(request.getDiabetesDetails().getBpSystolic());
            details.setBpDiastolic(request.getDiabetesDetails().getBpDiastolic());
            details.setBloodSugar(request.getDiabetesDetails().getBloodSugar());
            details.setCholesterol(request.getDiabetesDetails().getCholesterol());
            details.setHeartRate(request.getDiabetesDetails().getHeartRate());
            details.setOxygenLevel(request.getDiabetesDetails().getOxygenLevel());
            details.setHeight(request.getDiabetesDetails().getHeight());
            details.setWeight(request.getDiabetesDetails().getWeight());
            details.setBmi(request.getDiabetesDetails().getBmi());
            diabetesDetailsRepository.save(details);
        }
        
        return updated;
    }
}
