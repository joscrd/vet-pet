import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  providers: [PetService]
})
export class PetsComponent implements OnInit {
  public pets: Pet[];
  public url: string;

  constructor(
    private _petService: PetService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this._petService.getPets().subscribe(res => {
      if(res.pets) { 
        this.pets = res.pets;
      }
       
    },
    
    error => {
      console.log(<any>error); 
    }
    ); 
  }

}
