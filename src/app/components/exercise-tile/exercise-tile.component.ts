import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonNav,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { ExerciseDetailsComponent } from '../modals/exercise-details/exercise-details.component';

@Component({
  selector: 'app-exercise-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.scss'],
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonNav,
    ExerciseDetailsComponent,
  ],
})
export class ExerciseTileComponent implements OnInit {
  constructor() {}
  @ViewChild('nav') private nav!: IonNav;

  onWillPresent() {
    this.nav.setRoot(ExerciseDetailsComponent);
  }

  @Input() exercise!: Exercise;

  ngOnInit() {}
}
