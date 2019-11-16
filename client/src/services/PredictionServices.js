import Api from './Api'

export default{
    predict(credentials){
        return Api.Create().post('/api/predict',credentials)
    }
}