import React from 'react'

class HeroCard extends React.Component {
  
  render() {
    return(
      <div className="hero-card">
        <img
          onMouseOver={this.props.mouseOver}
          data-id={this.props.id}
          src={`http://cdn.dota2.com/apps/dota2/images/heroes/${this.props.name}_full.png`}
        />
      </div>
    )
  }
}

export default HeroCard