// ==UserScript==
// @name         Gerador de Kits - V27.2
// @match        *://www.lojautil.com.br/admloja/*
// @grant        none
// @version      27.2
// @run-at       document-start
// @author       Gemini (Paid)
// ==/UserScript==

(function() {
    'use strict';

    const url = window.location.href;

    // --- PARTE 1: O FOGUETE ---
    if (url.includes('rel_produto_para_kit_atacado.asp')) {
        const injetarFoguete = () => {
            document.querySelectorAll('tr').forEach(linha => {
                const celulas = linha.querySelectorAll('td');
                if (celulas.length > 1 && !celulas[0].dataset.fogueteOk) {
                    const idMatch = celulas[0].innerText.trim().match(/^\d+$/);
                    if (idMatch) {
                        celulas[0].dataset.fogueteOk = "true";
                        const btn = document.createElement('span');
                        btn.innerHTML = ' 🚀';
                        btn.style.cssText = "cursor:pointer; font-size:16px; margin-left:5px; color: #ff4500;";

                        btn.onclick = function() {
                            const id = idMatch[0];
                            const abrir = (u, t) => setTimeout(() => window.open(u, '_blank'), t);

                            abrir(`Form_cad_foto_produto.asp?id_produto=${id}`, 50);

                            const links = Array.from(linha.querySelectorAll('a'))
                                .filter(l => /\d+X/.test(l.innerText.toUpperCase()))
                                .sort((a, b) => parseInt(a.innerText) - parseInt(b.innerText));

                            let delay = 1500;
                            links.forEach(l => {
                                const qtd = l.innerText.toUpperCase().replace('X', '').trim();
                                abrir(`criar_foto_kit.asp?id_produto=${id}&qtd=${qtd}`, delay);
                                delay += 2000; // Aumentei para 2 segundos para o banco não dar erro
                            });
                        };
                        celulas[0].appendChild(btn);
                    }
                }
            });
        };
        setInterval(injetarFoguete, 2000);
    }

    // --- PARTE 2: O SALTO (Execução Forçada) ---
    if (url.includes('criar_foto_kit.asp')) {
        console.log("Gemini: Monitorando criação do kit...");

        const monitorar = setInterval(() => {
            // Pegamos o texto direto do "corpo" da página, ignorando tags
            const textoPagina = document.body ? document.body.innerText : document.documentElement.innerText;
            const regex = /Gerado com Sucesso ID=(\d+)/i;
            const match = textoPagina.match(regex);

            if (match && match[1]) {
                clearInterval(monitorar);
                const novoID = match[1];
                console.log("Gemini: Sucesso! Pulando para ID " + novoID);
                window.location.replace(`Form_cad_foto_produto.asp?id_produto=${novoID}`);
            }
        }, 500);

        // Se em 20 segundos não for, para de tentar
        setTimeout(() => clearInterval(monitorar), 20000);
    }
})();
