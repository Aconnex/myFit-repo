import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//form to add a new exercise
const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [name, setName] = useState('')
    const [lbs, setLbs] = useState('')
    const [sets, setSets] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState(null)
    
    const [falseAnswers, setFalseAnswers] = useState([])

    const submitEcercise = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('must login')
            return
        }

        const workout = {name, lbs, sets, notes}

        const response = await fetch('/api/routes.js', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setFalseAnswers(json.falseAnswers)
        }
        if (response.ok) {
            setFalseAnswers([])
            setError(null)
            setName('')
            setLbs('')
            setSets('')
            setNotes('')
            console.log('new exercise added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="createWorkout" onSubmit={submitEcercise}>

            <p>welcome to <b>fitPath</b></p>

            {/*<label>--name--</label>*/}
            <input type="text" 
            placeholder='name' 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            className={falseAnswers.includes('name') ? 'error' : ''}
            />

            <input type="number" 
            placeholder='load (lbs)' 
            onChange={(e) => setLbs(e.target.value)} 
            value={lbs}
            className={falseAnswers.includes('lbs') ? 'error' : ''}
            />

            <input type="number" 
            placeholder='reps' 
            onChange={(e) => setSets(e.target.value)} 
            value={sets}
            className={falseAnswers.includes('sets') ? 'error' : ''}
            />

            <textarea type="text" 
            className='xNotes' 
            placeholder='notes' 
            onChange={(e) => setNotes(e.target.value)} 
            value={notes}/><br/>

            <button><b><i>enter</i></b></button>

            {error && <div className='formError'>{error}</div>}
        </form>
    )
}

export default WorkoutForm