package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ml_predictions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MlPrediction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String predictionType;
    private String result;
    private Double confidence;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
