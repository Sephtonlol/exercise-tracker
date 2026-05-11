import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput } from '@ionic/angular/standalone';
import { Sets } from 'src/app/services/sets';

@Component({
  selector: 'app-create-set',
  standalone: true,
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.scss'],
  imports: [FormsModule, IonInput, IonButton],
})
export class CreateSetComponent {
  exerciseId = '';
  weight = 0;
  repetitions = 0;

  constructor(private readonly setsService: Sets) {}

  createSet(): void {
    if (!this.exerciseId) {
      return;
    }

    this.setsService.createSet(this.exerciseId, this.weight, this.repetitions);

    this.weight = 0;
    this.repetitions = 0;
  }
}
