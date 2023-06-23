import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { NoMeals } from '@mui/icons-material';

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

  
  const [dadosAutores, setDadosAutores] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/autores`).then((response) => {
      setDadosAutores(response.data);
    });
  }, []);

  const [dadosEditoras, setDadosEditora] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/editoras`).then((response) => {
      setDadosEditora(response.data);
    });
  }, []);


  useEffect(() => {
    buscar(); 
  }, [id]);

  if (!dados) return null;
  if (!dadosAutores) return null;
  if (!dadosEditoras) return null;

 


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

              
              <FormGroup label='Autor:' htmlFor='selectAutor'>
                <select
                  className='form-select'
                  id='selectAutor'
                  name='idAutor'
                  value={idAutor}
                  onChange={(e) => setIdAutor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosAutores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              
              <FormGroup label='Editoras:' htmlFor='selecEditora'>
                <select
                  className='form-select'
                  id='selecEditora'
                  name='idEditora'
                  value={idEditora}
                  onChange={(e) => setIdEditora(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosEditoras.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
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
