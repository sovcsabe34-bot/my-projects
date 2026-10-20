/* ---------------------------------
         MENU RESPONSIVO
      --------------------------------- */

const botaoMenu =
    document.getElementById("botaoMenu");

const nav =
    document.getElementById("nav");

botaoMenu.addEventListener("click", function () {

    const aberto =
        nav.classList.toggle("aberto");

    botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
    );

    botaoMenu.textContent =
        aberto ? "×" : "☰";

});

// Fecha o menu quando um link é selecionado.
nav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("aberto");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.textContent = "☰";

    });

});


/* ---------------------------------
   CONTADOR PROGRESSIVO
--------------------------------- */

// Início do namoro:
// 31 de outubro de 2025, às 00:00:00.
//
// O -03:00 representa o horário de Brasília.
// Altere o fuso se o horário de início
// do relacionamento tiver sido diferente.

const inicioNamoro =
    new Date("2025-10-31T00:00:00-03:00").getTime();


// Formata números com dois dígitos.
function formatarNumero(numero) {

    return String(numero).padStart(2, "0");

}


// Calcula e mostra o tempo que já passou.
function atualizarContador() {

    const agora = Date.now();

    const diferenca =
        agora - inicioNamoro;


    // Proteção para não mostrar tempo negativo.
    if (diferenca < 0) {

        document.getElementById("dias").textContent = "0";

        document.getElementById("horas").textContent = "00";

        document.getElementById("minutos").textContent = "00";

        document.getElementById("segundos").textContent = "00";

        return;

    }


    // Converte milissegundos em segundos.
    const totalSegundos =
        Math.floor(diferenca / 1000);


    // Um dia tem 86.400 segundos.
    const dias =
        Math.floor(totalSegundos / 86400);


    // Calcula as horas restantes.
    const horas =
        Math.floor((totalSegundos % 86400) / 3600);


    // Calcula os minutos restantes.
    const minutos =
        Math.floor((totalSegundos % 3600) / 60);


    // Calcula os segundos restantes.
    const segundos =
        totalSegundos % 60;


    // Atualiza os elementos do HTML.
    document.getElementById("dias").textContent =
        dias;

    document.getElementById("horas").textContent =
        formatarNumero(horas);

    document.getElementById("minutos").textContent =
        formatarNumero(minutos);

    document.getElementById("segundos").textContent =
        formatarNumero(segundos);

}


// Executa imediatamente.
atualizarContador();


// Atualiza a cada segundo.
setInterval(atualizarContador, 1000);


/* ---------------------------------
   PLAYER DE MÚSICA
--------------------------------- */

const musica =
    document.getElementById("musica");

const botaoMusica =
    document.getElementById("botaoMusica");

const estadoMusica =
    document.getElementById("estadoMusica");


botaoMusica.addEventListener("click", async function () {

    if (musica.paused) {

        try {

            await musica.play();

            botaoMusica.textContent = "Ⅱ";

            botaoMusica.setAttribute(
                "aria-label",
                "Pausar música"
            );

            botaoMusica.setAttribute(
                "aria-pressed",
                "true"
            );

            estadoMusica.textContent = "Tocando agora ♪";

        } catch (erro) {

            estadoMusica.textContent =
                "Não foi possível tocar. Verifique musica.mp3.";

        }

    } else {

        musica.pause();

        botaoMusica.textContent = "▶";

        botaoMusica.setAttribute(
            "aria-label",
            "Tocar música"
        );

        botaoMusica.setAttribute(
            "aria-pressed",
            "false"
        );

        estadoMusica.textContent = "Para sempre";

    }

});


// Mantém o botão sincronizado caso o áudio
// seja pausado ou termine por outro motivo.
musica.addEventListener("pause", function () {

    botaoMusica.textContent = "▶";

    botaoMusica.setAttribute(
        "aria-pressed",
        "false"
    );

});


/* ---------------------------------
   CORAÇÕES FLUTUANTES
--------------------------------- */

// Cria corações de forma periódica.
// Em dispositivos com preferência por
// movimento reduzido, não cria animações.

const movimentoReduzido =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


function criarCoracao() {

    if (movimentoReduzido) {
        return;
    }

    const coracao =
        document.createElement("span");

    coracao.className = "coracao-flutuante";

    coracao.textContent = "♥";

    coracao.setAttribute("aria-hidden", "true");

    coracao.style.left =
        Math.random() * 100 + "vw";

    coracao.style.fontSize =
        (14 + Math.random() * 18) + "px";

    coracao.style.animationDuration =
        (5 + Math.random() * 3) + "s";

    document.body.appendChild(coracao);


    // Remove o elemento depois da animação.
    setTimeout(function () {

        coracao.remove();

    }, 8500);

}


if (!movimentoReduzido) {

    setInterval(criarCoracao, 1800);

}


/* ---------------------------------
   DESTAQUE DO MENU AO ROLAR
--------------------------------- */

const linksMenu =
    nav.querySelectorAll("a");

const secoes =
    document.querySelectorAll(
        "#inicio, #historia, #fotos, #mensagem, #contador"
    );


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    linksMenu.forEach(function (link) {

                        link.classList.toggle(
                            "ativo",
                            link.getAttribute("href") ===
                            "#" + entrada.target.id
                        );

                    });

                }

            });

        }, {
            rootMargin: "-30% 0px -60% 0px"
        });


    secoes.forEach(function (secao) {

        observador.observe(secao);

    });
    console.log("IntersectionObserver está disponível.");
    alert("IntersectionObserver está disponível.");
}