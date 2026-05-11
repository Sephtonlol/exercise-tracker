import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonNav,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CreateSetComponent } from '../create-set/create-set.component';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButtons,
    IonButton,
    IonContent,
    IonNav,
  ],
})
export class ExerciseDetailsComponent implements OnInit {
  constructor() {}
  @ViewChild('nav') private nav!: IonNav;

  ngOnInit() {}

  onWillPresent() {
    this.nav.setRoot(CreateSetComponent);
  }
}
