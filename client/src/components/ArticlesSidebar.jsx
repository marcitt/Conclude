const articles = [
  {
    id: 1,
    title: "How to Save More Money",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    link: "#",
  },
  {
    id: 2,
    title: "Understanding Your Bank Statement",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    readTime: "7 min read",
    link: "#",
  },
];

function ArticlesSidebar() {
  return (
    <aside

    >
      <h2 style={{ marginBottom: "1rem", color: "#2F2E30" }}>Recommended Articles</h2>
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginBottom: "1.5rem",
            padding: "1rem",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            color: "#2F2E30",
            textDecoration: "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f0ebff")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "0.75rem",
            }}
          />
          <small style={{ color: "#7A6FFF", fontWeight: "600" }}>{article.readTime}</small>
          <p style={{ marginTop: "0.25rem", fontWeight: "700", fontSize: "1rem" }}>{article.title}</p>
        </a>
      ))}
    </aside>
  );
}

export default ArticlesSidebar;
