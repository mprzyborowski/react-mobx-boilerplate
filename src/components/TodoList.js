import React, { Component } from 'react'
import { observer } from 'mobx-react';

@observer
class TodoList extends Component {
    render() {

        const {filter, todos} = this.props.store

        const todoList = todos.map(todo => (
            <li key={todo} >{todo}</li>
        ))

        return (
            <div>
                <h1>Todos</h1>
                <input className="filter" value={filter} onChange={event => (this.props.store.filter = event.target.value)} />
            <ul>
             {todoList}
            </ul>
            </div>
        );
    }
}

export default TodoList;