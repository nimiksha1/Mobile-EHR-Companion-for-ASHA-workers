package com.example.EHR.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Visit {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitId;

    // @ManyToOne
    // private Patient patient;

    // @ManyToOne
    // private User asha;

    // private LocalDate visitDate;

    // private String symptoms;
    // private String notes;
}

