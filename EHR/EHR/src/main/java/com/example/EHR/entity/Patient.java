package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String patientId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Integer age;
    
    @Column(nullable = false)
    private String gender;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String address;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PatientType patientType;
    
    @ManyToOne
    @JoinColumn(name = "assigned_asha_id")
    private User assignedAsha;
    
    @ManyToOne
    @JoinColumn(name = "created_by_doctor_id")
    private User createdByDoctor;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime lastUpdatedDate = LocalDateTime.now();
    
    public enum PatientType {
        PREGNANCY, DIABETES
    }
}
