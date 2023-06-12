import React from "react";

function Square({ coordinates, length }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${coordinates[0]}px`,
                top: `${coordinates[1]}px`,
                width: `${length}px`,
                height: `${length}px`,
                backgroundColor: 'rgba(255, 0, 0, 0.5)', // Change as required
                zIndex: 3, // Make sure it is on top of other elements
            }}
        />
    );
}

export default Square