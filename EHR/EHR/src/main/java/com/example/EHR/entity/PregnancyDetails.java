package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pregnancy_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PregnancyDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer bpSystolic;
    private Integer bpDiastolic;
    private Double bloodSugar;
    private Double bodyTemperature;
    private Integer numberOfWeeks;
    private Double hemoglobin;
    private Double height;
    private Double weight;
    private Double bmi;
    
    @OneToOne
    @JoinColumn(name = "patient_id", unique = true)
    private Patient patient;
}
