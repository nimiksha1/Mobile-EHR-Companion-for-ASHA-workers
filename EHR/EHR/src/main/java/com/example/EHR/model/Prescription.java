package com.example.EHR.model;

import lombok.Data;

@Data
public class Prescription {
    private Long prescriptionId;
    private String medicines;
    private String dosage;
    private String advice;
}

