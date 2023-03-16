import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext() //clear workout from local storage after logout

    const logout = () => {
        //removing user from storage
        localStorage.removeItem('user')

        //dispatching logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null}) //clear workout from local storage after logout
    }
    return {logout}
}