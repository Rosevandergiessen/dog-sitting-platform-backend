package com.booleanuk.api.repository;

import com.booleanuk.api.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByDogId(int dogId);
}