import {remove, render, RenderPosition} from '../framework/render.js';
import {UpdateType, UserAction} from '../const';
import EditingPointView from '../view/editing-point-view';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleFavoriteChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;
  #isNewPoint = true;
  constructor({pointListContainer, destinationsModel, offersModel, onFavoriteChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleFavoriteChange = onFavoriteChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditingPointView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleFavoriteChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
