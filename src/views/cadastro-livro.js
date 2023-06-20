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
  const [genero, setGenero] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [idEditora, setIdEditora] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setGenero('');
      setIdAutor('');
      setIdEditora('');
      setNumeroPaginas('');
      setDataLancamento('');
      
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setGenero(dados.genero);
      setIdAutor(dados.idAutor);
      setIdEditora(dados.idEditora);
      setNumeroPaginas(dados.numeroPaginas);
      setDataLancamento(dados.dataLancamento);
      
    }
  }

  async function salvar() {
    let data = { id, nome, genero, idAutor, idEditora, numeroPaginas, dataLancamento };
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
    try {
      await axios.get(`${baseURL}/${idParam}`).then((response)=>{
        setDados(response.data);

      });
      
    
    
      setId(dados.id);
      setNome(dados.nome);
      setGenero(dados.genero);
      setIdAutor(dados.idAutor);
      setIdEditora(dados.idEditora);
      setNumeroPaginas(dados.numeroPaginas);
      setDataLancamento(dados.dataLancamento);
      

      
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 400){
        console.log("Solicitação de objeto inválida")
    }
  }
  }

  useEffect(() => {
    buscar(); 
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
                  required
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              
              
              
              
              <FormGroup label='Gênero: *' htmlFor='inputGenero'>
                <input
                  type='text'
                  id='inputGenero'
                  value={genero}
                  className='form-control'
                  name='inputGenero'
                  minLength={2}
                  onChange={(e) => setGenero(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='ID do Autor: *' htmlFor='inputIdAutor'>
                <input
                  type='number'
                  id='inputIdAutor'
                  value={idAutor}
                  className='form-control'
                  name='idAutor'
                  minLength={1}
                  
                  
                  
                  
                  onChange={(e) => setIdAutor(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='ID da Editora: *' htmlFor='inputIdEditora'>
                <input
                  type='number'
                  id='inputIdEditora'
                  value={idEditora}
                  className='form-control'
                  name='idEditora'
                  minLength={1}
                  onChange={(e) => setIdEditora(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup label='Número de paginas: *' htmlFor='inputPaginas'>
                <input
                  type='number'
                  id='inputPaginas'
                  value={numeroPaginas}
                  className='form-control'
                  name='numeroPaginas'
                  minLength={2}
                  onChange={(e) => setNumeroPaginas(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                label='Ano de Publicação: *'
                htmlFor='inputDataLancamento'
              >
                <input
                  type='datetime'
                  id='inputDataLancamento'
                  value={dataLancamento}
                  className='form-control'
                  name='dataLancamento'
                  onChange={(e) => setDataLancamento(e.target.value)}
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
