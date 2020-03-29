
enum StorageKey {
    Reservations = 'reservations',
}

function setReservationList(details: string) {
    return localStorage.setItem(StorageKey.Reservations, details);
}

function getReservationList(): string {
    return localStorage.getItem(StorageKey.Reservations) || '';
}

function clearReservationList() {
    return localStorage.removeItem(StorageKey.Reservations);
}

const LocalStorageService = {
    setReservationList,
    getReservationList,
    clearReservationList
}

export default LocalStorageService;