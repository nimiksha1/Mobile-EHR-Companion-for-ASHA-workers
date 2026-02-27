package com.example.EHR.dto;

import lombok.Data;

@Data
public class PrescriptionRequest {
    private String medicines;
    private String dosage;
    private String advice;
}
