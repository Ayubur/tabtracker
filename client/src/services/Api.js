import axios from 'axios'

export default{
    Create(){
        return axios.create({
            baseURL:`http://127.0.0.1:3090/`
        })
    }
}