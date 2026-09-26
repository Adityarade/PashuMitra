import Dexie, { Table } from 'dexie';
import { Lesson, StudentProfile, DoubtQuery, CorpusItem } from '@bhashasetu/shared';

export interface OfflineProgress {
  id?: number;
  lessonId: string;
  completedAt: string;
  quizScore: number;
  synced: boolean;
}

export class BhashaSetuOfflineDB extends Dexie {
  cachedLessons!: Table<Lesson, string>;
  offlineProgress!: Table<OfflineProgress, number>;
  cachedDoubts!: Table<DoubtQuery, string>;
  cachedCorpus!: Table<CorpusItem, string>;

  constructor() {
    super('BhashaSetuDB');
    this.version(1).stores({
      cachedLessons: 'id, language, subject, grade',
      offlineProgress: '++id, lessonId, synced',
      cachedDoubts: 'id, lessonId, studentId',
      cachedCorpus: 'id, language, status'
    });
  }
}

export const offlineDB = new BhashaSetuOfflineDB();
