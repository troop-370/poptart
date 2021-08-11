import { Response } from 'express';
import mongoose from 'mongoose';
import { IAttendanceDoc, IAttendance } from '../../../mongodb/attendance.db';

const Doc = mongoose.model<IAttendanceDoc>('Attendance Sheets');

/**
 * Get an attendance doucment by _id from the attendance sheets collection.
 *
 * @returns an attendance document
 */
async function getAttendance(id: string, res: Response = null): Promise<IAttendance> {
  try {
    const document = await Doc.findById(id);

    // end the request by sending a response
    if (res) res.json(document);

    return document.toObject();
  } catch (error) {
    console.error(error);
    if (res) res.status(400).end();
  }
}

export { getAttendance };
