"use client"

import React, { FC, useState } from "react"
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid"

type Todo = {
  id: string,
  createdAt: Date,
  isCompleted: boolean,
  todo: string
}

interface TodoListProps {
  todos: Array<Todo> | never[]
}

// const EditBio: FC<BioProps> = (props): JSX.Element =>

export const TodoList: FC<TodoListProps> = ({ todos, onCheckTodo, onEditing, onDelete }): JSX.Element => {

  return(
    <div
      className={`
        flex justify-center items-center w-full flex-col gap-5 pt-5 pb-5
      `}
    >
      {
        todos.length === 0 ?
        <div className="flex justify-center flex-col">
          <h3 className="text-[#5F6368] italic">Empty! Enter value and Click on Button + to create or Press Enter</h3>
        </div>
        :
        (todos.map((todo: Todo) => {
          return(
            <TodoContent
              id={todo.id}
              todo={todo.todo}
              isCompleted={todo.isCompleted}
              onCheckTodo={onCheckTodo}
              onEditing={onEditing}
              onDelete={onDelete}
              key={todo.id}
            />
          )
        }))
      }
    </div>
  )
}

const TodoContent = ({ id, todo, isCompleted, onCheckTodo, onEditing, onDelete }) => {

  const [isEditing, setIsEditing] = useState(false)
  let todoContent

  // const onBlurHandler = (iDTodo: string, todo: string) => {
  //   setIsEditing(false)
  //   onEditing(iDTodo, todo)
  // }

  if(!isEditing){
    todoContent = (
      <label
        htmlFor={id}
        className={`
          text-sm	text-[#5F6368]
          ${isCompleted ? 'line-through' : 'no-underline'}
        `}
        key={id}
      >
        {todo}
      </label>
    )
  }else{
    todoContent = (
      <input
        type="text"
        key={id}
        autoFocus
        autoComplete="off"
        defaultValue={todo}
        className={`
          md:h-[28px] md:w-[218px] w-[112px] h-[28px]
          text-[#5F6368] border-none bg-none bg-transparent
          focus:border-none focus:bg-none focus:outline-none
          focus:bg-transparent
          ${isCompleted ? 'line-through' : 'no-underline'}
        `}
        onBlur={(event) => {
          setIsEditing(false)
          onEditing(id, event.target.value)
        }}
      />
    )
  }

  return(
    <div
      className={`
        flex rounded-md md:w-[596px] md:h-[46px] bg-[#FFF1DC] border-t-2
        border-b-2 border-[#EEEEEE] w-[266px] h-[36px] px-4 justify-between
      `}
      id={id}
    >
      <div
        className={`
          flex items-center gap-2
        `}
      >
        <input
          type="checkBox"
          id={id}
          name={id} 
          defaultValue={todo}
          defaultChecked={isCompleted}
          className={`
            rounded w-[18px] h-[18px] bg-inherit cursor-pointer border-2 
            border-[#3A98B9] focus:outline-none checked:bg-[#3A98B9] focus:ring-0
            checked:focus:bg-[#3A98B9] checked:hover:bg-[#3A98B9]
          `}
          onChange={() => onCheckTodo(id)}
        />
        {todoContent}
      </div>
      <div
        className="flex gap-2"
      >
        <button
          className={`
            ${isEditing ? 'hidden' : 'flex items-center'}
          `}
          onClick={() => setIsEditing(true)}
        >
          <PencilIcon className="h-5 w-5 text-[#3A98B9]" />
        </button>
        <button
          className={`
            flex items-center
          `}
          onClick={() => onDelete(id)}
        >
          <TrashIcon className="h-5 w-5 text-[#3A98B9]" />
        </button>
      </div>
    </div>
  )

}