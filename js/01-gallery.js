import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryCardsSet = createGallery(galleryItems);

function createGallery(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return `<div class="gallery__item" style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)"
          />
        </a>
       </div>`;   
    })
    .join('');
}

galleryContainer.insertAdjacentHTML('beforeend', galleryCardsSet);
galleryContainer.addEventListener('click', selectGalleryEl);


function selectGalleryEl(event) {
    event.preventDefault();
    
    if (event.target.nodeName !== 'IMG') {
        return;
    }
 
    const instance = basicLightbox.create(
      `<img src="${event.target.dataset.source}" width="800" height="600" style= "border-radius: 5%; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)">`, {
        
        onShow: () => {
          window.addEventListener('keydown', onKeydownEsc);
        },

        onClose: () => {
          window.removeEventListener('keydown', onKeydownEsc);
        },
    });

    const onKeydownEsc = event => {
        if (event.code === 'Escape') {
            instance.close();
        }
    };

    instance.show();
}

