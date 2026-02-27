package com.example.EHR.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientRequest {
    @NotBlank(message = "Patient ID is required")
    private String patientId;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotNull(message = "Age is required")
    private Integer age;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Patient type is required")
    private String patientType;
    
    private Long assignedAshaId;
    private PregnancyDetailsDTO pregnancyDetails;
    private DiabetesDetailsDTO diabetesDetails;
    
    @Data
    public static class PregnancyDetailsDTO {
        private Integer bpSystolic;
        private Integer bpDiastolic;
        private Double bloodSugar;
        private Double bodyTemperature;
        private Integer numberOfWeeks;
        private Double hemoglobin;
        private Double height;
        private Double weight;
        private Double bmi;
    }
    
    @Data
    public static class DiabetesDetailsDTO {
        private Integer bpSystolic;
        private Integer bpDiastolic;
        private Double bloodSugar;
        private Double cholesterol;
        private Integer heartRate;
        private Double oxygenLevel;
        private Double height;
        private Double weight;
        private Double bmi;
    }
}
