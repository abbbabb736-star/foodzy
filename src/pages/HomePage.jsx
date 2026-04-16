import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCatalogSearchParams } from "../shared/hooks/useCatalogSearchParams";
import { useMinLoading } from "../shared/hooks/useMinLoading";
import { useProductsQuery } from "../entities/product/queries/useProductsQuery";
import { useCategoriesQuery } from "../entities/category/queries/useCategoriesQuery";
import { ProductCard } from "../entities/product/ui/ProductCard";
import { ProductCardSkeleton } from "../entities/product/ui/ProductCardSkeleton";
import { useCartStore } from "../store/useCartStore";
import { perks } from "../shared/config/homeSections";
import heroMainImage from "../assets/images/hero-main.png";
import homeCategory1 from "../assets/images/HomeCategory1.png";
import homeCategory2 from "../assets/images/HomeCategory2.png";
import homeCategory3 from "../assets/images/HomeCategory3.png";
import dailyBestSellsImage from "../assets/images/DailyBestSells-img.png";
import newsletterBannerImage from "../assets/images/NewsLetterBanner-img.png";
import dealImage1 from "../assets/images/DealsOfTheDay1.png";
import dealImage2 from "../assets/images/DealsOfTheDay2.png";
import dealImage3 from "../assets/images/DealsOfTheDay3.png";
import dealImage4 from "../assets/images/DealsOfTheDay4.png";
import featureIcon1 from "../assets/icons/features1.svg";
import featureIcon2 from "../assets/icons/features2.svg";
import featureIcon3 from "../assets/icons/features3.svg";
import featureIcon4 from "../assets/icons/features4.svg";
import featureIcon5 from "../assets/icons/features5.svg";

const HERO_TAGS = ["Shopping", "Recipes", "Kitchen", "News", "Food"];
const PERK_ICONS = [
  featureIcon1,
  featureIcon2,
  featureIcon3,
  featureIcon4,
  featureIcon5,
];
const DEAL_IMAGES = [dealImage1, dealImage2, dealImage3, dealImage4];
const PROMO_DATA = [
  {
    bg: "#fff3e0",
    title: "Everyday Fresh & Clean with Our Products",
    img: homeCategory1,
  },
  {
    bg: "#fce4ec",
    title: "Make your Breakfast Healthy and Easy",
    img: homeCategory2,
  },
  {
    bg: "#e8f5e9",
    title: "The best Organic Products Online",
    img: homeCategory3,
  },
];
const TOP_SECTIONS = [
  "Top Selling",
  "Trending Products",
  "Recently added",
  "Top Rated",
];
const SELL_TABS = ["Featured", "Popular", "New added"];

/** DummyJSON category slugs — Popular Products tabs order */
const POPULAR_CATEGORY_SLUGS = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
];

function orderPopularCategories(categories) {
  const byId = new Map(categories.map((c) => [c.id, c]));
  return POPULAR_CATEGORY_SLUGS.map((slug) => byId.get(slug)).filter(Boolean);
}

function mapImg(product) {
  return (
    product.image_url || `https://picsum.photos/seed/${product.id}/480/320`
  );
}

