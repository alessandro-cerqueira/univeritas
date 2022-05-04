import Status from "/Status.js";
import Departamento from "/Departamento.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerDepartamento {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.tfSigla     = this.obterElemento('tfSigla');
    this.tfNome      = this.obterElemento('tfNome');
    this.tfNumEmpregados = this.obterElemento('tfNumEmpregados');
      
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  apresentar(pos, qtde, departamento) {    
    
    this.configurarNavegacao( pos , qtde );   

    if(departamento == null) {
      this.tfSigla.value         = "";
      this.tfNome.value          = "";
      this.tfNumEmpregados.value = "";
      this.divAviso.innerHTML = " Número de Departamentos: 0";
    } else {
      this.tfSigla.value         = departamento.getSigla();
      this.tfNome.value          = departamento.getNome();
      this.tfNumEmpregados.value = departamento.getNumEmpregados();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Departamentos: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(pos, qtde) {
    
    let flagInicio = pos <= 1;
    let flagFim = pos == qtde;
    
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
    
    this.btIncluir.title = "Inicia a inclusão de um novo departamento";
    this.btSair.title = "Encerra a aplicação";

    //
    // Atribuo um hint aos botões Primeiro e Anterior, caso estejam habilitados
    //
    if(!flagInicio) {
      this.btPrimeiro.title = "Apresenta o primeiro departamento da lista";
      this.btAnterior.title = "Apresenta o departamento anterior da lista";
    }
    else {
      this.btPrimeiro.title = "";
      this.btAnterior.title = "";
    }

    //
    // Atribuo um hint aos botões Último e Próximo, caso estejam habilitados
    //
    if(!flagFim) {
      this.btUltimo.title = "Apresenta o último departamento da lista";
      this.btProximo.title = "Apresenta o próximo departamento da lista";
    }
    else {
      this.btUltimo.title = "";
      this.btProximo.title = "";
    }

  
    //
    // Atribuo um hint aos botões Alterar e Excluir, caso estejam habilitados
    //
    if(pos != 0) {
      this.btAlterar.disabled = false;
      this.btExcluir.disabled = false;
      this.btAlterar.title = "Habilita a alteração do departamento em questão";
      this.btExcluir.title = "Inicia os procedimentos para exclusão do departamento em questão";
    }
    else {
      this.btAlterar.disabled = true;
      this.btExcluir.disabled = true;
      this.btAlterar.title = "";
      this.btExcluir.title = "";
    }

  
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.tfNome.disabled = false;
      this.tfNumEmpregados.disabled = false;
      this.divAviso.innerHTML = "";      
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.tfSigla.disabled = false;
      this.tfSigla.value = "";
      this.tfNome.value = "";
      this.tfNumEmpregados.value = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 
    this.tfSigla.disabled = true;
    this.tfNome.disabled = true;
    this.tfNumEmpregados.disabled = true;
  }
}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarPrimeiro();
  
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarProximo();
  
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarAnterior();
  
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarUltimo();
  
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarAlterar();
  
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const sigla = this.viewer.tfSigla.value;
  const nome = this.viewer.tfNome.value;
  const numEmpregados = parseInt(this.viewer.tfNumEmpregados.value,10);
    
  // Como defini que o método "efetivar" é um dos métodos incluir, excluir ou alterar
  // não estou precisando colocar os ninhos de IF abaixo.
  this.viewer.getCtrl().efetivar(sigla, nome, numEmpregados); 

  // if(this.viewer.getCtrl().getStatus() == Status.INCLUINDO) {
  //  this.viewer.getCtrl().incluir(matricula, cpf, nome, email, telefone); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.ALTERANDO) {
  //  this.viewer.getCtrl().alterar(matricula, cpf, nome, email, telefone); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.EXCLUINDO) {
  //  this.viewer.getCtrl().excluir(matricula, cpf, nome, email, telefone); 
  //}
}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 
}

//------------------------------------------------------------------------//
