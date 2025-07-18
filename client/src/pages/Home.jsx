import React from "react";
import "./Home.css"; // (Optional: You can add custom styles here)
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `window.chtlConfig = { chatbotId: "7874291644" }`;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://chatling.ai/js/embed.js";
    script2.async = true;
    script2.setAttribute("data-id", "7874291644");
    script2.id = "chtl-script";
    document.body.appendChild(script2);

    return () => {
      document.getElementById("chtl-script")?.remove();
    };
  }, []);

  return (
    <div className="razorpay-home text-light">
      <section className="hero bg-dark text-white py-5 px-4 text-center">
        <h1 className="display-4 fw-bold">Power Your Payments with Razorpay</h1>
        <p className="lead">India's Leading Payment Gateway Solution</p>
        <button className="btn btn-primary mt-3 px-4 py-2">Start Accepting Payments</button>
      </section>

      <section className="features container my-5">
        <h2 className="text-center mb-4 text-dark">Why Choose Razorpay?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h5>💳 Accept Payments</h5>
            <p>Accept all major cards, UPI, wallets, and netbanking with ease.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>🔐 Secure Transactions</h5>
            <p>RBI compliant with industry-leading encryption and fraud detection.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>⚙️ Easy Integration</h5>
            <p>Developer-friendly APIs, SDKs and plugins for quick integration.</p>
          </div>
        </div>
      </section>

      <section className="trusted bg-light text-dark py-5">
        <div className="container text-center">
          <h3>Trusted by 10M+ Businesses</h3>
          <p>From startups to large enterprises, Razorpay powers seamless payments for all.</p>
          <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
            <span>🏢 Flipkart</span>
            <span>🚖 Ola</span>
            <span>🛍️ Zomato</span>
            <span>🎮 Dream11</span>
            <span>🏦 ICICI</span>
          </div>
        </div>
      </section>

      <section className="cta bg-primary text-white py-5 text-center">
        <h2>Ready to Scale Your Business?</h2>
        <p>Get started with Razorpay today. Fast onboarding and powerful tools included.</p>
        <button className="btn btn-light text-primary fw-bold mt-3 px-4 py-2">
          Sign Up for Free
        </button>
      </section>
      
    </div>
  );
}

export default Home;
