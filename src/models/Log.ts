import { BaseModel } from "./BaseModel";

export class Log extends BaseModel {
  duration: string;
  project: string;
  remarks: string;
  completed: boolean;
  isEditing: boolean;

  constructor(duration:string, project: string, remarks: string) {
    super();
    this.duration = duration;
    this.project = project;
    this.remarks = remarks;
    this.completed = false;
    this.isEditing = false;
  }
}

export default Log;
