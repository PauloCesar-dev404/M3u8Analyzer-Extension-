//pop.js version 1.0.0.0
let typee =''
let titulos = ''
const bt_abas = document.getElementById('buttons-abas');
const trafic_list = document.getElementById('trafficList');
const abas_inter = document.getElementById('abas-inter');
const pgt1 = document.getElementById('pgt1');
const infor = document.getElementById('infor');
const save_config = document.getElementById('save-config');
const buttonsAbas = document.getElementById('buttons-abas');
const bt_resetMemory = document.getElementById('resetMemory');
const bt_resetHls = document.getElementById('resetHls');
const bt_refresh = document.getElementById('refresh');


function copy(url) {
    // Verifica se o navegador suporta a API Clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => {
                createPopuAlertpWithTimeout('URL copiada para a área de transferência')
            })
            .catch(err => {
                createPopupWithTimeout(`Erro ao copiar a URL: ${err}`)

            });
    } else {
        // Se a API Clipboard não estiver disponível, usa um fallback
        // Cria um elemento de input temporário
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            // Tenta copiar o texto selecionado
            document.execCommand('copy');
            createPopuAlertpWithTimeout('URL copiada para a área de transferência')
        } catch (err) {
            createPopupWithTimeout(`Erro ao copiar a URL: ${err}`)
        }
        
        // Remove o elemento temporário
        document.body.removeChild(textarea);
    }
}

// Função para exibir um URL na lista na página index.html
function displayUrl(url, urlType,resolution) {
    const nothls = document.getElementById('not-hls');
    nothls.textContent = ''
    const trafficItem = document.createElement('li');
    trafficItem.className = 'traffic-item';

    const typeText = document.createElement('span');
    typeText.id = 'type-hls';
    typeText.textContent = urlType;


    const resolu = document.createElement('span');
    resolu.id = 'resolution';
    resolu.textContent = resolution;

    const urlText = document.createElement('span');
    urlText.textContent = url;
    const cpyButton = document.createElement('button');
    cpyButton.textContent = 'copiar';
    cpyButton.addEventListener('click', function() {
        copy(url);
    });



    trafficItem.appendChild(resolu);
    trafficItem.appendChild(typeText);
    trafficItem.appendChild(urlText);
    trafficItem.appendChild(cpyButton);

    document.getElementById('trafficList').appendChild(trafficItem);
}


// Função para carregar URLs salvos ao iniciar a extensão
function loadSavedUrls() {
    chrome.storage.local.get({ capturedUrls: [] }, function(result) {
        const capturedUrls = result.capturedUrls;
        capturedUrls.forEach(function(url) {
            let resolution = 'hls';
            let typee = 'stream'

            if (url.includes('1920x1080')) {
                resolution = '1920x1080';
            } else if (url.includes('1280x720')) {
                resolution = '1280x720';
            } else if (url.includes('1024x576')) {
                resolution = '1024x576';
            } else if (url.includes('768x432')) {
                resolution = '768x432';
            } else if (url.includes('640x360')) {
                resolution = '640x360';
            } else if (url.includes('854x480')) {
                resolution = '854x480';
            } else if (url.includes('426x240')) {
                resolution = '426x240';
            } else if (url.includes('320x180')) {
                resolution = '320x180';
            } else if (url.includes('3840x2160')) {
                resolution = '3840x2160';
            } else if (url.includes('2560x1440')) {
                resolution = '2560x1440';
            } else if (url.includes('2048x1080')) {
                resolution = '2048x1080';
            } else if (url.includes('1600x900')) {
                resolution = '1600x900';
            } else if (url.includes('1366x768')) {
                resolution = '1366x768';
            } else if (url.includes('1280x800')) {
                resolution = '1280x800';
            } else if (url.includes('1024x768')) {
                resolution = '1024x768';
            } else if (url.includes('800x600')) {
                resolution = '800x600';
            } else if (url.includes('640x480')) {
                resolution = '640x480';
            }
            
       


        if (url.includes('.mp4')){
            typee = 'video/mp4:'
        }else if(url.includes('.m3u8')){
            typee = 'application/x-mpegURL:'
        }else if(url.includes('.ts')){
            typee = 'application/vnd.apple.mpegurl:'
        }else if(url.includes('.mpd')){
            typee = 'mpd:'
        }


            displayUrl(url,typee,resolution);
        });
    });
}
// Função para apagar todas as URLs salvas
function resetMemory() {
    if (bt_abas){
        bt_abas.innerHTML = ''
    }
    if(trafic_list){
        trafic_list.innerHTML = ''
    }
    if (abas_inter){
        abas_inter.innerHTML = ''
    }
    if(pgt1){
        pgt1.innerHTML = ''
    }
    if(infor){
        infor.innerHTML = ''
    }
    if(save_config){
        save_config.style.display = 'none';
    }


    chrome.storage.local.set({ capturedUrls: [] }, function() { 
    });
    chrome.storage.local.set({ 'abas-ativas': [] }, function() {

    });
    chrome.storage.local.set({ 'aba-interceptar': [] }, function() {     
    });
      
}

