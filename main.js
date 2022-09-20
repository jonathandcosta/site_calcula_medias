const form = document.getElementById("form-atividade");
/*adiciona emojis a situação*/
const imgAprovado = '<img src="./img/aprovado.png" alt="emoji festejando" />';
const imgReprovado = '<img src="./img/reprovado.png" alt="emoji triste" />';
const atividades = [];
const notas = [];
/*estilização após ser aplicado nota as médias a situação*/
const spanAprovado = "<span class='resultado aprovado'>Aprovado</span>";
const spanReprovado = "<span class='resultado reprovado'>Reprovado</span>";
/*qualifica o numero a sua média*/
const notaMinima = parseFloat(prompt("Digite a média da sua escola:"));

let linhas = "";

/*encerra a atualização em cada ação*/
form.addEventListener("submit", function (e) {
  e.preventDefault();
  /*chama as funções*/
  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

/*função de adicionar uma nova linha*/
function adicionaLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");
  /*condição criada para testar e não repetir*/
  if (atividades.includes(inputNomeAtividade.value)) {
    alert(
      `Atividade ${inputNomeAtividade.value} já inserida, coloque outra atividade`
    );
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += "</tr>";

    linhas += linha;
  }

  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

/*função para atualizar a tabela criando linha*/
function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

/*função calcula e estilizar a média final*/
function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal();

  document.getElementById("media-final-valor").innerHTML = mediaFinal;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let somaDasNotas = 0;

  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return somaDasNotas / notas.length;
}
