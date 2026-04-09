// ==UserScript==
// @name         LojaUtil - AutoClose Tabela Nutri V2
// @match        *://www.lojautil.com.br/admloja/*cad_produto_tab_nutri.asp*
// @grant        window.close
// @version      2.0
// @author       Gemini (Paid)
// ==/UserScript==

(function() {
    'use strict';

    const agir = () => {
        // Buscamos todos os elementos que podem ser o botão
        const elementos = document.querySelectorAll('input, button, a, img');

        elementos.forEach(el => {
            // Verifica se é o botão de gerar imagem (por valor ou texto)
            const texto = (el.value || el.innerText || "").toUpperCase();

            if (texto.includes("GERAR IMAGEM")) {

                // Usamos o mousedown para disparar ANTES do navegador abrir a nova aba
                el.addEventListener('mousedown', function() {
                    console.log("Gemini: Botão pressionado. Preparando fechamento...");

                    // Delay um pouco maior para garantir que o sistema processe o clique
                    setTimeout(() => {
                        // Tenta fechar de 3 jeitos diferentes para o Opera não reclamar
                        window.open('', '_self', '');
                        window.close();
                    }, 1000);
                });
            }
        });
    };

    // Tenta rodar logo que carrega e depois de 1 segundo (caso o botão demore a aparecer)
    agir();
    setTimeout(agir, 1000);

})();
