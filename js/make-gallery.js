import galleryImages from './gallery-items.js';


const galleryRef = document.querySelector('.js-gallery');
const ligthboxRef = document.querySelector('.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const backdropRef = document.querySelector('.lightbox__overlay');

const galleryCardsMurkup = makeCardsGallery(galleryImages);
galleryRef.insertAdjacentHTML('afterbegin', galleryCardsMurkup);

galleryRef.addEventListener('click', onImageClick);

closeBtn.addEventListener('click', onCloseModal);

backdropRef.addEventListener('click', onBackdropClick);

const arrayOfImageLinks = makeArrayOfImageLinks(galleryImages);
const arrayOfImageDescriptions = makeArrayOfImageDescriptions(galleryImages);

function makeArrayOfImageLinks(gallery) {
    return gallery.map(({ original }) => original);
}

function makeArrayOfImageDescriptions(gallery) {
    return gallery.map(({ description }) => description);
}

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

let position = 0;

function onOpenModal(url, description) {
    window.addEventListener('keydown', onEscKeyPress);
    window.addEventListener('keydown', onArrowRightKeyPress);
    window.addEventListener('keydown', onArrowLeftKeyPress);

    ligthboxRef.classList.add('is-open');
    lightboxImageRef.setAttribute("src", url);
    lightboxImageRef.setAttribute("alt", description);

    position = arrayOfImageLinks.indexOf(url);

    return position;
}

function onArrowRightKeyPress(event) {
    if (event.code === 'ArrowRight') {
        position < 8 ? position += 1 : position = 0;

        lightboxImageRef.setAttribute("src", arrayOfImageLinks[position]);
        lightboxImageRef.setAttribute("alt", arrayOfImageDescriptions[position]);
    }
}

function onArrowLeftKeyPress(event) {
    if (event.code === 'ArrowLeft') {
        position > 0 ? position -= 1 : position = 8;

        lightboxImageRef.setAttribute("src", arrayOfImageLinks[position]);
        lightboxImageRef.setAttribute("alt", arrayOfImageDescriptions[position]);
    }
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    window.removeEventListener('keydown', onArrowRightKeyPress);
    window.removeEventListener('keydown', onArrowLeftKeyPress);

    ligthboxRef.classList.remove('is-open');
    lightboxImageRef.removeAttribute("src");
    lightboxImageRef.removeAttribute("alt");
}

function onBackdropClick(event) {
    if (!event.target.classList.contains('lightbox__overlay')) {
        return;
    }
    
    onCloseModal();
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}