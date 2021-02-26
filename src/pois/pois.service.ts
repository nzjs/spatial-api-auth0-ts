/**
 * Data Model Interfaces
 */
import { BasePOI, UserPOI } from './poi.interface';
import { UserPOIs } from './pois.interface';
import { getAuth0User, _pg_read_poi, _pg_read_pois, _pg_read_pois_as_geojson, 
  _pg_create_poi, _pg_update_poi, _pg_delete_poi} from '../common/utils';

/**
 * Service Methods / Functions for interaction with datastore
 */

// Get all user POIs - normal output
export const findAllUserPOIs = async (uid: string): Promise<UserPOI[]> => {
  const pois = await _pg_read_pois(uid);
  return pois;
};

// Get all user POIs - in geojson output
export const findAllUserPOIsAsGeoJSON = async (uid: string): Promise<UserPOI[]> => {
  const pois = await _pg_read_pois_as_geojson(uid);
  return pois;
};

// Get single POI by id
export const findUserPOI = async (uid: string, id: number): Promise<UserPOI | null> => {
  const poi = await _pg_read_poi(uid, id);
  return poi;
}

// Create new POI
export const createUserPOI = async (uid: string, base: BasePOI): Promise<UserPOI | null> => {
  const id = new Date().valueOf();
  const poi = await _pg_create_poi(uid, id, base)
  return poi;
};

// Update existing POI in database by id
export const updateUserPOI = async (uid: string, id: number, newbase: BasePOI): Promise<UserPOI | null> => {
  const poi = _pg_update_poi(uid, id, newbase);
  return poi;
};

// // Remove POI from database by id
export const removeUserPOI = async (uid: string, id: number): Promise<null | void> => {
  const poi = await findUserPOI(uid, id);
  if (!poi) {
    return null;
  }
  await _pg_delete_poi(uid, id);
};