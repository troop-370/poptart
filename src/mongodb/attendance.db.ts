import mongoose, { Schema, Document } from 'mongoose';

interface IAttendance {
  patrol: mongoose.Types.ObjectId;
  is_present: mongoose.Types.ObjectId[];
  uniform_points: number;
  timestamps: {
    created_at: string;
    modified_at: string;
  };
}

// create the schema for each field
// the record ensures that the keys are part of IAttendance (values unknown)
const AttendanceSchemaFields: Record<keyof IAttendance, unknown> = {
  patrol: { type: mongoose.Types.ObjectId, required: true },
  is_present: { type: [mongoose.Types.ObjectId], required: true, default: [] },
  uniform_points: { type: Number, required: true, default: 0 },
  timestamps: {
    created_at: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
    modified_at: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
  },
};

// mongoose schema for each document
const AttendanceSchema = new Schema(AttendanceSchemaFields);

// create the model based on the schema
interface IAttendanceDoc extends IAttendance, Document {} // combine the two interfaces
mongoose.model<IAttendanceDoc>('Attendance Sheets', AttendanceSchema);

export type { IAttendance, IAttendanceDoc };
