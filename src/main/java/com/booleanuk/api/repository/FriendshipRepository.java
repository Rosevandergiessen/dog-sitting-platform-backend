package com.booleanuk.api.repository;


import com.booleanuk.api.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    List<Friendship> findByUser1Id(int userId);
    List<Integer> findUser2IdByUser1Id(int userId);
}