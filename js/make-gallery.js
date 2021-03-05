import galleryImages from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    ligthbox: document.querySelector('.lightbox'),
    image: document.querySelector('.lightbox__image'),
    backdrop: document.querySelector('.lightbox__overlay'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
}

const galleryCardsMurkup = makeCardsGallery(galleryImages);
refs.gallery.insertAdjacentHTML('afterbegin', galleryCardsMurkup);

refs.gallery.addEventListener('click', onImageClick);

refs.closeBtn.addEventListener('click', onCloseModal);

refs.backdrop.addEventListener('click', onBackdropClick);

const arrayOfImageLinks = makeArrayOfImageLinks(galleryImages);
const arrayOfImageDescriptions = makeArrayOfImageDescriptions(galleryImages);

function makeArrayOfImageLinks(gallery) {
    return gallery.map(({ original }) => original);
}

function makeArrayOfImageDescriptions(gallery) {
    return gallery.map(({ description }) => description);
}

function makeCardsGallery(gallery) {
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

    refs.ligthbox.classList.add('is-open');

    setSrcAltAttributes(url, description);

    position = arrayOfImageLinks.indexOf(url);

    return position;
}

function onArrowRightKeyPress(event) {
    if (event.code === 'ArrowRight') {
        position < arrayOfImageLinks.length - 1 ? position += 1 : position = 0;

        setSrcAltAttributes(arrayOfImageLinks[position], arrayOfImageDescriptions[position]);
    }
}

function onArrowLeftKeyPress(event) {
    if (event.code === 'ArrowLeft') {
        position > 0 ? position -= 1 : position = arrayOfImageLinks.length - 1;

        setSrcAltAttributes(arrayOfImageLinks[position], arrayOfImageDescriptions[position]);
    }
}

function setSrcAltAttributes(src, alt) {
    refs.image.setAttribute("src", src);
    refs.image.setAttribute("alt", alt);
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    window.removeEventListener('keydown', onArrowRightKeyPress);
    window.removeEventListener('keydown', onArrowLeftKeyPress);

    refs.ligthbox.classList.remove('is-open');
    refs.image.removeAttribute("src");
    refs.image.removeAttribute("alt");
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