import express from 'express'
import { createNotification, deleteNotification, getAllNotifications, getNotifications, updateNotification } from '../controller/notificationController.js'
export const notificationRouter = express.Router()



notificationRouter.route('/get').get(getAllNotifications)
notificationRouter.route('/get/:id').get(getNotifications)
notificationRouter.route('/create').post(createNotification)
notificationRouter.route('/update/:id').patch(updateNotification)
notificationRouter.route('/delete/:id').delete(deleteNotification)