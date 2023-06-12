package com.booleanuk.api.repository;

import com.booleanuk.api.model.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dog, Integer>{ }
