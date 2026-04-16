import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function StarRow({ rating }) {
  const r = Math.min(5, Math.max(0, Number(rating) || 0));
  const filled = Math.round(r);
  return (
    <span className="checkout-stars" aria-label={`Rating ${r} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < filled ? "checkout-stars__star checkout-stars__star--full" : "checkout-stars__star"}
        />
      ))}
    </span>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [accountChoice, setAccountChoice] = useState("register");
  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const [orderComments, setOrderComments] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [billingAddressMode, setBillingAddressMode] = useState("new");
  const [returnEmail, setReturnEmail] = useState("");
  const [returnPassword, setReturnPassword] = useState("");
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    region: "",
  });

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity ?? 1),
        0
      ),
    [items]
  );

  const deliveryCharge = deliveryMethod === "flat" ? 5 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleBillingChange = (field) => (e) => {
    setBilling((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!items.length) return;
    clearCart();
    window.alert("Thank you! Your order has been placed (demo).");
    navigate("/", { replace: true });
  };

  if (!items.length) {
    return (
      <section className="checkout-page checkout-page--empty">
        <div className="container">
          <h1 className="checkout-page__title">Checkout</h1>
          <p className="checkout-page__empty-text">Your cart is empty. Add products before checkout.</p>
          <Link to="/catalog" className="checkout-btn checkout-btn--primary">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">Checkout</h1>

        <div className="checkout-layout">
          <aside className="checkout-sidebar">
            <div className="checkout-card">
              <h2 className="checkout-card__title">Summary</h2>
              <dl className="checkout-summary-lines">
                <div>
                  <dt>Sub-Total</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Delivery Charges</dt>
                  <dd>${deliveryCharge.toFixed(2)}</dd>
                </div>
                <div className="checkout-summary-lines--total">
                  <dt>Total Amount</dt>
                  <dd>${totalAmount.toFixed(2)}</dd>
                </div>
              </dl>

              <ul className="checkout-summary-items">
                {items.map((item) => {
                  const price = Number(item.price ?? 0);
                  const old = item.old_price != null ? Number(item.old_price) : null;
                  const qty = Number(item.quantity ?? 1);
                  return (
                    <li key={item.id} className="checkout-summary-item">
                      <img
                        className="checkout-summary-item__thumb"
                        src={item.image_url || `https://picsum.photos/seed/co-${item.id}/80/80`}
                        alt=""
                      />
                      <div className="checkout-summary-item__body">
                        <p className="checkout-summary-item__title">{item.title}</p>
                        <StarRow rating={item.rating ?? 4} />
                        <p className="checkout-summary-item__qty">Qty: {qty}</p>
                        <p className="checkout-summary-item__prices">
                          <span className="checkout-summary-item__price">${(price * qty).toFixed(2)}</span>
                          {old != null && old > price && (
                            <span className="checkout-summary-item__old">${(old * qty).toFixed(2)}</span>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="checkout-card">
              <h2 className="checkout-card__title">Delivery Method</h2>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "free"}
                  onChange={() => setDeliveryMethod("free")}
                />
                <span>Free Shipping (Rate - $0.00)</span>
              </label>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "flat"}
                  onChange={() => setDeliveryMethod("flat")}
                />
                <span>Flat Rate (Rate - $5.00)</span>
              </label>
              <label className="checkout-field checkout-field--block">
                <span className="checkout-field__label">Add Comments About Your Order</span>
                <textarea
                  className="checkout-textarea"
                  rows={4}
                  value={orderComments}
                  onChange={(e) => setOrderComments(e.target.value)}
                  placeholder="Special instructions for delivery…"
                />
              </label>
            </div>

            <div className="checkout-card">
              <h2 className="checkout-card__title">Payment Method</h2>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>Cash On Delivery</span>
              </label>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <span>UPI</span>
              </label>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span>Bank Transfer</span>
              </label>
            </div>

            <div className="checkout-card checkout-card--muted">
              <h2 className="checkout-card__title">Accepted payments</h2>
              <div className="checkout-pay-badges" aria-hidden="true">
                <span className="checkout-pay-badges__item checkout-pay-badges__item--visa">VISA</span>
                <span className="checkout-pay-badges__item checkout-pay-badges__item--mc">Mastercard</span>
                <span className="checkout-pay-badges__item checkout-pay-badges__item--pp">PayPal</span>
                <span className="checkout-pay-badges__item checkout-pay-badges__item--sk">Skrill</span>
                <span className="checkout-pay-badges__item checkout-pay-badges__item--mae">Maestro</span>
              </div>
            </div>
          </aside>

          <div className="checkout-main">
            <div className="checkout-card">
              <div className="checkout-customer-grid">
                <div>
                  <h2 className="checkout-card__title checkout-card__title--sm">New Customer</h2>
                  <label className="checkout-radio">
                    <input
                      type="radio"
                      name="account"
                      checked={accountChoice === "register"}
                      onChange={() => setAccountChoice("register")}
                    />
                    <span>Register Account</span>
                  </label>
                  <label className="checkout-radio">
                    <input
                      type="radio"
                      name="account"
                      checked={accountChoice === "guest"}
                      onChange={() => setAccountChoice("guest")}
                    />
                    <span>Guest Account</span>
                  </label>
                  <button type="button" className="checkout-btn checkout-btn--primary checkout-btn--narrow">
                    Continue
                  </button>
                </div>
                <div className="checkout-customer-grid__divider" />
                <div>
                  <h2 className="checkout-card__title checkout-card__title--sm">Returning Customer</h2>
                  <label className="checkout-field">
                    <span className="checkout-field__label">Email Address</span>
                    <input
                      className="checkout-input"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={returnEmail}
                      onChange={(e) => setReturnEmail(e.target.value)}
                    />
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">Password</span>
                    <input
                      className="checkout-input"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={returnPassword}
                      onChange={(e) => setReturnPassword(e.target.value)}
                    />
                  </label>
                  <div className="checkout-login-row">
                    <button type="button" className="checkout-btn checkout-btn--primary checkout-btn--narrow">
                      Login
                    </button>
                    <button type="button" className="checkout-link-btn">
                      Forgot Password?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2 className="checkout-card__title">Billing Details</h2>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="billingAddr"
                  checked={billingAddressMode === "existing"}
                  onChange={() => setBillingAddressMode("existing")}
                />
                <span>I want to use an existing address</span>
              </label>
              <label className="checkout-radio">
                <input
                  type="radio"
                  name="billingAddr"
                  checked={billingAddressMode === "new"}
                  onChange={() => setBillingAddressMode("new")}
                />
                <span>I want to use new address</span>
              </label>

              <div className={`checkout-billing-form${billingAddressMode === "existing" ? " is-disabled" : ""}`}>
                <div className="checkout-form-grid">
                  <label className="checkout-field">
                    <span className="checkout-field__label">
                      First Name <abbr title="required">*</abbr>
                    </span>
                    <input
                      className="checkout-input"
                      value={billing.firstName}
                      onChange={handleBillingChange("firstName")}
                      disabled={billingAddressMode === "existing"}
                    />
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">
                      Last Name <abbr title="required">*</abbr>
                    </span>
                    <input
                      className="checkout-input"
                      value={billing.lastName}
                      onChange={handleBillingChange("lastName")}
                      disabled={billingAddressMode === "existing"}
                    />
                  </label>
                  <label className="checkout-field checkout-field--full">
                    <span className="checkout-field__label">Address</span>
                    <input
                      className="checkout-input"
                      value={billing.address}
                      onChange={handleBillingChange("address")}
                      disabled={billingAddressMode === "existing"}
                    />
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">
                      City <abbr title="required">*</abbr>
                    </span>
                    <select
                      className="checkout-input checkout-select"
                      value={billing.city}
                      onChange={handleBillingChange("city")}
                      disabled={billingAddressMode === "existing"}
                    >
                      <option value="">Select City</option>
                      <option value="tashkent">Tashkent</option>
                      <option value="samarkand">Samarkand</option>
                      <option value="bukhara">Bukhara</option>
                    </select>
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">Post Code</span>
                    <input
                      className="checkout-input"
                      value={billing.postCode}
                      onChange={handleBillingChange("postCode")}
                      disabled={billingAddressMode === "existing"}
                    />
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">
                      Country <abbr title="required">*</abbr>
                    </span>
                    <select
                      className="checkout-input checkout-select"
                      value={billing.country}
                      onChange={handleBillingChange("country")}
                      disabled={billingAddressMode === "existing"}
                    >
                      <option value="">Select Country</option>
                      <option value="uz">Uzbekistan</option>
                      <option value="kz">Kazakhstan</option>
                      <option value="us">United States</option>
                    </select>
                  </label>
                  <label className="checkout-field">
                    <span className="checkout-field__label">Region / State</span>
                    <select
                      className="checkout-input checkout-select"
                      value={billing.region}
                      onChange={handleBillingChange("region")}
                      disabled={billingAddressMode === "existing"}
                    >
                      <option value="">Select Region</option>
                      <option value="tas">Tashkent Region</option>
                      <option value="sam">Samarkand Region</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="checkout-place-row">
              <button type="button" className="checkout-btn checkout-btn--primary checkout-btn--large" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
