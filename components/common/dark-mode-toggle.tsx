import {MdNightlight, MdWbSunny} from "react-icons/md";
export type Lighting = 'light' | 'dark';

export default function DarkModeToggle ({mode} : {mode: Lighting}) {
    if (mode === 'light') {
        return <MdNightlight size="1.5em" color="var(--moonbag-black-text)"/>
    }
    return <MdWbSunny size="1.5em" color="var(--moonbag-white-text)"/>
}
