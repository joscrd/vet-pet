import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [PetService]
})

export class DetailComponent implements OnInit {
  public url: string;
  public pet: Pet;
  public confirm: boolean;


  constructor(
    private _petService: PetService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getPet(id);
    });
  }

  getPet(id){
  	this._petService.getPet(id).subscribe(
  		response => {
  			this.pet = response.pet;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  deletePet(id){
    this._petService.deletePet(id).subscribe(
      response => {
        if(response.pet){
          this._router.navigate(['/pets']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

}

