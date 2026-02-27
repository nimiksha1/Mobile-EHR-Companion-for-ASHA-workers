package com.example.EHR.model;

import lombok.Data;

@Data
public class User {
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String password;
    private Role role;
}

