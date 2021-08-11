import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrol, IPatrolDoc } from '../../../mongodb/patrols.db';

const Patrol = mongoose.model<IPatrolDoc>('Patrols');

/**
 * Get all patrols in the patrols collection
 *
 * @param search instance of URLSearchParams
 * @returns an array of patrols
 */
async function getPatrols(search: URLSearchParams, res: Response = null): Promise<IPatrol[]> {
  try {
    const patrols = await Patrol.find({});

    // end the request by sending a response
    if (res) res.json(patrols);

    return patrols.map((patrol: IPatrolDoc) => patrol.toObject());
  } catch (error) {
    console.error(error);
    if (res) res.status(400).end();
  }
}

export { getPatrols };
