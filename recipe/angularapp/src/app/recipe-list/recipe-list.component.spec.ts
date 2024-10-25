import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../service/recipe.service';
import { Router } from '@angular/router';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipeService: RecipeService;
  let router: Router;

  beforeEach(async () => {
    const recipeServiceStub = {
      getRecipes: jasmine.createSpy('getRecipes').and.returnValue(of([
        { id: 1, title: 'Spaghetti Carbonara', ingredients: 'Spaghetti, Eggs, Parmesan', instructions: 'Cook spaghetti, mix with eggs and cheese.' },
        { id: 2, title: 'Chicken Alfredo', ingredients: 'Chicken, Fettuccine, Cream', instructions: 'Cook chicken, mix with fettuccine and cream.' }
      ])),
      deleteRecipe: jasmine.createSpy('deleteRecipe').and.returnValue(of(void 0)) // Mocking void return type
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);

    // Use the RouterTestingModule to configure the router in tests
    const routerSpy = spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    recipeService = TestBed.inject(RecipeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should_load_recipes_on_initialization', () => {
    component.ngOnInit();
    expect(recipeService.getRecipes).toHaveBeenCalled();
    expect(component.recipes.length).toBe(2);
  });

  fit('should_display_success_message_after_deletion', () => {
    component.deleteRecipe(1);
    expect(recipeService.deleteRecipe).toHaveBeenCalledWith(1);
    expect(component.successMessage).toBe('Recipe deleted successfully!');
  });

  fit('should_format_recipe_ingredients_and_instructions_correctly', () => {
    component.recipes = [
      { id: 1, title: 'Spaghetti Carbonara', ingredients: 'Spaghetti\nEggs\nParmesan', instructions: 'Cook spaghetti\nMix with eggs and cheese' }
    ];
    fixture.detectChanges();
    const ingredientsElement = fixture.nativeElement.querySelector('tbody tr td:nth-child(2) pre');
    const instructionsElement = fixture.nativeElement.querySelector('tbody tr td:nth-child(3) pre');
    expect(ingredientsElement.textContent).toBe('Spaghetti\nEggs\nParmesan');
    expect(instructionsElement.textContent).toBe('Cook spaghetti\nMix with eggs and cheese');
  });

  fit('should_display_an_edit_button_for_each_recipe', () => {
    fixture.detectChanges();
  
    const editButtons = fixture.nativeElement.querySelectorAll('a.btn-warning');
    expect(editButtons.length).toBe(2);
  
    // Verify the href of the first edit button
    expect(editButtons[0].getAttribute('href')).toBe('/edit/1');
    // Verify the href of the second edit button
    expect(editButtons[1].getAttribute('href')).toBe('/edit/2');
  });

  fit('should_call_deleteRecipe_method_on_delete_button_click', () => {
    spyOn(component, 'deleteRecipe'); // Spy on the delete method
    fixture.detectChanges(); // Ensure changes are applied
  
    const deleteButton = fixture.nativeElement.querySelector('button.btn-danger');
    expect(deleteButton).toBeTruthy(); // Ensure the button is present
  
    deleteButton.click(); // Simulate the click
    expect(component.deleteRecipe).toHaveBeenCalledWith(1); // Verify the method was called with the correct ID
  });
});