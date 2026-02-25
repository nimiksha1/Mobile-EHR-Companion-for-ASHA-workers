package com.example.EHR.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EHR.model.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}

