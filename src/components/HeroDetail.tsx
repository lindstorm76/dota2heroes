import React, { useEffect, useState } from "react"
import FadeIn from "react-fade-in"
import loading from "../loading.json"
import notfound from "../notfound.json"
import { Animation } from "./Animation"

interface HeroDetailProps {
  match: any
}

export const HeroDetail: React.FC<HeroDetailProps> = ({
  match
}): JSX.Element => {
  const [hero, setHero] = useState(null)
  useEffect((): void => {
    (async (): Promise<void> => {
      const res = await fetch("https://api.opendota.com/api/heroes")
      const heroes = await res.json()
      const target = heroes.find((hero: any) => (
        hero.localized_name === match.params.name
      ))
      setHero(target)
    })()
  }, [match])

  if (hero === null) {
    return (
      <Animation animationData={loading} width={200} height={200} />
    )
  }

  if (hero === undefined) {
    return (
      <Animation animationData={notfound} width={400} height={400} />
    )
  }

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
    <div className="center-container">
      <h1 className="heading">{hero.localized_name}</h1>
      <FadeIn>
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
      </FadeIn>
    </div>
  )
}