package com.booleanuk.api.controller;

import com.booleanuk.api.DTO.LoginRequest;
import com.booleanuk.api.DTO.RegistrationRequest;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Retrieve the user from the database based on the provided username
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user == null) {
            // User not found in the database
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Compare the password from the login request to the user's password stored in the database
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Passwords don't match
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Authentication successful
        // You can generate and return a token, set session attributes, or perform any other authentication-related tasks here

        return ResponseEntity.ok("Authentication successful");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest) {
        // Check if the username already exists in the database
        if (userRepository.findByUsername(registrationRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Hash the password using BCrypt
        String hashedPassword = passwordEncoder.encode(registrationRequest.getPassword());

        // Create a new user entity with the hashed password
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(hashedPassword);
        user.setEmail(registrationRequest.getEmail());

        // Save the user to the database
        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }
}