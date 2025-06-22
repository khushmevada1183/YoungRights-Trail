import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RightsGuide = () => {
    const [rights, setRights] = useState([]);
    const [selectedRight, setSelectedRight] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        // Load rights data
        fetch('/data/rights-guide.json')
            .then(res => res.json())
            .then(data => {
                setRights(data.rights);
                
                // Check for right parameter in URL
                const params = new URLSearchParams(location.search);
                const rightParam = params.get('right');
                
                if (rightParam) {
                    const foundRight = data.rights.find(r => 
                        r.id.toLowerCase() === rightParam.toLowerCase()
                    );
                    if (foundRight) {
                        setSelectedRight(foundRight);
                    } else if (data.rights.length > 0) {
                        setSelectedRight(data.rights[0]);
                    }
                } else if (data.rights.length > 0) {
                    setSelectedRight(data.rights[0]);
                }
            })
            .catch(err => console.error("Failed to load rights data:", err));
    }, [location]);

    const handleRightSelect = (right) => {
        setSelectedRight(right);
    };

    return (
        <div className="rights-guide-container">
            <div className="rights-guide-header">
                <h1>Children's Rights Guide</h1>
                <p className="guide-intro">
                    The UN Convention on the Rights of the Child (UNCRC) is an international human rights treaty that grants all children a comprehensive set of rights. 
                    Learn about these rights and how they are implemented around the world.
                </p>
            </div>
            
            <div className="rights-guide-content">
                <aside className="rights-sidebar">
                    <h2>Rights Categories</h2>
                    <ul className="rights-list">
                        {rights.map(right => (
                            <li 
                                key={right.id}
                                className={selectedRight?.id === right.id ? 'active' : ''}
                                onClick={() => handleRightSelect(right)}
                            >
                                <img src={`/assets/images/icons/${right.icon}.svg`} alt="" className="right-icon" />
                                <span>{right.title}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="uncrc-info">
                        <h3>About the UNCRC</h3>
                        <p>The United Nations Convention on the Rights of the Child is the most widely ratified human rights treaty in history.</p>
                        <a href="https://www.unicef.org/child-rights-convention" target="_blank" rel="noopener noreferrer" className="learn-more">
                            Official UNCRC Website
                        </a>
                    </div>
                </aside>
                
                <main className="right-detail">
                    {selectedRight ? (
                        <>
                            <div className="right-header">
                                <img src={`/assets/images/icons/${selectedRight.icon}.svg`} alt="" className="right-detail-icon" />
                                <h2>{selectedRight.title}</h2>
                            </div>
                            
                            <div className="right-summary">
                                <h3>What is this right?</h3>
                                <p>{selectedRight.description}</p>
                            </div>
                            
                            <div className="right-articles">
                                <h3>UNCRC Articles</h3>
                                <ul>
                                    {selectedRight.articles.map((article, index) => (
                                        <li key={index}>
                                            <strong>Article {article.number}:</strong> {article.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="right-examples">
                                <h3>Real-World Examples</h3>
                                <div className="examples-grid">
                                    {selectedRight.examples.map((example, index) => (
                                        <div key={index} className="example-card">
                                            <h4>{example.title}</h4>
                                            <p>{example.description}</p>
                                            <div className="example-location">
                                                <span className="location-label">Location:</span>
                                                <span className="location-value">{example.location}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="country-comparison">
                                <h3>Country Comparison</h3>
                                <p>How different countries implement this right:</p>
                                
                                <div className="comparison-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Country</th>
                                                <th>Implementation</th>
                                                <th>Effectiveness</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedRight.countries.map((country, index) => (
                                                <tr key={index}>
                                                    <td>{country.name}</td>
                                                    <td>{country.implementation}</td>
                                                    <td>
                                                        <div className="effectiveness-meter">
                                                            <div 
                                                                className="effectiveness-fill"
                                                                style={{width: `${country.effectiveness}%`}}
                                                            ></div>
                                                        </div>
                                                        <span className="effectiveness-value">{country.effectiveness}%</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="challenges-section">
                                <h3>Current Challenges</h3>
                                <ul className="challenges-list">
                                    {selectedRight.challenges.map((challenge, index) => (
                                        <li key={index}>{challenge}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="loading">Loading rights information...</div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RightsGuide;