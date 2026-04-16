import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import logoIcon from "../assets/icons/logo.svg";
import cartIcon from "../assets/icons/cart.svg";
import userIcon from "../assets/icons/user.svg";
import wishlistIcon from "../assets/icons/wishlist-icon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import footerLocationIcon from "../assets/icons/footer-location-icon.svg";
import footerTextIcon from "../assets/icons/footer-text-icon.svg";
import footerPhoneIcon from "../assets/icons/footer-phone-icon.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import xIcon from "../assets/icons/x.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import linkedinIcon from "../assets/icons/linkedin-icon.svg";
import typeIcon from "../assets/icons/type.svg";
import footerImage1 from "../assets/icons/footer-image1.svg";
import footerImage2 from "../assets/icons/footer-image2.svg";
import footerImage3 from "../assets/icons/footer-image3.svg";
import footerImage4 from "../assets/icons/footer-image4.svg";
import footerImage5 from "../assets/icons/footer-image5.svg";
import { useCartStore } from "../store/useCartStore";
import { useSettingsStore } from "../store/useSettingsStore";

const FOOTER_COMPANY_KEYS = [
  ["aboutUs", "/about"],
  ["deliveryInfo", "/faq"],
  ["privacy", "/faq"],
  ["terms", "/faq"],
  ["contactUs", "/about"],
  ["support", "/faq"],
];

const FOOTER_CATEGORY_KEYS = [
  ["dairyBakery", "/catalog"],
  ["fruitsVegetable", "/catalog"],
  ["snackSpice", "/catalog"],
  ["juiceDrinks", "/catalog"],
  ["chickenMeat", "/catalog"],
  ["fastFood", "/catalog"],
];

const GALLERY = [
  footerImage1,
  footerImage2,
  footerImage3,
  footerImage4,
  footerImage5,
];
const SOCIALS = [
  { src: facebookIcon, label: "Facebook" },
  { src: xIcon, label: "X" },
  { src: instagramIcon, label: "Instagram" },
  { src: linkedinIcon, label: "LinkedIn" },
];

const LANGS = [
  { code: "en", short: "EN" },
  { code: "uz", short: "UZ" },
  { code: "ru", short: "RU" },
];

