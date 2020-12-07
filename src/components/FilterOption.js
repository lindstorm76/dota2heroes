import React from "react"

class FilterOption extends React.Component {

  render() {
    return(
      <div className="filter">
        <p>FILTER</p>
        <select id="role" onChange={this.props.filterRole}>
          <option>BY ROLE</option>
          <option>ALL</option>
          <option>CARRY</option>
          <option>DISABLER</option>
          <option>LANE SUPPORT</option>
          <option>INITIATOR</option>
          <option>JUNGLER</option>
          <option>SUPPORT</option>
          <option>DURABLE</option>
          <option>NUKER</option>
          <option>PUSHER</option>
          <option>ESCAPE</option>
        </select>
        <select id="atk_type" onChange={this.props.filterAttackType}>
          <option>BY ATTACK TYPE</option>
          <option>ALL</option>
          <option>MELEE</option>
          <option>RANGED</option>
        </select>
        <select id="name" onChange={this.props.filterName}>
          <option>HERO NAME</option>
          {this.props.names}
        </select>
      </div>
    )
  }
}

export default FilterOption