package com.booleanuk.api.repository;

import com.booleanuk.api.model.DogOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogOwnerRepository extends JpaRepository<DogOwner, Integer> {
}
