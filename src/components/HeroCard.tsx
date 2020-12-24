import React from 'react'

type Props = {
  id: string,
  mouseOver: (e: any) => void,
  attr: string
  localized_name: string
  name: string
  isValid: boolean
}

export const HeroCard: React.FC<Props> = ({
  id, mouseOver, attr, localized_name, name, isValid
}) => {
  const handleRedirect = (): void => {
    window.location.href = `/${localized_name}`
  }

  return(
    <div className="hero-card">
      <img
        key={`hero-${id}`}
        onClick={handleRedirect}
        onMouseOver={isValid ? mouseOver : () => {}}
        className={`${isValid ? "hover" : ""} ${isValid ? attr : ""}`}
        data-id={id}   
        src={`https://cdn.dota2.com/apps/dota2/images/heroes/${name}_full.png`}
        style={{opacity: isValid ? 1 : .3}}
        alt={name}
      />
    </div>
  )
}