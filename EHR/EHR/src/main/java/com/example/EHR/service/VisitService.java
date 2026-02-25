package com.example.EHR.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.EHR.model.Visit;
import com.example.EHR.repository.VisitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository repo;

    public Visit save(Visit v){
        return repo.save(v);
    }

    public List<Visit> getAll(){
        return repo.findAll();
    }

    public Visit update(Long id, Visit updated){

        Visit existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Visit not found with id: " + id));

        // Copy all fields except primary key
        BeanUtils.copyProperties(updated, existing, "visitId");

        return repo.save(existing);
    }

    // ✅ Delete
    public void delete(Long id){

        if (!repo.existsById(id)) {
            throw new RuntimeException("Visit not found with id: " + id);
        }

        repo.deleteById(id);
    }
}

