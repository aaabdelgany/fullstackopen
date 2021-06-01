let timeout

export const clearNoti = () => {
  return {
    type:'CLEAR'
  }
}

export const setNotification = (notification, expTime) => {
  clearTimeout(timeout)
  return async dispatch => {
    dispatch({
      type:'NEWNOTI',
      data: { notification }
    })
    timeout = setTimeout(() => {dispatch({ type:'CLEAR' })},expTime*1000)
  }
}
const reducer = (state ='', action) => {
  switch(action.type){
  case 'CLEAR':
    return ''
  case 'NEWNOTI':
    return action.data.notification
  default: return state
  }

}

export default reducer