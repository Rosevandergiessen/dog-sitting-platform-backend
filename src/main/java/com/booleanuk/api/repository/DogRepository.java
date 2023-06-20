package com.booleanuk.api.repository;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogRepository extends JpaRepository<Dog, Integer>{
    List<Dog> findByUserId(int userId);
}