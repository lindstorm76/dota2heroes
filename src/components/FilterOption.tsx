import React, { ChangeEvent } from "react"

type FilterOptionProps = {
  filterRole: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterAttackType: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterName: (e: ChangeEvent<HTMLSelectElement>) => void,
  names: Array<JSX.Element>
}

// If you have a type applied you can extract properties from the props.
export const FilterOption: React.FC<FilterOptionProps> = ({
  filterRole, filterAttackType, filterName, names
}): JSX.Element => (
  <div className="filter">
    <p>FILTER</p>
    <select id="role" onChange={filterRole}>
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
    <select id="atk_type" onChange={filterAttackType}>
      <option>BY ATTACK TYPE</option>
      <option>ALL</option>
      <option>MELEE</option>
      <option>RANGED</option>
    </select>
    <select id="name" onChange={filterName}>
      <option>HERO NAME</option>
      {names}
    </select>
  </div>
)