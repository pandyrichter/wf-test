import $ from 'jquery';

class Modal {
    constructor() {
        // These are the properties of the constructed class
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events() {
        // clicking the open modal button - bind keeps this attached to original this eg modal in openModal()
        this.openModalButton.click(this.openModal.bind(this));
        // clicking the close modal button
        this.closeModalButton.click(this.closeModal.bind(this));
        // pushes the escape key
        $(document).keyup(this.keyPressHandler.bind(this));

    }

    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visible");
        console.log("Clicked!");
        return false;
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
        console.log("Clicked!");
    }

}

export default Modal;