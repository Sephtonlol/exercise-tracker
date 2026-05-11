import { Component, Input } from '@angular/core';
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
  @Input() exerciseId = '';
  weight = '';
  repetitions = '';
  readonly weightPlaceholder = 0;
  readonly repetitionsPlaceholder = 0;

  constructor(private readonly setsService: Sets) {}

  createSet(): void {
    if (!this.exerciseId) {
      return;
    }

    const weight = this.resolveNumericInput(
      this.weight,
      this.weightPlaceholder,
    );
    const repetitions = this.resolveNumericInput(
      this.repetitions,
      this.repetitionsPlaceholder,
    );

    this.setsService.createSet(this.exerciseId, weight, repetitions);

    this.weight = '';
    this.repetitions = '';
  }

  private resolveNumericInput(
    value: string | number,
    fallback: number,
  ): number {
    const stringValue = typeof value === 'string' ? value : String(value ?? '');

    if (stringValue.trim() === '') {
      return fallback;
    }

    const parsed = Number(stringValue);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
}
