import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createPictureGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick)

function createPictureGalleryMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return ` 
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>`;
         })
        .join('');  
}

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    const isGalleryImageEl = evt.target.classList.contains('gallery__image');
    if (!isGalleryImageEl) {
        return; 
    }
    const currentImageEl = evt.target.closest('.gallery__image');
    const { source } = currentImageEl.dataset;
  
    const data = galleryItems.find(({ original }) => original === source);
    const instance = basicLightbox.create(`
   <div>
   <img src="${data.original}" alt="${data.description}">
   </div>
    `);
    
    const closeBtnEscape = (evt) => {
        if (evt.key === "Escape") {
            instance.close();
            document.removeEventListener("keydown", closeBtnEscape);
        }
    };

    document.addEventListener("keydown", closeBtnEscape);
    instance.show();
}


