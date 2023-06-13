package com.booleanuk.api.repository;

import com.booleanuk.api.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> { }