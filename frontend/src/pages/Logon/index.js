import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import heroesForm from '../../assets/heroes.png';
import api from '../../services/api';

const Logon = () => {
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', {
        id
      });

      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', res.data.name);
      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente...');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="be the hero" />

        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="SUA ID"
          />
          <button className="button">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesForm} alt="Heros" />
    </div>
  );
};

export default Logon;
