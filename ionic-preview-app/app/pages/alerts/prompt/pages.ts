import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: './build/pages/alerts/prompt/template.html'
})
export class PromptPage {

  constructor(private alerCtrl: AlertController) {}

  doPrompt() {
    let prompt = this.alerCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        }, {
          name: 'name',
          placeholder: 'Name',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked', data);
          }
        }, {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked ' , data);
          }
        }
      ]
    });

    prompt.present();
  }
}