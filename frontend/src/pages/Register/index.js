import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';
const Register = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, email, whatsapp, city, uf };

    try {
      const res = await api.post('ongs', data);
      history.push('/profile');
      alert(`Seu ID de acesso: ${res.data.id}`);
    } catch (error) {
      alert(`Erro ao registar, tente novamente.`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="be the hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Nome da ONG"
          />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail"
          />
          <input
            onChange={e => setWhatsapp(e.target.value)}
            value={whatsapp}
            placeholder="Whatsapp"
          />

          <div className="input-group">
            <input
              onChange={e => setCity(e.target.value)}
              value={city}
              placeholder="Cidade"
            />
            <input
              onChange={e => setUf(e.target.value)}
              value={uf}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
