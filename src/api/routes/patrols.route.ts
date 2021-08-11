import { Router, Request, Response } from 'express';
import { getPatrols, getPatrol, createPatrol, deletePatrol, hidePatrol, updatePatrol } from '../models/patrols';

// define a router to hold all routes related to patrols
const router = Router();

router.get('/', (req: Request, res: Response) => getPatrols(req.search, res));
router.get('/:id', (req: Request, res: Response) => getPatrol(req.params.id, res));
router.post('/', (req: Request, res: Response) => createPatrol(req.body, res));
router.delete('/:id', (req: Request, res: Response) => deletePatrol(req.params.id, res));
router.patch('/:id/hide', (req: Request, res: Response) => hidePatrol(req.params.id, res));
router.patch('/:id', (req: Request, res: Response) => updatePatrol(req.params.id, req.body, 'patched', res));

// export the router so that it can be added to the app routes
export { router as patrolsRouter };
