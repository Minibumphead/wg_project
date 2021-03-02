import axios from 'axios'

export const fetchData = async() => {
    try{
        const users = await axios.get("http://localhost:5000/users")
        return users.data
    } catch(error) {
        console.log('fetchData failed')
        console.log(error)
    }
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

export const deleteUser = async (user) => {
        const response = await axios.delete(`http://localhost:5000/users/${user._id}`)
        return response.data
    }

