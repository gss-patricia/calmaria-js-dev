let ultimoElementoFocado;

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
        // Se a tecla Shift+Tab for pressionada, e o foco estiver no primeiro elemento, mover para o último
        if (document.activeElement === primeiroElemento) {
          event.preventDefault();
          ultimoElemento.focus();
        }
      } else {
        // Se a tecla Tab for pressionada, e o foco estiver no último elemento, mover para o primeiro
        if (
          document.activeElement === ultimoElemento ||
          !modal.contains(document.activeElement)
        ) {
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

  if (abrir) {
    // Armazena o elemento focado atualmente
    ultimoElementoFocado = document.activeElement;
    modal.style.display = "block";

    gerenciarFocoModal(modalId);
  } else {
    modal.style.display = "none";

    // Devolve o foco para o elemento que estava focado antes de abrir o modal
    if (ultimoElementoFocado) {
      ultimoElementoFocado.focus();
    }
  }

  // Ocultar barra de rolagem
  document.body.style.overflow = abrir ? "hidden" : "auto";
}

function inscrever(event) {
  event.preventDefault();
  alternarModal("ver-modal-inscrito", true);
}

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

    // Fecha todos os itens, atualiza aria-expanded e configura aria-hidden
    document.querySelectorAll(".botao-acordeao").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      const content = btn.nextElementSibling;
      content.classList.remove("expandido");

      content.setAttribute("aria-hidden", "true");
      content.querySelector("p").removeAttribute("tabindex");
    });

    // Se o item não estava aberto, abra-o e torne o conteúdo focável
    if (!isAlreadyOpen) {
      button.setAttribute("aria-expanded", "true");
      const content = button.nextElementSibling;
      content.classList.add("expandido");

      // Torna o conteúdo visível para o litor de tela
      content.setAttribute("aria-hidden", "false");
      content.querySelector("p").setAttribute("tabindex", "0");
    }
  });
});