export function HomePage() {
  const [activeTab, setActiveTab] = useState("Featured");
  const [popularCategory, setPopularCategory] = useState("all");

  const { search } = useCatalogSearchParams();
  const categoriesQuery = useCategoriesQuery();
  const productsQuery = useProductsQuery({
    searchText: search,
    categoryId: "all",
    limit: 100,
  });

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlistIds = useCartStore((s) => s.wishlistIds);

  const categories = categoriesQuery.data ?? [];
  const popularCategoryTabs = useMemo(
    () => orderPopularCategories(categories),
    [categories],
  );

  const products = useMemo(
    () =>
      (productsQuery.data ?? []).map((p) => ({ ...p, image_url: mapImg(p) })),
    [productsQuery.data],
  );

  const popularProducts = useMemo(() => {
    let list = products;
    if (popularCategory !== "all") {
      list = products.filter(
        (p) =>
          p.category_id === popularCategory || p.category_name === popularCategory,
      );
    }
    return [...list]
      .sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0))
      .slice(0, 10);
  }, [products, popularCategory]);

  const dailyBestSells = useMemo(() => {
    const list = [...products];
    if (activeTab === "Featured") {
      list.sort((a, b) => {
        const aDeal = a.old_price ? 1 : 0;
        const bDeal = b.old_price ? 1 : 0;
        if (bDeal !== aDeal) return bDeal - aDeal;
        return Number(b.rating ?? 0) - Number(a.rating ?? 0);
      });
    } else if (activeTab === "Popular") {
      list.sort(
        (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0),
      );
    } else {
      list.sort((a, b) => Number(b.id ?? 0) - Number(a.id ?? 0));
    }
    return list.slice(0, 4);
  }, [products, activeTab]);

  const deals = products.slice(0, 4);
  const listItems = TOP_SECTIONS.map((title, i) => ({
    title,
    items: products.slice(i * 3, i * 3 + 3),
  }));

  const isLoading = useMinLoading(productsQuery.isLoading, 1600);
  const skeletons = Array.from({ length: 10 }, (_, i) => `sk-${i}`);

  return (
    <section className="home-page">
      {/* ── HERO ── */}
      <div className="home-page__hero">
        <div className="container">
          <div className="hero-content">
            <p className="eyebrow">
              <u>100% </u>
              <span>Organic Vegetables</span>
            </p>
            <h2>
              The best way to
              <br />
              stuff your wallet.
            </h2>
            <p className="hero-desc">
              Fresh organic products delivered straight to your door. Shop
              smarter, eat healthier.
            </p>
            <form
              className="hero-subscribe"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="hero-tags">
              {HERO_TAGS.map((tag) => (
                <span key={tag}>× {tag}</span>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src={heroMainImage} alt="Fresh vegetables" />
          </div>
        </div>
      </div>

      {/* ── PROMO BANNERS ── */}
      <div className="promo-grid">
        <div className="container">
          {PROMO_DATA.map(({ bg, title, img }) => (
            <Link key={title} to="/catalog" style={{ textDecoration: "none" }}>
              <article className="promo-card" style={{ background: bg }}>
                <div className="promo-card__text">
                  <h3>{title}</h3>
                  <button type="button">Shop Now</button>
                </div>
                <img src={img} alt={title} />
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* ── POPULAR PRODUCTS ── */}
      <div className="popular-section">
        <div className="container">
          <div className="title-row">
            <h2 className="section-title">Popular Products</h2>
            <div className="title-tabs">
              <button
                type="button"
                className={popularCategory === "all" ? "active" : ""}
                onClick={() => setPopularCategory("all")}
              >
                All
              </button>
              {popularCategoryTabs.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={popularCategory === cat.id ? "active" : ""}
                  onClick={() => setPopularCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {isLoading
              ? skeletons.map((k) => <ProductCardSkeleton key={k} />)
              : popularProducts.length > 0
                ? popularProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWished={wishlistIds.includes(p.id)}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))
                : (
                    <p className="home-page__empty-filter">
                      No products in this category.
                    </p>
                  )}
          </div>
        </div>
      </div>

      {/* ── DAILY BEST SELLS ── */}
      <div className="best-sells-section">
        <div className="container">
          <div className="best-sells-title-row">
            <h2 className="section-title">Daily Best Sells</h2>
            <div className="sell-tabs">
              {SELL_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="best-sells-grid">
            <article className="best-sells-banner">
              <img src={dailyBestSellsImage} alt="Daily Best Sells" />
              <h3>Bring nature into your home</h3>
              <button type="button">Shop Now →</button>
            </article>
            <div className="daily-products-grid">
              {isLoading
                ? Array.from({ length: 4 }, (_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : dailyBestSells.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWished={wishlistIds.includes(p.id)}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DEALS OF THE DAY ── */}
      <div className="deals-section">
        <div className="container">
          <div className="deals-title-row">
            <h2 className="section-title">Deals Of The Day</h2>
            <Link to="/catalog">All Deals →</Link>
          </div>
          <div className="deals-cards">
            {isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={`deal-skel-${index}`}
                    className="deal-card deal-card--skeleton"
                    aria-hidden="true"
                  >
                    <div className="deal-card__img-skel" />
                    <div className="deal-card__body">
                      <h4>Loading</h4>
                      <p>$0.00</p>
                    </div>
                  </div>
                ))
              : deals.map((deal, i) => (
                  <Link
                    key={deal.id}
                    to={`/product/${deal.id}`}
                    className="deal-card"
                  >
                    <img
                      src={DEAL_IMAGES[i % DEAL_IMAGES.length]}
                      alt={deal.title}
                    />
                    <div className="deal-card__body">
                      <h4>{deal.title}</h4>
                      <p>${Number(deal.price ?? 0).toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>

      {/* ── TOP LISTS ── */}
      <div className="lists-section">
        <div className="container">
          <div className="lists-grid">
            {listItems.map(({ title, items }) => (
              <section key={title}>
                <h3>{title}</h3>
                <div className="mini-list">
                  {isLoading
                    ? Array.from({ length: 3 }, (_, index) => (
                        <div
                          key={`${title}-sk-${index}`}
                          className="mini-list__item mini-list__item--skeleton"
                          aria-hidden="true"
                        >
                          <div className="mini-list__img-skel" />
                          <div style={{ width: "100%" }}>
                            <div className="mini-list__line-skel" />
                            <div className="mini-list__line-skel mini-list__line-skel--short" />
                          </div>
                        </div>
                      ))
                    : items.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          className="mini-list__item"
                        >
                          <img src={item.image_url} alt={item.title} />
                          <div>
                            <p>{item.title}</p>
                            <strong>
                              ${Number(item.price ?? 0).toFixed(2)}
                            </strong>
                          </div>
                        </Link>
                      ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter">
            <div className="newsletter__text">
              <h3>Stay home &amp; get your daily <br /> needs from our shop</h3>
              <p>
                Start Your Daily Shopping with <span>Nest Mart</span>
              </p>
              <form
                className="hero-subscribe"
                onSubmit={(e) => e.preventDefault()}
              >
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
            <img src={newsletterBannerImage} alt="Delivery" />
          </div>
        </div>
      </div>

      {/* ── PERKS ── */}
      <div className="perks-section">
        <div className="container">
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <article key={perk.id} className="perk-card">
                <img
                  src={PERK_ICONS[i % PERK_ICONS.length]}
                  alt=""
                  aria-hidden="true"
                />
                {/* <div>
                  <h4>{perk.title}</h4>
                  <p>{perk.text}</p>
                </div> */}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
