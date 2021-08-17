import { Response } from 'express';
import { updateProfile } from './updateProfile';

/**
 * Hide a profile from the profiles database by `id`.
 *
 * This sets `hidden: true` for the document.
 *
 * @param id the unique `id` for the profile
 */
async function hideProfile(id: string, res: Response = null): Promise<void> {
  try {
    // hide a profile (if it exists) updateProfile will handle the rest
    await updateProfile(id, { hidden: true }, 'hidden', res);
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) res.status(500).end();
  }
}
export { hideProfile };
