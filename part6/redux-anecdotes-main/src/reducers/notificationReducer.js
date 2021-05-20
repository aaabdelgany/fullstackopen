export const newNoti = (note) => {
    return {
      type:'NEW',
      data:{note}
    }
  }
export const clearNoti = () => {
    return {
        type:'CLEAR'
    }
}

const reducer = (state ='', action) => {
    switch(action.type){
      case 'NEW':
        return action.data.note
      case 'CLEAR':
        return ''
      default: return state
    }
  
  }
  
  export default reducer