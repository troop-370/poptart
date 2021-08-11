import { Response } from 'express';
import mongoose from 'mongoose';
import { IAttendanceDoc, IAttendance } from '../../../mongodb/attendance.db';
import { getAttendance } from './getAttendance';

const Doc = mongoose.model<IAttendanceDoc>('Attendance Sheets');

/**
 * Updates an attendance document with the supplied information.
 * Also updates the time_modified time stamp.
 * @param id The unique id of the attendance document to change.
 * @param data The complete or incomplete attendance document which will supply the new information.
 * @param histostryType The kind of change you are performing. (Set normally to 'patched.')
 * @param res The prescribed response from the server.
 * @returns The modified attendance document.
 */
async function updateAttendance(
  id: string,
  data: Partial<IAttendance>,
  histostryType: 'hidden' | 'patched' | 'created' = 'patched',
  res: Response = null
): Promise<IAttendance> {
  try {
    // processing data
    const { patrol, is_present, uniform_points } = data;
    const changedData = {
      patrol,
      is_present,
      uniform_points,
      timestamps: {
        // changing the modified_at timestamp
        ...data.timestamps,
        modified_at: new Date().toISOString(),
      },
    };

    // save the changes and update any remaining differences between data and the patrol
    await Doc.updateOne({ _id: id }, { $set: changedData });

    // let the server know the change was successful
    if (res) res.status(200).end();

    // return the modified document
    return await getAttendance(id);
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) {
      // let the client know the request failed
      res.status(400).end();
    }
  }
}

export { updateAttendance };
