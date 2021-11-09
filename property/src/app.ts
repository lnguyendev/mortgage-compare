import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@lnguyendevorg/common-library';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.get('/api/property/all', (req, res) => {
  res.send('Property Listings');
});

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
