import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfileDoc } from '../../../mongodb/profiles.db';

const model = mongoose.model<IProfileDoc>('Profiles');

/**
 * Delete a profile from the profiles database by `id`.
 * @param id the unique `id` for the profile
 */
async function deleteProfile(id: string, res: Response = null): Promise<void> {
  try {
    // delete a profile (if it exists)
    await model.deleteOne({ _id: id });

    // tell the client that the document is gone
    if (res) res.status(410).end();
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) res.status(500).end();
  }
}
export { deleteProfile };
