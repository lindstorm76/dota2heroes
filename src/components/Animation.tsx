import FadeIn from "react-fade-in"
import Lottie from "react-lottie"

type AnimationProps = {
  animationData: any,
  width: number,
  height: number
}

export const Animation: React.FC<AnimationProps> = ({
  animationData, width, height
}): JSX.Element => {

  const option: any = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <FadeIn>
      <div className="animation-container">
        <Lottie options={option} width={width} height={height} />
      </div>
    </FadeIn>
  )
}