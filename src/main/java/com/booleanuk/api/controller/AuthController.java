package com.booleanuk.api.controller;

import com.booleanuk.api.DTO.LoginRequest;
import com.booleanuk.api.DTO.RegistrationRequest;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        try {
            // Create an authentication token with the provided username and password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            // Set the authenticated token in the SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // You can perform additional tasks if needed (e.g., generating a JWT token)

            // Authentication successful
            return ResponseEntity.ok("Login successful");
        } catch (UsernameNotFoundException e) {
            // Unknown username
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Unknown username\"}");
        } catch (Exception e) {
            // Incorrect password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Incorrect password\"}");
        }
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