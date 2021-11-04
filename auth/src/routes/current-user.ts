import express from 'express';
import { currentUser } from '@lnguyendevorg/common-library';

const router = express.Router();

router.get('/api/user/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
