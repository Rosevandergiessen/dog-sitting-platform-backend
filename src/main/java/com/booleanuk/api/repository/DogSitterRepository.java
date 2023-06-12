package com.booleanuk.api.repository;

import com.booleanuk.api.model.DogSitter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogSitterRepository extends JpaRepository<DogSitter, Integer> {
}
