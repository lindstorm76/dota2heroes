import React from "react"
import HeroCard from "./components/HeroCard"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      heading: "Choose a hero",
      sub_heading: "Hero detail goes here...",
      strs: null,
      agis: null,
      ints: null,
      strCards: null
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
      this.setState({
        strCards: this.state.strs.map(str => {
          return(
            <HeroCard
              id={str.id}
              key={"hero-" + str.id}
              mouseOver={this.showDetail}
              name={str.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        }),
        agiCards: this.state.agis.map(agi => {
          return(
            <HeroCard
              id={agi.id}
              key={"hero-" + agi.id}
              mouseOver={this.showDetail}
              name={agi.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        }),
        intCards: this.state.ints.map(int => {
          return(
            <HeroCard
              id={int.id}
              key={"hero-" + int.id}
              mouseOver={this.showDetail}
              name={int.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        })
      })
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

  filter = (attr, value) => {
    this.setState({
      strCards: this.state.strs.map(str => {
        return(
          <HeroCard
            id={str.id}
            key={"hero-" + str.id}
            mouseOver={this.showDetail}
            name={str.name.split("_dota_hero_")[1]}
            isValid={attr === null || str[attr].includes(value) ? true : false}
          />
        )
      }),
      agiCards: this.state.agis.map(agi => {
        return(
          <HeroCard
            id={agi.id}
            key={"hero-" + agi.id}
            mouseOver={this.showDetail}
            name={agi.name.split("_dota_hero_")[1]}
            isValid={attr === null || agi[attr].includes(value) ? true : false}
          />
        )
      }),
      intCards: this.state.ints.map(int => {
        return(
          <HeroCard
            id={int.id}
            key={"hero-" + int.id}
            mouseOver={this.showDetail}
            name={int.name.split("_dota_hero_")[1]}
            isValid={attr === null || int[attr].includes(value) ? true : false}
          />
        )
      })
    })
  }

  filterAttackType = e => {
    if (e.target.value === "melee") {
      this.filter("attack_type", "Melee")
    } else if (e.target.value === "ranged") {
      this.filter("attack_type", "Ranged")
    } else {
      this.filter(null)
    }
  }

  filterName = e => {
    this.filter("localized_name", e.target.value)
  }

  filterRole = e => {
    const target = e.target.value.substring(0, 1).toUpperCase() + e.target.value.substring(1)
    if (target === "By role" || target === "All") {
      this.filter(null)
    } else {
      this.filter("roles", target)
    }
  }


  render() {

    return(
      <>
        <h1 className="heading">{this.state.heading}</h1>
        <h3 className="sub-heading">{this.state.sub_heading}</h3>
        <div className="filter">
          <p>filter</p>
          <select id="role" onChange={this.filterRole}>
            <option>by role</option>
            <option>all</option>
            <option>carry</option>
            <option>disabler</option>
            <option>lane support</option>
            <option>initiator</option>
            <option>jungler</option>
            <option>support</option>
            <option>durable</option>
            <option>nuker</option>
            <option>pusher</option>
            <option>escape</option>
          </select>
          <select id="atk_type" onChange={this.filterAttackType}>
            <option>by attack type</option>
            <option>all</option>
            <option>melee</option>
            <option>ranged</option>
          </select>
          <select onChange={this.filterName}>
            <option>HERO NAME</option>
            <option>Abaddon</option>
            <option>Alchemist</option>
          </select>
        </div>
        <div className="container">
          <h2 className="attr">strength</h2>
          <div className="hero-container">
            {this.state.strCards || "loading"}
          </div>
          <h2 className="attr">agility</h2>
          <div className="hero-container">
            {this.state.agiCards || "loading"}
          </div>
          <h2 className="attr">intelligence</h2>
          <div className="hero-container">
            {this.state.intCards || "loading"}
          </div>
        </div>
      </>
    )
  }
}

export default App;
