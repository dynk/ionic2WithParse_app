import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SignupPage } from '../signup/signup';
import { ListPage } from '../list-page/list-page';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: User = {
    username: "test2",
    password: "123"
  }

  url: string;
  headers: Headers;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","AppId1");
    this.headers.append("X-Parse-REST-API-Key","restAPIKey");

  }

  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }
  login(){
    if(!(this.user.username && this.user.password)){
      this.alertCtrl
      .create({
        title: "Error",
        message: "Check username and password"
      }).present();
      return;
    }
    this.url = "https://ionicwithparse-dynk.c9users.io/app1/login?username="+this.user.username+"&password="+this.user.password;

    this.http.get(this.url,{headers: this.headers}).subscribe(res =>{
      console.log(res);
      //Navigate to other page-login
      this.navCtrl.setRoot(ListPage);
    }, err=>{
      console.log(err);
    })
  }

}