function resetHlss(){
    if(trafic_list){
        chrome.storage.local.set({ capturedUrls: [] }, function(result) {
        trafic_list.innerHTML = ''
    })}
    }
function refreshExtenss(){

    chrome.runtime.reload();
}
  function createPopupWithTimeout(message, timeout) {
    // Criar div para o popup
    const popupDiv = document.createElement("div");
  
    // Estilizar o popup
    popupDiv.style.position = 'fixed';
    popupDiv.style.top = '50%';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translate(-50%, -50%)';
    popupDiv.style.width = '400px';
    popupDiv.style.padding = '20px';
    popupDiv.style.backgroundColor = '#f8d7da'; // Cor de fundo padrão (vermelho claro)
    popupDiv.style.color = '#721c24'; // Cor do texto (vermelho escuro)
    popupDiv.style.borderRadius = '8px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popupDiv.style.zIndex = '9999';
    popupDiv.style.textAlign = 'center';
  
    // Criar parágrafo para a mensagem
    const popupMessage = document.createElement("p");
  
    // Estilizar a mensagem
    popupMessage.textContent = message;
    popupMessage.style.fontSize = '16px';
    popupMessage.style.marginBottom = '10px';
  
    // Adicionar a mensagem ao popup
    popupDiv.appendChild(popupMessage);
  
    // Criar botão de fechar
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.style.marginRight = '10px';
    closeButton.style.padding = '8px 15px';
    closeButton.style.backgroundColor = '#dc3545'; // Cor de fundo do botão (vermelho)
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
  
    // Adicionar evento de clique ao botão de fechar
    closeButton.addEventListener('click', function() {
      popupDiv.style.display = 'none';
      popupDiv.remove();
    });
  
    // Adicionar botão de copiar erro
    const copyErrorButton = document.createElement("button");
    copyErrorButton.textContent = "Copiar Erro";
    copyErrorButton.style.padding = '8px 15px';
    copyErrorButton.style.backgroundColor = '#007bff'; // Cor de fundo do botão (azul)
    copyErrorButton.style.color = 'white';
    copyErrorButton.style.border = 'none';
    copyErrorButton.style.borderRadius = '2px';
    copyErrorButton.style.cursor = 'pointer';
  
    // Adicionar evento de clique ao botão de copiar erro
    copyErrorButton.addEventListener('click', function() {
      // Copiar a mensagem de erro para a área de transferência
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    // Desabilitar o botão e alterar o texto após copiar
    copyErrorButton.disabled = true;
    copyErrorButton.textContent = "Copiado !";
    });
  
  // Adicionar os botões ao popup
  popupDiv.appendChild(copyErrorButton);
  popupDiv.appendChild(document.createTextNode("           "));  // Adiciona um espaço como um nó de texto
  popupDiv.appendChild(closeButton);
  
  
    // Adicionar o popup ao corpo do documento
    document.body.appendChild(popupDiv);
  
    // Definir uma contagem regressiva para fechar o popup automaticamente
    let countdown = 10;
    const countdownInterval = setInterval(function() {
      countdown--;
      closeButton.textContent = `Fechar (${countdown}s)`;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        popupDiv.style.display = 'none';
        popupDiv.remove();
      }
    }, 1000);
  }


