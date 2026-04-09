// ==UserScript==
// @name         Util - Ativação Direta (Confirm Automático)
// @match        *://www.lojautil.com.br/admloja/rel_produto.asp*
// @grant        none
// @version      1.3
// @author       Gemini
// ==/UserScript==

(function() {
    'use strict';

    // 1. INTERCEPTA A CONFIRMAÇÃO DO NAVEGADOR
    // Isso responde "Sim" automaticamente para a pergunta "Deseja Mudar o Estatus?"
    window.confirm = function() {
        return true;
    };

    // 2. MELHORIA VISUAL PARA OS LINKS "INATIVO"
    function destacarLinks() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.innerText.includes('Inativo')) {
                // Fundo amarelo e borda para você bater o olho e clicar rápido
                link.style.cssText = "background: #fff3cd; border: 1px solid #ffeeba; padding: 2px; border-radius: 3px; font-weight: bold; color: #856404 !important;";
            }
        });
    }

    // Roda ao carregar a página
    destacarLinks();

    // Caso a tabela mude sem recarregar (AJAX), ele tenta destacar novamente
    setInterval(destacarLinks, 2000);

    console.log("Gemini: Automação de status ativa no link de relatório.");
})();
