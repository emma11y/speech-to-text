export function setFocusToTitleForAccessibility(): void {
  setTimeout(() => {
    // for accessibility - https://access42.net/accessibilite-rechargement-page-single-page-applications
    const titlePageElement: HTMLElement | null =
      document.getElementById('title-page');
    if (titlePageElement) {
      titlePageElement.innerHTML = document.title;
      titlePageElement.focus();
    }
  }, 100);
}

export function setFocusToDialogForAccessibility(): void {
  const containerDialog = document.querySelector('.p-dialog');

  if (containerDialog) {
    // Find the next focusable button
    const nextElementFocusable = containerDialog.querySelector('button');
    if (nextElementFocusable) nextElementFocusable.focus();
  }
}