function createPopuAlertpWithTimeout(message) {
    // Criar div para o popup
    const popupDiv = document.createElement("div");
  
    // Estilizar o popup
    popupDiv.style.position = 'fixed';
    popupDiv.style.top = '50%';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translate(-50%, -50%)';
    popupDiv.style.width = '400px';
    popupDiv.style.padding = '20px';
    popupDiv.style.backgroundColor = '#f2f2f2'; // Cor de fundo padrão (vermelho claro)
    popupDiv.style.color = '#721c24'; // Cor do texto (vermelho escuro)
    popupDiv.style.borderRadius = '8px';
    popupDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popupDiv.style.zIndex = '9999';
    popupDiv.style.textAlign = 'center';
  
    // Criar parágrafo para a mensagem
    const popupMessage = document.createElement("p");
  
    // Estilizar a mensagem
    popupMessage.textContent = message;
    popupMessage.style.fontSize = '16px';
    popupMessage.style.marginBottom = '10px';
  
    // Adicionar a mensagem ao popup
    popupDiv.appendChild(popupMessage);
  
    // Criar botão de fechar
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.style.marginRight = '10px';
    closeButton.style.padding = '8px 15px';
    closeButton.style.backgroundColor = '#dc3545'; // Cor de fundo do botão (vermelho)
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
  
    // Adicionar evento de clique ao botão de fechar
    closeButton.addEventListener('click', function() {
      popupDiv.style.display = 'none';
      popupDiv.remove();
    });
  
  
  // Adicionar os botões ao popup
  popupDiv.appendChild(document.createTextNode("           "));  // Adiciona um espaço como um nó de texto
  popupDiv.appendChild(closeButton);
  
  
    // Adicionar o popup ao corpo do documento
    document.body.appendChild(popupDiv);
  
    // Definir uma contagem regressiva para fechar o popup automaticamente
    let countdown = 10;
    const countdownInterval = setInterval(function() {
      countdown--;
      closeButton.textContent = `Fechar (${countdown}s)`;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        popupDiv.style.display = 'none';
        popupDiv.remove();
      }
    }, 1000);
  }
