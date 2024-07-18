import { withPluginApi } from "discourse/lib/plugin-api";
import { iconHTML } from "discourse-common/lib/icon-library";

export default {
  name: "codeblock-overlay",

  initialize() {
    withPluginApi("0.8.13", (api) => {
      
      const site = api.container.lookup("service:site");
      
      api.decorateCookedElement(
        element => {  
          const codeBlocks = element.querySelectorAll(
            ":scope > pre > code, :scope :not(article):not(blockquote) > pre > code"
          );
          
          codeBlocks.forEach((cb) => {
            requestAnimationFrame(() => {
              
              if (site.desktopView) {
                return;
              }
              
              if (cb.scrollHeight > cb.clientHeight) {
                const overlayEl = document.createElement("div");
                overlayEl.classList.add("codeblock-overlay");
                cb.before(overlayEl);
    
                const overlayShowMoreDiv = document.createElement("div");
                overlayShowMoreDiv.classList.add("codeblock-overlay-footer");
                overlayEl.appendChild(overlayShowMoreDiv);
    
                const overlayShowMoreSpan = document.createElement("span");
                overlayShowMoreSpan.classList.add("codeblock-overlay-show-more");
                overlayShowMoreDiv.appendChild(overlayShowMoreSpan);
    
                let showMoreText = `<span>${I18n.t('show_more')}</span>`;
                let showMoreIcon = iconHTML("angle-down");
                overlayShowMoreSpan.innerHTML = showMoreText;
                overlayShowMoreSpan.innerHTML += showMoreIcon;
    
                overlayEl.addEventListener("click", () => {
                  overlayEl.classList.add("hidden");
                });
              } else {
                return;
              }
            });
          });
        },
        { id: "codeblock-overlay", onlyStream: true }
      );
    });
  },
};
