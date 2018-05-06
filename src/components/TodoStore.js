import { observable, computed, action } from "mobx";
import store from 'store';
import axios from 'axios';
import Todo from './Todo';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=asdasdfdsasdfv2e3r4egf';



function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());
}

function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
}



class TodoStore {

    @observable todos = []
    @observable filter = ""

    @action fetchPosts() {
        return axios.get(`${ROOT_URL}/posts${API_KEY}`).then(res => {
            this.todos = res.data;
        })
    }

    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos.filter(todo => !this.filter  || matchesFilter.test(todo.value))
    }

    @action create(value) {
        let obj = new Todo(value);
        this.todos.push(obj)
        axios.post(`${ROOT_URL}/posts${API_KEY}`, { title: value }).then(res => {
            Object.assign(obj, res.data)
        }).catch(res => {
            alert('error, refresh data');  
            setTimeout(() => {
                this.fetchPosts();
            }, 200);
        });
    }

    @action delete(todo) {
        this.todos.splice(this.todos.indexOf(todo),1);
        const request = axios.delete(`${ROOT_URL}/posts/${todo.id}${API_KEY}`).catch(res => {
            alert('error, refresh data');  
            setTimeout(() => {
                this.fetchPosts();
            }, 200);
        });
    }

}

export default new TodoStore


