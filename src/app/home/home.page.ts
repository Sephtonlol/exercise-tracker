import { Component, ViewChild } from '@angular/core';
import {
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
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CreateExerciseComponent } from '../components/modals/create-exercise/create-exercise.component';
import { Exercises } from '../services/exercises';
import { Exercise } from '../interfaces/exercise.interface';
import { ExerciseTileComponent } from '../components/exercise-tile/exercise-tile.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
    ExerciseTileComponent,
  ],
})
export class HomePage {
  gridColumns = 2;

  constructor(private exercisesService: Exercises) {
    addIcons({
      add,
    });
    this.exercises = exercisesService.getExercises();
  }
  @ViewChild('nav') private nav!: IonNav;

  exercises!: Exercise[];

  onWillPresent() {
    this.nav.setRoot(CreateExerciseComponent);
  }
}
