package com.booleanuk.api.repository;

import com.booleanuk.api.model.DogSittingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogSittingRequestRepository extends JpaRepository<DogSittingRequest, Integer> {
}
