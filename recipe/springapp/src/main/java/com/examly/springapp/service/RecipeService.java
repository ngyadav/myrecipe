package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Recipe;

public interface RecipeService {
    List<Recipe> getAllRecipes();
    Recipe getRecipeById(Long id);
    Recipe createRecipe(Recipe recipe);
    Recipe updateRecipe(Long id, Recipe recipe);
    void deleteRecipe(Long id);
    List<Recipe> searchRecipes(String keyword);

}
