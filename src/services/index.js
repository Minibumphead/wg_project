import axios from 'axios'
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