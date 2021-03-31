import express from 'express';
import auth from '../app/controllers/auth';

const router: express.Router = express.Router();

// router.get('/test', function (req: express.Request, res: express.Response, next: Function) {
//     return res.send('just a test baby');
// });

router.use(auth);

export default router;