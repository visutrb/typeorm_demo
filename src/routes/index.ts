'use strict';

import * as express from 'express';
import { SiteController } from "../api/controller/SiteController";
import { PostsController } from "../api/controller/PostsController";

const router = express.Router();

const siteController = new SiteController();
const postController = new PostsController();

/* GET home page. */
router.get('/', siteController.index);

router.get('/posts', postController.index);
router.get('/posts/:id', postController.show);
router.post('/posts', postController.create);

export default router;
