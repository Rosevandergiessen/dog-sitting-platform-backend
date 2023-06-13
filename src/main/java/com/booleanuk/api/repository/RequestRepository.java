package com.booleanuk.api.repository;

import com.booleanuk.api.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Integer> {
}
