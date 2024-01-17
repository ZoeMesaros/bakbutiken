/* global Klarna */
import { useEffect } from "react";

//Custom hook for klarna functionality
const useKlarna = (startKlarnaCheckout) => {
  useEffect(() => {
    const initKlarna = async () => {
      const klarnaSession = await fetch("/api/klarna/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const sessionData = await klarnaSession.json();

      Klarna.Payments.init({
        client_token: sessionData.client_token,
      });

      Klarna.Payments.load({
        container: "#klarna-container",
        payment_method_categories: ["pay_later", "card"],
        instance_id: sessionData.instance_id,
      });
    };

    initKlarna();
  }, []);

  // Return the function for use in the Checkout page
  return { startKlarnaCheckout };
};

export default useKlarna;
