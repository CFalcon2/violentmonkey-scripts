// ==UserScript==
// @name         OtimaNutri & Lojautil - Navegação WASD + Setas
// @namespace    Violentmonkey Scripts
// @match        *://www.otimanutri.com.br/*
// @match        *://www.lojautil.com.br/*
// @grant        none
// @version      1.3
// @author       Gemini (Paid)
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        // Bloqueio rigoroso: se estiver digitando em campos de texto, não faz nada
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

        const url = new URL(window.location.href);
        const teclaEsquerda = (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a');
        const teclaDireita = (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd');

        // --- LÓGICA LOJAUTIL (Navegação por ID de Produto) ---
        if (url.hostname.includes("lojautil.com.br")) {
            let idParam = url.searchParams.get("id_produto");
            if (!idParam) return;

            let idAtual = parseInt(idParam);

            if (teclaDireita) {
                url.searchParams.set("id_produto", idAtual + 1);
                window.location.href = url.toString();
            } else if (teclaEsquerda) {
                url.searchParams.set("id_produto", idAtual - 1);
                window.location.href = url.toString();
            }
            return;
        }

        // --- LÓGICA OTIMANUTRI (Páginas e Categorias) ---
        if (url.hostname.includes("otimanutri.com.br")) {
            const eBusca = url.pathname.includes("busca-listar.asp");

            // Caso 1: Página de Busca (?pagina=X)
            if (eBusca) {
                let paginaAtual = parseInt(url.searchParams.get("pagina")) || 1;
                if (teclaDireita) {
                    url.searchParams.set("pagina", paginaAtual + 1);
                    window.location.href = url.toString();
                } else if (teclaEsquerda && paginaAtual > 1) {
                    url.searchParams.set("pagina", paginaAtual - 1);
                    window.location.href = url.toString();
                }
                return;
            }

            // Caso 2: Categorias (/page-X)
            const urlLimpa = window.location.href.replace(/\/$/, "");
            const match = urlLimpa.match(/\/page-(\d+)/);
            let paginaCat = match ? parseInt(match[1]) : 1;
            let urlBase = urlLimpa.replace(/\/page-\d+/, "");

            if (teclaDireita) {
                window.location.href = urlBase + "/page-" + (paginaCat + 1);
            } else if (teclaEsquerda && paginaCat > 1) {
                const anterior = paginaCat - 1;
                window.location.href = (anterior === 1) ? urlBase : urlBase + "/page-" + anterior;
            }
        }
    });
})();
