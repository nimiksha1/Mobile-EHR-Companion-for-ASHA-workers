package com.example.EHR.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.EHR.model.Prescription;
import com.example.EHR.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository repo;

    public Prescription save(Prescription p){
        return repo.save(p);
    }

    public List<Prescription> getAll(){
        return repo.findAll();
    }

    public Prescription update(Long id, Prescription updated){

    Prescription existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Prescription not found with id: " + id));

    // Copy all fields except primary key
    BeanUtils.copyProperties(updated, existing, "prescriptionId");

    return repo.save(existing);
}

   public void delete(Long id){

        if (!repo.existsById(id)) {
            throw new RuntimeException("Prescription not found with id: " + id);
        }

        repo.deleteById(id);
    }
}
