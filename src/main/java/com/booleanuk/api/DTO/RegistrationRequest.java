package com.booleanuk.api.DTO;

public record RegistrationRequest(String username, String email, String password) {
        public String getUsername() {
            return username;
        }
        public String getEmail() {
            return email;
        }
        public String getPassword() {
            return password;
        }
}
