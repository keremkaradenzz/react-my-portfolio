import React,{ useState } from 'react';
import Draggable from 'react-draggable';
import data from '../../data';
import './styles.css'
const Card = () => {
  const [state, setState] = useState({
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
    <div className='container'>
      <p>My Stacks</p>
      <div className="box" style={{ height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0' }}>
        <div style={{ height: '1000px', width: '500px', padding: '10px' }}>
          {data.map((item,index) => <Draggable defaultPosition={{x:((index + 1) * 5), y: (Math.random() * 300) + 1}}  key={index} bounds="parent" {...dragHandlers}>
            <div className="box">
              <img src={item.icon} alt={item.name} draggable={false} />
            </div>
          </Draggable>)}
        </div>
      </div>
    </div>
  );
}



export default Card;