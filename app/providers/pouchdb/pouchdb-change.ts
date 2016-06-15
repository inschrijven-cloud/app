export interface PouchDBChange {
  doc: any;
  changes: Array<{ rev: string }>;
  id: string;
  seq: number;
}
