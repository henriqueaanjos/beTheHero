const connection = require('../database/connection');
module.exports = {
    async index (request, response){
        const { id } = request.body;
        const session = await connection('ongs').where('id',id).select('name').first();
        if(!session){
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }
        return response.json(session);
    }
}