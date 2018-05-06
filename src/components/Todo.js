import { observable } from "mobx";

class Todo {
    @observable id
    @observable title
    @observable content
    @observable categories

    constructor(title) {
        this.id = Math.random()
        this.title = title
        this.content = 'cont'
        this.categories = 'cat'
    }
}

export default Todo;