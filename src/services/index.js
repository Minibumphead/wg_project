import axios from 'axios'

export const fetchUsers = async() => {
    try{
        const response = await axios.get("http://localhost:5000/users")
        return response.data
    } catch(error) {
        console.log('fetchUsers failed')
        console.log(error)
    }
}


export const deleteUser = async (user) => {
    const response = await axios.delete(`http://localhost:5000/users/${user._id}`)
    return response.data
}


export const login = async(formData) => {

    try {
        const response = await axios.post('http://localhost:5000/users/login', formData)
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
    } catch(error) {
        console.log(error)
        console.log('user could not be logged in')
    }
}

export const logout = async() => {
await localStorage.removeItem("user")
}




// Todos Servides 

export const fetchTodos = async() => {
    const response = await axios.get("http://localhost:5000/todos")
    return response.data
}

export const createTodo = async(formData) => {
    const response = await axios.post("http://localhost:5000/todos", formData)
    return response.data
    }


export const deleteTodo = async(todoId) => {
    const response = await axios.delete(`http://localhost:5000/todos/${todoId}`)
    return response.data
}



