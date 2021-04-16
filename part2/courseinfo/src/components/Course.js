import React,{useState} from 'react';
const Header=(props)=>{
    return(
      <>
      <h1>{props.course.name}</h1>
      </>
    )
  }
  
  const Content=({course})=>{
    return(
    <>
    {course.parts.map(course=><Part key={course.id} name={course.name} exercises={course.exercises}/>)}
    </>
    )
  }
  
  const Part=({name,exercises})=>{
    return (
      <>
      <p>{name} {exercises}</p>
      </>
    )
  }
  
  const Total=({course})=>{
    const reducer=(total,curr)=>{return (total+curr.exercises)}
    let count=course.parts.reduce(reducer,0);
    return(
      <>
      <p>Number of exercises {count}</p>
      </>
    )
  }
  
  const Course=({course})=>{
      return(
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

export default Course