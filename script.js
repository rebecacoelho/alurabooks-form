async function searchCEP(cep) {
  let messageErr = document.getElementById('erro');
  messageErr.innerHTML = "";

  try {
    let consultCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let consultCEPjson = await consultCEP.json();
    if (consultCEPjson.erro) {
      throw Error('CEP não existente!')
    }
    let city = document.getElementById('cidade');
    let street = document.getElementById('endereco');
    let state = document.getElementById('estado');
    let bairro = document.getElementById('bairro');

    city.value = consultCEPjson.localidade;
    street.value = consultCEPjson.logradouro
    state.value = consultCEPjson.uf;
    bairro.value = consultCEPjson.bairro;

    console.log(consultCEPjson);
    return consultCEPjson;
  } catch (erro) {
    messageErr.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
    console.log(erro);
  }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => searchCEP(cep.value))

/*
let ceps = []
let groupCeps = ceps.map(cep => searchCEP(cep));
Promise.all(groupCeps).then(responses => console.log(responses));
*/


/*
.then(response => response.json())
.then(r => {
  if (r.err) {
    throw Error("Esse cep não existe!")
  } else {
    console.log(r)
  }
})
.catch(err => console.log(err))
.finally(message => console.log('Processamento concluído!'))
*/