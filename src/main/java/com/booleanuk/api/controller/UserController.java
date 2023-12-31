package com.booleanuk.api.controller;
import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.Friendship;
import com.booleanuk.api.model.User;
import com.booleanuk.api.service.DogService;
import com.booleanuk.api.service.FriendshipService;
import com.booleanuk.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private DogService dogService;

    @Autowired
    private FriendshipService friendshipService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("{id}/dogs")
    public ResponseEntity<List<Dog>> getDogsByOwnerId(@PathVariable int id) {
    return ResponseEntity.ok(dogService.getDogsByOwnerId(id));
    }

    @GetMapping("{id}/friends")
    public ResponseEntity<List<Friendship>> getFriendsByUserId(@PathVariable int id) {
    return ResponseEntity.ok(friendshipService.getFriendshipsByUserId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable("id") int id,
            @ModelAttribute User updatedUser,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
            ) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser, imageFile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}