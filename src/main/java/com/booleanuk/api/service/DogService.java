package com.booleanuk.api.service;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class DogService {
    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private UserService userService;

    public List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    public List<Dog> getDogsByOwnerId(int userId) {
        return dogRepository.findByUserId(userId);
    }

    public Dog getDogById(int id) {
        return dogRepository.findById(id).orElse(null);
    }

    public void setDogOwner(Dog dog, int userId){
        User owner = userService.getUserById(userId);
        dog.setUser(owner);
    }

    public Dog createDog(int id, Dog dog) {
        return dogRepository.save(dog);
    }

//    public Dog createDogByOwnerId(Dog dog) {
//        // Get the currently authenticated user or the user specified in the request
//        User owner = getCurrentUser(); // Implement this method based on your authentication mechanism
//        dog.setOwner(owner);
//        return dogRepository.save(dog);
//    }

    public Dog updateDog(int id, Dog updatedDog) {
        Dog existingDog = dogRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog not found."));
        existingDog.setName(updatedDog.getName());
        existingDog.setBreed(updatedDog.getBreed());
        existingDog.setAge(updatedDog.getAge());
        existingDog.setDescription(updatedDog.getDescription());
        return dogRepository.save(existingDog);
    }

    public Dog deleteDog(int id) {
       Dog existingDog = dogRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog not found."));
       dogRepository.delete(existingDog);
       return existingDog;
    }
}
