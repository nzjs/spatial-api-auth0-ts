/**
 * Data Model Interfaces
 */
import { BaseTrack, UserTrack } from './track.interface';
import { UserTracks } from './tracks.interface';
import { _pg_read_track, _pg_read_tracks, _pg_read_tracks_as_geojson, 
  _pg_create_track, _pg_update_track, _pg_delete_track} from './tracks.queries';

/**
 * Service Methods / Functions for interaction with datastore
 */

// Get all user tracks - normal output
export const findAllUserTracks = async (uid: string): Promise<UserTrack[]> => {
  const tracks = await _pg_read_tracks(uid);
  return tracks;
};

// Get all user tracks - in geojson output
export const findAllUserTracksAsGeoJSON = async (uid: string): Promise<UserTrack[]> => {
  const tracks = await _pg_read_tracks_as_geojson(uid);
  return tracks;
};

// Get single track by id
export const findUserTrack = async (uid: string, id: number): Promise<UserTrack | null> => {
  const track = await _pg_read_track(uid, id);
  return track;
}

// Create new track
export const createUserTrack = async (uid: string, base: BaseTrack): Promise<UserTrack | null> => {
  const id = new Date().valueOf();
  const track = await _pg_create_track(uid, id, base)
  return track;
};

// Update existing track in database by id
export const updateUserTrack = async (uid: string, id: number, newbase: BaseTrack): Promise<UserTrack | null> => {
  const track = _pg_update_track(uid, id, newbase);
  return track;
};

// // Remove track from database by id
export const removeUserTrack = async (uid: string, id: number): Promise<null | void> => {
  const track = await findUserTrack(uid, id);
  if (!track) {
    return null;
  }
  await _pg_delete_track(uid, id);
};