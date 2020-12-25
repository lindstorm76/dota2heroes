import React from "react"
import notfound from "../notfound.json"
import Lottie from "react-lottie"

export const NotFound: React.FC = (): JSX.Element => {
  const notfoundOption: any = {
    loop: true,
    autoplay: true,
    animationData: notfound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  return(
    <div className="notfound-container">
      <Lottie options={notfoundOption} height={400} width={400} />
    </div>
  )
}