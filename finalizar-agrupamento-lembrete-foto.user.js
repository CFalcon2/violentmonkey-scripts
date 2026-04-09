// ==UserScript==
// @name         Util - FINALIZAR + LEMBRETE FOTO (V 6.1)
// @match        *://www.lojautil.com.br/admloja/*
// @match        *://www.lojautil.com.br/produtos_fotos/*
// @grant        window.close
// @version      6.1
// @author       Gemini (Paid)
// ==/UserScript==

(function() {
    'use strict';

    const urlAtual = window.location.href;

    // --- 1. LÓGICA DE FECHAMENTO GLOBAL ---
    window.addEventListener('storage', (e) => {
        if (e.key === 'FECHAR_KITS_TRABALHADOS') {
            const ehPaginaDeFoto = urlAtual.includes('Form_cad_foto_produto.asp');
            const ehRelatorioSimples = urlAtual.includes('rel_produto.asp') && !urlAtual.includes('atacado');
            const ehImagemOriginal = urlAtual.includes('-EG.jpg');
            if (ehPaginaDeFoto || ehRelatorioSimples || ehImagemOriginal) window.close();
        }
    });

    // --- 2. VALIDAÇÃO DA FOTO PRINCIPAL ---
    const verificarPrincipal = () => {
        if (!urlAtual.includes('Form_cad_foto_produto.asp')) return;

        // Pegamos todos os links <a> da página
        const todosLinks = Array.from(document.querySelectorAll('a'));
        const corpoTexto = document.body.innerText.toUpperCase();

        // 1. Procuramos se ainda existe o link CLICÁVEL "[ Principal ]"
        // Ignoramos se o link for de Tabela Nutricional
        const temLinkPrincipalDisponivel = todosLinks.some(l => {
            const textoLink = l.innerText.toUpperCase();
            return textoLink.includes("PRINCIPAL") && !textoLink.includes("TABNUTRICIONAL");
        });

        // 2. Verificamos se a página já diz que é Tabela Nutricional (para não dar erro)
        const ehTabelaNutri = corpoTexto.includes("ESTE FOTO É UMA TABELA NUTRICIONAL");

        const alertaExistente = document.getElementById('alerta-principal-azul');

        // LÓGICA: Só mostra o alerta se TIVER o link disponível e NÃO for tabela nutricional
        if (temLinkPrincipalDisponivel && !ehTabelaNutri) {
            if (!alertaExistente) {
                const alerta = document.createElement('div');
                alerta.id = 'alerta-principal-azul';
                alerta.style.cssText = `
                    position: fixed; bottom: 90px; right: 20px; z-index: 999999;
                    padding: 12px 20px; font-family: Arial, sans-serif; font-size: 11px;
                    font-weight: bold; border-radius: 50px; border: 4px solid #fff;
                    display: flex; align-items: center; gap: 10px; pointer-events: none;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3); background-color: #8B0000;
                    color: #ffffff; border-color: #ff4444;
                `;
                alerta.innerHTML = `<span>🚩</span> <span>Imagem do produto NÃO ESTÁ como principal</span>`;
                document.body.appendChild(alerta);
            }
        } else {
            // Se o link sumiu (você clicou) ou é tabela nutricional, remove o alerta na hora!
            if (alertaExistente) {
                alertaExistente.remove();
            }
        }
    };

    // --- 3. BOTÃO VERDE (FINALIZAR) ---
    const deveMostrarBotaoFinalizar = urlAtual.includes('Form_cad_foto_produto.asp') ||
                                     (urlAtual.includes('rel_produto.asp') && !urlAtual.includes('atacado')) ||
                                      urlAtual.includes('-EG.jpg');

    if (deveMostrarBotaoFinalizar) {
        const btnFinalizar = document.createElement('button');
        btnFinalizar.innerHTML = "🏁 FINALIZAR E VOLTAR PARA AGRUPAMENTO";
        btnFinalizar.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; z-index: 999999;
            padding: 15px 25px; background: #2ed573; color: white;
            border: 4px solid #fff; border-radius: 50px; font-weight: bold;
            cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        btnFinalizar.onclick = function() {
            localStorage.setItem('FECHAR_KITS_TRABALHADOS', Date.now());
            window.close();
        };
        document.body.appendChild(btnFinalizar);
    }

    if (urlAtual.includes('Form_cad_foto_produto.asp')) {
        setInterval(verificarPrincipal, 800); // Checa a cada 0.8s para ser rápido
    }
})();
