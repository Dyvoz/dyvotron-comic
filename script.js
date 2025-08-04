document.addEventListener('DOMContentLoaded', () => {
    // --- Chapter Configuration (YOU MUST EDIT THIS ARRAY) ---
    // Each number in this array represents the number of comic pages in that specific chapter.
    // Example: [20, 15, 25] means:
    //   Chapter 1 has 20 pages (final1.png to final20.png)
    //   Chapter 2 has 15 pages (final21.png to final35.png)
    //   Chapter 3 has 25 pages (final36.png to final60.png)
    // Ensure your comic page images (final1.png, final2.png, etc.) exist for the total count.
    const chapterPageCounts = [
        20, // Example: Chapter 1 has 20 pages
        15, // Example: Chapter 2 has 15 pages
        25  // Example: Chapter 3 has 25 pages
        // ADD MORE NUMBERS HERE for additional chapters, e.g., 30, for Chapter 4 with 30 pages
    ];

    const totalChapters = chapterPageCounts.length; // Dynamically determined from your array

    // Element references
    const prevChapterTop = document.getElementById('prevChapterTop');
    const nextChapterTop = document.getElementById('nextChapterTop');
    const prevChapterBottom = document.getElementById('prevChapterBottom');
    const nextChapterBottom = document.getElementById('nextChapterBottom');
    const chapterSelector = document.getElementById('chapterSelector');
    const currentChapterTitle = document.getElementById('currentChapterTitle');
    const comicPageWrapper = document.getElementById('comicPageWrapper');

    let currentChapterIndex = 0; // Chapter index (0-based)

    // Function to calculate the start and end page numbers for a given chapter index
    function getChapterPageRange(chapterIndex) {
        let startPageNum = 1;
        // Sum pages of all previous chapters to find the starting page number of the current chapter
        for (let i = 0; i < chapterIndex; i++) {
            startPageNum += chapterPageCounts[i];
        }
        const endPageNum = startPageNum + chapterPageCounts[chapterIndex] - 1;
        return { start: startPageNum, end: endPageNum };
    }

    // Function to update navigation button states (enabled/disabled)
    function updateNavigationButtons() {
        prevChapterTop.classList.toggle('disabled', currentChapterIndex === 0);
        prevChapterBottom.classList.toggle('disabled', currentChapterIndex === 0);
        nextChapterTop.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
        nextChapterBottom.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
    }

    // Function to load and display a specific chapter
    function loadChapter(chapterIndex) {
        // Basic validation for chapter index
        if (chapterIndex < 0 || chapterIndex >= totalChapters) {
            console.warn("Attempting to load invalid chapter index:", chapterIndex);
            // Optionally, load a default chapter or show an error message
            if (totalChapters > 0) {
                 chapterIndex = 0; // Fallback to the first chapter
            } else {
                 currentChapterTitle.textContent = "No Chapters Defined!";
                 comicPageWrapper.innerHTML = "<p style='text-align:center;'>Please define your comic chapters in script.js.</p>";
                 updateNavigationButtons(); // Disable buttons
                 return;
            }
        }

        currentChapterIndex = chapterIndex;
        const pageRange = getChapterPageRange(currentChapterIndex);

        currentChapterTitle.textContent = `Chapter ${currentChapterIndex + 1}`; // Display 1-based chapter number

        // Clear existing images
        comicPageWrapper.innerHTML = '';

        // Load images for the current chapter
        for (let i = pageRange.start; i <= pageRange.end; i++) {
            const img = document.createElement('img');
            img.src = `final${i}.png`; // Assumes images are named final1.png, final2.png, etc.
            img.alt = `Dyvotron Chapter ${currentChapterIndex + 1} Page ${i - pageRange.start + 1}`;
            comicPageWrapper.appendChild(img);
        }

        // Update chapter selector dropdown
        chapterSelector.value = currentChapterIndex;

        // Scroll to the top of the page after loading new content
        window.scrollTo({ top: 0, behavior: 'smooth' });

        updateNavigationButtons(); // Update button states after loading
    }

    // --- Initialization ---
    // Populate chapter selector dropdown
    if (totalChapters > 0) {
        for (let i = 0; i < totalChapters; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i + 1}`;
            chapterSelector.appendChild(option);
        }

        // Load the initial chapter based on URL parameter or default to the first
        const urlParams = new URLSearchParams(window.location.search);
        const chapterParam = urlParams.get('chapter');
        if (chapterParam !== null && !isNaN(parseInt(chapterParam))) {
            const requestedChapterIndex = parseInt(chapterParam) - 1; // Convert to 0-based
            loadChapter(requestedChapterIndex);
        } else {
            loadChapter(0); // Load first chapter by default
        }
    } else {
        // Handle case where no chapters are defined
        currentChapterTitle.textContent = "No Chapters Defined!";
        comicPageWrapper.innerHTML = "<p style='text-align:center;'>Please populate the 'chapterPageCounts' array in script.js to define your comic chapters.</p>";
        updateNavigationButtons(); // Disable navigation buttons
        chapterSelector.innerHTML = '<option value="-1">No Chapters</option>'; // Add dummy option
    }


    // --- Event Listeners for Navigation ---
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
