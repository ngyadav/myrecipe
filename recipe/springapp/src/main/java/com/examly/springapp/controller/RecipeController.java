package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Recipe;
import com.examly.springapp.service.RecipeService;
import com.examly.springapp.service.RecipeServiceImpl;

@RestController
public class RecipeController {
    
    @Autowired
    private RecipeServiceImpl recipeServiceImpl;

    @PostMapping("/api/recipes")
    public ResponseEntity<?> createRecipeSuccess(@RequestBody Recipe recipe){
         Recipe r = recipeServiceImpl.createRecipe(recipe);
        if(r!=null)
            return new ResponseEntity<>(r,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping("/api/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes(){
        List<Recipe> list = recipeServiceImpl.getAllRecipes();
        if(!list.isEmpty())
            return new ResponseEntity<>(list,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }
    @GetMapping("/api/recipes/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id){
        Recipe r = recipeServiceImpl.getRecipeById(id);
        if(r!=null)
            return new ResponseEntity<>(r,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/api/recipes/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable long id,@RequestBody Recipe recipe){
        Recipe r = recipeServiceImpl.updateRecipe(id,recipe);
        if(r!=null)
            return new ResponseEntity<>(r,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/api/recipes/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        boolean isDeleted = false;
        Recipe recipeBefore = recipeServiceImpl.getRecipeById(id);
        recipeServiceImpl.deleteRecipe(id);
        Recipe recipeAfter = recipeServiceImpl.getRecipeById(id);
        if(recipeBefore!=null && recipeAfter==null){
            isDeleted = true;
        }
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/api/recipes/search")
    public ResponseEntity <List<Recipe>> searchRecipe(@RequestParam String keyword){
        List<Recipe> recipe=recipeServiceImpl.searchRecipes(keyword);
        if(!recipe.isEmpty())
            return new ResponseEntity<>(recipe,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
