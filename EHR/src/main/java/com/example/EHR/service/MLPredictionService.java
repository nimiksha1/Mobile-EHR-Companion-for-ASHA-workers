package com.example.EHR.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.EHR.model.MlPrediction;
import com.example.EHR.repository.MLPredictionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MLPredictionService {
    private final MLPredictionRepository repo;

    public MlPrediction save(MlPrediction p){
        return repo.save(p);
    }

    public List<MlPrediction> getAll(){
        return repo.findAll();
    }

     public MlPrediction update(Long id, MlPrediction updated) {

    MlPrediction existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Prediction not found with id: " + id));

    // No other fields to update currently

    return repo.save(existing);
}


    
    public void delete(Long id){

        MlPrediction existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prediction not found with id: " + id));

        repo.delete(existing);
    }
}

