// Rutes and providers
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Project components
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { NewPetComponent } from './components/new-pet/new-pet.component';
import { DetailComponent } from './components/detail/detail.component';
import { UpdateComponent } from './components/update/update.component';
import { ErrorComponent } from './components/error/error.component';


// Routing for project components

// This array contains the component routes
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'pets', component: PetsComponent},
    {path: 'new-pet', component: NewPetComponent},
    {path: 'pet/:id', component: DetailComponent},
    {path: 'update-pet/:id', component: UpdateComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
