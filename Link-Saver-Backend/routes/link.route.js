import express from 'express';
import { deleteLink, getLinks, postLink, updateLink } from '../controller/link.js';
import authMiddleware from '../middleware/authenticated.js';

const router = express.Router();

router.route("/links").post( authMiddleware, postLink);
router.route("/getLinks").get(authMiddleware, getLinks);
router.route("/updateLinks/:id").patch(authMiddleware, updateLink);
router.route("/deleteLinks/:id").delete( authMiddleware, deleteLink);

export default router;