// ==UserScript==
// @name         Automação Tabela - V6.0 (Híbrido Unificado)
// @match        http://www.lojautil.com.br/admloja/*
// @grant        none
// @version      6.0
// @author       Gemini
// ==/UserScript==

(function() {
    'use strict';

    function dominarBotoes() {
        // Pega TODOS os links da página
        const links = document.getElementsByTagName('a');

        for (let i = 0; i < links.length; i++) {
            const link = links[i];

            // Texto original e texto em maiúsculo para garantir
            const textoOriginal = link.innerText || "";
            const textoUpper = textoOriginal.toUpperCase().trim();

            // LÓGICA HÍBRIDA: Aceita qualquer variação
            const ehOAlvo = textoOriginal.includes("Gerar IMAGEM") ||
                            (textoUpper.includes("GERAR") && textoUpper.includes("IMAGEM"));

            if (ehOAlvo) {
                // Evita processar o mesmo botão duas vezes
                if (link.dataset.geminiDominado === "true") continue;
                link.dataset.geminiDominado = "true";

                // --- APLICA A SOLUÇÃO (Redirecionar Mesma Aba) ---

                // 1. Mata o alvo (_blank vira _self)
                link.target = "_self";

                // 2. Mata eventos nativos do site (onclick, etc)
                link.removeAttribute("onclick");

                // 3. Garante visualmente que é clicável
                link.style.cursor = "pointer";

                // 4. Força bruta no evento de clique
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // Impede o site de interferir
                    e.preventDefault();  // Impede o comportamento padrão

                    console.log("Botão híbrido clicado! Redirecionando...");

                    if (this.href) {
                        window.location.href = this.href;
                    } else {
                        console.warn("Link sem href encontrado!");
                    }
                }, true); // 'true' dá prioridade máxima ao nosso script

                console.log("Botão dominado pelo Híbrido V6.0");
            }
        }
    }

    // Roda imediatamente ao carregar
    dominarBotoes();

    // Roda a cada 500ms para pegar botões que carregam depois
    setInterval(dominarBotoes, 500);

})();
