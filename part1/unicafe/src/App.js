import React, { useState } from 'react'

const Statistics=(props)=>{
  const {good,neutral,bad}=props.data;
  const all=good+neutral+bad;
  if(all===0){
    return(
      <>
        <p>no feedback given</p>
      </>
    )
  }
  const av=(good-bad)/all;
  const pos=good/all;
  return(
    <>
    <table>
    <tr><Statistic text="good" val={good}/></tr>
    <tr><Statistic text="neutral" val={neutral}/></tr>
    <tr><Statistic text="bad" val={bad}/></tr>
    <tr><Statistic text="all" val={all}/></tr>
    <tr><Statistic text="average" val={av}/></tr>
    <tr><Statistic text="positive" val={pos}/></tr>
    </table>
    </>
  )
}
const Statistic=(props)=>{
  return (
    <>
    <td>{props.text}</td> <td>{props.val}</td>
    </>
  )
}
const Button=(props)=>{
  return(
    <>
    <button onClick={props.func}>{props.type}</button>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  const buttonFunc=(stat,set)=>{
    return(()=>{
      set(stat+1)
    })
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button type="good" func={buttonFunc(good,setGood)}/>
      <Button type="neutral" func={buttonFunc(neutral,setNeutral)}/>
      <Button type="bad" func={buttonFunc(bad,setBad)}/>
      <h2>statistics</h2>
      <Statistics data={{good,neutral,bad}} />
    </div>
  )
}

export default App