import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [activeTab, setActiveTab] = useState('education');
    const [isVisible, setIsVisible] = useState({});
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.2 }
        );
        
        const sections = document.querySelectorAll('.animate-on-scroll');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);
    
    const rightsTabs = [
        { id: 'education', title: 'Education', icon: 'education' },
        { id: 'protection', title: 'Protection', icon: 'protection' },
        { id: 'health', title: 'Healthcare', icon: 'health' },
        { id: 'participation', title: 'Participation', icon: 'participation' },
        { id: 'family', title: 'Family', icon: 'family' },
        { id: 'refugee', title: 'Refugee', icon: 'refugee' },
        { id: 'disability', title: 'Disability', icon: 'disability' },
    ];
    
    const rightsContent = {
        education: {
            title: "Right to Education",
            description: "Every child has the right to free primary education and access to secondary education.",
            fact: "258 million children and youth are out of school globally.",
            examples: [
                "In Finland, education is completely free from pre-primary to higher education, with free school meals for all.",
                "In Ethiopia, mobile schools bring education to nomadic communities."
            ]
        },
        protection: {
            title: "Right to Protection",
            description: "Children must be protected from violence, abuse, neglect, and harmful practices.",
            fact: "1 billion children worldwide experience some form of violence each year.",
            examples: [
                "Sweden was the first country to ban all corporal punishment of children in 1979.",
                "UNICEF's child protection programs reach over 150 million children annually."
            ]
        },
        health: {
            title: "Right to Healthcare",
            description: "Every child has the right to the best possible healthcare, clean water, and nutritious food.",
            fact: "5.2 million children under 5 die each year, mostly from preventable causes.",
            examples: [
                "Cuba has one of the world's highest child vaccination rates at over 99%.",
                "Japan's school lunch program ensures all children receive balanced nutrition daily."
            ]
        },
        participation: {
            title: "Right to Participation",
            description: "Every child has the right to express their views and be heard in matters affecting them.",
            fact: "Only 46% of countries have formal child participation mechanisms in national policy-making.",
            examples: [
                "Youth Parliaments in many countries allow children to influence legislation.",
                "UN CRC Day of General Discussion invites children to speak at the UN."  
            ]
        },
        family: {
            title: "Right to Family Unity",
            description: "Children have the right to live with their parents unless it is not in their best interests.",
            fact: "Over 5 million children worldwide live in institutions separated from families.",
            examples: [
                "Germany's reunification programs prioritise family-based care.",
                "Kenya promotes kinship foster care to keep children with relatives."  
            ]
        },
        refugee: {
            title: "Rights of Refugee & Migrant Children",
            description: "Refugee children have the right to special protection and assistance.",
            fact: "There are 36.5 million displaced children globally (UNHCR 2023).",
            examples: [
                "Canada provides universal healthcare for asylum-seeking children.",
                "Turkey integrates Syrian refugee children into public schools."  
            ]
        },
        disability: {
            title: "Rights of Children with Disabilities",
            description: "Children with disabilities have the right to full inclusion and specialised support.",
            fact: "150 million children live with disabilities worldwide.",
            examples: [
                "Portugal integrates 99% of students with disabilities in mainstream classrooms.",
                "US Miracle League builds inclusive playgrounds."  
            ]
        }
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-inner">
                    <div className="hero-content">
                        <h1>Children's Rights Education Center</h1>
                        <p className="subtitle">Learn about your rights, how they're protected around the world, and why they matter</p>
                        <div className="hero-buttons">
                            <Link to="/rights-guide" className="button button-primary">Start Learning</Link>
                            <Link to="/rights-map" className="button button-secondary">Global Rights Map</Link>
                        </div>
                    </div>
                    <div className="hero-illustration">
                        <img src="/assets/images/illustrations/hero-children.svg" alt="Children holding hands illustration" />
                    </div>
                </div>
            </section>

            <section className="stats-banner">
                <div className="stat-item">
                    <h3>168 Million</h3>
                    <p>children worldwide are engaged in child labor</p>
                </div>
                <div className="stat-item">
                    <h3>258 Million</h3>
                    <p>children and youth are out of school globally</p>
                </div>
                <div className="stat-item">
                    <h3>1 in 4</h3>
                    <p>children live in conflict or disaster zones</p>
                </div>
            </section>

            <section id="rights-section" className={`rights-education-section animate-on-scroll ${isVisible['rights-section'] ? 'visible' : ''}`}>
                <h2>Understanding Your Rights</h2>
                <p className="section-description">The UN Convention on the Rights of the Child (UNCRC) guarantees children specific rights. Learn about them below.</p>
                
                <div className="rights-tabs">
                    {rightsTabs.map(tab => (
                        <button 
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <img src={`/assets/images/icons/${tab.icon}.svg`} alt="" className="tab-icon" />
                            <span>{tab.title}</span>
                        </button>
                    ))}
                </div>
                
                <div className="rights-content">
                    <div className="rights-content-header">
                        <h3>{rightsContent[activeTab].title}</h3>
                        <span className="rights-badge">UNCRC Protected</span>
                    </div>
                    
                    <p className="rights-description">{rightsContent[activeTab].description}</p>
                    
                    <div className="rights-fact-box">
                        <div className="fact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <p><strong>Did you know?</strong> {rightsContent[activeTab].fact}</p>
                    </div>
                    
                    <div className="rights-examples">
                        <h4>Real-World Examples:</h4>
                        <ul>
                            {rightsContent[activeTab].examples.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <Link to={`/rights-guide?right=${activeTab}`} className="button button-primary">Learn More About This Right</Link>
                </div>
            </section>

            <section id="global-section" className={`global-comparison-section animate-on-scroll ${isVisible['global-section'] ? 'visible' : ''}`}>
                <h2>Rights Around the World</h2>
                <p className="section-description">Children's rights are implemented differently across countries. Explore how nations compare:</p>
                
                <div className="countries-grid">
                    <div className="country-card">
                        <div className="country-flag">🇸🇪</div>
                        <h3>Sweden</h3>
                        <div className="country-stat">
                            <span className="stat-name">Child Poverty Rate:</span>
                            <span className="stat-value">3.6%</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Education Spending:</span>
                            <span className="stat-value">7.6% of GDP</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Child Welfare Policy:</span>
                            <div className="rating-stars">
                                <span className="filled">★★★★★</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="country-card">
                        <div className="country-flag">🇺🇸</div>
                        <h3>United States</h3>
                        <div className="country-stat">
                            <span className="stat-name">Child Poverty Rate:</span>
                            <span className="stat-value">16.2%</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Education Spending:</span>
                            <span className="stat-value">5.0% of GDP</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Child Welfare Policy:</span>
                            <div className="rating-stars">
                                <span className="filled">★★★</span><span className="empty">★★</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="country-card">
                        <div className="country-flag">🇳🇬</div>
                        <h3>Nigeria</h3>
                        <div className="country-stat">
                            <span className="stat-name">Child Poverty Rate:</span>
                            <span className="stat-value">75.5%</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Education Spending:</span>
                            <span className="stat-value">1.7% of GDP</span>
                        </div>
                        <div className="country-stat">
                            <span className="stat-name">Child Welfare Policy:</span>
                            <div className="rating-stars">
                                <span className="filled">★</span><span className="empty">★★★★</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Link to="/rights-map" className="button button-primary view-all-button">Explore Global Map</Link>
            </section>

            <section id="resources-section" className={`learning-resources-section section-alt animate-on-scroll ${isVisible['resources-section'] ? 'visible' : ''}`}>
                <h2>Interactive Learning Resources</h2>
                <div className="resources-grid">
                    <div className="resource-card">
                        <div className="resource-icon">
                            <img src="/assets/images/icons/map.svg" alt="" />
                        </div>
                        <h3>Interactive Rights Map</h3>
                        <p>Explore how children's rights are implemented in different countries with real statistics and case studies.</p>
                        <Link to="/rights-map" className="button button-secondary">Open Map</Link>
                    </div>
                    
                    <div className="resource-card">
                        <div className="resource-icon">
                            <img src="/assets/images/icons/game.svg" alt="" />
                        </div>
                        <h3>Rights Knowledge Quiz</h3>
                        <p>Test your understanding of children's rights with our educational quizzes based on real-world scenarios.</p>
                        <Link to="/quizzes" className="button button-secondary">Take Quiz</Link>
                    </div>
                    
                    <div className="resource-card">
                        <div className="resource-icon">
                            <img src="/assets/images/icons/expression.svg" alt="" />
                        </div>
                        <h3>Real Children's Stories</h3>
                        <p>Read true stories about how children's rights impact real lives around the world.</p>
                        <Link to="/stories" className="button button-secondary">Read Stories</Link>
                    </div>
                </div>
            </section>

            <section id="action-section" className={`action-section section-alt animate-on-scroll ${isVisible['action-section'] ? 'visible' : ''}`}>
                <h2>Take Action for Children's Rights</h2>
                <p>Learn how you can help promote and protect children's rights in your community and around the world.</p>
                <div className="action-buttons">
                    <Link to="/rights-guide" className="button button-primary">Learn More</Link>
                    <a href="https://www.unicef.org/take-action" target="_blank" rel="noopener noreferrer" className="button button-secondary">Visit UNICEF</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
