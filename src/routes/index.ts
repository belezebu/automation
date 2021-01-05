import { Router } from 'express';
const router = Router();
import { example } from "../actions/login";

/* GET home page. */
router.get('/', async (req, res, next) => {
  await example();
  res.send('Hello World!');
});

export default router;