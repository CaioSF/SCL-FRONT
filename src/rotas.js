import React from 'react';


import ListagemLivros from './views/listagem-livros';
import CadastroEditoras from './views/cadastro-editoras';
import CadastroLivro from './views/cadastro-livro';
import CadastroAutor from './views/cadastro-autor';
import ListagemAutores from './views/listagem-autores';
import ListagemEditoras from './views/listagem-editoras';


import { Route, Routes, BrowserRouter } from 'react-router-dom';


function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-livros/:idParam?' element={<CadastroLivro />} />
        <Route path='/cadastro-autores/:idParam?' element={<CadastroAutor />} />
        <Route path='/cadastro-editoras/:idParam?' element={<CadastroEditoras />} />
        <Route path='/listagem-livros' element={<ListagemLivros />} />
        <Route path='/listagem-autores' element={<ListagemAutores />} />
        <Route path='/listagem-editoras' element={<ListagemEditoras/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;