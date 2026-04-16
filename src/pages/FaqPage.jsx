import { useState } from 'react';
import { Link } from 'react-router-dom';
import faqImage from '../assets/images/Faq-image.png';

const FAQ_ITEMS = [
  { id: 1, q: 'What Facilities Does Your Hotel Have?',      a: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ad voluptate doloribus eos sunt labore ad enim voluptatem, sequi voluptas nam doloremque architecto.' },
  { id: 2, q: 'How Do I Book A Room For My Vacation?',      a: 'Our booking process is straightforward. Simply browse our catalog, add items to cart, and proceed to checkout.' },
  { id: 3, q: 'How are we best among others?',              a: 'We offer unmatched quality, fresh produce sourced directly from local farms, and fast reliable delivery to your door.' },
  { id: 4, q: 'Is There Any Fitness Center In Your Hotel?', a: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. We have full amenities available for all customers.' },
  { id: 5, q: 'What Type Of Room Service Do You Offer?',    a: 'We offer 24/7 customer support with a wide selection of fresh and organic options delivered same-day.' },
  { id: 6, q: 'What Facilities Does Your Hotel Have?',      a: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Contact us for more info.' },
  { id: 7, q: 'How Do I Book A Room For My Vacation?',      a: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Our team is always ready to help.' },
];

export function FaqPage() {
  const [openId, setOpenId] = useState(1);

  return (
    <div>
      <div className="page-banner">
        <div className="container page-banner__inner">
          <h1>FAQ</h1>
          <nav className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>—</span>
            <span>FAQ</span>
          </nav>
        </div>
      </div>

      <div className="container page-section">
        <div className="faq-layout">
          <div className="faq-image-col">
            <img src={faqImage} alt="FAQ" />
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id}
                className={`faq-item${openId === item.id ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-item__q"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  type="button">
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openId === item.id ? '∨' : '›'}</span>
                </button>
                {openId === item.id && (
                  <p className="faq-item__a">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
