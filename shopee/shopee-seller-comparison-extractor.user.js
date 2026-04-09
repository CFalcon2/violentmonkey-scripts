// ==UserScript==
// @name        Shopee - Extrator de Comparação (V3)
// @match       https://seller.shopee.com.br/*
// @grant       GM_setClipboard
// @version     3.0
// @author      Gemini
// ==/UserScript==

(function() {
    'use strict';

    async function getBase64Image(imgUrl) {
        try {
            const resp = await fetch(imgUrl);
            const blob = await resp.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch (e) { return null; }
    }

    function criarBotao() {
        if (document.getElementById('btn-extrator-shopee')) return;
        const btn = document.createElement('button');
        btn.id = 'btn-extrator-shopee';
        btn.innerHTML = '📋 COPIAR TUDO (C/ FOTOS)';
        btn.style.cssText = `position:fixed!important;top:20px!important;left:50%!important;transform:translateX(-50%);z-index:999999999!important;padding:15px 30px;background-color:#ff4700;color:white;border:2px solid white;border-radius:50px;cursor:pointer;font-weight:bold;font-size:16px;box-shadow:0 10px 20px rgba(0,0,0,0.5);`;
        document.body.appendChild(btn);

        btn.onclick = async function() {
            btn.innerHTML = '⏳ PROCESSANDO...';
            const modal = document.querySelector('.shopee-modal__content') || document.body;
            let textoFinal = "--- DADOS PARA ANÁLISE --- \n\n" + modal.innerText + "\n\n--- IMAGENS ENCONTRADAS ---\n";

            const imagens = modal.querySelectorAll('img');
            for (let img of imagens) {
                if (img.src.startsWith('http')) {
                    textoFinal += `\n[IMG_START]${img.src}[IMG_END]\n`;
                }
            }

            GM_setClipboard(textoFinal);
            btn.innerHTML = '✅ TUDO COPIADO!';
            btn.style.backgroundColor = '#2ecc71';
            setTimeout(() => {
                btn.innerHTML = '📋 COPIAR TUDO (C/ FOTOS)';
                btn.style.backgroundColor = '#ff4700';
            }, 2000);
        };
    }

    setInterval(criarBotao, 2000);
})();
