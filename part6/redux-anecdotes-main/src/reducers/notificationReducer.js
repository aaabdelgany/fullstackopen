// export const newNoti = (note) => {
//     return {
//       type:'NEW',
//       data:{note}
//     }
//   }
export const clearNoti = () => {
    return {
        type:'CLEAR'
    }
}

export const setNotification = (notification, expTime) => {
  return async dispatch => {
    dispatch({
      type:'NEWNOTI',
      data: {notification}
    })
    setTimeout(()=>{dispatch({type:'CLEAR'})},expTime*1000)
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