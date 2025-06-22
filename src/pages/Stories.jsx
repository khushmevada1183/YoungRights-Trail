import React, { useState, useEffect } from 'react';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetch('/data/stories.json')
      .then(res => res.json())
      .then(data => {
        setStories(data.stories);
        setSelectedStory(data.stories[0]); // Select the first story by default
      })
      .catch(err => console.error("Failed to load stories:", err));
  }, []);

  if (stories.length === 0) {
    return <div className="container">Loading stories...</div>;
  }

  return (
    <div className="stories-container">
      <div className="story-list-panel">
        <h2>Choose a Story</h2>
        <ul className="story-list">
          {stories.map(story => (
            <li
              key={story.id}
              className={`story-list-item ${selectedStory && selectedStory.id === story.id ? 'active' : ''}`}
              onClick={() => setSelectedStory(story)}
            >
              <img src={story.cover_image} alt={`${story.protagonist}`} className="story-list-avatar" />
              <div className="story-list-info">
                <h3>{story.title}</h3>
                <p>{story.related_right}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="story-content-panel">
        {selectedStory ? (
          <article className="story-content">
            <h1 className="story-title">{selectedStory.title}</h1>
            <p className="story-summary">{selectedStory.summary}</p>
            <div className="story-body">
              {selectedStory.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
            {selectedStory.discussion_questions && (
              <div className="discussion-questions">
                <h3>Think About It</h3>
                <ul>
                  {selectedStory.discussion_questions.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ) : (
          <p>Please select a story to read.</p>
        )}
      </div>
    </div>
  );
};

export default Stories;
