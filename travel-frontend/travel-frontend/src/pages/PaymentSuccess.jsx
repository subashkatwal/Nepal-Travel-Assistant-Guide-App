import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const pidx = params.get("pidx");

  useEffect(() => {
    if (!pidx) return;

    fetch("http://127.0.0.1:8000/api/khalti/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Verification:", data);

        if (data.success) {
          alert("Payment Successful 🎉");
          // clearCart();  // optional
        } else {
          alert("Payment not completed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Verification failed");
      });
  }, [pidx]);

  return (
    <div>
      <h2>Verifying payment...</h2>
    </div>
  );
}
