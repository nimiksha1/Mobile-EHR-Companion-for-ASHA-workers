package com.example.EHR.service;

import com.example.EHR.dto.PatientRequest;
import com.example.EHR.dto.PrescriptionRequest;
import com.example.EHR.entity.*;
import com.example.EHR.exception.UnauthorizedException;
import com.example.EHR.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class DoctorService {
    
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PregnancyDetailsRepository pregnancyDetailsRepository;
    private final DiabetesDetailsRepository diabetesDetailsRepository;
    private final PrescriptionRepository prescriptionRepository;
    
    @Transactional
    public Patient createPatient(PatientRequest request, Long doctorId) {
        User doctor = userRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctor.getRole() != User.UserRole.DOCTOR) {
            throw new UnauthorizedException("Only doctors can create patients");
        }
        
        if (patientRepository.findByPatientId(request.getPatientId()).isPresent()) {
            throw new RuntimeException("Patient ID already exists");
        }
        
        User asha = null;
        if (request.getAssignedAshaId() != null) {
            asha = userRepository.findById(request.getAssignedAshaId())
                .orElseThrow(() -> new RuntimeException("ASHA worker not found"));
            if (asha.getRole() != User.UserRole.ASHA) {
                throw new RuntimeException("Assigned user must be an ASHA worker");
            }
        }
        
        Patient patient = new Patient();
        patient.setPatientId(request.getPatientId());
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setPatientType(Patient.PatientType.valueOf(request.getPatientType().toUpperCase()));
        patient.setAssignedAsha(asha);
        patient.setCreatedByDoctor(doctor);
        
        Patient savedPatient = patientRepository.save(patient);
        
        if ("PREGNANCY".equalsIgnoreCase(request.getPatientType()) && request.getPregnancyDetails() != null) {
            PregnancyDetails details = new PregnancyDetails();
            details.setPatient(savedPatient);
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
        } else if ("DIABETES".equalsIgnoreCase(request.getPatientType()) && request.getDiabetesDetails() != null) {
            DiabetesDetails details = new DiabetesDetails();
            details.setPatient(savedPatient);
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
        
        return savedPatient;
    }
    
    @Transactional
    public Patient updatePatient(Long patientId, PatientRequest request) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setLastUpdatedDate(LocalDateTime.now());
        
        Patient updated = patientRepository.save(patient);
        
        if (patient.getPatientType() == Patient.PatientType.PREGNANCY && request.getPregnancyDetails() != null) {
            PregnancyDetails details = pregnancyDetailsRepository.findByPatient(patient)
                .orElse(new PregnancyDetails());
            details.setPatient(updated);
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
        } else if (patient.getPatientType() == Patient.PatientType.DIABETES && request.getDiabetesDetails() != null) {
            DiabetesDetails details = diabetesDetailsRepository.findByPatient(patient)
                .orElse(new DiabetesDetails());
            details.setPatient(updated);
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
    
    public Page<Patient> getPatientsByDate(LocalDate date, Pageable pageable) {
        if (date == null) {
            return patientRepository.findAll(pageable);
        }
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return patientRepository.findByCreatedDateBetween(startOfDay, endOfDay, pageable);
    }
    
    @Transactional
    public Prescription createPrescription(Long patientId, PrescriptionRequest request, Long doctorId) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        User doctor = userRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctor.getRole() != User.UserRole.DOCTOR) {
            throw new UnauthorizedException("Only doctors can create prescriptions");
        }
        
        Prescription prescription = new Prescription();
        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicines(request.getMedicines());
        prescription.setDosage(request.getDosage());
        prescription.setAdvice(request.getAdvice());
        
        return prescriptionRepository.save(prescription);
    }
}
