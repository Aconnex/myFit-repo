import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//components imports
import WorkoutFetches from '../components/WorkoutFetches'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect (() => {
        const getWorkouts = async () => {
            const response = await fetch ('/api/routes.js', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            }) //already connected the local host url at the top of the frontend package.json file
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user) {
            getWorkouts()
        }
    },[dispatch, user])
        //this [] prevent nonstop get fetch in the browser console

    return (
        <div className="homePage">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutFetches key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home