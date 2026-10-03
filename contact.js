const photoInput = document.querySelector('#contact-photo');
const photoPreview = document.querySelector('.contact-photo-preview');
const photoPreviewImage = photoPreview.querySelector('img');
const photoStatus = document.querySelector('.contact-photo-status');
const removePhotoButton = document.querySelector('.contact-photo-remove');
let photoPreviewUrl;

function clearPhotoPreview() {
    if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
        photoPreviewUrl = undefined;
    }

    photoInput.value = '';
    photoPreviewImage.removeAttribute('src');
    photoPreview.hidden = true;
    photoStatus.textContent = '';
}

photoInput.addEventListener('change', () => {
    const photo = photoInput.files[0];
    if (!photo) {
        clearPhotoPreview();
        return;
    }

    if (!photo.type.startsWith('image/')) {
        clearPhotoPreview();
        photoStatus.textContent = 'Please choose an image file.';
        return;
    }

    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    photoPreviewUrl = URL.createObjectURL(photo);
    photoPreviewImage.src = photoPreviewUrl;
    photoPreview.hidden = false;
    photoStatus.textContent = photo.name;
});

removePhotoButton.addEventListener('click', clearPhotoPreview);
