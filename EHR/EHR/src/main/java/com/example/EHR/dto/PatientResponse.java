package com.example.EHR.dto;

import com.example.EHR.entity.Patient;
import com.example.EHR.entity.PregnancyDetails;
import com.example.EHR.entity.DiabetesDetails;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PatientResponse {
    private Long id;
    private String patientId;
    private String name;
    private Integer age;
    private String gender;
    private String phone;
    private String address;
    private String patientType;
    private String assignedAshaName;
    private Long assignedAshaId;
    private String createdByDoctorName;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;
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
    
    public static PatientResponse fromEntity(Patient patient, PregnancyDetails pregnancyDetails, DiabetesDetails diabetesDetails) {
        PatientResponse response = new PatientResponse();
        response.setId(patient.getId());
        response.setPatientId(patient.getPatientId());
        response.setName(patient.getName());
        response.setAge(patient.getAge());
        response.setGender(patient.getGender());
        response.setPhone(patient.getPhone());
        response.setAddress(patient.getAddress());
        response.setPatientType(patient.getPatientType().name());
        response.setAssignedAshaName(patient.getAssignedAsha().getName());
        response.setAssignedAshaId(patient.getAssignedAsha().getId());
        response.setCreatedByDoctorName(patient.getCreatedByDoctor().getName());
        response.setCreatedDate(patient.getCreatedDate());
        response.setLastUpdatedDate(patient.getLastUpdatedDate());
        
        if (pregnancyDetails != null) {
            PregnancyDetailsDTO dto = new PregnancyDetailsDTO();
            dto.setBpSystolic(pregnancyDetails.getBpSystolic());
            dto.setBpDiastolic(pregnancyDetails.getBpDiastolic());
            dto.setBloodSugar(pregnancyDetails.getBloodSugar());
            dto.setBodyTemperature(pregnancyDetails.getBodyTemperature());
            dto.setNumberOfWeeks(pregnancyDetails.getNumberOfWeeks());
            dto.setHemoglobin(pregnancyDetails.getHemoglobin());
            dto.setHeight(pregnancyDetails.getHeight());
            dto.setWeight(pregnancyDetails.getWeight());
            dto.setBmi(pregnancyDetails.getBmi());
            response.setPregnancyDetails(dto);
        }
        
        if (diabetesDetails != null) {
            DiabetesDetailsDTO dto = new DiabetesDetailsDTO();
            dto.setBpSystolic(diabetesDetails.getBpSystolic());
            dto.setBpDiastolic(diabetesDetails.getBpDiastolic());
            dto.setBloodSugar(diabetesDetails.getBloodSugar());
            dto.setCholesterol(diabetesDetails.getCholesterol());
            dto.setHeartRate(diabetesDetails.getHeartRate());
            dto.setOxygenLevel(diabetesDetails.getOxygenLevel());
            dto.setHeight(diabetesDetails.getHeight());
            dto.setWeight(diabetesDetails.getWeight());
            dto.setBmi(diabetesDetails.getBmi());
            response.setDiabetesDetails(dto);
        }
        
        return response;
    }
}
