import { Component, DestroyRef, ViewChild } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  exercises: Exercise[] = [];

  constructor(
    private exercisesService: Exercises,
    private destroyRef: DestroyRef,
  ) {
    addIcons({
      add,
    });
    this.exercisesService.exercises$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((exercises) => {
        this.exercises = exercises;
      });
  }
  @ViewChild('nav') private nav!: IonNav;

  onWillPresent() {
    this.nav.setRoot(CreateExerciseComponent);
  }
}
