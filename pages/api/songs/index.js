import config from "../../../utils/config";

export default async function (req, res) {
    if (req.method == 'GET') {
        const result = await fetch(`${config.API_URL}/api/songs`);
        const data = await result.json();
        res.status(200).json(data);
    }
}