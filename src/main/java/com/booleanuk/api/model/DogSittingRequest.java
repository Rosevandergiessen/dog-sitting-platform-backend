package com.booleanuk.api.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "dog_sitting_requests")
public class DogSittingRequest {
    // Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @ManyToOne
    @JoinColumn(name = "sitter_id")
    private DogSitter sitter;

    @Column(name = "start")
    private LocalDate start;

    @Column(name = "end")
    private LocalDateTime end;

    @Column(name = "accepted")
    private boolean accepted;

    // Constructors
    public DogSittingRequest() {
        super();
    }

    public DogSittingRequest(Dog dog, DogSitter sitter, LocalDate startTime, LocalDateTime endTime, boolean accepted) {
        super();
        this.dog = dog;
        this.sitter = sitter;
        this.start = startTime;
        this.end = endTime;
        this.accepted = accepted;
    }

    public DogSittingRequest(int id, Dog dog, DogSitter sitter, LocalDate startTime, LocalDateTime endTime) {
        this.id = id;
        this.dog = dog;
        this.sitter = sitter;
        this.start = startTime;
        this.end = endTime;
    }

    // Getters & Setters

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Dog getDog() {
        return this.dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public DogSitter getSitter() {
        return this.sitter;
    }

    public void setSitter(DogSitter sitter) {
        this.sitter = sitter;
    }

    public LocalDate getStartTime() {
        return this.start;
    }

    public void setStartTime(LocalDate startTime) {
        this.start = startTime;
    }

    public LocalDateTime getEndTime() {
        return end;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.end = endTime;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
