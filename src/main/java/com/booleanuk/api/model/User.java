package com.booleanuk.api.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    // Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "image_data")
    @Lob
    private byte[] imageData;

    @OneToMany(mappedBy = "user", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
    private List<Dog> dogs;

    @OneToMany(mappedBy = "sitter", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
    private List<Request> requests;

    @OneToMany(mappedBy = "user1", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
    private List<Friendship> friendships;

    // Constructors
    public User(){
        super();
    }

    public User(int id){
        super();
        this.id = id;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters & Setters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Dog> getDogs() {
        return this.dogs;
    }

    public void setDogs(List<Dog> dogs) {
        this.dogs = dogs;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}