document.addEventListener('DOMContentLoaded', function() {
    // Story navigation
    const storyContent = document.querySelector('.story-content');
    const choiceButtons = document.querySelectorAll('.choice');
    
    // Audio controls
    const audioToggle = document.querySelector('.audio-toggle');
    let audioEnabled = true;
    const narrations = {
        'scene-1': new Audio('../assets/audio/scene1.mp3'),
        'scene-2a': new Audio('../assets/audio/scene2a.mp3'),
        'scene-2b': new Audio('../assets/audio/scene2b.mp3'),
        'scene-3a': new Audio('../assets/audio/scene3a.mp3'),
        'scene-3b': new Audio('../assets/audio/scene3b.mp3'),
        'scene-3c': new Audio('../assets/audio/scene3c.mp3'),
        'scene-3d': new Audio('../assets/audio/scene3d.mp3')
    };
    
    // Initialize story
    function initStory() {
        // Show first scene, hide others
        const allScenes = document.querySelectorAll('.story-scene');
        allScenes.forEach(scene => {
            scene.classList.remove('active');
        });
        document.getElementById('scene-1').classList.add('active');
        
        // Play first narration if audio is enabled
        if (audioEnabled) {
            playNarration('scene-1');
        }
        
        // Announce scene change to screen reader
        announceToScreenReader('Story started. Scene 1: Mia wants to go to school');
    }
    
    // Handle choice selection
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSceneId = this.getAttribute('data-next-scene');
            navigateToScene(nextSceneId);
            
            // Announce choice to screen reader
            announceToScreenReader(`Selected: ${this.textContent}`);
        });
    });
    
    // Navigate to a specific scene
    function navigateToScene(sceneId) {
        // Hide all scenes
        const allScenes = document.querySelectorAll('.story-scene');
        allScenes.forEach(scene => {
            scene.classList.remove('active');
        });
        
        // Show selected scene
        const targetScene = document.getElementById(sceneId);
        if (targetScene) {
            targetScene.classList.add('active');
            
            // Play narration if audio is enabled
            if (audioEnabled) {
                playNarration(sceneId);
            }
            
            // Log progress for analysis
            logProgress(sceneId);
            
            // Announce scene change to screen reader
            const sceneText = targetScene.querySelector('.scene-text').textContent;
            announceToScreenReader(`New scene: ${sceneText}`);
        }
    }
    
    // Play audio narration
    function playNarration(sceneId) {
        // Stop any currently playing narration
        Object.values(narrations).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        // Play the narration for this scene
        if (narrations[sceneId]) {
            narrations[sceneId].play();
        }
    }
    
    // Toggle audio on/off
    audioToggle.addEventListener('click', function() {
        audioEnabled = !audioEnabled;
        
        if (audioEnabled) {
            this.classList.remove('audio-off');
            // Play current scene's narration
            const currentScene = document.querySelector('.story-scene.active');
            if (currentScene) {
                playNarration(currentScene.id);
            }
            announceToScreenReader('Audio enabled');
        } else {
            this.classList.add('audio-off');
            // Pause all narrations
            Object.values(narrations).forEach(audio => {
                audio.pause();
            });
            announceToScreenReader('Audio disabled');
        }
    });
    
    // Restart button
    const restartButton = document.querySelector('.restart-story');
    restartButton.addEventListener('click', function() {
        initStory();
        announceToScreenReader('Story restarted');
    });
    
    // Track user progress for analytics
    function logProgress(sceneId) {
        // This would typically send data to a backend
        console.log(`User navigated to ${sceneId}`);
        
        // For a pure frontend implementation, could use localStorage
        const storyProgress = JSON.parse(localStorage.getItem('storyProgress') || '{}');
        storyProgress[sceneId] = true;
        localStorage.setItem('storyProgress', JSON.stringify(storyProgress));
    }
    
    // Initialize on page load
    initStory();
    
    // Handle keyboard navigation for choices
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeScene = document.querySelector('.story-scene.active');
            const choices = activeScene.querySelectorAll('.choice');
            const currentIndex = Array.from(choices).indexOf(document.activeElement);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                choices[currentIndex - 1].focus();
            } else if (e.key === 'ArrowRight' && currentIndex < choices.length - 1) {
                choices[currentIndex + 1].focus();
            }
        }
    });
}); 