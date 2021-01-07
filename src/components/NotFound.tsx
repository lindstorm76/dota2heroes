import React from "react"
import notfound from "../assets/notfound.json"
import { Animation } from "./Animation"

export const NotFound: React.FC = (): JSX.Element => {
  return(
    <div className="notfound-container">
      <Animation animationData={notfound} height={400} width={400} />
    </div>
  )
}