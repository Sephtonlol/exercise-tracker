import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Set } from '../interfaces/sets.interface';

@Injectable({
  providedIn: 'root',
})
export class Sets {
  private readonly STORAGE_KEY = 'sets';

  private readonly setsSubject = new BehaviorSubject<Set[]>(this.getSets());

  public readonly sets$: Observable<Set[]> = this.setsSubject.asObservable();

  constructor() {}

  /**
   * Emit latest sets
   */
  private updateState(sets: Set[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sets));
    this.setsSubject.next(sets);
  }

  /**
   * Get all sets
   */
  getSets(): Set[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get sets by exercise
   */
  getSetsByExercise(exerciseId: string): Set[] {
    return this.getSets().filter((set) => set.exerciseId === exerciseId);
  }

  /**
   * Get single set
   */
  getSet(id: string): Set | undefined {
    return this.getSets().find((set) => set.id === id);
  }

  /**
   * Create set
   */
  createSet(exerciseId: string, weight: number, repetitions: number): Set {
    const set: Set = {
      id: this.generateId(),
      exerciseId,
      weight,
      repetitions,
      lastUsed: new Date().toISOString(),
    };

    const sets = this.getSets();
    sets.push(set);

    this.updateState(sets);

    return set;
  }

  /**
   * Update set
   */
  updateSet(id: string, weight: number, repetitions: number): Set | null {
    const sets = this.getSets();

    const set = sets.find((s) => s.id === id);

    if (!set) {
      return null;
    }

    set.weight = weight;
    set.repetitions = repetitions;
    set.lastUsed = new Date().toISOString();

    this.updateState(sets);

    return set;
  }

  /**
   * Delete set
   */
  deleteSet(id: string): boolean {
    const sets = this.getSets();

    const filtered = sets.filter((set) => set.id !== id);

    if (filtered.length === sets.length) {
      return false;
    }

    this.updateState(filtered);

    return true;
  }

  /**
   * Delete all sets by exercise
   */
  deleteSetsByExercise(exerciseId: string): void {
    const filtered = this.getSets().filter(
      (set) => set.exerciseId !== exerciseId,
    );

    this.updateState(filtered);
  }

  /**
   * Generate ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
