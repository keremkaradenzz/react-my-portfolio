import React from 'react';
import Draggable from 'react-draggable';
import './styles.css'
const Card = () => {
  const [state, setState] = React.useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  })

  const onStart = () => {
    setState({ activeDrags: ++state.activeDrags });
  };

  const onStop = () => {
    setState({ activeDrags: --state.activeDrags });
  };


  const dragHandlers = { onStart: onStart, onStop: onStop };

  return (
    <div>
      <p>Active DragHandlers: {state.activeDrags}</p>
      <div className="box" style={{ height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0' }}>
        <div style={{ height: '1000px', width: '1000px', padding: '10px' }}>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I can only be moved within my offsetParent.<br /><br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I also can only be moved within my offsetParent.<br /><br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
}



export default Card;