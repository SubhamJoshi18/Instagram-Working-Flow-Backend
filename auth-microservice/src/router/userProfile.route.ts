import { Router } from 'express';
import limiter from '../config/rate.limit';
import { verifyAuthenticated } from '../middleware/auth.middleware';
import { activeMiddleware } from '../middleware/active.middleware';
import {
  activateProfile,
  deactivatedProfile,
  editProfile,
  followUser,
  getUserProfile,
  searchUser,
  updateProfile,
  uploadProfile,
} from '../controller/userProfile.controller';
import upload from '../config/multer.config';
const userProfileRouter = Router();

userProfileRouter.get(
  '/profile',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  getUserProfile as any
);

userProfileRouter.patch(
  '/profile/activate',
  limiter,
  verifyAuthenticated,
  activateProfile as any
);

userProfileRouter.patch(
  '/profile/deactivate',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  deactivatedProfile as any
);

userProfileRouter.patch(
  '/profile',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  updateProfile as any
);

userProfileRouter.post(
  '/profile/photo',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  upload.single('photo'),
  uploadProfile
);

userProfileRouter.get(
  '/profile/search',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  searchUser as any
);

userProfileRouter.patch(
  '/profile/edit',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  editProfile as any
);

userProfileRouter.post(
  '/profile/follow/:userId',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  followUser as any
);

export default userProfileRouter;
