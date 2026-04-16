import { Link } from 'react-router-dom';
import aboutImg from '../assets/images/aboutUs-image.png';

const STATS = [
  { value: '0.1k', label: 'Vendors' },
  { value: '23k', label: 'Customers' },
  { value: '2k', label: 'Products' },
];

const FEATURES = [
  {
    icon: '📦',
    title: 'Product Packing',
    desc: 'We carefully pack every order to keep your groceries fresh from our store to your kitchen.',
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    desc: 'Our friendly support team is always just a message away whenever you need help.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    desc: 'Reliable delivery options that get your order to your door in as little as 24 hours.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: 'All payments are protected with industry‑standard encryption and security.',
  },
];

export function AboutPage() {
  return (
    <div>
      <div className="page-banner">
        <div className="container page-banner__inner">
          <div>
            <p className="page-banner__eyebrow">About us</p>
            <h1>Fresh groceries, delivered with care.</h1>
          </div>

          <nav className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>—</span>
            <span>About Us</span>
          </nav>
        </div>
      </div>

      <div className="container page-section">
        <div className="about-layout">
          <div className="about-text">
            <p className="about-pill">Since 2020 • Trusted grocery marketplace</p>

            <h2 className="section-title">We make everyday shopping simple.</h2>

            <p>
              We are the biggest market of grocery products in your area. Get your daily needs from our store and
              enjoy fresh, organic products delivered straight to your door.
            </p>

            <p>
              Our mission is to bring you the finest selection of seasonal vegetables, ripe fruits, and high‑quality
              pantry essentials at competitive prices, while supporting local vendors and farmers.
            </p>

            <p>
              Thank you for choosing us for your daily needs. We are committed to providing a fast, friendly, and
              reliable shopping experience every single day.
            </p>

            <div className="about-stats">
              {STATS.map(({ value, label }) => (
                <div key={label} className="about-stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image">
            <div className="about-image__card">
              <img src={aboutImg} alt="Team preparing fresh grocery orders" />

              <div className="about-image__badge">
                <span className="about-image__badge-pill">100% Fresh</span>
                <p>Hand‑picked groceries packed by our in‑house team.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="about-features">
          {FEATURES.map(({ icon, title, desc }) => (
            <article key={title} className="about-feature">
              <span className="about-feature__icon">{icon}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </article>
          ))}
        </section>

        <section className="about-cta">
          <div className="about-cta__content">
            <h3>Ready to fill your basket?</h3>
            <p>Browse thousands of fresh products, curated offers, and everyday essentials in one place.</p>
          </div>

          <div className="about-cta__actions">
            <Link to="/catalog" className="about-cta__btn about-cta__btn--primary">
              Go to shop
            </Link>
            <Link to="/faq" className="about-cta__btn about-cta__btn--ghost">
              Learn more
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
