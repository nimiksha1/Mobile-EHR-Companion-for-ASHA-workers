package com.example.EHR.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EHR.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}


