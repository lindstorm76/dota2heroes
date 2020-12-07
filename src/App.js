import React from "react"
import HeroCard from "./components/HeroCard"
import * as loadingData from "./loading.json"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import FilterOption from "./components/FilterOption"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      heading: "Dota 2 Heroes",
      atkType: "Hover on any hero to reveal their roles...",
      desc: null,
      strCards: null,
      agiCards: null,
      intCards: null,
      role: null,
      attack_type: null,
      name: null
    }
  }

  filter = (role, attack_type, name) => {
    const strCards = [], agiCards = [], intCards = []
    this.state.heroes.forEach(hero => {
      let validRole = true, validType = true, validName = true
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
            key={"hero-" + hero.id}
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
            key={"hero-" + hero.id}
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
            key={"hero-" + hero.id}
            mouseOver={this.showDetail}
            attr={hero.primary_attr}
            localized_name={hero.localized_name}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={validity}
          />
        )
      }
    })
    this.setState({ strCards, agiCards, intCards })
  }

  componentDidMount = () => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      this.setState({ heroes })
      this.filter(null, null, null)
    })
  }
  
  showDetail = e => {
    const hoveredHero = this.state.heroes.find(hero => hero.id === +e.target.dataset.id)
    this.setState({
      heading: hoveredHero.localized_name,
      atkType: hoveredHero.attack_type,
      desc: hoveredHero.roles.reduce((acc, cur) => acc + " - " + cur, "")
    })
  }
  
  filterRole = e => {
    const target = e.target.value.substring(0, 1).toUpperCase() + e.target.value.substring(1)
    const result = target === "By role" || target === "All" ? null : target  
    this.setState({ role: result })
    this.filter(result, this.state.attack_type, this.state.name)
  }

  filterAttackType = e => {
    const type = e.target.value.substring(0, 1).toUpperCase() + e.target.value.substring(1)
    const result = type === "By attack type" || type === "All" ? null : type
    this.setState({ attack_type: result })
    this.filter(this.state.role, result, this.state.name)
  }

  filterName = e => {
    const result = e.target.value === "HERO NAME" ? null : e.target.value
    this.setState({ name: result })
    this.filter(this.state.role, this.state.attack_type, result)
  }

  render() {

    const loadingOption = {
      loop: true,
      autoplay: true,
      animationData: loadingData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    if (this.state.strCards === null || this.state.agiCards === null || this.state.intCards === null) {
      return(
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "95vh" }}>
            <Lottie options={loadingOption} height={200} width={200} />
          </div>
        </FadeIn>
      )
    }

    const names = this.state.heroes.map(hero => hero.localized_name).sort().map(name => {
      return <option key={"hero-" + name}>{name}</option>
    })
    
    return(
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
              {this.state.strCards}
            </div>
            <h2 className="attr" style={{color: "#10B981"}}>agility</h2>
            <div className="hero-container">
              {this.state.agiCards}
            </div>
            <h2 className="attr" style={{color: "#3B82F6"}}>intelligence</h2>
            <div className="hero-container">
              {this.state.intCards}
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default App;
