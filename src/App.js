import React from "react"
import HeroCard from "./components/HeroCard"
import * as loadingData from "./loading.json"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      heading: "Choose a hero",
      sub_heading: "Hero detail goes here...",
      strCards: null,
      agiCards: null,
      intCards: null
    }
  }

  componentDidMount = () => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      const strCards = [], agiCards = [], intCards = []
      heroes.map(hero => {
        if (hero.primary_attr === "str") {
          strCards.push(
            <HeroCard
              id={hero.id}
              key={"hero-" + hero.id}
              mouseOver={this.showDetail}
              name={hero.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        } else if (hero.primary_attr === "agi") {
          agiCards.push(
            <HeroCard
              id={hero.id}
              key={"hero-" + hero.id}
              mouseOver={this.showDetail}
              name={hero.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        } else if (hero.primary_attr === "int") {
          intCards.push(
            <HeroCard
              id={hero.id}
              key={"hero-" + hero.id}
              mouseOver={this.showDetail}
              name={hero.name.split("_dota_hero_")[1]}
              isValid={true}
            />
          )
        }
      })
      this.setState({ heroes, strCards, agiCards, intCards })
    })
  }
  
  showDetail = e => {
    const hoveredHero = this.state.heroes.find(hero => hero.id === +e.target.dataset.id)
    const heroDesc = `${hoveredHero.attack_type} ${hoveredHero.roles.reduce((acc, cur) => acc + " - " + cur, "")}`
    this.setState({
      heading: hoveredHero.localized_name,
      sub_heading: heroDesc
    })
  }

  filter = (attr, value) => {
    const strCards = [], agiCards = [], intCards = []
    this.state.heroes.map(hero => {
      if (hero.primary_attr === "str") {
        strCards.push(
          <HeroCard
            id={hero.id}
            key={"hero-" + hero.id}
            mouseOver={this.showDetail}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={attr === null || hero[attr].includes(value) ? true : false}
          />
        )
      } else if (hero.primary_attr === "agi") {
        agiCards.push(
          <HeroCard
            id={hero.id}
            key={"hero-" + hero.id}
            mouseOver={this.showDetail}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={attr === null || hero[attr].includes(value) ? true : false}
          />
        )
      } else if (hero.primary_attr === "int") {
        intCards.push(
          <HeroCard
            id={hero.id}
            key={"hero-" + hero.id}
            mouseOver={this.showDetail}
            name={hero.name.split("_dota_hero_")[1]}
            isValid={attr === null || hero[attr].includes(value) ? true : false}
          />
        )
      }
    })
    this.setState({ strCards, agiCards, intCards })
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

    const defaultOptions = {
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
            <Lottie options={defaultOptions} height={140} width={140} />
          </div>
        </FadeIn>
      )
    }

    const names = this.state.heroes.map(hero => <option>{hero.localized_name}</option>)

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
            {names}
          </select>
        </div>
        <FadeIn>
          <div className="container">
            <h2 className="attr" style={{color: "#EF4444"}}>strength</h2>
            <div className="hero-container">
              {this.state.strCards || "loading"}
            </div>
            <h2 className="attr" style={{color: "#10B981"}}>agility</h2>
            <div className="hero-container">
              {this.state.agiCards || "loading"}
            </div>
            <h2 className="attr" style={{color: "#3B82F6"}}>intelligence</h2>
            <div className="hero-container">
              {this.state.intCards || "loading"}
            </div>
          </div>
        </FadeIn>
      </>
    )
  }
}

export default App;
