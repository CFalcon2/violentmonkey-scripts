// ==UserScript==
// @name         Util - Navegador + Copiar ID (V 1.3)
// @match        *://www.lojautil.com.br/admloja/*id_produto=*
// @grant        none
// @version      1.3
// @author       Gemini
// ==/UserScript==

(function() {
    'use strict';

    function iniciarPainel() {
        // Evita criar duplicados
        if (document.getElementById('painel-navegador-util')) return;

        const urlParams = new URLSearchParams(window.location.search);
        const idAtual = urlParams.get('id_produto');
        if (!idAtual) return;

        const container = document.createElement('div');
        container.id = 'painel-navegador-util';
        container.style.cssText = "position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 10000; display: flex; flex-direction: column; align-items: center; gap: 3px;";

        const nav = document.createElement('div');
        nav.style.cssText = "display: flex; align-items: center; gap: 10px; background: #333; color: white; padding: 6px 12px; border-radius: 50px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-family: Arial, sans-serif; border: 2px solid #28a745;";

        const irPara = (novoId) => {
            const url = new URL(window.location.href);
            url.searchParams.set('id_produto', novoId);
            window.location.href = url.href;
        };

        const btnEsq = document.createElement('button');
        btnEsq.innerText = "← ID: " + (parseInt(idAtual) - 1);
        btnEsq.style.cssText = "cursor: pointer; background: #555; border: none; color: white; padding: 3px 8px; border-radius: 20px; font-weight: bold; font-size: 11px;";
        btnEsq.onclick = () => irPara(parseInt(idAtual) - 1);

        const label = document.createElement('span');
        label.innerHTML = `ID: <b>${idAtual}</b>`;
        label.style.fontSize = "12px";

        const btnDir = document.createElement('button');
        btnDir.innerText = "ID: " + (parseInt(idAtual) + 1) + " →";
        btnDir.style.cssText = "cursor: pointer; background: #28a745; border: none; color: white; padding: 3px 8px; border-radius: 20px; font-weight: bold; font-size: 11px;";
        btnDir.onclick = () => irPara(parseInt(idAtual) + 1);

        const btnCopiar = document.createElement('button');
        btnCopiar.innerText = "📋 COPIAR ID";
        btnCopiar.style.cssText = "cursor: pointer; background: #eee; border: 1px solid #999; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase;";

        btnCopiar.onclick = function() {
            const el = document.createElement('textarea');
            el.value = idAtual;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            btnCopiar.innerText = "✅ COPIADO!";
            btnCopiar.style.background = "#28a745";
            btnCopiar.style.color = "#fff";

            setTimeout(() => {
                btnCopiar.innerText = "📋 COPIAR ID";
                btnCopiar.style.background = "#eee";
                btnCopiar.style.color = "#333";
            }, 1000);
        };

        nav.appendChild(btnEsq);
        nav.appendChild(label);
        nav.appendChild(btnDir);
        container.appendChild(nav);
        container.appendChild(btnCopiar);
        document.body.appendChild(container);
    }

    // Tenta iniciar imediatamente e repete a cada 2 segundos se sumir
    iniciarPainel();
    setInterval(iniciarPainel, 2000);

})();
