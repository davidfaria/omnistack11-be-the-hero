import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';
const Profile = () => {
  const history = useHistory();
  const ongName = localStorage.getItem('ong_name');
  const id = localStorage.getItem('ong_id');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadIncidents() {
      const res = await api.get('incidents', {
        headers: {
          Authorization: id
        }
      });

      const data = res.data.map(incident => {
        return {
          ...incident,
          valueFormatted: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)
        };
      });

      setIncidents(data);
    }

    loadIncidents();
  }, [id]);

  async function handleDelete(incident_id) {
    try {
      await api.delete(`incidents/${incident_id}`, {
        headers: {
          Authorization: id
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== incident_id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('ong_id');
    localStorage.removeItem('ong_name');
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="be the hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={() => handleLogout()} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{incident.valueFormatted}</p>

            <button onClick={() => handleDelete(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
