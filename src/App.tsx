import React from "react"
import { HeroCard } from "./components/HeroCard"
import loadingData from "./loading.json"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import FilterOption from "./components/FilterOption"

class App extends React.Component<{}> {

  state: {
    heading: string,
    atkType: string,
    desc: string | null,
    role: string | null,
    attack_type: string | null,
    name: string | null,
    heroes: {}[] | null
  } = {
    heading: "Dota 2 Heroes",
    atkType: "Hover on any hero to reveal their roles...",
    desc: null,
    role: null,
    attack_type: null,
    name: null,
    heroes: null
  }

  componentDidMount = () => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      this.setState({ heroes: heroes.sort((a: any, b: any) => a.name > b.name ? 1 : -1) })
    })
  }
  
  showDetail = (e: any): void => {
    const hoveredHero: any = this.state.heroes.find((hero: any) => hero.id === +e.target.dataset.id)
    this.setState({
      heading: hoveredHero.localized_name,
      atkType: hoveredHero.attack_type,
      desc: hoveredHero.roles.reduce((acc: any, cur: any) => acc + " - " + cur, "")
    })
  }

  capitalize = (word: string) => (
    word[0].toUpperCase() + word.substring(1).toLowerCase()
  )
  
  filterRole = (e: any): void => {
    const target = this.capitalize(e.target.value)
    this.setState({
      role: target === "By role" || target === "All" ? null : target
    })
  }

  filterAttackType = (e: any): void => {
    const type = this.capitalize(e.target.value)
    this.setState({
      attack_type: type === "By attack type" || type === "All" ? null : type
    })
  }

  filterName = (e: any): void => {
    this.setState({
      name: e.target.value === "HERO NAME" ? null : e.target.value
    })
  }

  render() {

    const loadingOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    if (!this.state.heroes) {
      return(
        <FadeIn>
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "99vw",
            height: "95vh" }}
          >
            <Lottie options={loadingOptions} height={200} width={200} />
          </div>
        </FadeIn>
      )
    }

    const strCards: any = [], agiCards: any = [], intCards: any = []
    this.state.heroes.forEach((hero: any) => {
      let validRole = true, validType = true, validName = true
      const { role, attack_type, name } = this.state
      if (role !== null) {
        validRole = hero.roles.includes(role)
      }
      if (attack_type !== null) {
        validType = hero.attack_type === attack_type
      }
      if (name !== null) {
        validName = hero.localized_name === name
      }
      const validity =  validRole && validType && validName
      if (hero.primary_attr === "str") {
        strCards.push(
          <HeroCard
            id={hero.id}
            key={`hero-${hero.id}`}
            mouseOver={this.showDetail}
            attr={hero.primary_attr}
            localized_name={hero.localized_name}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={validity}
          />
        )
      } else if (hero.primary_attr === "agi") {
        agiCards.push(
          <HeroCard
            id={hero.id}
            key={`hero-${hero.id}`}
            mouseOver={this.showDetail}
            attr={hero.primary_attr}
            localized_name={hero.localized_name}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={validity}
          />
        )
      } else if (hero.primary_attr === "int") {
        intCards.push(
          <HeroCard
            id={hero.id}
            key={`hero-${hero.id}`}
            mouseOver={this.showDetail}
            attr={hero.primary_attr}
            localized_name={hero.localized_name}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={validity}
          />
        )
      }
    })

    const names: Array<JSX.Element> = this.state.heroes.map((hero: any) => (
      hero.localized_name
    )).sort().map(name => (
      <option key={"hero-" + name}>{name}</option>
    ))
    
    return (
      <div className="center-container">
        <div className="heading-container">
          <h1 className="heading">{this.state.heading}</h1>
        </div>
        <FilterOption
          filterRole={this.filterRole}
          filterAttackType={this.filterAttackType}
          filterName={this.filterName}
          names={names}
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
}

export default App