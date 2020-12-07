import React from "react"

class FilterOption extends React.Component {

  render() {
    return(
      <div className="filter">
        <p>filter</p>
        <select id="role" onChange={this.props.filterRole}>
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
        <select id="atk_type" onChange={this.props.filterAttackType}>
          <option>by attack type</option>
          <option>all</option>
          <option>melee</option>
          <option>ranged</option>
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