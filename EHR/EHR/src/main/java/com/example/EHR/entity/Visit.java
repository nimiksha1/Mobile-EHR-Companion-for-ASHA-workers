package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "visits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitId;
    
    private LocalDate visitDate;
    private String symptoms;
    private String diagnosis;
    private String notes;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;
}
