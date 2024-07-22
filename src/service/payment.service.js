'use strict';


const { BadRequestError } = require('../core/error.response');
const { createInvoice, insertListInvoiceDetail } = require('../models/repositories/invoice.repo');



class PaymentService {
    static pay = async (paymentData) => {
        const { id_user, total_price, id_address, notes, listDrugCart } = paymentData;

        const currentDate = new Date().toLocaleString();

        const stripe = require('stripe')('sk_test_51ODOjFDqDQ31HEFQoMajoFb6sEX4MK9Fut3sUuArNPEJBBhFDfll7aVqCg3G3keNtWY6VuCvY1wX8CTuqZO3Ppp700zX3wH6vo');
         try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total_price * 100,
                currency: 'vnd',
                metadata: {
                    id_user,
                    notes
                },
                automatic_payment_methods: {
                    enabled: true,
                },
                
            });

            if (paymentIntent.status !== 'requires_payment_method') {
                throw new Error('Payment intent creation failed');
            }

            const invoice = await createInvoice({
                id_user,
                create_date: currentDate,
                total_price,
                status: false,
                notes,
                id_address
            });

            await insertListInvoiceDetail({
                listDrugCart,
                id_invoice: invoice.id_invoice
            });

            return {
                success: true,
                paymentIntent,
                invoice
            };

        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw new BadRequestError(error.message);
        }
    }
}

module.exports = PaymentService;
