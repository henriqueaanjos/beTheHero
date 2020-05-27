const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request,response) {
        const {name, email, whatsApp,city, uf} = request.body;
        if(name == '')
            return response.json({"Error": "Error - Campo Nome da ONG vazio, verifique novamente"});
        if(email == '')
            return response.json({"Error": "Error - Campo E-mail vazio, verifique novamente"});
        if(whatsApp == '')
            return response.json({"Error": "Error - Campo WhatsApp vazio, verifique novamente"});
        if(city == '')
            return response.json({"Error": "Error - Campo Cidade vazio, verifique novamente"});
        if(uf == '')
            return response.json({"Error": "Error - Campo UF vazio, verifique novamente"});
        const id = crypto.randomBytes(4).toString('Hex');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsApp,
            city,
            uf,
        });

        return response.json({ id });
    }
    
}