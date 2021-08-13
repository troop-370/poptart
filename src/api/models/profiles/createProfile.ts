import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfileDoc, IProfile } from '../../../mongodb/profiles.db';

const Profile = mongoose.model<IProfileDoc>('Profiles');
/**
 * Creates a new profile with important attributes
 * @param data The complete or incomplete data of the profile one would like to create.
 * @param res A holder for any sent prescribed response from the server.
 * @returns The id of the created profile.
 */
async function createProfile(data: IProfile, res: Response = null): Promise<IProfile> {
  try {
    //create a new profile document
    const profile = new Profile({
      name: data.name,
      position: data.position,
      patrol: data.patrol,
      membership: {
        troop: data.membership?.troop,
        crew: data.membership?.crew,
      },
      health_form: data.health_form,
      timestamps: {
        created_at: data.timestamps?.created_at,
        born_at: data.timestamps?.born_at,
        joined_troop_at: data.timestamps?.joined_troop_at,
        joined_crew_at: data.timestamps?.joined_crew_at,
      },
      hidden: data.hidden,
    });
    // saving the profile to the collection
    await profile.save();

    // let the server know the profile is saved
    if (res) {
      res.status(201);
      res.json({ _id: profile.id });
      res.end();
    }

    return profile.toObject();
  } catch (error) {
    // reveals errors in the console
    console.error(error);
    if (res) {
      // lets the server know something went wrong
      res.status(400).end();
    }
  }
}

export { createProfile };
