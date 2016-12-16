import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user : User = {
    name: "",
    username: "",
    email: "",
    password: ""
  }

  confirmPassword: string;
  url: string;
  headers: Headers;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http) {
      this.headers = new Headers();
      this.headers.append("X-Parse-Application-Id","AppId1");
      this.headers.append("X-Parse-REST-API-Key","restAPIKey");

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToLogin(){
    this.navCtrl.pop();
  }

  signup(){
    if(this.user.password != this.confirmPassword){
      this.alertCtrl.create({
        title: "Error",
        message: "Password does not match",
        buttons: ['Ok']
      }).present();
      return;
    }
    this.url = "https://ionicwithparse-dynk.c9users.io/app1/users";
    this.http.post(this.url, this.user, {headers: this.headers})
    .map(res => res.json())
    .subscribe(res => {
      this.alertCtrl.create({
        title: "Success",
        message: "Account has been created",
        buttons: [{
          text: 'Login',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      }).present();

      console.log(res);

    },
  err =>{
    this.alertCtrl.create({
      title: "Error",
      message: err.text(),
      buttons: ['Ok']
    }).present();


    console.log(err);
  })


  }

}
