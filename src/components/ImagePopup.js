function ImagePopup() {
    return (
  <div className='popup popup_scale-image'>
      <div className='popup__content-image'>
          <img src="#" alt='Место' className="popup__image"/>
          <figcaption className="popup__subtitle"></figcaption>
          <button type="button" className="popup__exit popup__exit-img" aria-label="Закрыть попап"></button>
      </div>
  </div>
  )
  }
  export default ImagePopup;