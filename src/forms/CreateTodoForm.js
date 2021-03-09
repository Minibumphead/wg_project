import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CloseIcon from '@material-ui/icons/Close';

import { createTodo } from './../services/index'

export default function CreateTodoForm({users, todos, setUsers, setTodos, showTodoForm, setShowTodoForm, history}) {
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
        setShowTodoForm(!showTodoForm)
    }

    const autoUpdateExpire = (date) => {
        const expireDate = new Date()
        expireDate.setDate(date.getDate() + 7)
        if (formData.expiresOn === null){
            setFormData({...formData, expiresOn: expireDate})
        }
    }



    return( 
            <>{showTodoForm ?
                <div>            
            <div className="form-overlay-todo" onClick={() => {setShowTodoForm(!showTodoForm)}}></div>

            <form className="form-inner-todo" onSubmit={handleSubmit}>
                            <button className="closeTodo" onClick={()=> setShowTodoForm(!showTodoForm)}><CloseIcon color="white" /></button>
                            <h3 className="form-title">Create a Todo</h3>
                            <select className="todo-form-input" name="title" type="text" defaultValue={'Kueche'} onChange={handleChange} placeholder="Todo title">
                                <option value="Kueche"  >Kueche</option>
                                <option value="Bad">Bad</option>
                                <option value="Gang">Gang</option>
                                <option value="Sonstiges" >Sonstiges</option>
                            </select>
                            <textarea 
                                className="todo-form-input"
                                style={{height: "100px", resize: 'none'}}
                                name="description"  
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="description">
                            </textarea>
                
                            <DatePicker
                            placeholderText="Eingetragen am:"
                            className="todo-form-input" 
                            minDate={new Date()} 
                            dateFormat='dd/MM/yyyy'
                            selected={formData.assignedOn} 
                            onChange={(date) => {
                                setFormData({...formData, assignedOn: date})

                            }} 
                            onCalendarClose= {() => autoUpdateExpire(formData.assignedOn)} />
                        
                  
                            <DatePicker 
                            placeholderText="Erledigen bis"
                            className="todo-form-input"
                            selected={formData.expiresOn} 
                            minDate={formData.assignedOn} 
                            dateFormat='dd/MM/yyyy'
                            onChange={(date) => setFormData({...formData, expiresOn: date})}
                            shouldCloseOnSelect={true} />
        
                            <input
                                className="todo-form-input" 
                                type="number" 
                                min="0" 
                                step="5" 
                                name="pointsAwarded" 
                                value={formData.pointsAwarded} 
                                onChange={handleChange} 
                                placeholder="Punkte fuer Aufgabe">
                            </input>
                            <input 
                                className="todo-form-input"
                                type="number" 
                                min="0" 
                                step="5" 
                                name="timeSpent" 
                                value={formData.timeSpent} 
                                onChange={handleChange} 
                                placeholder="Dauer in Minuten">
                            </input>
                            <select 
                                className="todo-form-input"
                                type="text" 
                                name="username" 
                                onChange={handleChange} 
                                value={formData.username}
                                placeholder="Zustaendige Person">
                               
                                    {users.map(user => <option key={user._id} value={user.username}>{user.username}</option>)}
                            </select>
                            <button className="submit-button-todo" type="submit">Add Todo </button>
                    </form></div>: null} 
           
           </>
    )
}