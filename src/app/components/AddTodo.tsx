"use client"

import { FC, useState } from "react"

type Disable = false

// interface TodoListProps {
//   onAddTodo: string
// }

export const AddTodo = ({ onAddTodo, filterSearch, onKeyDownEnter }) => {

  const [isDisable, setIsDisable] = useState(false)
  const [todo, setTodo] = useState('')

  const onChangeHandler = (inputValue: string) => {
    setTodo(inputValue)
    filterSearch(inputValue)
    if(inputValue){
      setIsDisable(true)
    }else{
      setIsDisable(false)
    }
  }

  return(
    <div 
      className={`
        flex w-full justify-center pt-7 flex-row gap-3
      `}>
      <input
        type="text"
        id="input-todo"
        autoComplete="off"
        className={`
          md:h-[46px] md:w-[538px] border-2 border-[#EEEEEE] rounded-md px-2 
          focus:outline-none focus:drop-shadow-md focus:border-0 text-[#5F6368]
          w-[218px] h-[36px] hover:drop-shadow-md hover:border-0
        `}
        placeholder="Add todo ..."
        onChange={(event) => onChangeHandler(event.currentTarget.value)}
        value={todo}
        onKeyDown={(event) => {
          if(event.key === 'Enter'){
            onKeyDownEnter(todo)
            filterSearch('')
            setTodo('')
            setIsDisable(false)
          }
        }}
      />
      <button
        className={`
          md:h-[46px] md:w-[46px] flex justify-center items-center bg-[#3A98B9] 
          rounded-md border-2 border-[#3A98B9] text-white font-bold text-xl
          w-[36px] h-[36px] hover:drop-shadow-md hover:border-0
          ${isDisable ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-75'}
        `}
        onClick={() => {
          onAddTodo(todo);
          setTodo('');
          setIsDisable(false)
          filterSearch('')
        }}
        disabled={!isDisable}
      >
        +
      </button>
    </div>
  )
}