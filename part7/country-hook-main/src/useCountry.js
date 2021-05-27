import { useState, useEffect} from 'react'
import axios from 'axios'


const useCountry = (name) => {
    const baseURL = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

    const [country,setCountry] = useState(null)
    useEffect(()=>{
        if(name===''){
            return country
        }
        async function getCountry(reqCo) {
            try{
                const res = await axios.get(baseURL)
                setCountry({data:res.data[0],found:true})
            }
            catch{
                setCountry({found:false})
            }

        }
        getCountry(name)
    },[name])
    return country

}

export default useCountry