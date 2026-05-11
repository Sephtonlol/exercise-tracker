import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';

@Injectable({
  providedIn: 'root',
})
export class Exercises {
  private readonly STORAGE_KEY = 'exercises';

  constructor() {}

  /**
   * Get all exercises from storage
   */
  getExercises(): Exercise[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Create a new exercise
   */
  createExercise(name: string, target: string): Exercise {
    const exercise: Exercise = {
      id: this.generateId(),
      name,
      target,
      favorite: false,
    };

    const exercises = this.getExercises();
    exercises.push(exercise);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exercises));

    return exercise;
  }

  /**
   * Update an existing exercise
   */
  updateExercise(id: string, name: string, target: string): Exercise | null {
    const exercises = this.getExercises();
    const exercise = exercises.find((ex) => ex.id === id);

    if (!exercise) {
      return null;
    }

    exercise.name = name;
    exercise.target = target;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exercises));

    return exercise;
  }

  /**
   * Delete an exercise
   */
  deleteExercise(id: string): boolean {
    const exercises = this.getExercises();
    const index = exercises.findIndex((ex) => ex.id === id);

    if (index === -1) {
      return false;
    }

    exercises.splice(index, 1);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exercises));

    return true;
  }

  /**
   * Toggle favorite status of an exercise
   */
  toggleFavorite(id: string): Exercise | null {
    const exercises = this.getExercises();
    const exercise = exercises.find((ex) => ex.id === id);

    if (!exercise) {
      return null;
    }

    exercise.favorite = !exercise.favorite;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exercises));

    return exercise;
  }

  /**
   * Get a single exercise by ID
   */
  getExercise(id: string): Exercise | undefined {
    return this.getExercises().find((ex) => ex.id === id);
  }

  /**
   * Generate a unique ID for exercises
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
