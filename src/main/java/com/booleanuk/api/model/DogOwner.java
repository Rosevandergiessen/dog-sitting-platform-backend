package com.booleanuk.api.model;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "dog_owners")
@PrimaryKeyJoinColumn(name = "user_id")
public class DogOwner extends User {
    // Fields
    @OneToMany(mappedBy = "dogOwner", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
    private List<Dog> dogs;

    @ManyToMany
    @JoinTable(
            name = "dog_owner_dog_sitter",
            joinColumns = @JoinColumn(name = "dog_owner_id"),
            inverseJoinColumns = @JoinColumn(name = "dog_sitter_id")
    )
    private List<DogSitter> dogSitters;

    // Constructors
    public DogOwner() {
        super();
    }

    // Getters & Setters
    public List<Dog> getDogs() {
        return this.dogs;
    }
}
