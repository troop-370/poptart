import { Response } from 'express';
import mongoose from 'mongoose';
import { IProfileDoc, IProfile } from '../../../mongodb/profiles.db';
import { getProfile } from './getProfile';

const model = mongoose.model<IProfileDoc>('Profiles');

/**
 * This will take in an incomplete profile and merge it with a currently stored profile to update the entry.
 * @param id
 * @param data
 * @param histostryType
 * @param res
 * @returns
 */
async function updateProfile(
  id: string,
  data: Partial<IProfile>,
  histostryType: 'created' | 'patched' | 'hidden' = 'patched',
  res: Response = null
): Promise<IProfile> {
  try {
    //preparing the history element for the data document
    const { histostry: prevHistostry, ...oldProfile } = await getProfile(id);
    delete oldProfile.timestamps.created_at;
    // @ts-expect-error _id exists
    delete oldProfile._id;
    // @ts-expect-error __v exists
    delete oldProfile.__v;
    // combining our manicured patrol collection with the supplied histostry type (probably patched or hidden)
    const newHistostry = { type: histostryType, doc: oldProfile };

    // itemizing our data partial document to more easily change important features
    const { name, position, patrol, hidden } = data;

    //inputing new information from data into a new variable with types to increase security
    const changedData = {
      // imputting itemized information that we already wanted quickly
      name,
      position,
      patrol,
      hidden,

      // going through data looking for viable membership object components and applying them
      membership: {
        troop: data.membership.troop,
        crew: data.membership.crew,
      },

      // if a health_form type variable was supplied, it will be placed in our changedData object
      health_form: data.health_form,
      timestamps: {
        // going through all supplied timestamps and setting the modified_at variable to the current time
        ...data.timestamps,
        modified_at: new Date().toISOString(),
      },
      // checks if there was history, then uses inline if-then to determine how to attach newHistostry to the variable
      histostry: prevHistostry ? [...prevHistostry, newHistostry] : [newHistostry],
    };
    // we are going to update the database directly with the information in changedData
    await model.updateOne({ _id: id }, { $set: changedData }); // I can't find out why this isn't working, I cross-referenced with the patrols version and everything seems to be correct. :/

    // let the client know that the change was successful
    if (res) {
      res.status(200).end();
    }
    // return the modified document in case of internal use
    return await getProfile(id); // note that we need to go back to the client to find our profile because of the external function $set that we used.
  } catch (error) {
    // show us the errors in console
    console.error(error);
    // this will let the client know that the request failed
    if (res) {
      res.status(400);
      // lets the client know we are done
      res.end();
    }
  }
}

export { updateProfile };
