import React from 'react'
import { pageTitleStyle } from '../utils/commonStyles';
import './TodoPage.scss'
import Todo from '../modules/Todo/Todo';

function TodoPage() {
    return (
        <div>
            <div style={pageTitleStyle}>TODO List</div>
            <div className="todo-layout-main">
                <div className="todo-list-layout-main">
                    <Todo />
                </div>
            </div>
        </div>
    )
}

export default TodoPage