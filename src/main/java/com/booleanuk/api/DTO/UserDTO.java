package com.booleanuk.api.DTO;

import com.booleanuk.api.model.Friendship;

import java.util.List;

public class UserDTO {
    public int id;
    public String username;
    public String email;
    public List<Friendship> friends;
}
