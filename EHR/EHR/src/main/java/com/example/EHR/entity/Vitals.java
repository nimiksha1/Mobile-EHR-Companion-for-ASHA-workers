package com.example.EHR.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "vitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vitals {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer heartRate;
    private Integer bpSystolic;
    private Integer bpDiastolic;
    private Double temperature;
    private Double oxygenLevel;
    private LocalDateTime recordedAt;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
