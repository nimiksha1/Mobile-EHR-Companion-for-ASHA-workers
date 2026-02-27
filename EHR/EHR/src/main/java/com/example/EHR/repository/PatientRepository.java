package com.example.EHR.repository;

import com.example.EHR.entity.Patient;
import com.example.EHR.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPatientId(String patientId);
    List<Patient> findByAssignedAsha(User asha);
    Page<Patient> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
