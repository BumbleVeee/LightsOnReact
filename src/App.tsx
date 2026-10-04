import { useState } from 'react'
import './App.css'
import { listaGeneralas, type AdatTipus } from './adat'
import Jatekter from './components/Jatekter'

const MIN = 3
const MAX = 15
const ALAP = 3   // alap meret

function nyertesKereso(lista: AdatTipus[], lepes: number): string | null {
  const mindKi = lista.every(e => !e.be)
  const mindBe = lista.every(e => e.be)

  if (mindKi && lepes === 0) return "kezdoKi"   // minden lampa lekapcsolva kezdesnel
  if (mindKi) return "nyert"                    // minden lampa lekapcsolva
  if (mindBe) return "mindBe"                   // minden lampa felkapcsolva
  return null                                   // egyenlore nem tortent semmi
}

function App() {
  /* functions */
  const [meret, setMeret] = useState(ALAP)              // meret (3-15)
  const [bevitel, setBevitel] = useState(String(ALAP))  // input
  const [hiba, setHiba] = useState('')
  const [lista, setLista] = useState<AdatTipus[]>(() => listaGeneralas(ALAP))
  const [lepes, setLepes] = useState(0)

  const eredmeny = nyertesKereso(lista, lepes)
  const vege = eredmeny === "nyert" || eredmeny === "kezdoKi"   // locked states

  function kivalasztKezelo(index: number) {
    if (vege) return   // ne legyen kattinthato ha vege a jateknak

    const sor = Math.floor(index / meret)
    const oszlop = index % meret

    const listaMasolat = [...lista]
    listaMasolat[index].be = !listaMasolat[index].be                                        // lampa katt

    if (sor > 0) listaMasolat[index - meret].be = !listaMasolat[index - meret].be           // fel
    if (sor < meret - 1) listaMasolat[index + meret].be = !listaMasolat[index + meret].be   // le
    if (oszlop > 0) listaMasolat[index - 1].be = !listaMasolat[index - 1].be                // balra
    if (oszlop < meret - 1) listaMasolat[index + 1].be = !listaMasolat[index + 1].be        // jobbra

    setLista(listaMasolat)
    setLepes(lepes + 1)
  }

  function ujJatek() {
    const szam = Number(bevitel)

    if (!Number.isInteger(szam) || szam < MIN || szam > MAX) {
      setHiba(`Adj meg egy egész számot ${MIN} és ${MAX} között!`)
      return
    }

    setHiba('')
    setMeret(szam)
    setLista(listaGeneralas(szam))
    setLepes(0)
  }

  return (
    <>
      {/* react fragment */}
      <header>
        <h1>Lights On</h1>
      </header>
      <section>
        {eredmeny === "nyert" && <p>Hurrá, meghosszabítottad a Föld életét!</p>}
        {eredmeny === "kezdoKi" && <p>Kétszer nem tudod megmenteni a Földet, kérlek utazz vissza az időben(indíts új játékot)!</p>}
        {eredmeny === "mindBe" && <p>A globális felmelegedés oldalán állsz? Kérlek próbáld újra!</p>}
      </section>
      <article>
        {/* ide kerül a jatek */}
        <Jatekter lista={lista} meret={meret} kivalasztKezelo={kivalasztKezelo} />
      </article>
      <section>
        <input
          type="number"
          min={MIN}
          max={MAX}
          value={bevitel}
          onChange={e => setBevitel(e.target.value)}
        />
        <button onClick={ujJatek}>Új játék</button>
        {hiba && <p>{hiba}</p>}
      </section>
      <footer><p>Gubek Vera</p></footer>
    </>
  )
}

export default App