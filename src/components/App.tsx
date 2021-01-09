import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { HeroCard } from "./HeroCard"
import loading from "../assets/loading.json"
import FadeIn from "react-fade-in"
import { FilterOption } from "./FilterOption"
import { Animation } from "./Animation"

export const App: React.FC = (): JSX.Element => {
  const headingRef = useRef(null)
  const [role, setRole] = useState(null)
  const [attackType, setAttackType] = useState(null)
  const [name, setName] = useState(null)
  const [heroes, setHeroes] = useState(null)
  const [heroNames, setNames] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
      // Get prev filter conditions if any
      if (localStorage.getItem("filterConditions") !== null) {
        const { role, attackType, name } = JSON.parse(localStorage.getItem("filterConditions"))
        setRole(role)
        setAttackType(attackType)
        setName(name)
      }
    })()
  }, [])

  const showDetail = (e: any): void => {
    const hoveredHeroName: string = heroes.find((hero: any) => (
      hero.id === +e.target.dataset.id
    )).localized_name
    headingRef.current.textContent = hoveredHeroName
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

  const clearFilter = (): void => {
    setRole(null)
    setAttackType(null)
    setName(null)
    if (localStorage.getItem("filterConditions") !== null)
      localStorage.removeItem("filterConditions")
  }

  if (role !== null || attackType !== null || name !== null) {
    localStorage.setItem("filterConditions", JSON.stringify({
      role: role, attackType: attackType, name: name
    }))
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

  if (isLoading) {
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
    validRole = role === null ? true : hero.roles.includes(role)
    validType = attackType === null ? true : hero.attack_type === attackType
    validName = name === null ? true : hero.localized_name === name
    const validity: boolean = validRole && validType && validName
    if (hero.primary_attr === "str") {
      strCards.push(generateHeroCard(hero, validity))
    } else if (hero.primary_attr === "agi") {
      agiCards.push(generateHeroCard(hero, validity))
    } else if (hero.primary_attr === "int") {
      intCards.push(generateHeroCard(hero, validity))
    }
  })

  // Whenever we hover on any hero card the heading state changes
  // then this component is re-rendered, causing all coponents to
  // re-render even though there's nothing change in that componenet
  // which is NOT good at all.
  return (
    <div className="center-container">
      <div className="heading-container">
        <h1 className="heading" ref={headingRef}>Dota 2 Heroes</h1>
      </div>
      <FilterOption
        filterRole={filterRole}
        filterAttackType={filterAttackType}
        filterName={filterName}
        clearFilter={clearFilter}
        heroNames={heroNames}
        currentRole={role || ""}
        currentAttackType={attackType || ""}
        currentName={name || ""}
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