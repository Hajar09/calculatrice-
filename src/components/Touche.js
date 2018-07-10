import React from "react"

const Touche = props => {
  return (
    <React.Fragment>
      <button key={props.touche} value={props.touche} onClick={props.recupTouches}>{props.touche}</button>
    </React.Fragment>
  )
}

export default Touche
