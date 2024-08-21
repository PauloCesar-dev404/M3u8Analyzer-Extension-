// background.js versão 1.1.0.0
chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        // Verifica se a resposta contém cabeçalhos
        if (details.responseHeaders) {
            // Busca o cabeçalho 'Content-Type'
            const contentTypeHeader = details.responseHeaders.find(header => header.name.toLowerCase() === 'content-type');
            if (contentTypeHeader) {
                const contentType = contentTypeHeader.value.toLowerCase();
                // Verifica se o Content-Type é específico para .m3u8 (HLS)
                if (contentType.includes('application/vnd.apple.mpegurl') || contentType.includes('application/x-mpegurl')) {
                    const tabId = details.tabId;
                    // Verifica se o ID da aba está na lista de abas a serem interceptadas
                    chrome.storage.local.get({ 'aba-interceptar': [] }, function(result) {
                        const savedTabs = result['aba-interceptar'];
                        const tabIds = savedTabs.map(tab => tab.id);
                        if (tabIds.includes(tabId)) {
                            const url = details.url;
                            saveUrl(url); // Salva o URL capturado
                        }
                    });
                }
            }
        }
        return { responseHeaders: details.responseHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
);

// Função para salvar um URL no armazenamento local
function saveUrl(url) {
    chrome.storage.local.get({ capturedUrls: [] }, function(result) {
        const capturedUrls = result.capturedUrls;
        capturedUrls.push(url);
        chrome.storage.local.set({ capturedUrls: capturedUrls }, function() {
        
        });
    });
}
