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

// Função para carregar e fechar a janela modal
function alternarModal(modalId, abrir) {
  const modal = document.querySelector(`#${modalId}`);
  console.log("modal", modal);
  modal.style.display = abrir ? "block" : "none";

  // Ocultar barra de rolagem
  document.body.style.overflow = abrir ? "hidden" : "auto";
}

function inscrever(event) {
  event.preventDefault();
  alternarModal("ver-modal-inscrito", true);
}

// Chamar essa função para cada modal que você deseja controlar o foco
gerenciarFocoModal("ver-modal");
gerenciarFocoModal("ver-modal-enviado");
gerenciarFocoModal("ver-modal-inscrito");

// Evento de tecla para fechar modais e submenu com ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    alternarModal("ver-modal", false);
    alternarModal("ver-modal-enviado", false);
    alternarModal("ver-modal-inscrito", false);
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

    if (mostrar) {
      submenu.addEventListener("focusout", function (event) {
        // Verifica se o novo elemento focado ainda está dentro do submenu ou do item do menu
        if (!item.contains(event.relatedTarget)) {
          alternarSubmenu(item, false);
        }
      });
    }
  }
}

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
    const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

    // Fecha todos os itens e atualiza aria-expanded
    document.querySelectorAll(".botao-acordeao").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling.classList.remove("expandido");
      btn.nextElementSibling.querySelector("p").removeAttribute("tabindex");
    });

    // Se o item não estava aberto, abra-o e torne o conteúdo focável
    if (!isAlreadyOpen) {
      button.setAttribute("aria-expanded", "true");
      const content = button.nextElementSibling;
      content.classList.add("expandido");
      content.querySelector("p").setAttribute("tabindex", "0");
    }
  });
});
