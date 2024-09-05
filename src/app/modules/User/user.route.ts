import { Router } from "express"
import { UserControllers } from "./user.controller"


const router = Router()

router.get('/user', UserControllers.getUser)
router.get('/:id', UserControllers.getUserById)
router.post('/create-user', UserControllers.createUser)


export const UserRoutes = router