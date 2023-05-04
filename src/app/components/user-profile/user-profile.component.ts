import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loggedInUser!: User;
  userProfileForm!: FormGroup;
  isFormValid!: boolean;

  constructor(private userService: UserService){}

  ngOnInit(){

    //this.loggedInUser = this.userService.getUser(1);

    this.userProfileForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'name': new FormControl(null),
      'surname': new FormControl(null),
      'gender': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });

    this.userProfileForm.setValue({
      'username': this.loggedInUser.username,
      'name': this.loggedInUser.name,
      'surname': this.loggedInUser.surname,
      'gender': this.loggedInUser.gender,
      'email': this.loggedInUser.email
    })

    this.userProfileForm.statusChanges.subscribe(
      (status) => {
        if(status=="VALID"){
          this.isFormValid = true;
        }else{
          this.isFormValid = false;
        }
      }
        
    )
  }

  onSubmit(){

  }

}
