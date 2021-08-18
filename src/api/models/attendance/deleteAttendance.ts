import { Response } from 'express';
import mongoose from 'mongoose';
import { IAttendanceDoc } from '../../../mongodb/attendance.db';

const model = mongoose.model<IAttendanceDoc>('Attendance Sheets');

/**
 * Delete a attendace document from the attendance sheets database by `id`.
 * @param id the unique `id` for the patrol
 */
async function deleteAttendance(id: string, res: Response = null): Promise<void> {
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
export { deleteAttendance };
