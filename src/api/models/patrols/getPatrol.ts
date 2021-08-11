import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrolDoc, IPatrol } from '../../../mongodb/patrols.db';

const Patrol = mongoose.model<IPatrolDoc>('Patrols');

/**
 * Get a patrol in the patrols collection by _id
 *
 * @returns a patrol
 */
async function getPatrol(id: string, res: Response = null): Promise<IPatrol> {
  try {
    const patrol = await Patrol.findById(id);

    // end the request by sending a response
    if (res) res.json(patrol);

    return patrol.toObject();
  } catch (error) {
    console.error(error);
    if (res) res.status(400).end();
  }
}

export { getPatrol };
