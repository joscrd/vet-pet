import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: '../new-pet/new-pet.component.html',
  styleUrls: ['./update.component.css'],
  providers: [PetService, UploadService]
})
export class UpdateComponent implements OnInit {

  public title: string;
  public pet: Pet;
  public save_pet;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  
  constructor(
    private _petService: PetService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { 
    this.title = "Update Pet";
    this.url = Global.url;
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

  onSubmit(){
    this._petService.updatePet(this.pet).subscribe(
      response => {
        if(response.pet){

          // Upload image
          if(this.filesToUpload){
          this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.pet._id,[], this.filesToUpload, "image")
          .then((result:any) => { 
            this.save_pet = result.pet;
            this.status = 'success';
            //this.btnDisabled = false;
          
          });
          } else{
            this.save_pet = response.pet;
            this.status = 'success';
          }

       } else {
         this.status = 'failed';
       }
  		},
  		error => {
  			console.log(<any>error);
  		}
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

