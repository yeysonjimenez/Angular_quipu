import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../services/firebase.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data = [];
  public sell: number = null;
  public new_tokens: number = null;
  public price: number = null;
  public id = '';
  public currentStatus = 1;
  public congratulations: boolean = true;

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.data = this.router.getCurrentNavigation().extras.state.example;
    this.id = this.router.getCurrentNavigation().extras.state.ejemplo2;
  }

  ngOnInit() {
   // console.log(this.data['tokens'] - this.sell);
   // console.log(this.id);
   // console.log(this.data);
  }

  onClickMe() {
   this.congratulations = false;
    this.updateUserFunc(this.id);
  }

  updateUserFunc(documentId){
    this.new_tokens = this.data['tokens'] - this.sell;
   this.data['tokens'] = this.new_tokens;
   this.data['sold_price'] = this.price;
    console.log(this.data);
    this.firebaseService.updateUser(documentId, this.data).then((user) => {
      this.currentStatus = 1;
      console.log('Documento editado exitósamente');
      this.sell = null;
      this.price = null;
    }, (error) => {
      console.log(error);
    });
  }
  onLoOut(){
    this.router.navigate(['/login']);
  }

}
