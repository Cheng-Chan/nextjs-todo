"use client"

import React, { useEffect, useReducer } from "react";
import { Timestamp } from "firebase/firestore";

import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";

type Todo = {
  id: string,
  createdAt: Date,
  isCompleted: boolean,
  todo: string
}
type State = Array<Todo> | never[]
type Action = {
  type: 'ON_CHANGE' | 'GET_DOCS' | 'EDIT_DOC' | 'DEL_DOC' | 'ADD_DOC' | 'CHECKED_TODO' | 'FILTER_DOCS'
  payload: {
    data: State,
    todo: string,
    id: string,
  }
}
type TodoValue = string
type URL= string
type DATA = {}

async function addDocument(data, addDoc, action, state) {
  const newData = { ...data, id: doc.id }
  state.data.push(newData)
  return {data: [...state.data]}
}

const todoReducer = (state: State, action: Action) => {

  switch(action.type){
    case 'EDIT_DOC':{
      state.data.map((todo) => {
        if(todo.id === action.payload.id && todo.todo !== action.payload.todo){
          editData(
            'api/todo', 
            {
              ...todo,
              todo: action.payload.todo,
              
            }
          )
          return todo.todo = action.payload.todo
        }
      })
      return {data: [...state.data]}
    }
    case 'ADD_DOC':{
      let data = {
        id: crypto.randomUUID(),
        todo: action.payload.todo,
        isCompleted: false,
        createdAt: Timestamp.now()
      }
      const addDoc = postData('api/todo', data)
      state.data.push(data)
      return {data: [...state.data]}
    }
    case 'GET_DOCS':{
      return {
        data: action.payload.data,
      }
    }
    case 'CHECKED_TODO':{
      state.data.map((todo) => {
        if(todo.id === action.payload.id){
          editData(
            'api/todo', 
            {
              ...todo,
              isCompleted: !todo.isCompleted,
              
            }
          )
          return todo.isCompleted = !todo.isCompleted
        }
      })
      return {data: [...state.data]}
    }
    case 'DEL_DOC':{
      const filterDocs = state.data.filter((todo) => todo.id !== action.payload.id)
      deleteData(`api/todo/?id=${action.payload.id}`)
      return {data: [...filterDocs]}
    }
    case 'FILTER_DOCS':{
      return {data: [...action.payload.data]}
    }
  }
}

const initialState = {data:[]}

const postData = async (url: URL, data: DATA) => {
  let respObj
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const editData = async (url: URL, data: DATA) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const deleteData = async (url: URL) => {
  const response = await fetch(url, {
    method: 'DELETE',
  })
}

export const Todo = () => {

  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    fetch('api/todo')
      .then(response => response.json())
      .then(data => dispatch(
        {
          type: 'GET_DOCS',
          payload: {data: data}
        }
      ))
  }, [])

  const addTodoHandler = (todo: TodoValue) => {
    dispatch({
      type: "ADD_DOC",
      payload: {todo: todo}
    })
  }

  const onTodoHandler = (iDTodo: string) => {
    dispatch({
      type: "CHECKED_TODO",
      payload: {id: iDTodo}
    })
  }

  const onEditing = (iDTodo: string, todo: TodoValue) => {
    dispatch({
      type: "EDIT_DOC",
      payload: {id: iDTodo, todo: todo}
    })
  }

  const onDelete = (iDTodo: string) => {
    dispatch({
      type: "DEL_DOC",
      payload: {id: iDTodo}
    })
  }

  const filterSearch = async (value: string) => {
    const getFitlerDocs = await fetch(`api/todo/?q=${value}`)
    const filterDocs = await getFitlerDocs.json()
    dispatch({
      type: "FILTER_DOCS",
      payload: {data: filterDocs}
    })
  }

  return(
    <React.Fragment>
      <AddTodo 
        onAddTodo={addTodoHandler}
        filterSearch={filterSearch}
        onKeyDownEnter={addTodoHandler}
      />
      <TodoList
        todos={state.data}
        onCheckTodo={onTodoHandler}
        onEditing={onEditing}
        onDelete={onDelete}
      />
    </React.Fragment>
  )
}