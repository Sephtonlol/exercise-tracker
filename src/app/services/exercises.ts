import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sets } from './sets';
import { Exercise } from '../interfaces/exercise.interface';

@Injectable({
  providedIn: 'root',
})
export class Exercises {
  private readonly STORAGE_KEY = 'exercises';
  private readonly exercisesSubject = new BehaviorSubject<Exercise[]>(
    this.readExercises(),
  );

  readonly exercises$: Observable<Exercise[]> =
    this.exercisesSubject.asObservable();

  constructor(private readonly setsService: Sets) {}

  /**
   * Get all exercises from storage
   */
  getExercises(): Exercise[] {
    return [...this.exercisesSubject.value];
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
      lastUsed: new Date().toISOString(),
    };

    const exercises = [...this.exercisesSubject.value];
    exercises.push(exercise);

    this.saveExercises(exercises);

    return exercise;
  }

  /**
   * Update an existing exercise
   */
  updateExercise(id: string, name: string, target: string): Exercise | null {
    const exercises = [...this.exercisesSubject.value];
    const exercise = exercises.find((ex) => ex.id === id);

    if (!exercise) {
      return null;
    }

    exercise.name = name;
    exercise.target = target;
    exercise.lastUsed = new Date().toISOString();

    this.saveExercises(exercises);

    return exercise;
  }

  /**
   * Delete an exercise and all related sets
   */
  deleteExercise(id: string): boolean {
    const exercises = [...this.exercisesSubject.value];
    const index = exercises.findIndex((ex) => ex.id === id);

    if (index === -1) {
      return false;
    }

    exercises.splice(index, 1);

    this.saveExercises(exercises);

    this.setsService.deleteSetsByExercise(id);

    return true;
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(id: string): Exercise | null {
    const exercises = [...this.exercisesSubject.value];
    const exercise = exercises.find((ex) => ex.id === id);

    if (!exercise) {
      return null;
    }

    exercise.favorite = !exercise.favorite;
    exercise.lastUsed = new Date().toISOString();

    this.saveExercises(exercises);

    return exercise;
  }

  /**
   * Get exercise by ID
   */
  getExercise(id: string): Exercise | undefined {
    return this.getExercises().find((ex) => ex.id === id);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private readExercises(): Exercise[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveExercises(exercises: Exercise[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exercises));
    this.exercisesSubject.next([...exercises]);
  }
}
