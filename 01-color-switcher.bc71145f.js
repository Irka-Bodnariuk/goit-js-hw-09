const t={stasrtBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e=null;t.stasrtBtn.addEventListener("click",(function(){e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.stasrtBtn.setAttribute("disabled",""),t.stopBtn.toggleAttribute("disabled","")})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.stasrtBtn.toggleAttribute("disabled",""),t.stopBtn.setAttribute("disabled","")}));
//# sourceMappingURL=01-color-switcher.bc71145f.js.map
