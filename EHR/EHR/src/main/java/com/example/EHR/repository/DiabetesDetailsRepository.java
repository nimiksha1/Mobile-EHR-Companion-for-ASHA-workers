package com.example.EHR.repository;

import com.example.EHR.entity.DiabetesDetails;
import com.example.EHR.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DiabetesDetailsRepository extends JpaRepository<DiabetesDetails, Long> {
    Optional<DiabetesDetails> findByPatient(Patient patient);
}
