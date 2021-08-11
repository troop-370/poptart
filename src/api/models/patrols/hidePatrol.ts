import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrolDoc } from '../../../mongodb/patrols.db';
import { updatePatrol } from './updatePatrol';

const model = mongoose.model<IPatrolDoc>('Patrols');

/**
 * Hide a patrol from the patrols database by `id`.
 *
 * This sets `hidden: true` for the document.
 *
 * @param id the unique `id` for the patrol
 */
async function hidePatrol(id: string, res: Response = null): Promise<void> {
  try {
    // hide a patrol (if it exists)
    await updatePatrol(id, { hidden: true }, 'hidden', res);
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) res.status(500).end();
  }
}
export { hidePatrol };
