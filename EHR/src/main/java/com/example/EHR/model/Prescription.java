package com.example.EHR.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prescriptionId;
    private String medicines;
    private String dosage;
    private String advice;

    // @ManyToOne
    // private Visit visit;

    // @ManyToOne
    // private User doctor;

}

