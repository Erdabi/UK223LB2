document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const postInput = document.getElementById('postInput');
    const postsContainer = document.getElementById('postsContainer');

    addButton.addEventListener('click', addPost);
    postInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addPost();
        }
    });

    function addPost() {
        const text = postInput.value.trim();
        if (text) {
            fetch('/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Fehler beim Senden des Posts');
                }
            })
            .then(data => {
                loadPosts(); // Posts neu laden
            })
            .catch(error => {
                console.error('Fehler bei der Anfrage:', error);
                console.log('Text:', text);
            });

            // Leeren des Eingabefeldes
            postInput.value = '';
        }
    }

    function loadPosts() {
        fetch('/getPosts')
            .then(response => response.json())
            .then(posts => {
                console.log('Geladene Posts:', posts); // Debug-Ausgabe
                postsContainer.innerHTML = ''; // Container leeren
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.innerText = `${post.text}`;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Fehler beim Laden der Posts:', error);
            });
    }

    // Beim Laden der Seite Posts laden
    loadPosts();
});
