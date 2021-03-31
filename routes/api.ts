import express from 'express';

const router: express.Router = express.Router();

router.get('/test', function (req: express.Request, res: express.Response, next: Function) {
    return res.send('just a test baby');
});

export default router;