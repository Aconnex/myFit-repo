import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date-fns npm package installed
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutFetches = ({workout}) => {
    const { dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()

    const workoutDeleteBtn = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/routes.js/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workoutDisplay">
            <h4>{workout.name}</h4>
            <p><strong><i>lbs: </i></strong>{workout.lbs}</p>
            <p><strong>sets: </strong>{workout.sets}</p>
            <p className="xnoteDisplay"><strong>notes:</strong>{workout.notes}</p>
            <p><b>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</b></p>
            <span className="material-symbols-outlined" onClick={workoutDeleteBtn}>delete</span>
        </div>
    )
}

export default WorkoutFetches