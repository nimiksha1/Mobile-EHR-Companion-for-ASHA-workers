package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient_visits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientVisit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate visitDate;
    
    private String bloodPressure;
    private Double sugarLevel;
    private Double cholesterol;
    private Integer heartRate;
    private Double oxygenLevel;
    private Double weight;
    private Double temperature;
    private Integer pulseRate;
    private Integer numberOfWeeks;
    private Double hemoglobin;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    @Column(columnDefinition = "TEXT")
    private String symptoms;
    
    @Column(columnDefinition = "TEXT")
    private String diagnosis;
    
    @Column(columnDefinition = "TEXT")
    private String prescription;
    
    @Column(columnDefinition = "TEXT")
    private String labReports;
    
    private LocalDate followUpDate;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
