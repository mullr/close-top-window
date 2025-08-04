async function closeTopmostWindow() {
  if (Object.keys(foundry.ui.windows).length == 0) {
    // Fall back to the native handler
    game.keybindings.actions.get("core.dismiss").onDown({ event: null });
  } else {
    await foundry.ui.activeWindow.close();

    var topWindow = null;
    var topZIndex = 0;
    var hadWindows = false;
    for (let windowName in foundry.ui.windows) {
      hadWindows = true;
      let zIndex = foundry.ui.windows[windowName].position.zIndex;
      if (zIndex > topZIndex) {
        topZIndex = zIndex;
        topWindow = windowName;
      }
    }

    if (topWindow) {
      // This sets activeWindow
      foundry.ui.windows[topWindow].bringToFront();
    }
  }
}

game.keybindings.register("close-top-window", "close", {
  name: "Close the topmost window",
  hint: "Close only the topmost window.",
  uneditable: [{ key: "Escape" }],
  editable: [],
  onDown: () => closeTopmostWindow,
  onUp: () => {},
  restricted: false,
  reservedModifiers: [],
  precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
});
