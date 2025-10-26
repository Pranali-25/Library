document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const modeIcon = document.getElementById('modeIcon');

    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the icon based on the mode
        if (this.checked) {
            modeIcon.classList.remove('icon-sun');
            modeIcon.classList.add('icon-moon');
        } else {
            modeIcon.classList.remove('icon-moon');
            modeIcon.classList.add('icon-sun');
        }
    });

    // User Profile
    const userName = localStorage.getItem('username') || 'User';
    document.getElementById('username').textContent = userName;

    document.getElementById('editProfile').addEventListener('click', function() {
        const newUsername = prompt('Enter your name:', userName);
        if (newUsername) {
            localStorage.setItem('username', newUsername);
            document.getElementById('username').textContent = newUsername;
        }
    });

    // Book Management
    const bookTableBody = document.getElementById('bookTableBody');
    const bookForm = document.getElementById('bookForm');
    const books = [];
    const editHistory = [];

    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const availability = document.getElementById('availability').value;

        const book = { title, author, availability };
        books.push(book);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td class="status ${availability}">${availability.replace('-', ' ')}</td>
            <td>
                <button onclick="editBook(${books.length - 1})">Edit</button>
                <button onclick="deleteBook(${books.length - 1})">Delete</button>
            </td>
        `;
        bookTableBody.appendChild(row);

        // Clear form
        bookForm.reset();
    });

    window.editBook = function(index) {
        const book = books[index];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('availability').value = book.availability;

        // Save edit history
        editHistory.push({ ...book });
        books.splice(index, 1);
        bookTableBody.deleteRow(index);
    };

    window.deleteBook = function(index) {
        books.splice(index, 1);
        bookTableBody.deleteRow(index);
    };

    // Book Details Logic (if needed)
    function goBack() {
        document.getElementById('bookDetails').style.display = 'none';
    }

    // Review Logic (if needed)
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

        const reviewDiv = document.createElement('div');
        reviewDiv.innerHTML = `<strong>Rating: ${rating}</strong><p>${review}</p>`;
        document.getElementById('reviewsContainer').appendChild(reviewDiv);

        // Clear form
        this.reset();
    });
});
