package com.booleanuk.api.service;

import com.booleanuk.api.DTO.DogDTO;
import com.booleanuk.api.model.Dog;

import com.booleanuk.api.model.User;
import com.booleanuk.api.repository.DogRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DogService {
    @Autowired
    private DogRepository dogRepository;

    @PersistenceContext
    private EntityManager entityManager;

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
                    dogDto.setImage(dog.getImageData());
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

    @Transactional
    public Dog createDog(Dog dog, MultipartFile imageFile) {
        try {
            byte[] imageData = IOUtils.toByteArray(imageFile.getInputStream());
            dog.setImageData(imageData);
            Dog savedDog = dogRepository.save(dog);

            // Commit the transaction explicitly
            entityManager.flush();
            return savedDog;
        } catch (IOException e) {
            // Handle the exception accordingly
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to process the image.");
        }
    }

    @Transactional
    public Dog updateDog(int id, Dog updatedDog, MultipartFile imageFile) {
        Dog existingDog = dogRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog not found."));
        if (updatedDog.getName() != null) {
            existingDog.setName(updatedDog.getName());
        }
        if (updatedDog.getBreed() != null) {
            existingDog.setBreed(updatedDog.getBreed());
        }

        existingDog.setAge(updatedDog.getAge());

        if (updatedDog.getDescription() != null) {
            existingDog.setDescription(updatedDog.getDescription());
        }

        try {
            if (imageFile != null) {
                byte[] imageData = IOUtils.toByteArray(imageFile.getInputStream());
                existingDog.setImageData(imageData);
            }
            Dog savedDog = dogRepository.save(existingDog);

            // Commit the transaction explicitly
            entityManager.flush();
            return savedDog;
        } catch (IOException e) {
            // Handle the exception accordingly
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to process the image.");
        }
    }

    public Dog deleteDog(int id) {
       Dog existingDog = dogRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dog not found."));
       dogRepository.delete(existingDog);
       return existingDog;
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
            dogDto.setImage(dog.getImageData());
            return dogDto;
        }
        return null;
    }
}