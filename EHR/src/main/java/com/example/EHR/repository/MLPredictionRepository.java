package com.example.EHR.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EHR.model.MlPrediction;

@Repository
public interface MLPredictionRepository extends JpaRepository<MlPrediction, Long> {
}

