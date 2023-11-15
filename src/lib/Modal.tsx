import { useState, useEffect } from 'react';
import './modal.scss';
import Cross from "./Cross";

const Modal = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        localStorage.setItem('shared-draft-modal-interaction', 'true');
        setShowModal(false);
    }

    useEffect(() => {
        // Check if the user has interacted
        const interactedWithModal= localStorage.getItem('shared-draft-modal-interaction');

        if (interactedWithModal !== 'true') {
            setShowModal(true);
        }
    }, []);

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal__backdrop"></div>
            <div className="modal-dialog" aria-modal="true" role="alertdialog">
                <div className="modal__box">
                    <button
                        aria-label="Close this modal"
                        type="button"
                        className="modal__close"
                        onClick={closeModal}
                    >
                        <Cross />
                    </button>
                    <div className="modal__container">
                        <h2 className="modal__header">How to comment</h2>
                        <div className="modal__content">
                            <p className="modal__body-text">Click on the speech bubble icon to open the comments panel and highlight the text you want to comment </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
