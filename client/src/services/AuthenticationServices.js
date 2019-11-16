import Api from './Api';

export default{
    register(credentials){
        Api.Create().post('/api/signup',credentials);
    }
}