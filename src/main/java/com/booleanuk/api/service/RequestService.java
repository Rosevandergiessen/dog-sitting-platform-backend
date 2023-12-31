package com.booleanuk.api.service;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.Request;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(int id) {
        return requestRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog sitting request not found."));
    }

    public List<Request> getRequestByDogId(int dogId) {
        return requestRepository.findByDogId(dogId);
    }

    public Request createDogRequest(Dog dog, LocalDateTime start, LocalDateTime end) {
        Request request = new Request(dog, start, end);
        return requestRepository.save(request);
    }

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    public Request updateRequest(int id, Request updatedRequest) {
        Request existingRequest = requestRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog sitting request not found."));
        existingRequest.setDog(updatedRequest.getDog());
        existingRequest.setSitter(updatedRequest.getSitter());
        existingRequest.setStartTime(updatedRequest.getStartTime());
        existingRequest.setEndTime(updatedRequest.getEndTime());
        existingRequest.setAccepted(updatedRequest.isAccepted());
        return requestRepository.save(existingRequest);
    }

    public Request acceptRequest(int id) {
        Request existingRequest = requestRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog sitting request not found."));
        existingRequest.setAccepted(true);
        return requestRepository.save(existingRequest);
    }

    public Request updateRequestAcceptedAndSitter(int id, User user) {
        Request existingRequest = requestRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog sitting request not found."));
        existingRequest.setAccepted(true);
        existingRequest.setSitter(user);
        return requestRepository.save(existingRequest);
    }

    public Request deleteRequest(int id) {
        Request existingRequest = requestRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog sitting request not found."));
        requestRepository.delete(existingRequest);
        return existingRequest;
    }
}