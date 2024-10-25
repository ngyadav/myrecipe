package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe,Long>{
    
    List<Recipe> findByTitleContainingIgnoreCase(String keyword);
    
}
