import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfile, IProfileDoc } from '../../../mongodb/profiles.db';

const Profile = mongoose.model<IProfileDoc>('Profiles');
/**
 * Will use an id to return a specific Profile Object.
 * @param id A string that has a unique value given by MongoDB for identification.
 * @param res A holder for any sent prescribed response from the server.
 * @returns A Profile Object.
 */
async function getProfile(id: string, res: Response = null): Promise<IProfile> {
  try {
    const profile = await Profile.findById(id);

    if (res) res.json(profile).end();

    return profile.toObject();
  } catch (error) {
    console.error(error);
    if (res) res.status(400).end();
  }
}

export { getProfile };
