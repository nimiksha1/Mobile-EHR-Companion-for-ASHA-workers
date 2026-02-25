package com.example.EHR.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.EHR.model.Vitals;
import com.example.EHR.repository.VitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VitalService {


    private final VitalRepository repo;

    public Vitals save(Vitals vital){
        return repo.save(vital);
    }

    public List<Vitals> getAll(){
        return repo.findAll();
    }

    public Vitals getById(Long id){
        return repo.findById(id).orElseThrow();
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}
