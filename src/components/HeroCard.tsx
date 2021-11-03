import React, { MouseEvent } from 'react'
// import { useHistory } from "react-router-dom"
import {
  Link
} from "react-router-dom"
import { imageUrl } from '../config/urls'

type HeroCardProps = {
  id: string,
  mouseOver: (e: MouseEvent<HTMLImageElement>) => void,
  attr: string
  localized_name: string
  name: string
  isValid: boolean
}

const getImageUrl = (heroName: String) => String (
  `${imageUrl}${heroName}_full.png`
)

export const HeroCard: React.FC<HeroCardProps> = ({
  id, mouseOver, attr, localized_name, name, isValid
}): JSX.Element => {
  return (
    <Link to={`/${localized_name}`}>
      <div className="hero-card">
        <img
          key={`hero-${id}`}
          // It's like ternary but only return one value if the condition is true
          onMouseOver={isValid ? mouseOver : () => {}}
          className={`${isValid && "hover"} ${isValid && attr}`}
          data-id={id}
          src={name === "dawnbreaker" ? "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png" : getImageUrl(name)}
          style={{opacity: isValid ? 1 : .3}}
          alt={name}
        />          
      </div>
    </Link>
  )
}