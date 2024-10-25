import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe = { id: null, title: '', ingredients: '', instructions: '' };
  isEdit: boolean = false;
  successMessage: string = '';
  check: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.isEdit = true;
      this.loadRecipe(recipeId);
    }
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipe(+id).pipe(
      catchError(err => {
        console.error('Error loading recipe:', err);
        return of(null);
      })
    ).subscribe(recipe => {
      if (recipe) {
        this.recipe = recipe;
      }
    });
  }

  saveRecipe(): void {
    if (this.isEdit) {
      if (!this.check) {
        this.check = true;
        this.recipeService.updateRecipe(this.recipe.id, this.recipe).subscribe(
          () => {
            this.successMessage = 'Recipe updated successfully!';
            setTimeout(() => this.router.navigate(['/recipes']), 2000);
            this.check = false;
          },
          err => {
            console.error('Error updating recipe:', err);
            this.check = false;
          }
        );
      }
    } else {
      if (!this.check) {
        this.check = true;
        this.recipeService.createRecipe(this.recipe).subscribe(
          () => {
            this.successMessage = 'Recipe created successfully!';
            setTimeout(() => this.router.navigate(['/recipes']), 2000);
            this.check = false;
          },
          err => {
            console.error('Error creating recipe:', err);
            this.check = false;
          }
        );
      }
    }
  }

  resetForm(): void {
    this.recipe = { id: null, title: '', ingredients: '', instructions: '' };
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
