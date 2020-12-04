import React from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import * as loadingData from "../loading.json"
import * as notfound from "../notfound.json"

class HeroDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hero: null
    }
  }

  componentDidMount = () => {
    fetch("https://api.opendota.com/api/heroes")
    .then(res => res.json())
    .then(heroes => {
      this.setState({ hero: heroes.find(hero => hero.localized_name === this.props.match.params.name) })
      console.log(this.state.hero)
    })
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

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    const notfoundOption = {
      loop: true,
      autoplay: true,
      animationData: notfound.default,
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

    const roles = this.state.hero.roles.reduce((acc, cur) => acc + " - " + cur, "")
    let color, attr
    switch (this.state.hero.primary_attr) {
      case "str": color = "#EF4444"; attr = "strength"; break;
      case "agi": color = "#10B981"; attr = "agility"; break;
      case "int": color = "#3B82F6"; attr = "inteligence"; break;
    }

    return(
      <>
        <h1 className="heading">{this.state.hero.localized_name}</h1>
        <FadeIn>
          <center>
            <img
              src={`http://cdn.dota2.com/apps/dota2/images/heroes/${this.state.hero.name.split("_dota_hero_")[1]}_full.png`}
              style={{width: "20rem"}}
            />
          </center>
          
          <h2 className="attr" style={{color}}>{attr}</h2>
          <h3 className="sub-heading">{this.state.hero.attack_type}<span style={{color: "gray"}}>{roles}</span></h3>
        </FadeIn>
      </>
      
    )
  }
}

export default HeroDetail