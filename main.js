let currentImageIndex = 0;
let images;
let isHomePage = false;
let homeCurrentImageIndex = 0;
let homeImages;
let modal;
let links;
let modalImage;

function loadPage(page, showAlert = true) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.style.display = 'none');

    if (page === 'home') {
        document.getElementById('page-home').style.display = 'block';
        loadHomePage();
    } else {
        isHomePage = (page === 'home');

        const allPages = document.querySelectorAll('.page');
        allPages.forEach(p => p.style.display = 'none');

        const selectedPage = document.getElementById(`page-${page}`);
        selectedPage.style.display = 'block';

        images = document.querySelectorAll(`#page-${page} img`);

        images.forEach((img) => {
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);
        });

        images = document.querySelectorAll(`#page-${page} img`);

        if (page !== 'home' && page !== 'about') {
            images.forEach((img, index) => {
                img.addEventListener('click', function() {
                    openModal(this.src, index, page);
                });
            });
        }

        if (page === 'boudoir' && showAlert) {
            const is18 = confirm("You must be 18+ to view this content. Are you 18 or older?");
            if (!is18) {
                selectedPage.style.display = 'none';
                document.getElementById('page-home').style.display = 'block';
            }
        }
    }
}

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
    if (!isHomePage) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }
}

function prevImage() {
    if (!isHomePage) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex].src;
    }
}

function loadHomePage() {
    homeImages = document.querySelectorAll('.home-image .clickerimg');
    homeImages.forEach((img, index) => {
        const parentDiv = img.closest('.home-image');
        const seeMorePage = parentDiv.getAttribute('data-page');
        const label = parentDiv.querySelector('h3').innerText;
        if (img.alt !== 'Logo') {
            img.addEventListener('click', function() {
                openHomeModal(this.src, index, seeMorePage, label);
            });
        }
    });
}

function openHomeModal(imageSrc, index) {
    homeCurrentImageIndex = index;
    document.getElementById('homeImageModal').style.display = 'block';
    document.getElementById('homeModalImage').src = imageSrc;
    updateSeeMoreButton(index);
}

function closeHomeModal() {
    document.getElementById('homeImageModal').style.display = 'none';
}

function nextHomeImage() {
    homeCurrentImageIndex = (homeCurrentImageIndex + 1) % homeImages.length;
    document.getElementById('homeModalImage').src = homeImages[homeCurrentImageIndex].src;
    updateSeeMoreButton(homeCurrentImageIndex);
}

function prevHomeImage() {
    homeCurrentImageIndex = (homeCurrentImageIndex - 1 + homeImages.length) % homeImages.length;
    document.getElementById('homeModalImage').src = homeImages[homeCurrentImageIndex].src;
    updateSeeMoreButton(homeCurrentImageIndex);
}

function updateSeeMoreButton(index) {
    const parentDiv = homeImages[index].closest('.home-image');
    const seeMorePage = parentDiv.getAttribute('data-page');
    const label = parentDiv.querySelector('h3').innerText;
    
    let seeMoreButton = document.getElementById('homeModalSeeMore');

    const newSeeMoreButton = seeMoreButton.cloneNode(true);
    seeMoreButton.parentNode.replaceChild(newSeeMoreButton, seeMoreButton);
    seeMoreButton = newSeeMoreButton;

    seeMoreButton.textContent = `See More ${label}`;
    seeMoreButton.href = `#${seeMorePage}`;

    seeMoreButton.addEventListener('click', function(e) {
        e.preventDefault();
        closeHomeModal();
        loadPage(seeMorePage, seeMorePage === 'boudoir');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    links = document.querySelectorAll('#left-sidebar a');
    modal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');

    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
        }
        if (document.getElementById('homeImageModal').style.display === 'block') {
            if (event.key === 'ArrowRight') nextHomeImage();
            if (event.key === 'ArrowLeft') prevHomeImage();
        }
    });

    modal.addEventListener('click', closeModal);
    document.getElementById('homeImageModal').addEventListener('click', closeHomeModal);

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    document.querySelector('#page-about a[data-page="contact"]').addEventListener('click', function(e) {
        e.preventDefault();
        loadPage('contact');
    });

    loadPage('home');
});