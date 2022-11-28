import { ColumnType } from './enums';

export interface TaskModel {
  id: string;
  description: string;
  column: ColumnType;
  color: string;
}

export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}

export type RawTask = {
  description: string;
  column: ColumnType;
  color: string;
}

