import { Router, Request, Response, request } from 'express';
import { createProfile, deleteProfile, getProfile, getProfiles, hideProfile, updateProfile } from '../models/profiles';

const router = Router();

router.get('/', (req: Request, res: Response) => getProfiles(req.search, res));
router.get('/:id', (req: Request, res: Response) => getProfile(req.params.id, res));
router.delete('/:id', (req: Request, res: Response) => deleteProfile(req.params.id, res));
router.post('/', (req: Request, res: Response) => createProfile(req.body, res));
router.patch('/:id', (req: Request, res: Response) => updateProfile(req.params.id, req.body, 'patched', res));
router.patch('/:id/hide', (req: Request, res: Response) => hideProfile(req.params.id, res));

export { router as profilesRouter };
