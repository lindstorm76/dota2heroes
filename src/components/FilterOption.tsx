import React, { ChangeEvent } from "react"

type FilterOptionProps = {
  filterRole: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterAttackType: (e: ChangeEvent<HTMLSelectElement>) => void,
  filterName: (e: ChangeEvent<HTMLSelectElement>) => void,
  names: Array<JSX.Element>,
  currentRole: string,
  currentAttackType: string
}

// If you have a type applied you can extract properties from the props.
export const FilterOption: React.FC<FilterOptionProps> = ({
  filterRole, filterAttackType, filterName, names, currentRole, currentAttackType
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

  const generateOptions = (elems: Array<string>, selected: string): Array<JSX.Element> => {
    return elems.map((elem: string) => {
      if (elem.toLowerCase() === selected.toLowerCase())
        return <option key={elem} selected>{elem}</option>
      return <option key={elem}>{elem}</option>
    })
  }

  const roleOptions = generateOptions(roles, currentRole)
  const attackTypeOptions = generateOptions(attackTypes, currentAttackType)

  return (
    <div className="filter">
      <p>FILTER</p>
      <select id="role" onChange={filterRole}>
        {roleOptions}
      </select>
      <select id="atk_type" onChange={filterAttackType}>
        {attackTypeOptions}
      </select>
      <select id="name" onChange={filterName}>
        <option>HERO NAME</option>
        {names}
      </select>
    </div>
  )
}