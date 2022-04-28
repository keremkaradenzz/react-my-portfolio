import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring'
import { TransitionMotion, spring } from 'react-motion';
import Avatar from '@mui/material/Avatar';
import './App.css';
import Card from './components/Card/Card';
import MyEditor from './components/Editor/Editor';
const leavingSpringConfig = { stiffness: 60, damping: 15 };

function TransitionArray() {
  const [items, setItems] = useState([
    { id: 1, text: "Hi I'm Kerem Karadeniz " },
  ]);



  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => {
        setItems([
          { id: 1, text: "Hi I'm Kerem Karadeniz " },
        ]
        )
      }, 2000)
    }
  }, [items])

  const transition = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
    onRest: () => setItems([]),
  })

  const fragment = transition((style, item) => {
    return <animated.div className="animated-div" style={
      style
    }><h1>{item.text}</h1></animated.div>;
  });

  return (
    <>
      <div>{fragment}</div>
    </>
  );
}
function App() {
  const [state, setState] = useState({ mouse: [], now: 't' + 0 });


  const handleMouseMove = ({ pageX, pageY }) => {
    // Make sure the state is queued and not batched.
    setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  };


  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMouseMove(e.touches[0]);
  };

  const willLeave = styleCell => {
    return {
      ...styleCell.style,
      opacity: spring(0, leavingSpringConfig),
      scale: spring(2, leavingSpringConfig),
    };
  };


  const { mouse: [mouseX, mouseY], now } = state;
  const styles = mouseX == null ? [] : [{
    key: now,
    style: {
      opacity: spring(1),
      scale: spring(0),
      x: spring(mouseX),
      y: spring(mouseY),
    }
  }];

  return (
    <div class="app">
      <TransitionMotion willLeave={willLeave} styles={styles}>
        
        {circles =>
          <div
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="demo7">
            {circles.map(({ key, style: { opacity, scale, x, y } }) =>
              <div
                key={key}
                className="demo7-ball"
                style={{
                  opacity: opacity,
                  scale: scale,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                }} />
            )}
            <main className="main">
              <div className='avatar'>
                <Avatar
                  sx={{ width: 164, height: 164 }}
                  src="https://media-exp1.licdn.com/dms/image/C4E03AQHuul0JZHTDyg/profile-displayphoto-shrink_800_800/0/1639949584813?e=1656547200&v=beta&t=jDMrt4BCEyyGKNptCbTRuDfrxyS60Twiep-gh3QXDfE"
                />
              </div>
              
              <div className='title'>
                <TransitionArray />
              </div>
                
              <Card />
              <MyEditor />
                
            </main>
            
          </div>

        }
      </TransitionMotion>
    </div>
  );
}

export default App;
