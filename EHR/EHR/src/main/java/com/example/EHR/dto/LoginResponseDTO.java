package com.example.EHR.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String email;
    private String name;
    private String role;
}
