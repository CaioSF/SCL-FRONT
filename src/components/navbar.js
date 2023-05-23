import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          SCF
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='#' label='Usuários' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='#' label='Editoras' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-autores' label='Autores' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-livros' label='Livros' />
          </ul>
              <li class="nav-item dropdown">
              <a class="nav-item"  role="button" data-bs-toggle="dropdown" >
                &#9863;
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Login</a></li>
                <li><a class="dropdown-item" href="#">Cadastro </a></li>
                <li><a class="dropdown-item" href="#">Ajuda</a></li>
              </ul>
            </li>
            
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
