export const saveState = (state: any) => {
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('appState', serialState);
    } catch (err) { }
}