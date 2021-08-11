import mongoose, { Schema, Document } from 'mongoose';

interface IPatrol {
  name: string;
  members: mongoose.Types.ObjectId[];
  timestamps: {
    created_at: string;
    modified_at: string;
  };
  hidden: boolean;
  histostry: {
    type: 'created' | 'patched' | 'hidden';
    doc: Partial<IPatrol>;
  }[];
}

// create the schema for each field
// the record ensures that the keys are part of IPatrol (values unknown)
const PatrolSchemaFields: Record<keyof IPatrol, unknown> = {
  name: { type: String, required: true },
  members: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
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
  hidden: { type: Boolean, required: true, default: false },
  histostry: [
    {
      type: { type: String, required: true, default: 'patched' },
      doc: {},
    },
  ],
};

// mongoose schema for each patrol
const PatrolSchema = new Schema(PatrolSchemaFields);

// create the model based on the schema
interface IPatrolDoc extends IPatrol, Document {} // combine the two interfaces
mongoose.model<IPatrolDoc>('Patrols', PatrolSchema);

export type { IPatrol, IPatrolDoc };
