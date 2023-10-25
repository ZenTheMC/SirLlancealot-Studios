document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#left-sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
});

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function loadPage(page) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    // Show the selected page
    const selectedPage = document.getElementById(`page-${page}`);
    selectedPage.style.display = 'block';

    if (page === 'boudoir') {
        const is18 = confirm("You must be 18+ to view this content. Are you 18 or older?");
        if (is18) {
            hideOverlay();  // Hide overlay if user is 18+
        } else {
            selectedPage.style.display = 'none';
            document.getElementById('page-home').style.display = 'block';
        }
    } else {
        hideOverlay(); // Hide overlay for other pages
    }
}