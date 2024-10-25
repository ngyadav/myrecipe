package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Recipe;
import com.examly.springapp.repository.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    @Override
    public Recipe getRecipeById(Long id) {
        if(recipeRepository.existsById(id)){
            return recipeRepository.findById(id).get();
        }
        return null;      
    }

    @Override
    public Recipe createRecipe(Recipe recipe) {
        if(recipe!=null){
            recipeRepository.save(recipe);
            return recipe;
        }
        return null;
    }

    @Override
    public Recipe updateRecipe(Long id, Recipe recipe) {
        if(recipeRepository.existsById(id)){
        recipe.setId(id);
        return recipeRepository.save(recipe);
        }
        return null;
    }

    @Override
    public void deleteRecipe(Long id) {
        if(recipeRepository.existsById(id)){
            recipeRepository.deleteById(id);
            System.out.println("Recipe deleted successfully");
        }else{
            System.out.println("Recipe not found");
        }
    }

    @Override
    public List<Recipe> searchRecipes(String keyword) { 
        return recipeRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
