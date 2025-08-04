document.addEventListener('DOMContentLoaded', () => {
    const imagesPerChapter = 20; // Number of images per chapter
    // YOU MUST UPDATE THIS NUMBER MANUALLY based on your total number of comic images / imagesPerChapter
    const totalChapters = 5; // Estimated total number of chapters (e.g., if you have final1.png to final100.png, and imagesPerChapter is 20, then totalChapters = 5)

    // Element references
    const prevChapterTop = document.getElementById('prevChapterTop');
    const nextChapterTop = document.getElementById('nextChapterTop');
    const prevChapterBottom = document.getElementById('prevChapterBottom');
    const nextChapterBottom = document.getElementById('nextChapterBottom');
    const chapterSelector = document.getElementById('chapterSelector');
    const currentChapterTitle = document.getElementById('currentChapterTitle');
    const comicPageWrapper = document.getElementById('comicPageWrapper');

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
});
