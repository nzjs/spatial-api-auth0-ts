/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import * as TS from './tracks.service';
import { BaseTrack, UserTrack } from './track.interface';
import { authenticationCheck } from '../middleware/auth.middleware';
import { parseToken, getAuth0Sub } from '../common/utils';

/**
 * Track Router Definition
 */
export const TR = express.Router();

/**
 * Track Controller Definitions
 */
// Note these endpoints are protected with Auth0 ✨
TR.use(authenticationCheck);

// Get all tracks for user  
// `GET /api/v1/spatial/tracks`
TR.get('/', async (req: Request, res: Response) => {
  const token: string = parseToken(req.headers);
  const uid: string = await getAuth0Sub(token);
  try {
    // Check for an input format eg. ?f=geojson
    if (req.query.f === 'geojson') {
      const tracks: UserTrack[] = await TS.findAllUserTracksAsGeoJSON(uid);
      res.status(200).send(tracks);
    }
    else {
      const tracks: UserTrack[] = await TS.findAllUserTracks(uid);
      res.status(200).send(tracks);
    }
  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Get a single track using an id parameter  
// `GET /api/v1/spatial/tracks/:id`
TR.get('/:id', async (req: Request, res: Response) => {
  const token: string = parseToken(req.headers);
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    const track = await TS.findUserTrack(uid, id);

    if (track) { 
      return res.status(200).send(track);
    }
    else {
      res.status(404).send('Track not found for ID ' + id.toString(10));
    }

  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Create a new track  
// `POST /api/v1/spatial/tracks`
TR.post('/', async (req: Request, res: Response) => {
  const token: string = parseToken(req.headers);
  const uid: string = await getAuth0Sub(token);

  try {
    const base: BaseTrack = req.body;
    const track = await TS.createUserTrack(uid, base);
    res.status(201).send(track);
  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Update a track using an id parameter  
// `PUT /api/v1/spatial/tracks/:id`
TR.put('/:id', async (req: Request, res: Response) => {
  const token: string = parseToken(req.headers);
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    const base: UserTrack = req.body;
    const existing = await TS.findUserTrack(uid, id);

    if (existing) { // It exists, so update it
      const updated = await TS.updateUserTrack(uid, id, base);
      return res.status(200).json(updated);
    }
    else { // Otherwise create a new one instead
      const track = await TS.createUserTrack(uid, base);
      res.status(201).send(track);
    }

  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Remove a track using an id parameter  
// `DELETE /api/v1/spatial/tracks/:id`
TR.delete('/:id', async (req: Request, res: Response) => {
  const token: string = parseToken(req.headers);
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    await TS.removeUserTrack(uid, id);
    res.status(204).send('Deleted track for ID ' + id.toString(10));
  } 
  catch (e) {
    res.status(500).send(e.message);
  }
})