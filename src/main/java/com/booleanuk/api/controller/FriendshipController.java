package com.booleanuk.api.controller;

import com.booleanuk.api.FriendshipDTO;
import com.booleanuk.api.model.Friendship;
import com.booleanuk.api.model.User;
import com.booleanuk.api.service.FriendshipService;
import com.booleanuk.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friendships")
public class FriendshipController {
    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Friendship>> getAllFriendships() {
        return ResponseEntity.ok(friendshipService.getAllFriendships());
    }

    @GetMapping("{id}")
    public ResponseEntity<Friendship> getFriendshipById(@PathVariable int id) {
        return ResponseEntity.ok(friendshipService.getFriendshipById(id));
    }

    @PostMapping
    public ResponseEntity<Friendship> createFriendship(@RequestBody FriendshipDTO friendshipDTO) {
        int userId1 = friendshipDTO.getUserId1();
        int userId2 = friendshipDTO.getUserId2();
        User user1 = userService.getUserById(userId1);
        User user2 = userService.getUserById(userId2);
        return ResponseEntity.ok(friendshipService.createFriendship(user1, user2));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Friendship> updateFriendship(@PathVariable("id") int id, @RequestBody Friendship updatedFriendship) {
        return ResponseEntity.ok(friendshipService.updateFriendship(id, updatedFriendship));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Friendship> deleteFriendship(@PathVariable("id") int id) {
        return ResponseEntity.ok(friendshipService.deleteFriendship(id));
    }
}