import React, { MouseEvent } from 'react'
import { useHistory } from "react-router-dom"

type HeroCardProps = {
  id: string,
  mouseOver: (e: MouseEvent<HTMLImageElement>) => void,
  attr: string
  localized_name: string
  name: string
  isValid: boolean
}

export const HeroCard: React.FC<HeroCardProps> = ({
  id, mouseOver, attr, localized_name, name, isValid
}): JSX.Element => {

  const history = useHistory()

  const handleClick = (): void => {
    history.push(`/${localized_name}`)
  }

  const derivedClass = `${isValid ? "hover" : ""} ${isValid ? attr : ""}`
  const derivedOpacity = isValid ? 1 : .3
  const derivedMouseOver = isValid ? mouseOver  : (): void => {}

  return (
    <div className="hero-card">
      <img
        key={`hero-${id}`}
        onClick={handleClick}
        onMouseOver={derivedMouseOver}
        className={derivedClass}
        data-id={id}
        src={`https://cdn.dota2.com/apps/dota2/images/heroes/${name}_full.png`}
        style={{opacity: derivedOpacity}}
        alt={name}
      />
    </div>
  )
}