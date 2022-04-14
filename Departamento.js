import ModelError from "/ModelError.js";

export default class Departamento {
    
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o nome do atributo tem # no início, isso 
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  #sigla;
  #nome;
  #numEmpregados;

  //-----------------------------------------------------------------------------------------//

  constructor(sigla, numEmpregados, nome) {
    this.setSigla(sigla);
    this.setnumEmpregados(num_empregados);
    this.setNome(nome);     
  }
  
  //-----------------------------------------------------------------------------------------//

  getSigla() {
    return this.#sigla;
  }
  
  //-----------------------------------------------------------------------------------------//

  setSigla(sigla) {
    if(!Departamento.validarSigla(sigla))
      throw new ModelError("Sigla Inválida: " + sigla);
    this.#sigla = sigla;
  }
  
  //-----------------------------------------------------------------------------------------//

  getnumEmpregados() {
    return this.#num_empregados;
  }
  
  //-----------------------------------------------------------------------------------------//

  setnumEmpregados(num_empregados) {
    if(!Departamento.validarnumEmpregados(num_empregados))
      throw new ModelError("num_empregados Inválido: " + num_empregados);
    this.#num_empregados = num_empregados;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Departamento.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return '{' +
               '"sigla" : "'+ this.#sigla + '",' +
               '"num_empregados" :  "'     + this.#num_empregados       + '",' +
               '"nome" : "'     + this.#nome      + '",' + 
           '}';  
  }
  
  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Departamento(obj.sigla, obj.num_empregados, obj.nome);
  }

  //-----------------------------------------------------------------------------------------//
  
  static deassign(obj) { 
    return JSON.parse(obj.toJSON());
  }

  //-----------------------------------------------------------------------------------------//

  static validarsigla(sigla) {
    if(sigla == null || sigla == "" || sigla == undefined)
      return false;
    const padraosigla = /[0-9]/;
    if (!padraosigla.test(sigla))
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarnumEmpregados(strnumEmpregados) {
    let soma;
    let resto;
    let i;

    soma = 0;
    strnumEmpregados = strnumEmpregados.replace(".", "");
    strnumEmpregados = strnumEmpregados.replace(".", "");
    strnumEmpregados = strnumEmpregados.replace("-", "");

    if (strnumEmpregados == "00000000000") return false;

    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(strnumEmpregados.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strnumEmpregados.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strnumEmpregados.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strnumEmpregados.substring(10, 11))) return false;
    return true;
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
   
  mostrar() {
    let texto = "Sigla: " + this.sigla + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}
