document.addEventListener('DOMContentLoaded', () => {
    // --- Global Variables for Chapter Logic (Used by comic.html) ---
    // YOU MUST POPULATE THIS ARRAY WITH ALL YOUR COMIC PAGE FILENAMES IN ORDER
    // INCLUDING 'finalchapterX.png' TO MARK CHAPTER ENDS.
    // Example: ['final1.png', 'final2.png', 'final3.png', 'finalchapter1.png', 'final4.png', 'final5.png', 'finalchapter2.png']
    const allComicPages = [
        // Dummy data for demonstration. Replace with your actual image filenames.
        // Chapter 1
        'final1.png', 'final2.png', 'final3.png', 'finalchapter1.png',
        // Chapter 2
        'final4.png', 'final5.png', 'final6.png', 'final7.png', 'finalchapter2.png',
        // Chapter 3
        'final8.png', 'final9.png', 'finalchapter3.png',
        // Add more pages and chapter markers as needed.
        // Make sure the very last image is also included, even if it's not a finalchapterX.png
        // If your last chapter doesn't end with finalchapterX.png, its last page will simply be the last image in this array.
    ];

    let chapters = []; // This will store the processed chapter data: [{startIndex: 0, endIndex: 3, title: "Chapter 1"}, ...]
    let currentChapterIndex = 0; // Current chapter index (0-based)

    // --- Dark Mode Logic (Applies to all pages) ---
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeSwitch) { // Ensure switch exists on the page
            darkModeSwitch.checked = true;
        }
    } else {
        body.classList.remove('dark-mode');
        if (darkModeSwitch) {
            darkModeSwitch.checked = false;
        }
    }

    // Listen for dark mode switch change
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', () => {
            if (darkModeSwitch.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Common Functions (Used by both index.html and comic.html) ---

    // Contact Modal Logic
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.modal .close-button');

    if (contactButton) { // Only apply if on index.html
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.style.display = 'flex'; // Use flex to center
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    // Close modal if user clicks outside of it
    if (contactModal) {
        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }

    // --- Comic Page Specific Logic (Only runs on comic.html) ---
    // Check if we are on the comic page by looking for specific elements
    if (document.getElementById('comicPageWrapper')) {
        const prevChapterTop = document.getElementById('prevChapterTop');
        const nextChapterTop = document.getElementById('nextChapterTop');
        const prevChapterBottom = document.getElementById('prevChapterBottom');
        const nextChapterBottom = document.getElementById('nextChapterBottom');
        const chapterSelector = document.getElementById('chapterSelector');
        const currentChapterTitle = document.getElementById('currentChapterTitle');
        const comicPageWrapper = document.getElementById('comicPageWrapper');

        // Process allComicPages to define chapters
        function defineChapters() {
            let chapterCounter = 1;
            let chapterStartIndex = 0;

            for (let i = 0; i < allComicPages.length; i++) {
                if (allComicPages[i].startsWith('finalchapter')) {
                    chapters.push({
                        startIndex: chapterStartIndex,
                        endIndex: i, // This is the index of the finalchapterX.png
                        title: `Chapter ${chapterCounter}`
                    });
                    chapterStartIndex = i + 1; // Next chapter starts after this marker
                    chapterCounter++;
                }
            }
            // Add any remaining pages as the last chapter if no finalchapterX.png at the very end
            // This handles cases where the comic ends without an explicit finalchapterX.png
            if (chapterStartIndex < allComicPages.length) {
                 chapters.push({
                    startIndex: chapterStartIndex,
                    endIndex: allComicPages.length - 1,
                    title: `Chapter ${chapterCounter}`
                });
            }
            // If no chapters were found (e.g., allComicPages is empty or only has regular pages without markers)
            if (chapters.length === 0 && allComicPages.length > 0) {
                 chapters.push({
                    startIndex: 0,
                    endIndex: allComicPages.length - 1,
                    title: `Chapter 1`
                });
            } else if (chapters.length === 0 && allComicPages.length === 0) {
                 // Handle case with no pages at all
                 chapters.push({
                    startIndex: 0,
                    endIndex: 0,
                    title: `No Chapters Found`
                });
            }
        }

        // Function to update navigation button states (enabled/disabled)
        function updateNavigationButtons() {
            prevChapterTop.classList.toggle('disabled', currentChapterIndex === 0);
            prevChapterBottom.classList.toggle('disabled', currentChapterIndex === 0);
            nextChapterTop.classList.toggle('disabled', currentChapterIndex >= chapters.length - 1);
            nextChapterBottom.classList.toggle('disabled', currentChapterIndex >= chapters.length - 1);
        }

        // Function to load and display a specific chapter
        function loadChapter(chapterIndex) {
            if (chapters.length === 0 || chapterIndex < 0 || chapterIndex >= chapters.length) {
                console.warn("Attempting to load invalid chapter or no chapters defined:", chapterIndex);
                currentChapterTitle.textContent = "Error: No Chapters Found or Invalid Chapter";
                comicPageWrapper.innerHTML = '<p style="text-align:center; color: var(--text-color-secondary);">Please ensure your comic pages are correctly listed in script.js and that you have at least one chapter.</p>';
                // Disable all nav buttons if no valid chapters
                prevChapterTop.classList.add('disabled');
                prevChapterBottom.classList.add('disabled');
                nextChapterTop.classList.add('disabled');
                nextChapterBottom.classList.add('disabled');
                chapterSelector.innerHTML = '<option value="-1">No Chapters</option>'; // Clear selector
                return;
            }

            currentChapterIndex = chapterIndex;
            const chapterData = chapters[currentChapterIndex];

            currentChapterTitle.textContent = chapterData.title;

            // Clear existing images
            comicPageWrapper.innerHTML = '';

            // Load images for the current chapter
            for (let i = chapterData.startIndex; i <= chapterData.endIndex; i++) {
                const img = document.createElement('img');
                img.src = allComicPages[i]; // Use the filename from the array
                img.alt = `Dyvotron ${chapterData.title} Page ${i - chapterData.startIndex + 1}`;
                comicPageWrapper.appendChild(img);
            }

            // Update chapter selector dropdown
            chapterSelector.value = currentChapterIndex;

            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });

            updateNavigationButtons(); // Update button states
        }

        // --- Initialization for Comic Page ---
        defineChapters(); // First, define all chapters based on the allComicPages array

        // Populate chapter selector dropdown
        chapterSelector.innerHTML = ''; // Clear existing options
        chapters.forEach((chapter, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = chapter.title;
            chapterSelector.appendChild(option);
        });

        // Load the initial chapter
        const urlParams = new URLSearchParams(window.location.search);
        const chapterParam = urlParams.get('chapter');
        if (chapterParam !== null && !isNaN(parseInt(chapterParam))) {
            const requestedChapterIndex = parseInt(chapterParam) - 1; // Convert to 0-based
            loadChapter(requestedChapterIndex);
        } else {
            loadChapter(0); // Load first chapter by default
        }


        // --- Event Listeners for Comic Page ---
        nextChapterTop.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentChapterIndex < chapters.length - 1) {
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
            if (currentChapterIndex < chapters.length - 1) {
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
    }
});
