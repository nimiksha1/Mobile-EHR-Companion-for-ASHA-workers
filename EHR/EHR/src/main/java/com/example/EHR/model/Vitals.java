package com.example.EHR.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Vitals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vitalId;

    private int bpSystolic;
    private int bpDiastolic;
    private float weight;
    private float hemoglobin;
    private float temperature;
    
    // @ManyToOne
    // @JoinColumn(name = "visit_id")
    // private Visit visit;
}
