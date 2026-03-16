package com.example.EHR.repository;

import com.example.EHR.entity.Patient;
import com.example.EHR.entity.PatientVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientVisitRepository extends JpaRepository<PatientVisit, Long> {
    List<PatientVisit> findByPatientOrderByVisitDateDesc(Patient patient);
    List<PatientVisit> findByPatientIdOrderByVisitDateDesc(Long patientId);
}
