import React from 'react';

const HorizontalLayout = (props) => {
  const style = {
    display: 'flex',
  }
  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  )
}

export default HorizontalLayout
