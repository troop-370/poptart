import { Response } from 'express';
import mongoose from 'mongoose';
import { IAttendance, IAttendanceDoc } from '../../../mongodb/attendance.db';

const Doc = mongoose.model<IAttendanceDoc>('Attendance Sheets');

async function createAttendance(data: IAttendance, res: Response = null): Promise<IAttendance> {
  try {
    // create a new attendance document
    const { patrol, is_present, uniform_points } = data;
    const document = new Doc({
      patrol,
      is_present,
      uniform_points,
      timestamps: {
        created_at: data.timestamps?.created_at,
      },
    });

    // save the new document to the collection
    await document.save();

    // tell the client we saved it
    if (res) {
      res.status(201).end();
      res.json({ _id: document._id }); // send the _id of the new document
    }

    // return the new document
    return document.toObject();
  } catch (error) {
    // handle any errors
    console.error(error);
    if (res) {
      res.status(400).end();
    }
  }
}
export { createAttendance };
