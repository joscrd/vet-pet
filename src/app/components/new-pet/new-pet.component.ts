import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css'],
  providers: [PetService, UploadService]
})
export class NewPetComponent implements OnInit {
  public title: string;
  public pet: Pet;
  public save_pet;
  public status: string;
  public filesToUpload: Array<File>;
  public date: Date;
  //public btnDisabled: boolean;

  constructor(
    private _petService: PetService,
    private _uploadService: UploadService,
    //@Inject(DOCUMENT) private _document: Document
  ) { 
    this.title = "Create a project";
    this.date = new Date(Date.now());
    this.pet = new Pet('','','','','','','','', this.date);
    //this.btnDisabled = true;
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    // Save data
    this._petService.savePet(this.pet).subscribe(
      response => {
        if(response.pet){

          // Upload image
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.pet._id,[], this.filesToUpload, "image")
            .then((result:any) => { 
              this.save_pet = result.pet;
              this.status = 'success';
              form.reset();
              //this.btnDisabled = false;
            
            });
            } else{
              this.save_pet = response.pet;
              this.status = 'success';
              form.reset();
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

  /*refresh() {
    this._document.defaultView.location.reload();
    
  }*/
}

