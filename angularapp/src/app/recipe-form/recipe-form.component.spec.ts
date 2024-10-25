import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeFormComponent } from './recipe-form.component';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let mockRecipeService;
  let mockActivatedRoute;
  let mockRouter;

  beforeEach(async () => {
    mockRecipeService = jasmine.createSpyObj(['getRecipe', 'createRecipe', 'updateRecipe']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RecipeFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should_load_recipe_for_editing_if_id_is_present_in_the_route', () => {
    const mockRecipe = { id: 1, title: 'Test Recipe', ingredients: 'Test Ingredients', instructions: 'Test Instructions' };
    mockRecipeService.getRecipe.and.returnValue(of(mockRecipe));

    fixture.detectChanges();

    expect(component.isEdit).toBeTrue();
    expect(component.recipe).toEqual(mockRecipe);
    expect(mockRecipeService.getRecipe).toHaveBeenCalledWith(1);
  });

  fit('should_handle_error_when_loading_recipe_for_editing_fails', () => {
    spyOn(console, 'error');
    mockRecipeService.getRecipe.and.returnValue(throwError('Error loading recipe'));

    fixture.detectChanges();

    expect(component.isEdit).toBeTrue();
    expect(console.error).toHaveBeenCalledWith('Error loading recipe:', 'Error loading recipe');
  });

  fit('should_create_a_new_recipe_when_form_is_submitted_and_isEdit_is_false', () => {
    component.isEdit = false;
    mockRecipeService.createRecipe.and.returnValue(of({}));
  
    component.saveRecipe();
  
    expect(mockRecipeService.createRecipe).toHaveBeenCalledWith(component.recipe);
    expect(component.successMessage).toBe('Recipe created successfully!');
  });
  
  fit('should_update_an_existing_recipe_when_form_is_submitted_and_isEdit_is_true', () => {
    component.isEdit = true;
    component.recipe.id = 1;
    mockRecipeService.updateRecipe.and.returnValue(of({}));
  
    component.saveRecipe();
  
    expect(mockRecipeService.updateRecipe).toHaveBeenCalledWith(1, component.recipe);
    expect(component.successMessage).toBe('Recipe updated successfully!');
  });
  
  fit('should_handle_error_when_creating_a_new_recipe_fails', () => {
    spyOn(console, 'error');
    component.isEdit = false;
    mockRecipeService.createRecipe.and.returnValue(throwError('Error creating recipe'));
  
    component.saveRecipe();
  
    expect(console.error).toHaveBeenCalledWith('Error creating recipe:', 'Error creating recipe');
  });
  
  fit('should_handle_error_when_updating_a_recipe_fails', () => {
    spyOn(console, 'error');
    component.isEdit = true;
    component.recipe.id = 1;
    mockRecipeService.updateRecipe.and.returnValue(throwError('Error updating recipe'));
  
    component.saveRecipe();
  
    expect(console.error).toHaveBeenCalledWith('Error updating recipe:', 'Error updating recipe');
  });

  fit('should_display_correct_title_based_on_isEdit_value', () => {
    const mockRecipe = { title: 'Test Recipe', ingredients: 'Test Ingredients', instructions: 'Test Instructions' };
  
    // Set up the mock to return the mock recipe when getRecipe is called
    mockRecipeService.getRecipe.and.returnValue(of(mockRecipe));
  
    component.isEdit = true;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Edit Recipe');
  
    component.isEdit = false;
    fixture.detectChanges();
    expect(header.textContent).toContain('Add New Recipe');
  });
});
