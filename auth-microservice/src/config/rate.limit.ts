import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many Request, Please Try again later',
});

export default limiter;
