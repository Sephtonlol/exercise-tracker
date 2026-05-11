import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { Exercises } from 'src/app/services/exercises';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss'],
  imports: [IonInput, IonSelect, IonSelectOption, IonButton, FormsModule],
})
export class CreateExerciseComponent implements OnInit {
  exerciseName = '';
  target = '';

  constructor(
    private exercisesService: Exercises,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  /**
   * Check if all required fields are filled
   */
  isFormValid(): boolean {
    return this.exerciseName.trim() !== '' && this.target.trim() !== '';
  }

  /**
   * Save the exercise and close the modal
   */
  async saveExercise(): Promise<void> {
    if (!this.isFormValid()) {
      return;
    }

    this.exercisesService.createExercise(this.exerciseName, this.target);
    await this.modalCtrl.dismiss();
  }
}
