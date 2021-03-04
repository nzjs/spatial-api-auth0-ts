/**
 * Imports
 */
import { BaseTrack, UserTrack } from '../tracks/track.interface';
const db = require('../common/db');

/**
 * Database queries for API services
 */
// User Tracks table
export const _pg_read_tracks = async (uid: string): Promise<UserTrack[]> => {
  const select: string = 
    'SELECT * FROM ha_tracks WHERE uid = $1'

  try {
    const { rows } = await db.query(select, [uid]);
    return rows;
  } 
  catch (e) {
    console.log('Unable to read tracks:', e.stack)
    return [];
  }
}

export const _pg_read_tracks_as_geojson = async (uid: string): Promise<UserTrack[]> => {
  const select: string = 
  `
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(
        json_build_object(
            'type',       'Feature',
            'id',         id,
            'geometry',   ST_AsGeoJSON(ST_ForceRHR(st_transform(geom,4326)))::json,
            'properties', jsonb_set(row_to_json(ha_tracks)::jsonb,'{geom}','0',false)
        )
      )
    )
    FROM ha_tracks 
    WHERE uid = $1
  `

  try {
    const { rows } = await db.query(select, [uid]);
    return rows[0]['json_build_object'];
  } 
  catch (e) {
    console.log('Unable to read track:', e.stack)
    return [];
  }
}

export const _pg_read_track = async (uid: string, id: number): Promise<UserTrack | null> => {
  const select: string = 
    'SELECT * FROM ha_tracks WHERE uid = $1 AND id = $2'

  try {
    const { rows } = await db.query(select, [uid, id]);
    return rows;
  } 
  catch (e) {
    console.log('Unable to read track:', e.stack)
    return null;
  }

}

export const _pg_create_track = async (uid: string, id: number, base: BaseTrack): Promise<UserTrack | null> => {
  const insert: string = 
  `
    INSERT INTO ha_tracks (uid, id, "name", notes, tsstart, tsend, geomstr) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `  
  const post_insert: string =  // After inserting, update the PG geometry and length (metres - NZTM).
  `
    UPDATE ha_tracks  
    SET geom = ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ), 
    "length" = ST_Length( ST_Transform( ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ), 2193) )    
    WHERE id = $1
  `

  const track: UserTrack = { id, uid, ...base }
  const values = [uid, id, base.name, base.notes, base.tsstart, base.tsend, base.geomstr]

  try {
    const res = await db.query(insert, values)
    console.log(res)
    if (res) { 
      await db.query(post_insert, [id]);
    }
    return track;
  } 
  catch (e) {
    console.log('Unable to create track:', e.stack)
    return null;
  }

}

export const _pg_update_track = async (uid: string, id: number, base: BaseTrack): Promise<UserTrack | null> => {
  const update: string = 
  `
    UPDATE ha_tracks 
    SET uid = $1, id = $2, "name" = $3, notes = $4, tsstart = $5, tsend = $6, geomstr = $7 
    WHERE uid = $1 AND id = $2
  `
  const post_update: string = // After updating, update the PG geometry and length (metres - NZTM).
  `
    UPDATE ha_tracks 
    SET geom = ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ), 
    "length" = ST_Length( ST_Transform( ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ), 2193) )    
    WHERE id = $1
  `

  const track: UserTrack = { id, uid, ...base }
  const values = [uid, id, base.name, base.notes, base.tsstart, base.tsend, base.geomstr]

  try {
    const res = await db.query(update, values);
    if (res) { 
      await db.query(post_update, [id]);
    }
    return track;
  } 
  catch (e) {
    console.log('Unable to update track:', e.stack)
    return null;
  }
}

export const _pg_delete_track = async (uid: string, id: number): Promise<null | void> => {
  const deletion: string = 
    'DELETE FROM ha_tracks WHERE uid = $1 AND id = $2'
  
  try {
    await db.query(deletion, [uid, id]);
  } 
  catch (e) {
    console.log('Unable to delete track:', e.stack)
    return null;
  }
}