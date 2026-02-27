package com.example.EHR.dto;

import lombok.Data;
import com.example.EHR.entity.User.UserRole;
import java.time.LocalDateTime;

@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;
    private Long assignedDoctorId;
    private String assignedDoctorName;
    private LocalDateTime createdDate;
}
