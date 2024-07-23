'use strict';


const { BadRequestError } = require('../core/error.response');
const { createInvoice, insertListInvoiceDetail } = require('../models/repositories/invoice.repo');


class PaymentService {
    static pay = async (paymentData) => {
        const { id_user, total_price, id_address, notes, listDrugCart,
            id_paypal
        } = paymentData;

        if (!id_user || !total_price || !id_address || !listDrugCart) {
            throw new BadRequestError('Missing required payment data');
        }


        if (!Array.isArray(listDrugCart)) {
            throw new BadRequestError('listDrugCart must be an array');
        }

        const currentDate = new Date().toLocaleString();

        try {
            const invoice = await createInvoice({
                id_user,
                create_date: currentDate,
                total_price,
                status: false,
                notes: "Payment successfully!",
                id_address,
                id_paypal

            });

            await insertListInvoiceDetail({
                listDrugCart,
                id_invoice: invoice.id_invoice
            });

            return {
                success: true,
                invoice
            };
        } catch (error) {
            console.error('Error creating invoice or inserting invoice details:', error);

            throw new BadRequestError('Payment initiation failed. Please try again later.');
        }
    }
}


module.exports = PaymentService;
