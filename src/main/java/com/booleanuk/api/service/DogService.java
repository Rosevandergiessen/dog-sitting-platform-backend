package com.booleanuk.api.service;

import com.booleanuk.api.DTO.DogDTO;
import com.booleanuk.api.model.Dog;
import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DogService {
    @Autowired
    private DogRepository dogRepository;


    public List<DogDTO> getAllDogs() {
        List<Dog> dogs = dogRepository.findAll();
        return dogs.stream()
                .map(dog -> {
                    DogDTO dogDto = new DogDTO();
                    dogDto.setId(dog.getId());
                    dogDto.setName(dog.getName());
                    dogDto.setBreed(dog.getBreed());
                    dogDto.setAge(dog.getAge());
                    dogDto.setUser(dog.getUser());
                    dogDto.setDescription(dog.getDescription());
                    return dogDto;
                })
                .collect(Collectors.toList());
    }

    public List<Dog> getDogsByOwnerId(int userId) {
        return dogRepository.findByUserId(userId);
    }

    public Dog getDogById(int id) {
        return dogRepository.findById(id).orElse(null);
    }

    public Dog createDog(Dog dog) {
        return dogRepository.save(dog);
    }

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

    public Dog saveDogWithImage(String name, MultipartFile image) throws IOException {
        Dog dog = new Dog();
        dog.setName(name);

        if (image != null && !image.isEmpty()) {
            dog.setImage(image.getBytes());
        }
        return dogRepository.save(dog);
    }

    public DogDTO getDogDtoWithOwner(int dogId) {
        Optional<Dog> optionalDog = dogRepository.findById(dogId);
        if (optionalDog.isPresent()) {
            Dog dog = optionalDog.get();
            User user = dog.getUser();
            DogDTO dogDto = new DogDTO();
            dogDto.setId(dog.getId());
            dogDto.setName(dog.getName());
            dogDto.setBreed(dog.getBreed());
            dogDto.setAge(dog.getAge());
            dogDto.setDescription(dog.getDescription());
            dogDto.setUser(user);
            return dogDto;
        }
        return null;
    }
}