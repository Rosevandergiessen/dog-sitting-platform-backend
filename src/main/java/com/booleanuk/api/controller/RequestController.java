package com.booleanuk.api.controller;

import com.booleanuk.api.DTO.RequestDTO;
import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.Request;
import com.booleanuk.api.model.User;
import com.booleanuk.api.service.DogService;
import com.booleanuk.api.service.RequestService;
import com.booleanuk.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private DogService dogService;

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable int id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    @PostMapping("/{dogId}")
    public ResponseEntity<Request> createRequest(@PathVariable int dogId, @RequestBody RequestDTO requestDTO) {
        Dog dog = dogService.getDogById(dogId);

        LocalDateTime start = requestDTO.getStartTime();
        LocalDateTime end = requestDTO.getEndTime();

        Request request = requestService.createDogRequest(dog, start, end);

        return ResponseEntity.ok(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> acceptRequest(@PathVariable("id") int id, @RequestBody Integer sitterId) {
        User sitter = userService.getUserById(sitterId);
        return ResponseEntity.ok(requestService.updateRequestAcceptedAndSitter(id, sitter));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Request> deleteRequest(@PathVariable int id) {
        return ResponseEntity.ok(requestService.deleteRequest(id));
    }
}