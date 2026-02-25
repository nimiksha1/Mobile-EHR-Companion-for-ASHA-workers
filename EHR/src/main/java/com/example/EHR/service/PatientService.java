package com.example.EHR.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.EHR.model.Patient;
import com.example.EHR.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {
 private final PatientRepository repo;

    public Patient save(Patient p){
        return repo.save(p);
    }

    public List<Patient> getAll(){
        return repo.findAll();
    }

    public Patient update(Long id, Patient updated){

    Patient existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

    BeanUtils.copyProperties(updated, existing, "patientId");

    return repo.save(existing);
}
public void delete(Long id){

    if (!repo.existsById(id)) {
        throw new RuntimeException("Patient not found with id: " + id);
    }

    repo.deleteById(id);
}
        
}

