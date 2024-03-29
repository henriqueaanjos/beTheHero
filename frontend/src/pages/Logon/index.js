import React, { useState }from 'react';
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory} from 'react-router-dom'

import api from '../../services/api'
import './styles.css';


import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon({children}){
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogon(e){
        e.preventDefault();
        try{
            const response = await api.post('/session',{id});
            const name = response.data.name;
            console.log({
                id,
                name,
            });
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', name);
            history.push('/profile');
        }catch(err){
            alert('Usuário Inexistente, tente novamente.');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua Id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}