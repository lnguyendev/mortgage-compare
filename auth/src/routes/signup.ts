import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  validateRequest,
  BadRequestError,
} from '@lnguyendevorg/common-library';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/user/signup',
  [
    body('firstname')
      .trim()
      .isLength({ min: 2 })
      .withMessage('First name must at least be 2 characters'),
    body('lastname')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Lastname must at least be 2 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 30 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('passwordconfirm')
      .trim()
      .notEmpty()
      .withMessage('You must confirm your password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, passwordconfirm } = req.body;

    if (password !== passwordconfirm) {
      throw new BadRequestError('Passwords must match');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already existed');
    }

    const user = User.build({
      firstname,
      lastname,
      email,
      password,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
