/**
 * Imports
 */
import { BasePOI, UserPOI } from '../pois/poi.interface';
import axios from 'axios';
const db = require('./db');

/**
 * Utility Functions
 */
export const getAuth0Sub = async (token: string): Promise<object> => {
  const config = { headers: { Authorization: `Bearer ${token}` }};  
  const userinfo = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  let user: object = {};
  try {
    user = await axios.post(userinfo, {}, config)
    .then(async (resp) => {
      return resp.data.sub;
    })
  }
  catch (e) {
    console.log('Unable to get user info:', e.stack)
  }
  return user;
}

export const getAuth0UserInfo = async (token: string): Promise<object> => {
  const config = { headers: { Authorization: `Bearer ${token}` }};  
  const userinfo = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  let user: object = {};
  try {
    user = await axios.post(userinfo, {}, config)
    .then(async (resp) => {
      return resp.data;
    })
  }
  catch (e) {
    console.log('Unable to get user info:', e.stack)
  }
  return user;
}


/**
 * Database queries for API services
 */

// User POIs
export const _pg_read_pois = async (uid: string): Promise<UserPOI[]> => {
  const select: string = 
    'SELECT * FROM ha_pois WHERE uid = $1'

  try {
    const { rows } = await db.query(select, [uid]);
    return rows;
  } 
  catch (e) {
    console.log('Unable to read POIs:', e.stack)
    return [];
  }
}

export const _pg_read_pois_as_geojson = async (uid: string): Promise<UserPOI[]> => {
  const select: string = 
  `
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(
        json_build_object(
            'type',       'Feature',
            'id',         id,
            'geometry',   ST_AsGeoJSON(ST_ForceRHR(st_transform(geom,4326)))::json,
            'properties', jsonb_set(row_to_json(ha_pois)::jsonb,'{geom}','0',false)
        )
      )
    )
    FROM ha_pois 
    WHERE uid = $1
  `

  try {
    const { rows } = await db.query(select, [uid]);
    return rows[0]['json_build_object'];
  } 
  catch (e) {
    console.log('Unable to read POI:', e.stack)
    return [];
  }
}

export const _pg_read_poi = async (uid: string, id: number): Promise<UserPOI | null> => {
  const select: string = 
    'SELECT * FROM ha_pois WHERE uid = $1 AND id = $2'

  try {
    const { rows } = await db.query(select, [uid, id]);
    return rows;
  } 
  catch (e) {
    console.log('Unable to read POI:', e.stack)
    return null;
  }

}

export const _pg_create_poi = async (uid: string, id: number, base: BasePOI): Promise<UserPOI | null> => {
  const insert: string = 
  `
    INSERT INTO ha_pois (uid, id, "type", "name", notes, ts, geomstr) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `  
  const post_insert: string =  // After inserting, update the PG geometry.
  `
    UPDATE ha_pois SET geom = ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ) WHERE id = $1
  `

  const poi: UserPOI = { id, uid, ...base }
  const values = [uid, id, base.type, base.name, base.notes, base.ts, base.geomstr]

  try {
    const res = await db.query(insert, values)
    console.log(res)
    if (res) { 
      await db.query(post_insert, [id]);
    }
    return poi;
  } 
  catch (e) {
    console.log('Unable to create POI:', e.stack)
    return null;
  }

}

export const _pg_update_poi = async (uid: string, id: number, base: BasePOI): Promise<UserPOI | null> => {
  const update: string = 
  `
    UPDATE ha_pois 
    SET uid = $1, id = $2, "type" = $3, "name" = $4, notes = $5, ts = $6, geomstr = $7 
    WHERE uid = $1 AND id = $2
  `
  const post_update: string = // After updating, update the PG geometry.
  `
    UPDATE ha_pois SET geom = ST_GeomFromGeoJSON( (REPLACE(geomstr::text, '\\', ''))::json ) WHERE id = $1
  `

  const poi: UserPOI = { id, uid, ...base }
  const values = [uid, id, base.type, base.name, base.notes, base.ts, base.geomstr]

  try {
    const res = await db.query(update, values);
    if (res) { 
      await db.query(post_update, [id]);
    }
    return poi;
  } 
  catch (e) {
    console.log('Unable to update POI:', e.stack)
    return null;
  }
}

export const _pg_delete_poi = async (uid: string, id: number): Promise<null | void> => {
  const deletion: string = 
    'DELETE FROM ha_pois WHERE uid = $1 AND id = $2'
  
  try {
    await db.query(deletion, [uid, id]);
  } 
  catch (e) {
    console.log('Unable to delete POI:', e.stack)
    return null;
  }
}


// User Routes
// export const _pg_read_routes = async (uid: string): Promise<UserPOI[]> => {

// }
// export const _pg_read_route = async (uid: string): Promise<UserPOI[]> => {

// }
// export const _pg_create_route = async (uid: string): Promise<UserPOI[]> => {

// }
// export const _pg_update_route = async (uid: string): Promise<UserPOI[]> => {

// }
// export const _pg_delete_route = async (uid: string): Promise<UserPOI[]> => {

// }