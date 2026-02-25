package com.example.EHR.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class MlPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long predictionId;

    // @ManyToOne
    // private Visit visit;

    // private double riskScore;
    // private String riskLevel;
    // private String recommendation;
    // private String modelVersion;
}


