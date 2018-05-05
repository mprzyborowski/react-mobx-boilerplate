import React from "react";
import { render } from "react-dom";

import TodoList from './components/TodoList';
import store from './components/TodoStore';

render(
   <TodoList store={store} />,
  document.getElementById("root")
);

