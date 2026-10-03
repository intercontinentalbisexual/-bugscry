const stencilButtons = Array.from(document.querySelectorAll('.stencil-image'));
const stencilImages = stencilButtons.map(button => button.querySelector('img'));

const viewer = document.createElement('div');
viewer.className = 'slideshow';
viewer.setAttribute('aria-hidden', 'true');
viewer.innerHTML = `
    <div class="slideshow-content" role="dialog" aria-modal="true" aria-label="Stencil slideshow">
        <button class="slideshow-close" type="button" aria-label="Close slideshow">&times;</button>
        <img class="slideshow-image" alt="">
        <div class="slideshow-controls">
            <button class="slideshow-previous" type="button" aria-label="Previous image">&larr;</button>
            <span class="slideshow-count"></span>
            <button class="slideshow-next" type="button" aria-label="Next image">&rarr;</button>
        </div>
    </div>
`;
document.body.appendChild(viewer);

const viewerImage = viewer.querySelector('.slideshow-image');
const viewerCount = viewer.querySelector('.slideshow-count');
let currentImageIndex = 0;
let activeButton = null;

function showImage(index) {
    currentImageIndex = (index + stencilImages.length) % stencilImages.length;
    const image = stencilImages[currentImageIndex];
    viewerImage.src = image.src;
    viewerImage.alt = image.alt;
    viewerCount.textContent = `${currentImageIndex + 1} / ${stencilImages.length}`;
}

function openSlideshow(index) {
    activeButton = stencilButtons[index];
    showImage(index);
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('slideshow-open');
    viewer.querySelector('.slideshow-close').focus();
}

function closeSlideshow() {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('slideshow-open');
    activeButton?.focus();
}

stencilButtons.forEach((button, index) => {
    button.addEventListener('click', () => openSlideshow(index));
});

viewer.querySelector('.slideshow-close').addEventListener('click', closeSlideshow);
viewer.querySelector('.slideshow-previous').addEventListener('click', () => showImage(currentImageIndex - 1));
viewer.querySelector('.slideshow-next').addEventListener('click', () => showImage(currentImageIndex + 1));
viewer.addEventListener('click', event => {
    if (event.target === viewer) closeSlideshow();
});

document.addEventListener('keydown', event => {
    if (!viewer.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeSlideshow();
    if (event.key === 'ArrowLeft') showImage(currentImageIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentImageIndex + 1);
});
