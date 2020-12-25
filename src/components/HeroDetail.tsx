import React, { useEffect, useState } from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import loadingData from "../loading.json"
import notfound from "../notfound.json"

interface HeroDetailProps {
  match: any
}

export const HeroDetail: React.FC<HeroDetailProps> = ({
  match
}): JSX.Element => {
  const [hero, setHero] = useState(null)
  useEffect((): void => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      const target = heroes.find((hero: any) => hero.localized_name === match.params.name)
      setHero(target)
    })
  }, [match]) 

  const loadingOption: any = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const notfoundOption: any = {
    loop: true,
    autoplay: true,
    animationData: notfound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  if (hero === null) {
    return(
      <FadeIn>
        <div className="animation-container">
          <Lottie options={loadingOption} height={200} width={200} />
        </div>
      </FadeIn>
    )
  }

  if (hero === undefined) {
    return(
      <FadeIn>
        <div className="animation-container">
          <Lottie options={notfoundOption} height={400} width={400} />
        </div>
      </FadeIn>
    )
  }

  const roles: string = hero.roles.reduce((acc: string, cur: string) => acc + " - " + cur, "")
  let color: string, attr: string, src: string
  const { primaryAttr } = hero
  if (primaryAttr === "str") {
    color = "#EF4444"
    attr = "strength"
    src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png"
  } else if (primaryAttr === "agi") {
    color = "#10B981"
    attr = "agility"
    src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png"
  } else {
    color = "#3B82F6"
    attr = "inteligence"
    src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/56/Intelligence_attribute_symbol.png"
  }

  return (
    <div className="center-container">
      <h1 className="heading">{hero.localized_name}</h1>
      <FadeIn>
        <div className="hero-image-container">
          <img
            alt={hero.name}
            src={`https://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.split("_dota_hero_")[1]}_full.png`}
            style={{width: "20rem"}}
          />
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img alt={hero.primary_attr} className="hero-attribute" src={src} />
        <h2 className="attr" style={{color}}>{attr}</h2>
        </div>
        <h3 className="sub-heading">{hero.attack_type}<span style={{color: "gray"}}>{roles}</span></h3>
      </FadeIn>
    </div>
    
  )
}