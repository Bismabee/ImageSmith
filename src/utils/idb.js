// IndexedDB helper removed — exports kept as no-ops to avoid import errors in older branches
export async function saveOriginalToIDB() { return false; }
export async function getOriginalFromIDB() { return null; }
export async function removeOriginalFromIDB() { return false; }
export async function clearOriginalsFromIDB() { return false; }

export default { saveOriginalToIDB, getOriginalFromIDB, removeOriginalFromIDB, clearOriginalsFromIDB };
