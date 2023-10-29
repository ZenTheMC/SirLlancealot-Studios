let currentImageIndex = 0;
let images;
let isHomePage = false; // Step 1: Add the global flag
let homeCurrentImageIndex = 0;
let homeImages;

// Move these outside of the 'DOMContentLoaded'
function loadHomePage() {
    homeImages = document.querySelectorAll('#home-gallery img');
    homeImages.forEach((img, index) => {
        const parentDiv = img.closest('.home-image');
        const seeMorePage = parentDiv.getAttribute('data-page');
        const label = parentDiv.querySelector('h3').innerText;
        if (img.alt !== 'Logo') {
            img.addEventListener('click', function() {
                console.log("Home image clicked");
                openHomeModal(this.src, index, seeMorePage, label);
            });
        }
    });
}

// New functions for the home modal
function openHomeModal(imageSrc, index, seeMorePage, label) {
    homeCurrentImageIndex = index;
    document.getElementById('homeImageModal').style.display = 'block';
    document.getElementById('homeModalImage').src = imageSrc;
    document.getElementById('homeModalSeeMore').href = seeMorePage;
    document.getElementById('homeModalSeeMore').textContent = `See More ${label}`;
    document.getElementById('homeModalSeeMore').href = `#${seeMorePage}`;
    homeImages = document.querySelectorAll(`#home-gallery img`);
}

function closeHomeModal() {
    document.getElementById('homeImageModal').style.display = 'none';
}

function nextHomeImage() {
    homeCurrentImageIndex = (homeCurrentImageIndex + 1) % homeImages.length;
    document.getElementById('homeModalImage').src = homeImages[homeCurrentImageIndex].src;
}

function prevHomeImage() {
    homeCurrentImageIndex = (homeCurrentImageIndex - 1 + homeImages.length) % homeImages.length;
    document.getElementById('homeModalImage').src = homeImages[homeCurrentImageIndex].src;
}

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
        if (!isHomePage) {  // Step 2: Check the flag
            currentImageIndex = (currentImageIndex + 1) % images.length;
            modalImage.src = images[currentImageIndex].src;
        }
    }

    function prevImage() {
        if (!isHomePage) {  // Step 2: Check the flag
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            modalImage.src = images[currentImageIndex].src;
        }
    }

    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
        }
    });

    modal.addEventListener('click', closeModal);
    document.getElementById('homeImageModal').addEventListener('click', closeHomeModal);

    function loadPage(page) {
        if (page === 'home') {
            console.log("Inside loadPage, home page selected");
            loadHomePage();  // Call the new function
        } else {
            // Existing logic for other pages
        }    

        isHomePage = (page === 'home'); // Step 1: Set the flag

        const allPages = document.querySelectorAll('.page');
        allPages.forEach(p => p.style.display = 'none');

        const selectedPage = document.getElementById(`page-${page}`);
        selectedPage.style.display = 'block';

        images = document.querySelectorAll(`#page-${page} img`);

        // Remove existing click listeners to prevent duplication
        images.forEach((img) => {
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);
        });
    
        // Re-query to get the new nodes
        images = document.querySelectorAll(`#page-${page} img`);

        // Conditionally attach click listeners, skip for 'home' and 'about'
        if (page !== 'home' && page !== 'about') {
            images.forEach((img, index) => {
                img.addEventListener('click', function() {
                    openModal(this.src, index, page);
                });
            });
        }
    
        // Existing 18+ check for 'boudoir'
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