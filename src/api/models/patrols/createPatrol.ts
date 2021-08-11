import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrolDoc, IPatrol } from '../../../mongodb/patrols.db';

const Patrol = mongoose.model<IPatrolDoc>('Patrols');

async function createPatrol(data: IPatrol, res: Response = null): Promise<IPatrol> {
  try {
    // create a new patrol document
    const patrol = new Patrol({
      name: data.name,
      members: data.members,
      timestamps: {
        created_at: data.timestamps?.created_at,
      },
      hidden: data.hidden,
    });

    // save the new patrol to the collection
    await patrol.save();

    // tell the client we saved it
    if (res) {
      res.status(201).end();
      res.json({ _id: patrol._id }); // send the _id of the new patrol
    }

    // return the new patrol
    return patrol.toObject();
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) {
      res.status(400).end();
    }
  }
}
export { createPatrol };
