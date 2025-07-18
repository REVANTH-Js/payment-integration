function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5 footing">
      <div className="container d-flex justify-content-between align-items-center flex-wrap ">
        <div>
          <h5 className="mb-2">💳 Razorpay Integration</h5>
          <p className="mb-0">Secure payments powered by Razorpay.</p>
        </div>

        <div>
          <p className="mb-0">© {new Date().getFullYear()} CodeForGood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
