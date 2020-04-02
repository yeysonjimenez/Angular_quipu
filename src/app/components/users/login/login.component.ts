import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
    ) { }

  public email = '';
  public password = '';
  public mensaje = '';
  public tokens: number = null;
  public users = [];
  public id = '';
  ngOnInit() {
    console.log('This is a init !');

  }

  onLogin(): void {
    console.log(this.email);
    this.onCreateUser();
  }
 getUsers(){
   this.firebaseService.getUsers().subscribe((userSnapshot) => {
     this.users = [];
     userSnapshot.forEach((userData: any) => {
       this.users.push({
         id: userData.payload.doc.id,
         data: userData.payload.doc.data()
       });
     });
   });
   this.checkProfile();
 }

  private checkProfile() {
  }

  onCreateUser(){
    var data = {
      user: this.email,
      pass: Md5.hashStr(this.password),
      tokens: 100,
      purchased_price: 1,
      sold_price: 0,
    };
    this.firebaseService.createUser(data).then((datos) => {
      this.mensaje = 'Usuario creado exitósamente!';
      this.id = datos.id;
      this.router.navigate(['/home'],
        { state: { example: data, ejemplo2: this.id } });
    }, (error) => {
      this.email = error;
      console.error(error);
    });
  }


  onLogout() {
  //  this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.email = 'ya';
  }
}
