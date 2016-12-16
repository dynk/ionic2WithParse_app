import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'
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
  userId: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public localStorage: Storage) {
      this.headers = new Headers();
      this.headers.append("X-Parse-Application-Id","AppId1");
      this.headers.append("X-Parse-REST-API-Key","restAPIKey");
      this.localStorage.get('user').then((value)=>{
        this.userId = value;
        this.getFriends(null);
      })

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

          this.http.post(this.url,{ owner: this.userId, name: data.name, email: data.email, number: data.number, image: "http://lorempixel.com/32/32" }, {headers: this.headers}).map(res => res.json())
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
            this.getFriends(null);
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

  getFriends(refresher){

    this.url = 'https://ionicwithparse-dynk.c9users.io/app1/classes/friendslist?where={"owner":"'+this.userId+'"}';

    this.http.get(this.url, {headers: this.headers}).map(res => res.json()).subscribe(res => {
      console.log(res);
      this.friends = res.results;

      if(refresher !== null)
        refresher.complete();

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

  editFriend(friend){

    this.alertCtrl.create({
      title: "Edit Friend",
      message: "Edit your friend",
      inputs: [{
        name: 'name',
        placeholder: 'Enter the name',
        value: friend.name
      },{
        name: 'email',
        placeholder: 'Enter the emails',
        value: friend.email
      },{
        name: 'number',
        placeholder: 'enter the number',
        value: friend.number
      }],
      buttons: [{
        text: "Cancel"
      },{
        text: "Save",
        handler: data => {
          // perform update
          this.url = 'https://ionicwithparse-dynk.c9users.io/app1/classes/friendslist/'+friend.objectId;

          this.http.put(this.url,{name: data.name, email: data.email, number: data.number},{headers: this.headers}).map(res => res.json()).subscribe(
            res => {
              console.log(res);
              this.alertCtrl.create({
                title: "Success",
                message: "Friend updated",
                buttons: [{
                  text: "Ok",
                  handler: () => {
                    this.getFriends(null);
                  }
                }]
              }).present();

            },
            err =>{
              console.log(err);
            }
          )
        }
      }]
    }).present();

  }

  deleteFriend(friend){
    this.alertCtrl.create({
      title: "Delete Friend?",
      message: "Delete your friend",
      buttons: [{
        text: "No"
      },{
        text: "Yes",
        handler: () => {
          // perform update
          this.url = 'https://ionicwithparse-dynk.c9users.io/app1/classes/friendslist/'+friend.objectId;

          this.http.delete(this.url,{headers: this.headers}).map(res => res.json()).subscribe(
            res => {
              console.log(res);
              this.alertCtrl.create({
                title: "Success",
                message: "Friend deleted",
                buttons: [{
                  text: "Ok",
                  handler: () => {
                    this.getFriends(null);
                  }
                }]
              }).present();

            },
            err =>{
              console.log(err);
            }
          )
        }
      }]
    }).present();

  }
  logout(){
    this.localStorage.remove('user').then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
