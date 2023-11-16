import { useState, useEffect } from 'react';
import './modal.scss';
import Cross from "./Cross";

export const Modal = (props:any) => {
    return (
        <div className="modal">
            <div className="modal__backdrop"></div>
            <div className="modal-dialog" aria-modal="true" role="alertdialog">
                <div className="modal__box">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const InfoModal = () => {
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
        <Modal>
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

            <button onClick={closeModal} className="modal__button modal__button--secondary">Continue</button>
        </Modal>
    )
}

export default InfoModal;
