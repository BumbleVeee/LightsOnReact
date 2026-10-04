import './Jatekter.css'
import type { AdatTipus } from '../adat'
import Elem from './Elem'

interface JatekterProps {
    lista: AdatTipus[];
    meret: number;
    kivalasztKezelo: (index: number) => void;
}

export default function Jatekter({ lista, meret, kivalasztKezelo }: JatekterProps) {
    const racsStilus = { gridTemplateColumns: `repeat(${meret}, 1fr)` }

    return (
        <div className="jatekter" style={racsStilus}>
            {lista.map((e, i) => (
                <Elem adat={e} key={i} index={i} kivalasztKezelo={kivalasztKezelo} />
            ))}
        </div>
    )
}