export function MainLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const cartCount = useCartStore((s) => s.items.length);
  const wishlistCount = useCartStore((s) => s.wishlistIds.length);

  const navLinks = useMemo(
    () => [
      { label: t("nav.home"), to: "/", end: true },
      { label: t("nav.shop"), to: "/catalog" },
      { label: t("nav.blog"), to: "/blog" },
      { label: t("nav.about"), to: "/about" },
      { label: t("nav.faq"), to: "/faq" },
    ],
    [t],
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchText.trim()) params.set("search", searchText.trim());
    if (searchCategory !== "all") params.set("category", searchCategory);
    navigate(`/catalog?${params.toString()}`);
  }

  function setLanguage(code) {
    void i18n.changeLanguage(code);
  }

  const currentLng = (i18n.language || "en").split("-")[0];

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__top">
          <div className="container site-header__top-inner">
            <div className="site-header__prefs site-header__prefs--desktop">
              <div
                className="site-prefs__lang"
                role="group"
                aria-label={t("prefs.language")}
              >
                {LANGS.map(({ code, short }) => (
                  <button
                    key={code}
                    type="button"
                    className={currentLng === code ? "is-active" : ""}
                    onClick={() => setLanguage(code)}
                  >
                    {short}
                  </button>
                ))}
              </div>
              <div
                className="site-prefs__theme"
                role="group"
                aria-label={t("prefs.themeLight")}
              >
                <button
                  type="button"
                  aria-pressed={theme === "light"}
                  onClick={() => setTheme("light")}
                  title={t("prefs.themeLight")}
                >
                  ☀
                </button>
                <button
                  type="button"
                  aria-pressed={theme === "dark"}
                  onClick={() => setTheme("dark")}
                  title={t("prefs.themeDark")}
                >
                  ☽
                </button>
              </div>
            </div>

            <nav className="site-nav site-nav--desktop" aria-label="Main">
              {navLinks.map(({ label, to, end }) => (
                <NavLink key={to} to={to} end={end}>
                  {label}
                </NavLink>
              ))}
            </nav>
            <a className="site-phone site-phone--desktop" href="tel:+998977555080">
              <img src={phoneIcon} alt="" aria-hidden="true" />
              +998 97 755 50 80
            </a>
          </div>
        </div>

        <div className="container site-header__row">
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-drawer"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="site-menu-toggle__bar" />
            <span className="site-menu-toggle__bar" />
            <span className="site-menu-toggle__bar" />
            <span className="visually-hidden">{t("header.openMenu")}</span>
          </button>

          <NavLink to="/" className="site-header__brand">
            <img src={logoIcon} alt="Foodzy logo" />
          </NavLink>

          <form className="site-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder={t("header.searchPlaceholder")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              aria-label={t("header.allCategories")}
            >
              <option value="all">{t("header.allCategories")}</option>
              <option value="groceries">{t("header.groceries")}</option>
              <option value="fragrances">{t("header.fragrances")}</option>
              <option value="beauty">{t("header.beauty")}</option>
            </select>
            <button type="submit" aria-label={t("header.search")}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          <div className="site-actions site-actions--desktop">
            <NavLink to="/account" className="site-actions__link">
              <img src={userIcon} alt="" aria-hidden="true" />
              {t("header.account")}
            </NavLink>
            <NavLink to="/wishlist" className="site-actions__link">
              <img src={wishlistIcon} alt="" aria-hidden="true" />
              {t("header.wishlist")}
              {wishlistCount > 0 && <span>{wishlistCount}</span>}
            </NavLink>
            <NavLink to="/cart" className="site-actions__link">
              <img src={cartIcon} alt="" aria-hidden="true" />
              {t("header.cart")}
              {cartCount > 0 && <span>{cartCount}</span>}
            </NavLink>
          </div>

          <div className="site-actions site-actions--mobile">
            <NavLink
              to="/account"
              className="site-actions__link site-actions__link--icon"
              aria-label={t("header.account")}
            >
              <img src={userIcon} alt="" aria-hidden="true" />
            </NavLink>
            <NavLink
              to="/wishlist"
              className="site-actions__link site-actions__link--icon"
              aria-label={t("header.wishlist")}
            >
              <img src={wishlistIcon} alt="" aria-hidden="true" />
              {wishlistCount > 0 && <span>{wishlistCount}</span>}
            </NavLink>
            <NavLink
              to="/cart"
              className="site-actions__link site-actions__link--icon"
              aria-label={t("header.cart")}
            >
              <img src={cartIcon} alt="" aria-hidden="true" />
              {cartCount > 0 && <span>{cartCount}</span>}
            </NavLink>
          </div>
        </div>
      </header>

      <div
        className={`site-drawer-root${mobileMenuOpen ? " is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className="site-drawer-backdrop"
          tabIndex={-1}
          aria-label={t("header.closeMenu")}
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside
          id="site-mobile-drawer"
          className="site-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t("header.menuPanel")}
        >
          <div className="site-drawer__head">
            <span className="site-drawer__title">Foodzy</span>
            <button
              type="button"
              className="site-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t("header.closeMenu")}
            >
              ×
            </button>
          </div>
          <nav className="site-drawer__nav" aria-label="Mobile">
            {navLinks.map(({ label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `site-drawer__link${isActive ? " is-active" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <a
            className="site-drawer__phone"
            href="tel:+998977555080"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src={phoneIcon} alt="" aria-hidden="true" />
            +998 97 755 50 80
          </a>
          <div className="site-drawer__prefs">
            <p className="site-drawer__label">{t("prefs.language")}</p>
            <div className="site-prefs__lang site-prefs__lang--wide">
              {LANGS.map(({ code, short }) => (
                <button
                  key={code}
                  type="button"
                  className={currentLng === code ? "is-active" : ""}
                  onClick={() => setLanguage(code)}
                >
                  {short}
                </button>
              ))}
            </div>
            <p className="site-drawer__label">{t("prefs.themeLight")}</p>
            <div className="site-prefs__theme site-prefs__theme--wide">
              <button
                type="button"
                aria-pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                ☀ {t("prefs.themeLight")}
              </button>
              <button
                type="button"
                aria-pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                ☽ {t("prefs.themeDark")}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__top">
            <div className="site-footer__brand-block">
              <NavLink to="/" className="site-header__brand site-footer__brand">
                <img src={logoIcon} alt="Foodzy logo" />
              </NavLink>
              <p className="site-footer__about">{t("footer.about")}</p>
              <ul className="site-footer__contacts">
                <li>
                  <img src={footerLocationIcon} alt="" aria-hidden="true" />
                  <span>
                    House 41, 5-lane Yangi Toshmi Str., Beltepa, Shaykhontohur
                    district, Tashkent, Uzbekistan.
                  </span>
                </li>
                <li>
                  <img src={footerTextIcon} alt="" aria-hidden="true" />
                  <a href="mailto:abbabbb736@gmail.com">abbabbb736@gmail.com</a>
                </li>
                <li>
                  <img src={footerPhoneIcon} alt="" aria-hidden="true" />
                  <a href="tel:+998977555080">+998 97 755 50 80</a>
                </li>
              </ul>
            </div>

            <div className="site-footer__links-block">
              <div>
                <h3>{t("footer.company")}</h3>
                <ul>
                  {FOOTER_COMPANY_KEYS.map(([key, to]) => (
                    <li key={key}>
                      <NavLink to={to}>{t(`footer.${key}`)}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t("footer.category")}</h3>
                <ul>
                  {FOOTER_CATEGORY_KEYS.map(([key, to]) => (
                    <li key={key}>
                      <NavLink to={to}>{t(`footer.${key}`)}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="site-footer__newsletter-block">
              <h3>{t("footer.newsletter")}</h3>
              <form
                className="site-footer__newsletter"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                />
                <button type="submit" aria-label={t("footer.newsletter")}>
                  <img src={typeIcon} alt="" aria-hidden="true" />
                </button>
              </form>
              <div className="site-footer__socials">
                {SOCIALS.map(({ src, label }) => (
                  <a key={label} href="#" aria-label={label}>
                    <img src={src} alt="" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div className="site-footer__gallery">
                {GALLERY.map((src, i) => (
                  <img key={i} src={src} alt={`Gallery ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p>
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
