// Função para gerenciar o foco dentro das Modais
function gerenciarFocoModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  const elementosModal = modal.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const primeiroElemento = elementosModal[0];
  const ultimoElemento = elementosModal[elementosModal.length - 1];

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Se a tecla Shift+Tab for pressionada, direcione o foco para o último elemento do modal
        if (document.activeElement === primeiroElemento) {
          event.preventDefault();
          ultimoElemento.focus();
        }
      } else {
        // Se apenas a tecla Tab for pressionada, direcione o foco para o primeiro elemento do modal
        if (document.activeElement === ultimoElemento) {
          event.preventDefault();
          primeiroElemento.focus();
        }
      }
    }
  });
}

function inscrever() {
  abrirModal("ver-modal-inscrito");
}

// Função para carregar e fechar a janela modal
function alternarModal(modalId, abrir) {
  const modal = document.querySelector(`#${modalId}`);
  modal.style.display = abrir ? "block" : "none";

  // Ocultar barra de rolagem
  document.body.style.overflow = abrir ? "hidden" : "auto";
}

// Chamar essa função para cada modal que você deseja controlar o foco
gerenciarFocoModal("ver-modal");
gerenciarFocoModal("ver-modal-enviado");

// Evento de tecla para fechar modais e submenu com ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    alternarModal("ver-modal", false);
    alternarModal("ver-modal-enviado", false);
    document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
      alternarSubmenu(item, false);
    });
  }
});

/**
 * Dropdown
 */
function mostrarSubmenu(event) {
  const menuItem = event.currentTarget.querySelector(
    ".cabecalho__lista-item a"
  );

  const submenu = event.currentTarget.querySelector(".submenu");

  const DropdownExpandedIcon = event.currentTarget.querySelector(
    ".material-symbols-outlined.icone"
  );

  if (submenu) {
    submenu.style.display = "block";
    menuItem.setAttribute("aria-expanded", "true");
    DropdownExpandedIcon.classList.add("active");
  }
}

function esconderSubmenu(event) {
  const submenu = event.currentTarget.querySelector(".submenu");

  const menuItem = event.currentTarget.querySelector(
    ".cabecalho__lista-item a"
  );

  const DropdownExpandedIcon = event.currentTarget.querySelector(
    ".material-symbols-outlined.icone"
  );

  if (submenu) {
    submenu.style.display = "none";
    menuItem.setAttribute("aria-expanded", "false");
    DropdownExpandedIcon.classList.remove("active");
  }
}

// Função para alternar a visibilidade do submenu
function alternarSubmenu(item, mostrar) {
  const submenu = item.querySelector(".submenu");
  const menuItem = item.querySelector(".cabecalho__lista-item a");
  const DropdownExpandedIcon = item.querySelector(
    ".material-symbols-outlined.icone"
  );

  if (submenu) {
    submenu.style.display = mostrar ? "block" : "none";
    menuItem.setAttribute("aria-expanded", mostrar ? "true" : "false");
    DropdownExpandedIcon.classList.toggle("active", mostrar);
  }
}

// Adicionar eventos aos itens do menu
// document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
//   item.addEventListener("mouseover", mostrarSubmenu);
//   item.addEventListener("mouseout", esconderSubmenu);

//   // Para dispositivos com tela sensível ao toque ou para ação de clique
//   item.addEventListener("click", function (event) {
//     const submenu = event.currentTarget.querySelector(".submenu");
//     const DropdownExpandedIcon = event.currentTarget.querySelector(
//       ".material-symbols-outlined.icone"
//     );
//     if (submenu) {
//       const isDisplayed = submenu.style.display === "block";
//       submenu.style.display = isDisplayed ? "none" : "block";

//       if (isDisplayed) {
//         DropdownExpandedIcon.classList.add("active");
//       } else {
//         DropdownExpandedIcon.classList.remove("active");
//       }
//     }
//   });
// });
// Adicionar eventos aos itens do menu
document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
  item.addEventListener("mouseover", () => alternarSubmenu(item, true));
  item.addEventListener("mouseout", () => alternarSubmenu(item, false));

  // Para dispositivos com tela sensível ao toque ou para ação de clique
  item.addEventListener("click", () => {
    const isDisplayed =
      item.querySelector(".submenu").style.display === "block";
    alternarSubmenu(item, !isDisplayed);
  });
});

/**
 * Accordion
 */
document.querySelectorAll(".botao-acordeao").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;

    // Verifica se o conteúdo do acordeão já está aberto
    const isAlreadyOpen = accordionContent.classList.contains("expandido");

    // Fecha todos os itens
    document.querySelectorAll(".conteudo-acordeao").forEach((element) => {
      element.classList.remove("expandido");
    });

    // Remove 'active' de todos os botões
    document.querySelectorAll(".botao-acordeao").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Se o item não estava aberto, abra-o
    if (!isAlreadyOpen) {
      button.classList.add("active");
      accordionContent.classList.add("expandido");
    }
  });
});
