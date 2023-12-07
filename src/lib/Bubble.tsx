import React from 'react';
import './Bubble.scss';

interface BubbleProps {
    top: number;
    left: number;
    onClick: () => void;
}

function Bubble({top, left, onClick}: BubbleProps) {
    const style = {
      top: `calc(${top}px - 75px)`,
      left: `calc(${left}px - 70px)`
    }
    const css = 'shared-draft-comment'
    return (
        <button
          style={style}
          className={`${css}-bubble ${css}-modal__button ${css}-modal__button--primary`}
          onClick={onClick}>
            Add comment
        </button>
    );
}

export default Bubble;
