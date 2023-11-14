import React from 'react';
import './Bubble.scss';

interface BubbleProps {
    top: number;
    left: number;
    onClick: () => void;
}

function Bubble({top, left, onClick}: BubbleProps) {
    const style = {
      top: `calc(${top}px - 48px)`,
      left: `calc(${left}px)`
    }
    return (
        <div className="bubble" style={style}>
            <button className="Bubble-button" onClick={onClick}>Add comment</button>
        </div>
    );
}

export default Bubble;
