import React from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import loadingData from "../loading.json"
import notfound from "../notfound.json"

interface HeroDetailProps {
  match: any
}

class HeroDetail extends React.Component<HeroDetailProps> {

  state: {
    hero: any | null
  } = {
    hero: null
  }

  componentDidMount = (): void => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      this.setState({ hero: heroes.find((hero: any) => hero.localized_name === this.props.match.params.name) })
    })
  }

  render(): JSX.Element {

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

    if (this.state.hero === null) {
      return(
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "95vh" }}>
            <Lottie options={loadingOption} height={200} width={200} />
          </div>
        </FadeIn>
      )
    }

    if (this.state.hero === undefined) {
      return(
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "95vh" }}>
            <Lottie options={notfoundOption} height={400} width={400} />
          </div>
        </FadeIn>
      )
    }

    const roles: string = this.state.hero.roles.reduce((acc: string, cur: string) => acc + " - " + cur, "")
    let color: string, attr: string, src: string
    const primaryAttr: string = this.state.hero.primary_attr
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
        <h1 className="heading">{this.state.hero.localized_name}</h1>
        <FadeIn>
          <div className="hero-image-container">
            <img
              alt={this.state.hero.name}
              src={`https://cdn.dota2.com/apps/dota2/images/heroes/${this.state.hero.name.split("_dota_hero_")[1]}_full.png`}
              style={{width: "20rem"}}
            />
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img alt={this.state.hero.primary_attr} className="hero-attribute" src={src} />
          <h2 className="attr" style={{color}}>{attr}</h2>
          </div>
          <h3 className="sub-heading">{this.state.hero.attack_type}<span style={{color: "gray"}}>{roles}</span></h3>
        </FadeIn>
      </div>
      
    )
  }
}

export default HeroDetail