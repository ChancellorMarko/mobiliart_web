// Buscar botão
let bk_button = document.getElementById("bk_top_button");

// Quando o usuário descer na página exibir o botão
window.onscroll = function() {scrollFunction()};

function scrollFunction()
{
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30)
    {
        bk_button.style.display = "block";
    }
    else
    {
        bk_button.style.display = "none";
    }
}

// Quando o usuário clicar no botão de voltar ao topo
function topFunction()
{
    document.body.scrollTop = 0; // Compatibilidade para Safari
    document.documentElement.scrollTop = 0; // Para outros navegadores
}