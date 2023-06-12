package com.booleanuk.api.model;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "dog_sitters")
@PrimaryKeyJoinColumn(name = "user_id")
public class DogSitter extends User {

    @ManyToMany(mappedBy = "dogSitters")
    private List<DogOwner> dogOwners;

    @OneToMany(mappedBy = "sitter", cascade = CascadeType.ALL)
    private List<DogSittingRequest> dogSittingRequests;

    // Constructors
    public DogSitter() {
        super();
    }
}

