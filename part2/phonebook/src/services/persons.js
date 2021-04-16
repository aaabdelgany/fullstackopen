import axios from 'axios';
const baseURL='/api/persons';


const getAll=()=>{
    const req=axios.get(baseURL);
    return req.then(rep=>rep.data)
}

const create=(newPer)=>{
    const req=axios.post(baseURL,newPer);
    return req.then(rep=>rep.data);
}

const delPer=(peep)=>{
    const result=window.confirm(`Delete ${peep.name}`)
    if(result){
        const req=axios.delete(`${baseURL}/${peep.id}`)
        return req.then(rep=>rep.data);
    }
}

const getPer=(peep)=>{
    const req=axios.get(`${baseURL}/${peep}`);
    return req.then(rep=>rep.data);
}
const updatePer=(perId,peep)=>{
    return axios.put(`${baseURL}/${perId}`,peep);
    // return req.then(rep=>rep.data);
}

export default {getAll,create,delPer,updatePer,getPer}