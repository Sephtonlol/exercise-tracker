import { Injectable } from '@angular/core';
import { Set } from '../interfaces/sets.interface';

@Injectable({
  providedIn: 'root',
})
export class Sets {
  private readonly STORAGE_KEY = 'sets';

  constructor() {}

  /**
   * Get all sets
   */
  getSets(): Set[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get all sets for an exercise
   */
  getSetsByExercise(exerciseId: string): Set[] {
    return this.getSets().filter((set) => set.exerciseId === exerciseId);
  }

  /**
   * Get a single set
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

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sets));

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

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sets));

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

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));

    return true;
  }

  /**
   * Delete all related sets for exercise
   */
  deleteSetsByExercise(exerciseId: string): void {
    const filtered = this.getSets().filter(
      (set) => set.exerciseId !== exerciseId,
    );

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * Generate ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
