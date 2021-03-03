import galleryImages from './gallery-items.js';


const galleryRef = document.querySelector('.js-gallery');
const ligthboxRef = document.querySelector('.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

const galleryCardsMurkup = makeCardsGallery(galleryImages);
galleryRef.insertAdjacentHTML('afterbegin', galleryCardsMurkup);

galleryRef.addEventListener('click', onImageClick);

closeBtn.addEventListener('click', onCloseModal);

function makeCardsGallery (gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
        `
    }).join('');
}

function onImageClick(event) {
    event.preventDefault();
    
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }

    const url = event.target.dataset.source;
    const description = event.target.getAttribute("alt");

    onOpenModal(url, description);
}

function onOpenModal(url, description) {
    ligthboxRef.classList.add('is-open');

    lightboxImageRef.setAttribute("src", url);
    lightboxImageRef.setAttribute("alt", description);
}

function onCloseModal() {
    ligthboxRef.classList.remove('is-open');

    lightboxImageRef.removeAttribute("src");
    lightboxImageRef.removeAttribute("alt");
}