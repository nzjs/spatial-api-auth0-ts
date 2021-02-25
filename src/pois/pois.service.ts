/**
 * Data Model Interfaces
 */
import { BasePOI, UserPOI } from './poi.interface';
import { UserPOIs } from './pois.interface';

/**
 * In-Memory Datastore
 */
let pois: UserPOIs = {
  1: {
    id: 1,
    uid: 'auth0|fjse803s...',
    type: 'Sighting',
    name: 'Deer',
    notes: 'Near the stream',
    ts: 1614206835948,
    image: '',
    geom: JSON.stringify({
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          169.84313964843747,
          -43.61022814178641
        ]
      }
    })
  },
  2: {
    id: 2,
    uid: 'auth0|fjse803s...',
    type: 'Sighting',
    name: 'Tahr',
    notes: 'Group of tahr on the ridgeline, spotted a few times previously',
    ts: 1614206835948,
    image: '',
    geom: JSON.stringify({
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          169.74563598632812,
          -43.633590349034115
        ]
      }
    })
  },
  3: {
    id: 3,
    uid: 'auth0|fjse803s...',
    type: 'Generic',
    name: 'Water',
    notes: 'Clean water source',
    ts: 1614206835948,
    image: '',
    geom: JSON.stringify({
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          169.76966857910156,
          -43.64054754952542
        ]
      }
    })
  }
};

/**
 * Service Methods / Functions for interaction with datastore
 */

// Get all user POIs
export const findAllUserPOIs = async (): Promise<UserPOI[]> => Object.values(pois);

// Get single POI by id
export const findUserPOI = async (id: number): Promise<UserPOI> => pois[id];

// Create new POI
export const createUserPOI = async (poi: BasePOI): Promise<UserPOI> => {
  const id = new Date().valueOf();

  pois[id] = { id, ...poi, };

  return pois[id];
};

// Update existing POI by id
export const updateUserPOI = async (id: number, updated: BasePOI): Promise<UserPOI | null> => {
  const poi = await findUserPOI(id);

  if (!poi) {
    return null;
  }

  pois[id] = { id, ...updated };

  return pois[id];
};

// Remove POI from datastore by id
export const removeUserPOI = async (id: number): Promise<null | void> => {
  const poi = await findUserPOI(id);

  if (!poi) {
    return null;
  }

  delete pois[id];
};