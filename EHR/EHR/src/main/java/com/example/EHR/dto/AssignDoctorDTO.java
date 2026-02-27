package com.example.EHR.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class AssignDoctorDTO {
    @NotNull(message = "ASHA worker ID is required")
    private Long ashaWorkerId;
    
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;
}
