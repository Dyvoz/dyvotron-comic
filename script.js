document.addEventListener('DOMContentLoaded', () => {
    const imagesPerChapter = 20; // Antal bilder per kapitel
    const totalChapters = 5; // Uppskattat totalt antal kapitel du har/planerar (t.ex. om du har final1.png till final100.png, så är det 5 kapitel)

    // Elementreferenser
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

    let currentChapterIndex = 0; // Kapitelindex (0-baserat)

    // Funktion för att uppdatera navigationsknapparnas tillstånd
    function updateNavigationButtons() {
        prevChapterTop.classList.toggle('disabled', currentChapterIndex === 0);
        prevChapterBottom.classList.toggle('disabled', currentChapterIndex === 0);
        nextChapterTop.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
        nextChapterBottom.classList.toggle('disabled', currentChapterIndex >= totalChapters - 1);
    }

    // Funktion för att ladda och visa ett specifikt kapitel
    function loadChapter(chapterIndex) {
        // Kontrollera att kapitelindex är inom giltigt intervall
        if (chapterIndex < 0 || chapterIndex >= totalChapters) {
            console.warn("Försöker ladda ogiltigt kapitelindex:", chapterIndex);
            return;
        }

        currentChapterIndex = chapterIndex;
        const startImageNum = (currentChapterIndex * imagesPerChapter) + 1;
        const endImageNum = startImageNum + imagesPerChapter - 1;

        currentChapterTitle.textContent = `Kapitel ${currentChapterIndex + 1}`; // Visa 1-baserat kapitelnummer

        // Rensa befintliga bilder
        comicPageWrapper.innerHTML = '';

        // Ladda in bilder för det aktuella kapitlet
        for (let i = startImageNum; i <= endImageNum; i++) {
            const img = document.createElement('img');
            img.src = `final${i}.png`; // Antar att bilderna heter final1.png, final2.png, etc.
            img.alt = `Dyvotron Kapitel ${currentChapterIndex + 1} Sida ${i - startImageNum + 1}`;
            comicPageWrapper.appendChild(img);
        }

        // Uppdatera chapter selector
        chapterSelector.value = currentChapterIndex;

        // Scrolla upp till toppen av sidan
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Uppdatera gillningar och kommentarer för det nya kapitlet (simulerat)
        // I en riktig app skulle detta laddas från en server/databas
        likeCountSpan.textContent = Math.floor(Math.random() * 100) + 50; // Slumpmässigt antal gillningar
        likeButton.disabled = false;
        likeButton.textContent = '❤️ Gilla Kapitel';
        
        commentsList.innerHTML = '<div class="comment-item"><p><strong>System:</strong> Kommentarer för detta kapitel (Kapitel ' + (currentChapterIndex + 1) + ') är aktiva.</p></div>';
        commentInput.value = '';

        updateNavigationButtons(); // Uppdatera knapparnas tillstånd
    }

    // --- Initialisering ---
    // Fyll chapter selector-rullgardinsmenyn
    for (let i = 0; i < totalChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Kapitel ${i + 1}`;
        chapterSelector.appendChild(option);
    }

    // Ladda första kapitlet när sidan laddas
    loadChapter(currentChapterIndex);

    // --- Eventlyssnare ---
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
        // I en riktig app skulle du skicka gillningen till en server
        // Här simulerar vi bara genom att öka antalet och inaktivera knappen
        if (!likeButton.disabled) {
            let currentLikes = parseInt(likeCountSpan.textContent);
            likeCountSpan.textContent = currentLikes + 1;
            likeButton.disabled = true;
            likeButton.textContent = '❤️ Gillat!';
            alert('Tack för din gillning! (Simulering)');
        }
    });

    postCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            // I en riktig app skulle du skicka kommentaren till en server och sedan ladda om listan
            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            // Lägg till en tidsstämpel eller användarnamn för realism
            newComment.innerHTML = `<p><strong>Användare (Du):</strong> ${commentText}</p>`;
            commentsList.prepend(newComment); // Lägg till nya kommentarer överst
            commentInput.value = ''; // Rensa inputfältet
            alert('Din kommentar har skickats! (Simulering)');
        } else {
            alert('Vänligen skriv en kommentar innan du skickar.');
        }
    });
});
