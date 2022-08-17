export const disableClicks = () => {
    document.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
    }, true)
}

export const enableClicks = () => {
    document.removeEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
    }, true)
}