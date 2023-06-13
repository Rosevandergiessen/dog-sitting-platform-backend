package com.booleanuk.api.controller;

import com.booleanuk.api.model.Request;
import com.booleanuk.api.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(int id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<Request> createRequest(Request request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(int id, Request updatedRequest) {
        return ResponseEntity.ok(requestService.updateRequest(id, updatedRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Request> deleteRequest(int id) {
        return ResponseEntity.ok(requestService.deleteRequest(id));
    }
}