import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { createTodo } from './../services/index'

export default function CreateTodoForm({users, todos, setUsers, setTodos, history}) {
    const [authUser] = useState(JSON.parse(localStorage.getItem("user")))
    

    const [formData, setFormData] = useState({
        title: "Kueche",
        description: '',
        assignedOn: null,
        expiresOn: null,
        pointsAwarded: 0,
        timeSpent: 0,
        username: authUser.username
    })


    const handleChange = (event) => {

        event.preventDefault()
        if (event.target.name === "title"){
            setFormData({...formData, title: event.target.value})
        } else if (event.target.name === "description") {
            setFormData({...formData, description: event.target.value})
        } else if (event.target.name === "pointsAwarded") {
            setFormData({...formData, pointsAwarded: event.target.value})
        } else if (event.target.name === "timeSpent") {
            setFormData({...formData, timeSpent: event.target.value})
        } else if (event.target.name === "username"){
            setFormData({...formData, username: event.target.value})
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const newTodo = await createTodo(formData)
        setTodos([...todos, newTodo])
        console.log(todos)
        history.push('/admin')
    }
    
    const addDays = (days) => {
        var date = new Date()
        date.setDate(date.getDate() + days)
        return date
    }


    return( 
            <>
            <div className="form-container-todo">
                    <form className="form-inner" onSubmit={handleSubmit}>
                            <h3 className="form-title">Create a Todo</h3>
                            <select className="form-input" name="title" type="text" defaultValue={'Kueche'} onChange={handleChange} placeholder="Todo title">
                                <option value="Kueche"  >Kueche</option>
                                <option value="Bad">Bad</option>
                                <option value="Gang">Gang</option>
                                <option value="Sonstiges" >Sonstiges</option>
                            </select>
                            <textarea 
                                style={{height: "80px", width: "210px"}} 
                                name="description"  
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="description">
                            </textarea>
                            <label>Eingetragen am: 
                                <DatePicker 
                                minDate={new Date()} 
                                dateFormat='dd/MM/yyyy'
                                selected={formData.assignedOn} 
                                onChange={(date) => setFormData({...formData, assignedOn: date})} 
                                showYearDropdown />
                            </label>
                            <label>Erledigen bis: 
                                <DatePicker 
                                selected={formData.expiresOn} 
                                minDate={formData.assignedOn} 
                                maxDate={addDays(30)} 
                                onChange={(date) => setFormData({...formData, expiresOn: date})} />
                            </label>
                            <input 
                                type="number" 
                                min="0" 
                                step="5" 
                                name="pointsAwarded" 
                                value={formData.pointsAwarded} 
                                onChange={handleChange} 
                                placeholder="Punkte fuer Aufgabe">
                            </input>
                            <input 
                                type="number" 
                                min="0" 
                                step="5" 
                                name="timeSpent" 
                                value={formData.timeSpent} 
                                onChange={handleChange} 
                                placeholder="Dauer in Minuten">
                            </input>
                            <select 
                                type="text" 
                                name="username" 
                                onChange={handleChange} 
                                value={formData.username}
                                placeholder="Zustaendige Person">
                               
                                    {users.map(user => <option key={user._id} value={user.username}>{user.username}</option>)}
                            </select>
                            <button className="submit-button" type="submit">Add Todo </button>
                    </form>
                    
            </div>
           
           </>
    )
}