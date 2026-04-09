// ==UserScript==
// @name         LojaUtil - Checklist de Preço V2.0
// @match        *://www.lojautil.com.br/admloja/Form_alt_preco.asp*
// @grant        none
// @version      2.0
// @author       Gemini (Paid)
// ==/UserScript==

(function() {
    'use strict';

    const validarStatus = () => {
        // 1. VALIDAÇÃO CÓDIGO DE BARRAS (Mantida a detecção automática)
        const corpoPagina = document.body.innerText;
        const regexBarras = /\d{12,14}/;
        const barraOk = regexBarras.test(corpoPagina);

        exibirIndicadores(barraOk);
    };

    const exibirIndicadores = (barraOk) => {
        let container = document.getElementById('container-checklist-gemini');

        if (!container) {
            container = document.createElement('div');
            container.id = 'container-checklist-gemini';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 100000;
                font-family: sans-serif;
                pointer-events: none;
                display: flex;
                flex-direction: column;
                gap: 8px;
            `;
            document.body.appendChild(container);
        }

        // Estilo para o lembrete fixo (Azul com borda branca)
        const estiloLembrete = `
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            border: 2px solid #ffffff;
            background-color: #1a7399;
            color: #ffffff;
            text-align: center;
            min-width: 180px;
        `;

        // Estilo para o Código de Barras (Verde ou Vermelho automático)
        const estiloBarra = `
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            border: 2px solid ${barraOk ? '#00ff00' : '#ff0000'};
            background-color: ${barraOk ? '#004d00' : '#8B0000'};
            color: ${barraOk ? '#ccffcc' : '#ffffff'};
            text-align: center;
            min-width: 180px;
        `;

        container.innerHTML = `
            <div style="${estiloLembrete}">
                🚩 VER SE ESTÁ ATIVO / INATIVO
            </div>
            <div style="${estiloBarra}">
                ${barraOk ? '✅ CÓD. BARRAS OK' : '⚠️ CÓD. BARRAS AUSENTE'}
            </div>
        `;
    };

    setInterval(validarStatus, 1000);
})();
