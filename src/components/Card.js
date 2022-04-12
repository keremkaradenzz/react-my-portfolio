import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from 'react-spring'

import data from '../data'
import './styles.css'

export default function Card() {
  const [open, set] = useState(false)

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  return (
    <div className="wrapper">
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className="container"
        onClick={() => set(open => !open)}>
        {transition((style, item) => (
          <animated.div
            className="item"
            style={{ ...style}}
          > 
              {item.name}
              </animated.div>
        ))}
      </animated.div>
    </div>
  )
}
