package com.booleanuk.api.service;

import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Integer id, User updatedUser, MultipartFile imageFile) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
        if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty())
            existingUser.setUsername(updatedUser.getUsername());
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty())
            existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty())
            existingUser.setPassword(updatedUser.getPassword());

        try {
            if (imageFile != null) {
                byte[] imageData = IOUtils.toByteArray(imageFile.getInputStream());
                existingUser.setImageData(imageData);
            }
            User savedUser = userRepository.save(existingUser);

            entityManager.flush();
            return savedUser;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving image.");
        }
    }

    public User deleteUser(Integer id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
        userRepository.delete(existingUser);
        return existingUser;
    }
}