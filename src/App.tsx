import React, { ChangeEvent, useEffect, useState } from "react"
import { HeroCard } from "./components/HeroCard"
import loading from "./loading.json"
import FadeIn from "react-fade-in"
import { FilterOption } from "./components/FilterOption"
import { Animation } from "./components/Animation"

export const App: React.FC = (): JSX.Element => {
  const [heading, setHeading] = useState("Dota 2 Heroes")
  const [role, setRole] = useState(null)
  const [attackType, setAttackType] = useState(null)
  const [name, setName] = useState(null)
  const [heroes, setHeroes] = useState(null)
  const [names, setNames] = useState(null)

  useEffect((): void => {
    (async (): Promise<void> => {
      const res = await fetch("https://api.opendota.com/api/heroes")
      const heroes = await res.json()
      heroes.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
      setHeroes(heroes)
      setNames(
        heroes.map((hero: any) => (
          hero.localized_name
        )).sort()
      )
    })()
  }, [])

  const showDetail = (e: any): void => {
    const hoveredHeroName: string = heroes.find((hero: any) => (
      hero.id === +e.target.dataset.id
    )).localized_name
    setHeading(hoveredHeroName)
  }

  const capitalize = (word: string): string => (
    word[0].toUpperCase() + word.substring(1).toLowerCase()
  )

  // This method is only invoked if a select element changes.
  // Each event that is invoked doesn't have the same type of event.
  const filterRole = (e: ChangeEvent<HTMLSelectElement>): void => {
    const target = capitalize(e.target.value)
    setRole(target === "By role" || target === "All" ? null : target)
  }

  const filterAttackType = (e: ChangeEvent<HTMLSelectElement>): void => {
    const type = capitalize(e.target.value)
    setAttackType(type === "By attack type" || type === "All" ? null : type)
  }

  const filterName = (e: ChangeEvent<HTMLSelectElement>): void => {
    setName(e.target.value === "HERO NAME" ? null : e.target.value)
  }

  const generateHeroCard = (
    hero: any, validity: boolean
  ): JSX.Element => (
    <HeroCard
        id={hero.id}
        key={`hero-${hero.id}`}
        mouseOver={showDetail}
        attr={hero.primary_attr}
        localized_name={hero.localized_name}
        name={hero.name.split("_dota_hero_")[1]}
        isValid={validity}
      />
  )

  if (!heroes) {
    return (
      <Animation animationData={loading} width={200} height={200} />
    )
  }

  const strCards: Array<JSX.Element> = [],
        agiCards: Array<JSX.Element> = [],
        intCards: Array<JSX.Element> = []
  
  heroes.forEach((hero: any) => {
    let validRole: boolean = true,
        validType: boolean = true,
        validName: boolean = true
    if (role !== null) {
      validRole = hero.roles.includes(role)
    }
    if (attackType !== null) {
      validType = hero.attack_type === attackType
    }
    if (name !== null) {
      validName = hero.localized_name === name
    }
    const validity: boolean = validRole && validType && validName
    if (hero.primary_attr === "str") {
      strCards.push(generateHeroCard(hero, validity))
    } else if (hero.primary_attr === "agi") {
      agiCards.push(generateHeroCard(hero, validity))
    } else if (hero.primary_attr === "int") {
      intCards.push(generateHeroCard(hero, validity))
    }
  })

  const nameOptions = names.map((name: string) => (
    <option key={"hero-" + name}>{name}</option>
  ))

  return (
    <div className="center-container">
      <div className="heading-container">
        <h1 className="heading">{heading}</h1>
      </div>
      <FilterOption
        filterRole={filterRole}
        filterAttackType={filterAttackType}
        filterName={filterName}
        names={nameOptions}
      />
      <FadeIn>
        <div className="container">
          <h2 className="attr" style={{color: "#EF4444"}}>strength</h2>
          <div className="hero-container">
            {strCards}
          </div>
          <h2 className="attr" style={{color: "#10B981"}}>agility</h2>
          <div className="hero-container">
            {agiCards}
          </div>
          <h2 className="attr" style={{color: "#3B82F6"}}>intelligence</h2>
          <div className="hero-container">
            {intCards}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}