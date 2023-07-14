package com.booleanuk.api.controller;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.requests.LoginRequest;
import com.booleanuk.api.requests.RegistrationRequest;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.UserRepository;
import com.booleanuk.api.responses.JwtResponse;
import com.booleanuk.api.security.JwtUtils;
import com.booleanuk.api.service.UserDetailsImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class AuthController {

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public JwtUtils jwtUtils;

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail()));
    }

    @PostMapping("/register")
    public User register(@RequestParam("username") String username,
                                      @RequestParam("email") String email,
                                      @RequestParam("password") String password,
                                      @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        // Hash the password using BCrypt
        String hashedPassword = passwordEncoder.encode(password);

        // Create a new user entity with the hashed password
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setEmail(email);

        // Handle image upload
        if (imageFile != null) {
            try {
                byte[] imageData = IOUtils.toByteArray(imageFile.getInputStream());
                user.setImageData(imageData);
                User savedUser = userRepository.save(user);

                // Commit the transaction explicitly
                entityManager.flush();
                return savedUser;
            } catch (IOException e) {
                // Handle the exception accordingly
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to process the image.");
            }
        } else {
            // Save the user without an image
            return userRepository.save(user);
        }
    }
}