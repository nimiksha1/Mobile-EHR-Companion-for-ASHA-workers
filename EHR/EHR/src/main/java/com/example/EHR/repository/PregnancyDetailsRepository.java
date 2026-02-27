package com.example.EHR.repository;

import com.example.EHR.entity.PregnancyDetails;
import com.example.EHR.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PregnancyDetailsRepository extends JpaRepository<PregnancyDetails, Long> {
    Optional<PregnancyDetails> findByPatient(Patient patient);
}
