document.addEventListener('DOMContentLoaded', () => {
    const imagesPerChapter = 20; // Number of images per chapter
    const totalChapters = 4; // Estimated total number of chapters you have/plan (e.g., if you have final1.png to final100.png, it's 5 chapters)

    // Element references
    const prevChapterTop = document.getElementById('prevChapterTop');
    const nextChapterTop = document.getElementById('nextChapterTop');
    const prevChapterBottom = document.getElementById('prevChapterBottom');
    const nextChapterBottom = document.getElementById('nextChapterBottom');
    const chapterSelector = document.getElementById('chapterSelector');
    const currentChapterTitle = document.getElementById('currentChapterTitle');
    const comicPageWrapper = document.getElementById('comicPageWrapper');
    const likeButton = document.getElementById('likeButton');
    const likeCountSpan = document.getElementById('likeCount');
    const commentInput = document.getElementById('commentInput');
    const postCommentButton = document.getElementById('postCommentButton');
    const commentsList = document.getElementById('commentsList');

    let currentChapterIndex = 0; // Chapter index (0-based)

    // Function to update navigation button states (enabled/disabled)
    function updateNavigationButtons() {
        prevChapterTop.classList.toggle('disabled', currentChapterIndex === 0);
        prevChapterBottom.classList.toggle('disabled', currentChapterIndex === 0);
        nextChapterTop.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
        nextChapterBottom.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
    }

    // Function to load and display a specific chapter
    function loadChapter(chapterIndex) {
        // Check if chapter index is within valid range
        if (chapterIndex < 0 || chapterIndex >= totalChapters) {
            console.warn("Attempting to load invalid chapter index:", chapterIndex);
            return;
        }

        currentChapterIndex = chapterIndex;
        const startImageNum = (currentChapterIndex * imagesPerChapter) + 1;
        const endImageNum = startImageNum + imagesPerChapter - 1;

        currentChapterTitle.textContent = `Chapter ${currentChapterIndex + 1}`; // Display 1-based chapter number

        // Clear existing images
        comicPageWrapper.innerHTML = '';

        // Load images for the current chapter
        for (let i = startImageNum; i <= endImageNum; i++) {
            const img = document.createElement('img');
            img.src = `final${i}.png`; // Assumes images are named final1.png, final2.png, etc.
            img.alt = `Dyvotron Chapter ${currentChapterIndex + 1} Page ${i - startImageNum + 1}`;
            comicPageWrapper.appendChild(img);
        }

        // Update chapter selector dropdown
        chapterSelector.value = currentChapterIndex;

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update likes and comments for the new chapter (simulated)
        // In a real application, this would be loaded from a server/database
        likeCountSpan.textContent = Math.floor(Math.random() * 100) + 50; // Random number of likes
        likeButton.disabled = false;
        likeButton.textContent = '❤️ Like Chapter';
        
        commentsList.innerHTML = '<div class="comment-item"><p><strong>System:</strong> Comments for this chapter (Chapter ' + (currentChapterIndex + 1) + ') are active.</p></div>';
        commentInput.value = '';

        updateNavigationButtons(); // Update button states
    }

    // --- Initialization ---
    // Populate chapter selector dropdown
    for (let i = 0; i < totalChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i + 1}`;
        chapterSelector.appendChild(option);
    }

    // Load the first chapter when the page loads
    loadChapter(currentChapterIndex);

    // --- Event Listeners ---
    nextChapterTop.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentChapterIndex < totalChapters - 1) {
            loadChapter(currentChapterIndex + 1);
        }
    });

    prevChapterTop.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentChapterIndex > 0) {
            loadChapter(currentChapterIndex - 1);
        }
    });

    nextChapterBottom.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentChapterIndex < totalChapters - 1) {
            loadChapter(currentChapterIndex + 1);
        }
    });

    prevChapterBottom.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentChapterIndex > 0) {
            loadChapter(currentChapterIndex - 1);
        }
    });

    chapterSelector.addEventListener('change', (e) => {
        loadChapter(parseInt(e.target.value));
    });

    likeButton.addEventListener('click', () => {
        // In a real application, you'd send the like to a server
        // Here, we just simulate by increasing the count and disabling the button
        if (!likeButton.disabled) {
            let currentLikes = parseInt(likeCountSpan.textContent);
            likeCountSpan.textContent = currentLikes + 1;
            likeButton.disabled = true;
            likeButton.textContent = '❤️ Liked!';
            alert('Thanks for your like! (Simulation)');
        }
    });

    postCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            // In a real application, you'd send the comment to a server and then reload the list
            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            // Add a timestamp or username for realism
            newComment.innerHTML = `<p><strong>User (You):</strong> ${commentText}</p>`;
            commentsList.prepend(newComment); // Add new comments at the top
            commentInput.value = ''; // Clear input field
            alert('Your comment has been posted! (Simulation)');
        } else {
            alert('Please write a comment before posting.');
        }
    });
});
