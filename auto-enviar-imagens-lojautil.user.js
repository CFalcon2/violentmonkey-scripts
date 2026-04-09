// ==UserScript==
// @name         Util - Auto Enviar Imagem (V 1.2)
// @match        *://www.lojautil.com.br/admloja/*
// @grant        none
// @version      1.2
// @author       Gemini
// ==/UserScript==

(function() {
    'use strict';

    function monitorarCampos() {
        // Busca os elementos ignorando se estão em maiúsculas ou minúsculas
        const campoArquivo = document.querySelector('input[type="file"]');
        const botaoEnviar = document.querySelector('input[type="button"][value*="Enviar"], input[type="submit"][value*="Enviar"]');

        if (campoArquivo && botaoEnviar && !campoArquivo.dataset.monitorado) {
            // Marca como monitorado para não criar loops
            campoArquivo.dataset.monitorado = "true";
            console.log("Gemini: Monitor de envio ativado no frame correto.");

            campoArquivo.onchange = function() {
                if (campoArquivo.files.length > 0) {
                    console.log("Gemini: Foto detectada. Disparando envio automático...");
                    botaoEnviar.click();
                }
            };
        }
    }

    // Executa a busca a cada 1 segundo para garantir que encontre o frame quando ele carregar
    setInterval(monitorarCampos, 1000);

})();
