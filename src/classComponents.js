import React, { Component } from 'react';

export class AddTodo extends Component {

  render() {
    return (
      <div>
        <form onSubmit={ e => {
            e.preventDefault()
            this.props.addTodo(this.input.value)
            this.input.value = ''
          }}>
          <input type="text" ref={ (input) => this.input = input }></input>
          <button type="submit" >Add Todo</button>
        </form>
      </div>
    )
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
    return todos
    case 'SHOW_ACTIVE':
    return todos.filter( t => !t.completed )
    case 'SHOW_COMPLETED':
    return todos.filter( t => t.completed )
    default:
    throw new Error('Unknown filter:', filter)
  }
}

export class VisibleTodoList extends Component {

  render () {

    const filter = this.props.visibilityFilter
    const todos = getVisibleTodos(this.props.todos, filter)
    const toggleTodo = this.props.toggleTodo

    return (
      <div>
        <ul>
          {todos.map( todo =>
            <Todo key={todo.id}
              onClick={ () => toggleTodo(todo.id) }
              {...todo}
              />
          )}
        </ul>
      </div>
    )
  }
}

class Todo extends Component {

  render () {

    //this messiness can be replaced by...
    const text = this.props.text
    const completed = this.props.completed
    const onClick = this.props.onClick

    //this - through the power of destructuring
    // const { text, completed, onClick } = this.props

    return (
      <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
      </li>
    )
  }
}

export class Footer extends Component {
  render() {

    const setVisibilityFilter = this.props.setVisibilityFilter

    return (
      <p>
        show:
        <FilterLink filter="SHOW_ALL" onClick={setVisibilityFilter} >
          All
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE" onClick={setVisibilityFilter} >
          Active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED" onClick={setVisibilityFilter} >
          Completed
        </FilterLink>
      </p>
    )
  }
}

class FilterLink extends Component {
  render() {

    const { filter, onClick, children} = this.props

    return (

      <a href="#"
        onClick={ e => {
          e.preventDefault()
          onClick(filter)
        }}>
        {children}
      </a>
    )
  }
}

// const FilterLink = ({ onClick, filter, children }) => {
//
//   return (
//
//     <a href="#"
//       onClick={ e => {
//         e.preventDefault()
//         onClick(filter)
//       }}>
//       {children}
//     </a>
//   )
// }