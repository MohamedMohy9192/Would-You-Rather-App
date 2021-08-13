import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
    return (
      <nav >
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  } 