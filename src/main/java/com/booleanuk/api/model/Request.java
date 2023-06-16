package com.booleanuk.api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {
    // Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "dog_id", nullable = false)
    private Dog dog;

    @ManyToOne
    @JoinColumn(name = "sitter_id")
    private User sitter;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "accepted")
    private boolean accepted;

    // Constructors
    public Request() {
        super();
    }

    public Request(Dog dog, User sitter, LocalDateTime startTime, LocalDateTime endTime, boolean accepted) {
        super();
        this.dog = dog;
        this.sitter = sitter;
        this.startTime = startTime;
        this.endTime = endTime;
        this.accepted = accepted;
    }

    public Request(Dog dog, LocalDateTime startTime, LocalDateTime endTime) {
        this.dog = dog;
        this.startTime = startTime;
        this.endTime = endTime;
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

    public User getSitter() {
        return this.sitter;
    }

    public void setSitter(User sitter) {
        this.sitter = sitter;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}