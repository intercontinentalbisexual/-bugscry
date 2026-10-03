const container = document.querySelector('.container');

function getColumnCount() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 1000) return 2;
    return 4;
}

function renderPosts() {
    container.innerHTML = '<div class="grid-sizer"></div>';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const image = document.createElement('img');
        image.src = post.image;
        image.alt = post.title;

        postDiv.appendChild(image);
        container.appendChild(postDiv);
    });
}

renderPosts();

const viewer = document.createElement('div');
viewer.className = 'slideshow';
viewer.setAttribute('aria-hidden', 'true');
viewer.innerHTML = `
    <div class="slideshow-content" role="dialog" aria-modal="true" aria-label="Image slideshow">
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

function showImage(index) {
    currentImageIndex = (index + posts.length) % posts.length;
    const post = posts[currentImageIndex];
    viewerImage.src = post.image;
    viewerImage.alt = post.title;
    viewerCount.textContent = `${currentImageIndex + 1} / ${posts.length}`;
}

function openSlideshow(index) {
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
}

container.querySelectorAll('.post').forEach((postElement, index) => {
    postElement.addEventListener('click', () => openSlideshow(index));
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

const gutter = 10;
const gridSizer = container.querySelector('.grid-sizer');
const postsElements = container.querySelectorAll('.post');

function getColumnWidth() {
    const columns = getColumnCount();
    const styles = getComputedStyle(container);
    const horizontalPadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const contentWidth = container.clientWidth - horizontalPadding;
    return (contentWidth - gutter * (columns - 1)) / columns;
}

function layoutMasonry() {
    const columnWidth = getColumnWidth();
    gridSizer.style.width = `${columnWidth}px`;
    postsElements.forEach(post => {
        post.style.width = `${columnWidth}px`;
    });
    masonry.options.columnWidth = columnWidth;
    masonry.layout();
}

const masonry = new Masonry(container, {
    itemSelector: '.post',
    columnWidth: getColumnWidth(),
    gutter
});

layoutMasonry();

container.querySelectorAll('img').forEach(image => {
    image.addEventListener('load', () => masonry.layout(), { once: true });
});

let previousColumnCount = getColumnCount();
window.addEventListener('resize', () => {
    const columnCount = getColumnCount();
    if (columnCount !== previousColumnCount) previousColumnCount = columnCount;
    layoutMasonry();
});
