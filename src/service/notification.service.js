const { NotFoundError } = require("../core/error.response")
const { getInvoiceById } = require("../models/repositories/invoice.repo")
const { createNotification, getAllNotification } = require("../models/repositories/notification.repo")
const { findScheduleDetailById, findIdApplicationDetail } = require("../models/repositories/schedule.repo")
const { findUserById } = require("../models/repositories/user.repo")

class NotificationService {
    static notify = async ({
        content,
        time,
        id_user,
        iscomfirmed,
        priority,
        id_schedule_detail,
        id_invoice
    }) => {

        const foundUser = await findUserById(id_user)

        if (!foundUser) {
            throw new NotFoundError('User not found!')
        }

        const foundScheduleDetail = await findScheduleDetailById(id_schedule_detail)

        if (!foundScheduleDetail) {
            throw new NotFoundError('Not found scheduleDetail!')
        }

        const invoiceModel = await getInvoiceById(id_invoice)

        if (!invoiceModel) {
            throw new NotFoundError('Not found Invoice!')

        }

        return await createNotification(content,
            time,
            id_user,
            iscomfirmed,
            priority,
            id_schedule_detail,
            id_invoice)
    }
    static getAllNotificationUser = async (id_user) => {

        const foundUser = await findUserById(id_user);
        if (!foundUser) {
            throw new NotFoundError('User not found!');
        }

        // Get all notifications for the user
        const listNotification = await getAllNotification(id_user);
        if (!listNotification.length) {
            return [];
        }

        // Fetch all schedule details concurrently
        const scheduleDetails = await Promise.all(
            listNotification.map(notification =>
                findIdApplicationDetail(notification.id_schedule_detail)
            )
        );

        // Combine notifications with their corresponding schedule details
        const listResult = listNotification.map((notification, index) => ({
            ...notification.dataValues,
            schedule_detail: scheduleDetails[index]
        }));

        return listResult;

    };
}

module.exports = NotificationService