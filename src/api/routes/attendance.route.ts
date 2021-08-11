import { Router, Request, Response } from 'express';
import { getAttendance, getAttendances, createAttendance, deleteAttendance, updateAttendance } from '../models/attendance';

// define a router to hold all routes related to patrols
const router = Router();

router.get('/', (req: Request, res: Response) => getAttendances(req.search, res));
router.get('/:id', (req: Request, res: Response) => getAttendance(req.params.id, res));
router.post('/', (req: Request, res: Response) => createAttendance(req.body, res));
router.delete('/:id', (req: Request, res: Response) => deleteAttendance(req.params.id, res));
router.patch('/:id', (req: Request, res: Response) => updateAttendance(req.params.id, req.body, 'patched', res));

// export the router so that it can be added to the app routes
export { router as attendanceRouter };
