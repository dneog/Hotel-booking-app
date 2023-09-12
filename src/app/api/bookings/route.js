import { connectDB } from "@/config/dbConfig";
import { validateJWTToken } from "@/helpers/tokenValidation";

import { NextResponse } from "next/server";
import Stripe from "stripe";
connectDB()
const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});


export async function POST(request){
    try {
        const userId= await validateJWTToken(request)
        const reqBody= await request.json()

        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            // shipping_options: [
            //   { shipping_rate: "shr_1NJgGfFFOcRRviB5IKHisAI1" },
            //   { shipping_rate: "shr_1NJgFzFFOcRRviB5RNlrrnhM" },
            // ],
            invoice_creation: {
              enabled: true,
            },
            line_items: reqBody.map((item) => {
              return {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.totalAmount * 100,
                },
                quantity: item.quantity,
                // adjustable_quantity: {
                //   enabled: true,
                //   minimum: 1,
                //   maximum: 10,
                // },
              };
            }),
            // phone_number_collection: {
            //   enabled: true,
            // },
            success_url: `${request.headers.get("origin")}/success` + `?status=success`,
            cancel_url: `${request.headers.get("origin")}/?canceled=true`,

          });


        return NextResponse.json({ session });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
           
            message: error.message,
           
        }, {status: 500})

    }
}


