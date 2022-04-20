import ModelError from "/ModelError.js";

export default class Departamento {
    
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o nome do atributo tem # no início, isso 
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  
  #nome;
  #sigla;
  #numempreg;

  //-----------------------------------------------------------------------------------------//

  constructor(nome, sigla, numempreg) {
    this.setNome(nome);
    this.setSigla(sigla);
    this.setNumEmpreg(numempreg);      
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Aluno.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  getSigla() {
    return this.#sigla;
  }
  
  //-----------------------------------------------------------------------------------------//

  setSigla(sigla) {
    if(!Aluno.validarSigla(sigla))
      throw new ModelError("Sigla inválida: " + sigla);
    this.#sigla = sigla;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNumEmpreg() {
    return this.#numempreg;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNumEmpreg(numempreg) {
    if(!Aluno.validarNumEmpreg(numempreg))
      throw new ModelError("NumEmpreg inválido: " + numempreg);
    this.#numempreg = numempreg;
  }
  
  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return '{' +
               '"nome" : "'     + this.#nome      + '",' +
               '"sigla" : "'    + this.#sigla     + '",' +
               '"numempreg" : "' + this.#numempreg  + '" ' + 
           '}';  
  }
  
  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Departamento(obj.nome, obj.sigla, obj.numempreg);
  }

  //-----------------------------------------------------------------------------------------//
  
  static deassign(obj) { 
    return JSON.parse(obj.toJSON());
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    if (nome.length > 40) 
      return false;
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarSigla(sigla) {
    if(sigla == null || sigla == "" || sigla == undefined)
      return false;
    if (nome.length > 40) 
      return false;
    const padraoSigla = /[A-Z][a-z] */;
    if (!padraoSigla.test(sigla)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNumEmpreg(numempreg) {
    if(numempreg == null || numempreg == "" || numempreg == undefined)
      return false;

    const padraoNumEmpreg = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if (!padraoNumEmpreg.test(numempreg)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "Matrícula: " + this.matricula + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}
