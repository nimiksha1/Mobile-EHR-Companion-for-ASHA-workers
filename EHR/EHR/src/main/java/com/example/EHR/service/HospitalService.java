package com.example.EHR.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.EHR.model.Hospital;
import com.example.EHR.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HospitalService {
    private final HospitalRepository repo;

    public Hospital save(Hospital h){
        return repo.save(h);
    }

    public List<Hospital> getAll(){
        return repo.findAll();
    }
    public Hospital updateHospital(Long id, Hospital updated) {
        Hospital hospital = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));
hospital.setHospitalName(updated.getHospitalName());
    hospital.setDistrict(updated.getDistrict());
    hospital.setState(updated.getState());
    hospital.setContact(updated.getContact());

    return repo.save(hospital);
    }

    public void deleteHospital(Long id) {
        repo.deleteById(id);
    }
}


