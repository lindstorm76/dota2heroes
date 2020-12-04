import React from "react"
import * as notfound from "../notfound.json"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"

class NotFound extends React.Component {
  render() {
    const notfoundOption = {
      loop: true,
      autoplay: true,
      animationData: notfound.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    return(
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "95vh" }}>
          <Lottie options={notfoundOption} height={400} width={400} />
        </div>
      </FadeIn>
    )
  }   
}

export default NotFound