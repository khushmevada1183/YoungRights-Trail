import React, { useState, useEffect } from 'react';

const News = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetch('/data/articles.json')
            .then(res => res.json())
            .then(data => {
                setAllArticles(data.articles);
                setFilteredArticles(data.articles);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load articles:", err);
                setLoading(false);
            });
    }, []);
    
    const handleFilter = (source) => {
        setActiveFilter(source);
        if (source === 'All') {
            setFilteredArticles(allArticles);
        } else {
            setFilteredArticles(allArticles.filter(article => article.source === source));
        }
    };

    if (loading) {
        return <div className="container">Loading articles...</div>;
    }

    const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
    const otherArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];
    const sources = ['All', ...new Set(allArticles.map(a => a.source))];

    return (
        <div className="news-container">
            <div className="page-header">
                <h1>Latest News & Articles</h1>
                <p>Stay informed about the latest developments in children's rights from around the world.</p>
            </div>
            
            <div className="news-filters">
                {sources.map(source => (
                    <button 
                        key={source}
                        className={`button ${activeFilter === source ? 'button-primary' : 'button-secondary'}`}
                        onClick={() => handleFilter(source)}
                    >
                        {source}
                    </button>
                ))}
            </div>

            {featuredArticle && (
                <div className="featured-article">
                    <div className="article-card">
                        <div className="article-card-content">
                            <span className="featured-badge">Featured</span>
                            <span className="article-source">{featuredArticle.source} - {featuredArticle.date}</span>
                            <h2 className="article-title">{featuredArticle.title}</h2>
                            <p className="article-summary">{featuredArticle.summary}</p>
                            <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="button button-secondary">Read More</a>
                        </div>
                    </div>
                </div>
            )}

            <div className="articles-grid">
                {otherArticles.map(article => (
                    <div key={article.id} className="article-card">
                        <div className="article-card-content">
                            <span className="article-source">{article.source} - {article.date}</span>
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-summary">{article.summary}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="button button-secondary">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News; 