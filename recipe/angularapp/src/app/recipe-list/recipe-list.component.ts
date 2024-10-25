import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  successMessage: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private readonly recipeService: RecipeService, private readonly router: Router) { }

  ngOnInit(): void {
    this.refreshRecipes();
  }

  // Load all recipes
  refreshRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (data: Recipe[]) => this.recipes = data,
      (error) => console.error('Error fetching recipes:', error)
    );
  }

  // Delete a recipe and refresh the list
  deleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id).subscribe(
      () => {
        this.successMessage = 'Recipe deleted successfully!';
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        setTimeout(() => this.successMessage = "", 2000);
      },
      (error) => {
        console.error('Error deleting recipe:', error);
      }
    );
  }

  // Toggle sorting direction and sort recipes by title
  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.recipes.sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }
}
