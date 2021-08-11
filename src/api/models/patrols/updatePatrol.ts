import { Response } from 'express';
import mongoose from 'mongoose';
import { IPatrolDoc, IPatrol } from '../../../mongodb/patrols.db';
import { getPatrol } from './getPatrol';

const model = mongoose.model<IPatrolDoc>('Patrols');

/**
 * Updates a patrol with the supplied information. Also updates the time_modified time stamp.
 * @param id The unique id of the patrol you would like to change.
 * @param data The complete or incomplete patrol collection which will supply the new information.
 * @param histostryType The kind of change you are performing. (Set normally to 'patched.')
 * @param res The prescribed response from the server.
 * @returns The id of the patrol you updated.
 */
async function updatePatrol(
  id: string,
  data: Partial<IPatrol>,
  histostryType: 'hidden' | 'patched' | 'created' = 'patched',
  res: Response = null
): Promise<IPatrol> {
  try {
    // set the new history
    const { histostry: prevHistostry, ...oldPatrol } = await getPatrol(id);
    delete oldPatrol.timestamps.created_at;
    // @ts-ignore _id exists
    delete oldPatrol._id;
    // @ts-ignore __v exists
    delete oldPatrol.__v;
    const newHistostry = { type: histostryType, doc: oldPatrol };

    // processing data
    const { name, members, hidden } = data;
    const changedData = {
      name,
      members,
      hidden,
      timestamps: {
        // changing the modified_at timestamp
        ...data.timestamps,
        modified_at: new Date().toISOString(),
      },
      // appending the unchanged patrol to the history of the new one
      histostry: prevHistostry ? [...prevHistostry, newHistostry] : [newHistostry],
    };

    // save the changes and update any remaining differences between data and the patrol
    await model.updateOne({ _id: id }, { $set: changedData });

    // let the server know the change was successful
    if (res) {
      res.status(200).end();
    }

    // return the modified document
    return await getPatrol(id);
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) {
      // let the server know the request failed
      res.status(400).end();
    }
  }
}

export { updatePatrol };
