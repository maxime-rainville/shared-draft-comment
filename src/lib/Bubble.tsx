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
    return (
        <button
          style={style}
          className="bubble modal__button modal__button--primary"
          onClick={onClick}>
            Add comment
        </button>
    );
}

export default Bubble;
