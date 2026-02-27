package com.example.EHR.model;

import lombok.Data;

@Data
public class Patient {
    private Long patientId;
    private String name;
    private int age;
    private String gender;
    private String phone;
    private String address;
}

