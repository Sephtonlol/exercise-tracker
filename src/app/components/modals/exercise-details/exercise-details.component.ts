import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { CreateSetComponent } from '../create-set/create-set.component';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { Set } from 'src/app/interfaces/sets.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sets } from 'src/app/services/sets';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonModal,
    IonButtons,
    IonButton,
    IonContent,
    IonNav,
  ],
})
export class ExerciseDetailsComponent implements OnInit {
  constructor(
    private setsService: Sets,
    private destroyRef: DestroyRef,
  ) {}
  @ViewChild('nav') private nav!: IonNav;

  @Input() exercise!: Exercise;

  sets: Set[] = [];

  ngOnInit() {
    this.setsService.sets$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadSets();
      });

    this.loadSets();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exercise'] && !changes['exercise'].isFirstChange()) {
      this.loadSets();
    }
  }

  private loadSets() {
    if (!this.exercise || !this.exercise.id) {
      this.sets = [];
      return;
    }

    this.sets = this.setsService.getSetsByExercise(this.exercise.id);
  }

  onWillPresent() {
    const exerciseId = this.exercise?.id ?? '';
    this.nav.setRoot(CreateSetComponent, { exerciseId });
  }
}
