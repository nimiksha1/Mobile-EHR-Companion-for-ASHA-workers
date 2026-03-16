package com.example.EHR.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientVisitRequest {
    
    @NotNull(message = "Visit date is required")
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
}
