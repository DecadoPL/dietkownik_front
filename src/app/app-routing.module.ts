import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietDetailsComponent } from './components/diet/diet-details/diet-details.component';
import { DietDishDetailsComponent } from './components/diet/diet-dish-details/diet-dish-details.component';
import { DietListComponent } from './components/diet/diet-list/diet-list.component';
import { DietRequirementsDetailsComponent } from './components/diet/diet-requirements-details/diet-requirements-details.component';
import { DietRequirementsListComponent } from './components/diet/diet-requirements-list/diet-requirements-list.component';
import { DishDetailsComponent } from './components/dish/dish-details/dish-details.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { HomeComponent } from './components/home/home.component';
import { IngredientDetailsComponent } from './components/ingredient/ingredient-details/ingredient-details.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import { SharedManagementComponent } from './components/shared-management/shared-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';


const routes: Routes = [

  { path: 'user', component: UserProfileComponent},
  
  { path: 'ingredients', component: IngredientListComponent},
  { path: 'ingredients/new', component: IngredientDetailsComponent},
  { path: 'ingredients/:id', component: IngredientDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'sharedManagement', component: SharedManagementComponent},

  { path: 'dishes', component: DishListComponent},
  { path: 'dishes/:id', component: DishDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'diets', component: DietListComponent},
  { path: 'diets/new', component: DietDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'diets/:dietId', component: DietDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'diets/:dietId/:dayId/:dishId', component: DietDishDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'dietRequirements', component: DietRequirementsListComponent},
  { path: 'dietRequirements/new', component: DietRequirementsDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'dietRequirements/:id', component: DietRequirementsDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

