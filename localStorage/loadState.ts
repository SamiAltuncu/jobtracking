export const loadState = () => {
    try {
        const serialState = localStorage.getItem('appState');
        if (serialState === null) return [];
        return JSON.parse(serialState) ?? [];
    } catch (err) {
        return [];
    }
}