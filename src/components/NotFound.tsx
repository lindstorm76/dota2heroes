import React from "react"
import notfound from "../notfound.json"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"

class NotFound extends React.Component<{}> {
  render() {
    const notfoundOption = {
      loop: true,
      autoplay: true,
      animationData: notfound,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    return(
      <FadeIn>
        <div className="notfound-container">
          <Lottie options={notfoundOption} height={400} width={400} />
        </div>
      </FadeIn>
    )
  }   
}

export default NotFound