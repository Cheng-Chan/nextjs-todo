import React from "react"

import { Navbar } from "./components/Navbar"
import { Todo } from "./components/Todo"

export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Todo/>
    </React.Fragment>
  )
}
