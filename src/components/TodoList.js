import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class TodoList extends Component {

    componentWillMount() {
        this.props.store.fetchPosts();
    }

    onChange(event) {
        this.props.store.filter = event.target.value
    }

    create(event) {
        if(event.key == "Enter") {
            this.props.store.create(event.target.value)
            event.target.value = '';
        }
    }

    delete(todo) {
        this.props.store.delete(todo);
    }

    render() {

        const { filter, filteredTodos } = this.props.store

        const todoList = filteredTodos.map(todo => (
            <li 
                key={todo.id} 
                onClick={this.delete.bind(this, todo)}
            >
                {todo.id}
            </li>
        ))

        return (
            <div>
                <h1>Todos</h1>
                <input 
                    className="create"
                    onKeyPress={this.create.bind(this)}
                />
                <input 
                    className="filter"
                    value={filter} 
                    onChange={this.onChange.bind(this)}
                />
            <ul>
             {todoList}
            </ul>
            </div>
        );
    }
}

export default TodoList;