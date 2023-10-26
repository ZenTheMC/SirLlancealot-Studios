let currentImageIndex = 0;
let images;

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#left-sidebar a');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    function openModal(imageSrc, index, page) {
        currentImageIndex = index;
        modal.style.display = 'block';
        modalImage.src = imageSrc;
        images = document.querySelectorAll(`#page-${page} img`);
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }

    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
        }
    });

    modal.addEventListener('click', closeModal);

    function loadPage(page) {
        const allPages = document.querySelectorAll('.page');
        allPages.forEach(p => p.style.display = 'none');
        const selectedPage = document.getElementById(`page-${page}`);
        selectedPage.style.display = 'block';
        images = document.querySelectorAll(`#page-${page} img`);
        images.forEach((img, index) => {
            img.addEventListener('click', function() {
                openModal(this.src, index, page);
            });
        });

        if (page === 'boudoir') {
            const is18 = confirm("You must be 18+ to view this content. Are you 18 or older?");
            if (!is18) {
                selectedPage.style.display = 'none';
                document.getElementById('page-home').style.display = 'block';
            }
        }
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    loadPage('home');  // Load the home page by default
});