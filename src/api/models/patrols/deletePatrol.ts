import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrolDoc } from '../../../mongodb/patrols.db';

const model = mongoose.model<IPatrolDoc>('Patrols');

/**
 * Delete a patrol from the patrols database by `id`.
 * @param id the unique `id` for the patrol
 */
async function deletePatrol(id: string, res: Response = null): Promise<void> {
  try {
    // delete a patrol (if it exists)
    await model.deleteOne({ _id: id });

    // tell the client that the document is gone
    if (res) res.status(410).end();
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) res.status(500).end();
  }
}
export { deletePatrol };
