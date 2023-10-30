let currentImageIndex = 0;
let images;
let isHomePage = false;
let homeCurrentImageIndex = 0;
let homeImages;

function loadHomePage() {
    console.log("loadHomePage is running");
    console.log(document.querySelectorAll('#home-gallery img').length);
    homeImages = document.querySelectorAll('.home-image img');
    homeImages.forEach((img, index) => {
        const parentDiv = img.closest('.home-image');
        const seeMorePage = parentDiv.getAttribute('data-page');
        const label = parentDiv.querySelector('h3').innerText;
        if (img.alt !== 'Logo') {
            img.addEventListener('click', function() {
                console.log("Home image clicked");
                openHomeModal(this.src, index, seeMorePage, label);
            });
            console.log("Event listener attached to ", img);
        }
    });
}

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

    function loadPage(page) {
        const allPages = document.querySelectorAll('.page');
        allPages.forEach(p => p.style.display = 'none');

        if (page === 'home') {
            console.log("Inside loadPage, home page selected");
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

            if (page === 'boudoir') {
                const is18 = confirm("You must be 18+ to view this content. Are you 18 or older?");
                if (!is18) {
                    selectedPage.style.display = 'none';
                    document.getElementById('page-home').style.display = 'block';
                }
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

    loadPage('home');
});