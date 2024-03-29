import React, {useState, useEffect} from'react';
import {Link, useHistory } from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);
    async function handleDeleteIncident(id){
        try{
            api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
            //alert('Caso Excluído com sucesso!');
        }catch(err){
            alert('Error - Tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ongName} </span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO: </strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO: </strong>
                    <p>{incident.description}</p>

                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-br',{style: 'currency',currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={() => {handleDeleteIncident(incident.id)}}type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>))}
            </ul>
        </div>
    );
}