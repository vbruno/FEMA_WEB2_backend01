import { Router } from "express";

import { userRoute } from "./routeUser.js";

const router = Router();

router.use("/user", userRoute);
router.use("/produto", userRoute);

export { router };
