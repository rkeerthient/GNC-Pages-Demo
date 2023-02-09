import * as React from "react";
import { PaymentOption } from "../types/products";

type ProductPricingProps = {
  c_paymentOptions: PaymentOption[];
};

const ProductPricing = ({ c_paymentOptions }: ProductPricingProps) => {
  const oneTimePayment = c_paymentOptions.find(
    (option) => option.name === "One Time Purchase"
  );
  const subscriptionPayment = c_paymentOptions.find(
    (option) => option.name === "Make It a Routine and Save"
  );

  return (
    <>
      {oneTimePayment && (
        <p className="text-xl font-bold text-zinc-900">
          {`$${oneTimePayment.price}`}
        </p>
      )}
      {subscriptionPayment && (
        <div className="py-2 pr-3 pl-[5px] -ml-1 my-1 text-red-600 bg-slate-100 flex items-center">
          <p className="text-xl font-bold">{`$${subscriptionPayment.price}`}</p>
          <p className="text-xs font-bold pl-1">Make it a Routine</p>
        </div>
      )}
    </>
  );
};

export { ProductPricing };
