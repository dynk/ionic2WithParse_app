import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-page',
  templateUrl: 'list-page.html'
})
export class ListPage {

  headers: Headers;
  url: string;
  friends: any[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http) {
      this.headers = new Headers();
      this.headers.append("X-Parse-Application-Id","AppId1");
      this.headers.append("X-Parse-REST-API-Key","restAPIKey");
      this.getFriends();
    }

  showAddDialog(){
    console.log("Button show dialog clicked");
    this.alertCtrl.create({
      title: "Add Friend",
      message: "Enter the information",
      inputs: [{
        name: 'name',
        placeholder: 'Enter the name'
      },{
        name: 'email',
        placeholder: 'Enter the emails'
      },{
        name: 'number',
        placeholder: 'enter the number'
      }],
      buttons: [{
        text: "Cancel"
      },{
        text: "Save",
        handler: data => {
          //post the information
          this.url = "https://ionicwithparse-dynk.c9users.io/app1/classes/friendslist";

          this.http.post(this.url,{ name: data.name, email: data.email, number: data.number, image: "http://lorempixel.com/32/32" }, {headers: this.headers}).map(res => res.json())
          .subscribe(res => {
            console.log(res);
            this.alertCtrl.create({
              title: "Success",
              message: "Info saved",
              buttons: [{
                text: "OK",
                handler: () =>{

                }
              }]
            }).present();

          }, err => {
            console.log(err);
            this.alertCtrl.create({
              title: "error",
              message: err.text(),
              buttons: [{
                text: "OK"
              }]
            }).present();
          })
        }
      }]
    }).present();
  }

  getFriends(){

    this.url = "https://ionicwithparse-dynk.c9users.io/app1/classes/friendslist";

    this.http.get(this.url, {headers: this.headers}).map(res => res.json()).subscribe(res => {
      console.log(res);
      this.friends = res.results;
    }, err => {
      this.alertCtrl.create({
        title: "error",
        message: err.text(),
        buttons: [{
          text: 'OK'
        }]
      }).present();
    })

  }

}