// Função para salvar todas as abas ativas no armazenamento local
function salvarTodasAbasAtivas() {
    chrome.tabs.query({ currentWindow: true }, function(tabs){
        // Obter abas atuais salvas no armazenamento local
        chrome.storage.local.get({ 'abas-ativas': [] }, function(result) {
            // Garantir que abasSalvas é um array
            let abasSalvas = result['abas-ativas'] || [];

            // Verificar quais abas salvas ainda estão ativas
            abasSalvas = abasSalvas.filter(savedTab => tabs.some(tab => tab.id === savedTab.id));

            // Mapear apenas URLs das abas ativas que ainda não estão salvas
            const activeTabs = tabs.filter(tab => !abasSalvas.some(savedTab => savedTab.id === tab.id))
                                   .map(tab => ({ url: tab.url, title: tab.title, id: tab.id }));

            // Adicionar novas abas ativas ao armazenamento local
            const novasAbas = abasSalvas.concat(activeTabs);
            chrome.storage.local.set({ 'abas-ativas': novasAbas }, function() {
                // Se necessário, ocultar um elemento de configuração
                if (typeof save_config !== 'undefined') {
                    save_config.style.display = 'none';
                }
            });
        });
    });
}
// Função para obter as abas salvas no armazenamento local e criar checkboxes
function criarCheckboxesAbasSalvas() {
    chrome.storage.local.get({ 'abas-ativas': [] }, function(result) {
        const abasAtivas = result['abas-ativas'];
        const buttonsAbas = document.getElementById('buttons-abas');
        const saveConfigButton = document.getElementById('save-config');
        const notabas = document.getElementById('not-abas');
        if (!buttonsAbas) {
            return;
        }
        abasAtivas.forEach(function(aba, index) {
            notabas.textContent = ''   
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'aba-checkbox-' + index;
            checkbox.value = aba.id;

            const label = document.createElement('label');
            label.htmlFor = 'aba-checkbox-' + index;
            label.appendChild(document.createTextNode(`id da Aba:${aba.id}\nTítulo:${aba.title}`));

            const br = document.createElement('br');
            
            buttonsAbas.appendChild(checkbox);
            buttonsAbas.appendChild(label);
            buttonsAbas.appendChild(br);

            // Mostra o botão de salvar apenas se pelo menos uma aba estiver selecionada
            checkbox.addEventListener('change', function() {
                saveConfigButton.style.display = anyCheckboxChecked() ? 'block' : 'none';
            });
        });

        // Função auxiliar para verificar se algum checkbox está marcado
        function anyCheckboxChecked() {
            const checkboxes = buttonsAbas.querySelectorAll('input[type="checkbox"]');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    return true;
                }
            }
            return false;
        }

        // Oculta o botão de salvar inicialmente
        saveConfigButton.style.display = 'none';
    });
}
// Função para salvar as abas selecionadas no armazenamento local na chave "aba-interceptar"
function salvarAbasSelecionadas() {
    const checkboxes = document.querySelectorAll('#buttons-abas input[type="checkbox"]');
    const abasSelecionadas = [];

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            const tabId = checkbox.value;

            // Verificar se a aba está ativa antes de salvar
            chrome.tabs.get(parseInt(tabId), function(tab) {
                if (chrome.runtime.lastError || !tab) {
                    return;
                }

                // Adicionar a aba selecionada à lista de abas a interceptar
                abasSelecionadas.push({ id: tab.id, url: tab.url });
                
                // Limpar checkboxes selecionados
                checkbox.checked = true;
                if(buttonsAbas){
                buttonsAbas.innerHTML = '';}

                // Salvar abas selecionadas no armazenamento local
                chrome.storage.local.set({ 'aba-interceptar': abasSelecionadas }, function() {
                });
            });
        }
    });
}
function carregarAbasInterceptadas() {

    chrome.storage.local.get({ 'aba-interceptar': [] }, function(result) {
        const abasInterceptar = result['aba-interceptar'];
        abas_inter.innerHTML = ''; // Limpa o conteúdo atual
        infor.innerHTML = ''; // Limpa o conteúdo atual
        abasInterceptar.forEach(function(aba, index) {
            chrome.tabs.get(aba.id, function(tab) {
                if (tab) {
                    const tabInfo = document.createElement('div');
                    tabInfo.textContent = `ID: ${tab.id}, Título: ${tab.title}`;
                    abas_inter.appendChild(tabInfo);
                } else {
                }
            });
        });
    });

    // Adicionar estilos CSS dinamicamente
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #abas-inter {
            padding: 10px;

            margin-top: 10px;
        }
        #abas-inter div {
            margin-bottom: 5px;
            padding: 5px;

        }
    `;
    document.head.appendChild(styleElement);
}
// Adicionar evento ao botão
if (save_config){
save_config.addEventListener('click', salvarAbasSelecionadas);
}
if(bt_resetMemory){
    bt_resetMemory.addEventListener('click', resetMemory);
}
if(bt_resetHls){
    bt_resetHls.addEventListener('click', resetHlss);
}
if(bt_refresh){
    bt_refresh.addEventListener('click', refreshExtenss);
}
// Chamadass ao iniciar a extensão
loadSavedUrls();
criarCheckboxesAbasSalvas();
salvarTodasAbasAtivas();
carregarAbasInterceptadas();


