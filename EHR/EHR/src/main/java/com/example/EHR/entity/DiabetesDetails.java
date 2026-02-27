package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "diabetes_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiabetesDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer bpSystolic;
    private Integer bpDiastolic;
    private Double bloodSugar;
    private Double cholesterol;
    private Integer heartRate;
    private Double oxygenLevel;
    private Double height;
    private Double weight;
    private Double bmi;
    
    @OneToOne
    @JoinColumn(name = "patient_id", unique = true)
    private Patient patient;
}
