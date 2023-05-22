import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroLivro() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/livros`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setAutor('');
      setEditora('');
      setAnoPublicacao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setAutor(dados.autor);
      setEditora(dados.editora);
      setAnoPublicacao(dados.anoPublicacao);
    }
  }

  async function salvar() {
    let data = { id, nome, autor, editora, anoPublicacao };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Livro ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-livros`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Livro ${nome} alterado com sucesso!`);
          navigate(`/listagem-livros`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNome(dados.nome);
    setAutor(dados.autor);
    setEditora(dados.editora);
    setAnoPublicacao(dados.anoPublicacao);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;


  return (
    <div className='container'>
      <Card title='Cadastro de Livro'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Autor: *' htmlFor='inputAutor'>
                <input
                  type='text'
                  id='inputAutor'
                  value={autor}
                  className='form-control'
                  name='autor'
                  onChange={(e) => setAutor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Editora: *' htmlFor='inputEditora'>
                <input
                  type='text'
                  id='inputEditora'
                  value={editora}
                  className='form-control'
                  name='editora'
                  onChange={(e) => setEditora(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Ano de Publicação: *'
                htmlFor='inputAnoPublicacao'
              >
                <input
                  type='date'
                  id='inputAnoPublicacao'
                  value={anoPublicacao}
                  className='form-control'
                  name='anoPublicacao'
                  onChange={(e) => setAnoPublicacao(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroLivro;
