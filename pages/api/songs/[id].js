import config from "../../../utils/config";

export default async function (req,res){
    if(req.method=='GET'){
        const {id}=  req.query;
        const result = await fetch(`${config.API_URL}/api/songs/${id}`);
        const data = await result.json();
        res.status(200).json(data);
    }
}