import mongoose, { Schema, Document } from 'mongoose';

interface IProfile {
  name: string;
  position: string[];
  patrol: mongoose.Types.ObjectId;
  membership: {
    troop: boolean;
    crew: boolean;
  };
  health_form: string;
  timestamps: {
    created_at: string;
    modified_at: string;
    born_at: string;
    joined_troop_at: string;
    joined_crew_at: string;
  };
  hidden: boolean;
  histostry: {
    type: 'created' | 'patched' | 'hidden';
    // allows the histostry variable to contain less useless information
    doc: Partial<IProfile>;
  }[];
}

// create the schema for each field
// the record ensures that the keys are part of IProfile (values unknown)
const ProfileSchemaFields: Record<keyof IProfile, unknown> = {
  name: { type: String, required: true },
  position: { type: [String], required: true, default: [] },
  patrol: mongoose.Types.ObjectId,
  membership: {
    troop: { type: Boolean, required: true, default: false },
    crew: { type: Boolean, required: true, default: false },
  },
  health_form: String,
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
    born_at: String,
    joined_troop_at: String,
    joined_crew_at: String,
  },
  hidden: { type: Boolean, required: true, default: false },
  histostry: {
    type: { type: String, required: true, default: 'patched' },
    doc: {},
  },
};

// mongoose schema for each profile
const ProfileSchema = new Schema(ProfileSchemaFields);

// create the model based on the schema
interface IProfileDoc extends IProfile, Document {} // combine the two interfaces
mongoose.model<IProfileDoc>('Profiles', ProfileSchema);

export type { IProfile, IProfileDoc };
