import { useState, useEffect } from 'react';
import './modal.scss';
import Cross from "./Cross";

export const Modal = (props:any) => {
    const css = 'shared-draft-comment-modal'
    return (
        <div className={css}>
            <div className={`${css}__backdrop`}></div>
            <div className={`${css}-dialog`} aria-modal="true" role="alertdialog">
                <div className={`${css}__box`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const InfoModal = () => {
    const css = 'shared-draft-comment-modal'

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
                className={`${css}__close`}
                onClick={closeModal}
            >
                <Cross />
            </button>
            <div className={`${css}__container`}>
                <h2 className={`${css}__header`}>How to comment</h2>
                <div className={`${css}__content`}>
                    <p className={`${css}__body-text`}>Click on the speech bubble icon to open the comments panel and highlight the text you want to comment </p>
                </div>
            </div>

            <button onClick={closeModal} className={`${css}__button ${css}__button--secondary`}>Continue</button>
        </Modal>
    )
}

export default InfoModal;
