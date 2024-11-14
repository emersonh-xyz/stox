export function getLocaleLanguage() {
    // return language value from localstorage
    return localStorage.getItem('language') || 'en';

}

export function setLocaleLanguage(language: string) {
    // set language value to localstorage
    localStorage.setItem('language', language);
}
