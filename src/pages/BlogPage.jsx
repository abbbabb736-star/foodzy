import { Link } from 'react-router-dom';
import blogImageMain from '../assets/images/blog-main-image.png';
import blogImage2 from '../assets/images/blog-image2.png';
import blogImage3 from '../assets/images/blog-image3.png';
import blogImageThumb from '../assets/images/blog-image2.png';

const CATEGORIES = [
  ['Milks & Dairies', 14],
  ['Sea Food', 14],
  ['Fresh Fruit', 14],
  ['Pet Foods', 41],
  ['Meat Food', 45],
];

const TAGS = ['Vegetables', 'Juice', 'Meat Food', 'Cabbage', 'Organic Food', 'Milk'];

export function BlogPage() {
  return (
    <div>
      <div className="page-banner">
        <div className="container page-banner__inner">
          <h1>Blog</h1>
          <nav className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>—</span>
            <span>Blog</span>
          </nav>
        </div>
      </div>

      <div className="container page-section">
        <div className="blog-layout">
          <div className="blog-posts">
            <article className="blog-post blog-post--main">
              <img
                src={blogImageMain}
                alt="Health Benefits of a Row food"
                className="blog-post__img"
              />
              <div className="blog-post__meta">
                <span>By Admin</span>
                <span>/ 07 Comments</span>
                <span>/ 09.08.2024</span>
              </div>
              <h2 className="blog-post__title">Health Benefits of a Row food</h2>
              <p className="blog-post__excerpt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestias aut sunt
                reprehenderit natus, soluta dolores vitae cum nesciunt perspiciatis. Sed, soluta
                officia iure enim repudiandae, voluptas dicta temporibus, quos deleniti hic amet
                aliquam.
              </p>
              <p className="blog-post__excerpt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt delectus dolore
                omnis earum voluptatem repellat voluptas sit similique labore est quis, ipsum
                veritatis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <div className="blog-post__grid">
                <article className="blog-post blog-post--small">
                  <img
                    src={blogImage2}
                    alt="Fresh organic apple juice"
                    className="blog-post__img-small"
                  />
                  <div>
                    <h3 className="blog-post__subtitle">
                      Lorem ipsum dolor consectetur adipisicing elit. Molestiae, dolorem?
                    </h3>
                    <p className="blog-post__excerpt blog-post__excerpt--small">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat explicabo
                      omnis ratione molestias veritatis ipsa, nihil sapiente cumque nostrum.
                    </p>
                  </div>
                </article>

                <article className="blog-post blog-post--small">
                  <img
                    src={blogImage3}
                    alt="Healthy snacks on table"
                    className="blog-post__img-small"
                  />
                  <div>
                    <h3 className="blog-post__subtitle">
                      Lorem ipsum dolor consectetur adipisicing elit. Molestiae, dolorem?
                    </h3>
                    <p className="blog-post__excerpt blog-post__excerpt--small">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat explicabo
                      omnis ratione molestias veritatis ipsa, nihil sapiente cumque nostrum.
                    </p>
                  </div>
                </article>
              </div>

              <p className="blog-post__excerpt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat explicabo omnis
                ratione molestias veritatis ipsa, nihil sapiente cumque nostrum. Lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>

              <div className="blog-author">
                <div className="blog-author__avatar">J</div>
                <div>
                  <h4 className="blog-author__name">John martin</h4>
                  <p className="blog-author__bio">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eligendi fuga
                    molestiae assumenda labore amet nesciunt beatae facilis reprehenderit illum
                    tempore minima harum earum.
                  </p>
                </div>
              </div>

              <div className="blog-footer">
                <div className="blog-footer__tags">
                  <span className="blog-tag">Cabbage</span>
                  <span className="blog-tag">Supplements</span>
                  <span className="blog-tag">Meat food</span>
                </div>
              </div>

              <div className="blog-pagination">
                <button type="button" className="blog-page-btn">
                  Previous
                </button>
                <button type="button" className="blog-page-btn blog-page-btn--active">
                  1
                </button>
                <button type="button" className="blog-page-btn">
                  2
                </button>
                <button type="button" className="blog-page-btn">
                  3
                </button>
                <button type="button" className="blog-page-btn">
                  Next
                </button>
              </div>
            </article>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar__block">
              <div className="blog-sidebar__search">
                <input type="text" placeholder="Search here..." />
                <button type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="blog-sidebar__block">
              <h4>Category</h4>
              {CATEGORIES.map(([label, count]) => (
                <div key={label} className="blog-sidebar__cat">
                  <span>{label}</span>
                  <span>({count})</span>
                </div>
              ))}
            </div>

            <div className="blog-sidebar__block">
              <h4>Recent Post</h4>
              <div className="blog-sidebar__recent">
                <img src={blogImageThumb} alt="Recent" />
                <div>
                  <p className="blog-sidebar__recent-title">
                    10 Tasty Organic Fruits to choose
                  </p>
                  <span className="blog-sidebar__recent-date">Sep 29, 2023</span>
                </div>
              </div>
            </div>

            <div className="blog-sidebar__block">
              <h4>Latest Gallery</h4>
              <div className="blog-sidebar__gallery">
                <img src={blogImage2} alt="Gallery item" />
                <img src={blogImage3} alt="Gallery item" />
                <img src={blogImage2} alt="Gallery item" />
                <img src={blogImage3} alt="Gallery item" />
              </div>
            </div>

            <div className="blog-sidebar__block">
              <h4>Popular Tags</h4>
              <div className="blog-sidebar__tags">
                {TAGS.map((t) => (
                  <span key={t} className="blog-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
