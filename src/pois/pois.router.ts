/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import * as PS from './pois.service';
import { BasePOI, UserPOI } from './poi.interface';
import { authenticationCheck } from '../middleware/auth.middleware';
import { getAuth0Sub } from '../common/utils';

/**
 * POI Router Definition
 */
export const PR = express.Router();

/**
 * POI Controller Definitions
 */
// Note these endpoints are protected with Auth0 ✨
PR.use(authenticationCheck);

// Get all pois for user  
// `GET /api/v1/spatial/pois`
PR.get('/', async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(' ')[1]!;
  const uid: string = await getAuth0Sub(token);
  try {
    // Check for an input format eg. ?f=geojson
    if (req.query.f === 'geojson') {
      const pois: UserPOI[] = await PS.findAllUserPOIsAsGeoJSON(uid);
      res.status(200).send(pois);
    }
    else {
      const pois: UserPOI[] = await PS.findAllUserPOIs(uid);
      res.status(200).send(pois);
    }
  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Get a single poi using an id parameter  
// `GET /api/v1/spatial/pois/:id`
PR.get('/:id', async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(' ')[1]!;
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    const poi: UserPOI | null = await PS.findUserPOI(uid, id);

    if (poi) { 
      return res.status(200).send(poi);
    }
    else {
      res.status(404).send('POI not found for ID ' + id.toString(10));
    }

  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Create a new poi  
// `POST /api/v1/spatial/pois`
PR.post('/', async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(' ')[1]!;
  const uid: string = await getAuth0Sub(token);

  try {
    const base: BasePOI = req.body;
    const poi = await PS.createUserPOI(uid, base);
    res.status(201).send(poi);
  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Update a poi using an id parameter  
// `PUT /api/v1/spatial/pois/:id`
PR.put('/:id', async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(' ')[1]!;
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    const base: UserPOI = req.body;
    const existing: UserPOI = await PS.findUserPOI(uid, id);

    if (existing) { // It exists, so update it
      const updated = await PS.updateUserPOI(uid, id, base);
      return res.status(200).json(updated);
    }
    else { // Otherwise create a new one instead
      const poi = await PS.createUserPOI(uid, base);
      res.status(201).send(poi);
    }

  }
  catch (e) {
    res.status(500).send(e.message);
  }
})

// Remove a poi using an id parameter  
// `DELETE /api/v1/spatial/pois/:id`
PR.delete('/:id', async (req: Request, res: Response) => {
  const token: string = req.headers.authorization?.split(' ')[1]!;
  const uid: string = await getAuth0Sub(token);
  const id: number = parseInt(req.params.id, 10);

  try {
    await PS.removeUserPOI(uid, id);
    res.status(204).send('Deleted POI for ID ' + id.toString(10));
  } 
  catch (e) {
    res.status(500).send(e.message);
  }
})