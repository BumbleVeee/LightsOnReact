export interface AdatTipus {
    index: number;
    be: boolean;
}

export function listaGeneralas(meret: number): AdatTipus[] {
    const lista: AdatTipus[] = []

    for (let i = 0; i < meret * meret; i++) {
        lista.push({ index: i, be: Math.random() < 0.2 })
    }

    return lista
}