import React from "react"
import HeroCard from "./components/HeroCard"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      heading: "Choose a hero",
      sub_heading: "",
      strs: null,
      agis: null,
      ints: null
    }
  }

  componentDidMount = () => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      const strs = [], agis = [], ints = []
      heroes.map(hero => {
        if (hero.primary_attr === "str") {
          strs.push(hero)
        } else if (hero.primary_attr === "agi") {
          agis.push(hero)
        } else if (hero.primary_attr === "int") {
          ints.push(hero)
        }
        return null
      })
      this.setState({ strs, agis, ints })
    })
  }
  
  showDetail = e => {
    const hoveredHero = [...this.state.strs, ...this.state.agis, ...this.state.ints].find(hero => hero.id === +e.target.dataset.id)
    const heroDesc = `${hoveredHero.attack_type} ${hoveredHero.roles.reduce((acc, cur) => acc + " - " + cur, "")}`
    this.setState({
      heading: hoveredHero.localized_name,
      sub_heading: heroDesc
    })
  }
  render() {
    let strCards, agiCards, intCards
    if (this.state.strs !== null)
      strCards = this.state.strs.map(str => {
        return(
          <HeroCard
            id={str.id}
            key={"hero-" + str.id}
            mouseOver={this.showDetail}
            name={str.name.split("_dota_hero_")[1]}
          />
        )
      })
    if (this.state.agis !== null)
      agiCards = this.state.agis.map(agi => {
        return(
          <HeroCard
            id={agi.id}
            key={"hero-" + agi.id}
            mouseOver={this.showDetail}
            name={agi.name.split("_dota_hero_")[1]}
          />
        )
      })
    if (this.state.ints !== null)
      intCards = this.state.ints.map(int => {
        return(
          <HeroCard
            id={int.id}
            key={"hero-" + int.id}
            mouseOver={this.showDetail}
            name={int.name.split("_dota_hero_")[1]}
          />
        )
      })
    return(
      <>
        <h1 className="heading">{this.state.heading}</h1>
        <h3 className="sub-heading">{this.state.sub_heading}</h3>
        <div className="container">
          <h2 className="attr">strength</h2>
          <div className="hero-container">
            {strCards || "loading"}
          </div>
          <h2 className="attr">agility</h2>
          <div className="hero-container">
            {agiCards || "loading"}
          </div>
          <h2 className="attr">intelligence</h2>
          <div className="hero-container">
            {intCards || "loading"}
          </div>
        </div>
      </>
    )
  }
}

export default App;
