import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

export const langs = new Map([
    ['C-like', cpp()],
    ['javascript', javascript({ jsx: true, typescript: true })],
    ['python', python()],
    ['java', java()],
    ['html', html()],
    ['css', css()],
]);

export const LangSelector = ({ cb }) => {

    const handleSelect = (e) => {
        const value = e.target.value
        cb(value)
    }
    return (
        <select className='p-1 rounded bg-slate-700 active:outline-none focus:outline-none' onChange={handleSelect} name="" id="">
            {Array.from(langs.keys()).map((lang, i) => (
                <option className='outline-none' key={i} value={lang} >{lang}</option>
            ))}
        </select>
    )
}
