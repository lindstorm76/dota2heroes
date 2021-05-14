import React, { ChangeEvent } from "react"

type FilterOptionProps = {
  filterRole: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterAttackType: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterName: (e: ChangeEvent<HTMLSelectElement>) => void,
  clearFilter: () => void,
  heroNames: Array<string>,
  currentRole: string,
  currentAttackType: string,
  currentName: string,
}

// If you have a type applied you can extract properties from the props.
export const FilterOption: React.FC<FilterOptionProps> = ({
  filterRole, filterAttackType, filterName, clearFilter, heroNames, currentRole, currentAttackType, currentName
}): JSX.Element => {

  const roles: Array<string> = [
          "BY ROLE", "ALL", "CARRY", "DISABLER", "LANE SUPPORT", "INITIATOR", "JUNGLER",
          "SUPPORT", "DURABLE", "NUKER", "PUSHER", "ESCAPE"
        ],
        attackTypes: Array<string> = [
          "BY ATTACK TYPE",
          "ALL",
          "MELEE",
          "RANGED"
        ]

  const generateOptions = (elems: Array<string>): Array<JSX.Element> => (
    elems.map((elem: string) =>
      <option key={elem} value={elem.toLowerCase()}>{elem}</option>
    )
  )
    
  const roleOptions = generateOptions(roles)
  const attackTypeOptions = generateOptions(attackTypes)
  const nameOptions = generateOptions(heroNames)
  return (
    <div className="filter">
      <p>FILTER</p>
      <select id="role" value={currentRole.toLowerCase()} onChange={filterRole}>
        {roleOptions}
      </select>
      <select id="atk_type" value={currentAttackType.toLowerCase()} onChange={filterAttackType}>
        {attackTypeOptions}
      </select>
      <select id="name" value={currentName.toLowerCase()} onChange={filterName}>
        <option>HERO NAME</option>
        {nameOptions}
      </select>
      <button onClick={clearFilter}>CLEAR</button>
    </div>
  )
}