import React from 'react'

class HeroCard extends React.Component {

  handleRedirect = () => {
    window.location.href = `/${this.props.localized_name}`
  }

  render() {
    return(
      <div className="hero-card">
        <img
          key={"hero-img-" + this.props.id}
          onClick={this.handleRedirect}
          onMouseOver={this.props.isValid ? this.props.mouseOver : () => {}}
          className={`${this.props.isValid ? "hover" : ""} ${this.props.isValid ? this.props.attr : ""}`}
          data-id={this.props.id}   
          src={`http://cdn.dota2.com/apps/dota2/images/heroes/${this.props.name}_full.png`}
          style={{opacity: this.props.isValid ? 1 : .3}}
          alt={this.props.name}
        />
      </div>
    )
  }
}

export default HeroCard