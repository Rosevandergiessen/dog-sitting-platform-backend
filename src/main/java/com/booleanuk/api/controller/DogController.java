package com.booleanuk.api.controller;

import com.booleanuk.api.model.Dog;
import com.booleanuk.api.service.DogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dogs")
public class DogController {
    @Autowired
    private DogService dogService;

    @GetMapping
    public ResponseEntity<List<Dog>> getDogs() {
        return ResponseEntity.ok(dogService.getAllDogs());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Dog> getDog(@PathVariable int id) {
        return ResponseEntity.ok(dogService.getDogById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dog> updateDog(@PathVariable("id") int id, @RequestBody Dog updatedDog) {
        return ResponseEntity.ok(dogService.updateDog(id, updatedDog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Dog> deleteDog(@PathVariable("id") int id) {
        return ResponseEntity.ok(dogService.deleteDog(id));
    }
}
