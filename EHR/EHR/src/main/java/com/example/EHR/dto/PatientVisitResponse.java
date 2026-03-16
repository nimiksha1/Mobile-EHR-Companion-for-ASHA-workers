package com.example.EHR.dto;

import com.example.EHR.entity.PatientVisit;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PatientVisitResponse {
    
    private Long id;
    private LocalDate visitDate;
    private String bloodPressure;
    private Double sugarLevel;
    private Double cholesterol;
    private Integer heartRate;
    private Double oxygenLevel;
    private Double weight;
    private Double temperature;
    private Integer pulseRate;
    private Integer numberOfWeeks;
    private Double hemoglobin;
    private String address;
    private String symptoms;
    private String diagnosis;
    private String prescription;
    private String labReports;
    private LocalDate followUpDate;
    private String notes;
    private String doctorName;
    private LocalDateTime createdAt;
    
    public static PatientVisitResponse fromEntity(PatientVisit visit) {
        PatientVisitResponse response = new PatientVisitResponse();
        response.setId(visit.getId());
        response.setVisitDate(visit.getVisitDate());
        response.setBloodPressure(visit.getBloodPressure());
        response.setSugarLevel(visit.getSugarLevel());
        response.setCholesterol(visit.getCholesterol());
        response.setHeartRate(visit.getHeartRate());
        response.setOxygenLevel(visit.getOxygenLevel());
        response.setWeight(visit.getWeight());
        response.setTemperature(visit.getTemperature());
        response.setPulseRate(visit.getPulseRate());
        response.setNumberOfWeeks(visit.getNumberOfWeeks());
        response.setHemoglobin(visit.getHemoglobin());
        response.setAddress(visit.getAddress());
        response.setSymptoms(visit.getSymptoms());
        response.setDiagnosis(visit.getDiagnosis());
        response.setPrescription(visit.getPrescription());
        response.setLabReports(visit.getLabReports());
        response.setFollowUpDate(visit.getFollowUpDate());
        response.setNotes(visit.getNotes());
        response.setCreatedAt(visit.getCreatedAt());
        
        if (visit.getDoctor() != null) {
            response.setDoctorName(visit.getDoctor().getName());
        }
        
        return response;
    }
}
