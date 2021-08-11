import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfileDoc } from '../../../mongodb/profiles.db';
import { updateProfile } from './updateProfile';

const model = mongoose.model<IProfileDoc>('Profiles');

/**
 * Hide a profile from the profiles database by `id`.
 *
 * This sets `hidden: true` for the document.
 *
 * @param id the unique `id` for the profile
 */
async function hideProfile(id: string, res: Response = null): Promise<void> {
  try {
    // hide a profile (if it exists)
    await updateProfile(id, { hidden: true }, 'hidden', res);
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) res.status(500).end();
  }
}
export { hideProfile };
