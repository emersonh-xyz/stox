export async function toggleWidget(componentIndex: number) {
    const components = JSON.parse(localStorage.getItem('components') || '[]');
    components[componentIndex] = !components[componentIndex];
    localStorage.setItem('components', JSON.stringify(components));
    const event = new Event('widgetToggled');
    window.dispatchEvent(event);
}

export async function getWidgets() {
    return JSON.parse(localStorage.getItem('components') || '[]');
}

