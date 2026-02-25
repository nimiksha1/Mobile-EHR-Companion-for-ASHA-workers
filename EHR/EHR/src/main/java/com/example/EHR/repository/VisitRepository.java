package com.example.EHR.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EHR.model.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
}

