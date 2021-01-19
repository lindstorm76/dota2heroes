import React from "react"

type HeroCardProps = {
  color: string,
  attr: string,
  heroes: Array<JSX.Element>
}

export const HeroContainer: React.FC<HeroCardProps> = ({
  color, attr, heroes
}): JSX.Element => {
  return (
    <>
      <h2 className="attr" style={{color}}>{attr}</h2>
      <div className="hero-container">
        {heroes}
      </div>
    </>
  )
}