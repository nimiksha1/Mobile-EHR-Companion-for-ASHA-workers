package com.example.EHR.dto;

import com.example.EHR.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long id;
    private String patientId;
    private String name;
    private Integer age;
    private String gender;
    private String phone;
    private String address;
    private String prescription;
    private String patientType;
    private String assignedAshaName;
    private String assignedAshaEmail;
    private String createdByDoctorName;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;
    
    public static PatientDTO fromEntity(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setPatientId(patient.getPatientId());
        dto.setName(patient.getName());
        dto.setAge(patient.getAge());
        dto.setGender(patient.getGender());
        dto.setPhone(patient.getPhone());
        dto.setAddress(patient.getAddress());
        dto.setPrescription(patient.getPrescription());
        dto.setPatientType(patient.getPatientType().name());
        dto.setCreatedDate(patient.getCreatedDate());
        dto.setLastUpdatedDate(patient.getLastUpdatedDate());
        
        if (patient.getAssignedAsha() != null) {
            dto.setAssignedAshaName(patient.getAssignedAsha().getName());
            dto.setAssignedAshaEmail(patient.getAssignedAsha().getEmail());
        }
        
        if (patient.getCreatedByDoctor() != null) {
            dto.setCreatedByDoctorName(patient.getCreatedByDoctor().getName());
        }
        
        return dto;
    }
}