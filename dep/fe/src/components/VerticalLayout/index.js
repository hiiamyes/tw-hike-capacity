import React from 'react';

const VerticalLayout = (props) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <div
      style={Object.assign(style, props.style)}
      className={props.className}>
      {props.children}
    </div>
  )
}

export default VerticalLayout
