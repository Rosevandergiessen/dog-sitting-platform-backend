package com.booleanuk.api.service;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.User;
import com.booleanuk.api.model.Friendship;
import com.booleanuk.api.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;


    public Friendship createFriendship(User user1, User user2) {
        Friendship friendship = new Friendship(user1, user2);
        return friendshipRepository.save(friendship);
    }

    public List<Friendship> getAllFriendships() {
        return friendshipRepository.findAll();
    }

    public Friendship getFriendshipById(int id) {
        return friendshipRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Friendship not found."));
    }

    public List<Friendship> getFriendshipsByUserId(int userId) {
        return friendshipRepository.findByUser1Id(userId);
    }

    public Friendship updateFriendship(int id, Friendship updatedFriendship) {
        Friendship existingFriendship = friendshipRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Friendship not found."));
        existingFriendship.setUser1(updatedFriendship.getUser1());
        existingFriendship.setUser2(updatedFriendship.getUser2());
        return friendshipRepository.save(existingFriendship);
    }

    public Friendship deleteFriendship(int id) {
        Friendship existingFriendship = friendshipRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Friendship not found."));
        friendshipRepository.delete(existingFriendship);
        return existingFriendship;
    }
}