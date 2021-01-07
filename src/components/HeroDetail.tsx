import React, { useEffect, useState } from "react"
import FadeIn from "react-fade-in"
import loading from "../assets/loading.json"
import { Animation } from "./Animation"
import { NotFound } from "./NotFound"

interface HeroDetailProps {
  match: any
}

export const HeroDetail: React.FC<HeroDetailProps> = ({
  match
}): JSX.Element => {
  const [hero, setHero] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect((): void => {
    (async (): Promise<void> => {
      const res = await fetch("https://api.opendota.com/api/heroes")
      const heroes = await res.json()
      const target = heroes.find((hero: any) => hero.localized_name === match.params.name)
      if (target === undefined) setNotFound(true)
      setHero(target)
      setIsLoading(false)
    })()
  }, [match]) // Pass anything you need to use in useEffect in this array.

  if (isLoading) {
    return (
      <Animation animationData={loading} width={200} height={200} />
    )
  }
  
  if (notFound) return <NotFound />

  const roles: string = hero.roles.reduce((acc: string, cur: string) => acc + " - " + cur, "")
  let color: string, attr: string
  const primaryAttr: string = hero.primary_attr
  if (primaryAttr === "str") {
    color = "#EF4444"
    attr = "strength"
  } else if (primaryAttr === "agi") {
    color = "#10B981"
    attr = "agility"
  } else {
    color = "#3B82F6"
    attr = "inteligence"
  }

  return (
    
    <FadeIn>
      <div className="center-container">
        <h1 className="heading">{hero.localized_name}</h1>
          <div className="hero-image-container">
            <img
              alt={hero.name}
              src={`https://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.split("_dota_hero_")[1]}_full.png`}
              style={{width: "20rem", borderColor: color}}
            />
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h2 className="border-attr attr" style={{color}}>{attr}</h2>
          </div>
          <h3 className="sub-heading">{hero.attack_type}<span style={{color: "gray"}}>{roles}</span></h3>
      </div>
    </FadeIn>
  )
}