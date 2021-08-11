import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfile, IProfileDoc } from '../../../mongodb/profiles.db';

const Profiles = mongoose.model<IProfileDoc>('Profiles');

/**
 * For getting an array of all profiles in the database.
 * @param search A holder for any parameters or extra options in the future.
 * @param res A holder for any sent prescribed response from the server.
 * @returns An array of all stored Profiles.
 */
async function getProfiles(search: URLSearchParams, res: Response = null): Promise<IProfile[]> {
  try {
    const profiles = await Profiles.find({});

    // end the request by sending a response
    if (res) res.json(profiles).end();

    return profiles.map((profile: IProfileDoc) => profile.toObject());
  } catch (error) {
    // handles errors
    console.error(error);
    // lets the server know something went wrong
    if (res) res.status(400).end();
  }
}

export { getProfiles };
