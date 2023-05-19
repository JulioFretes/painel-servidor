import hljs from "highlight.js";
import { Log } from "../../../../common/types";
import ScrollToBottom from "react-scroll-to-bottom";

import "highlight.js/styles/monokai-sublime.css";
import "./styles.css";

interface IProps {
    content: Log[];
}

const Code = ({ content }: IProps) => {
    const conteudo = content.map((line) => line.message).join("\n");

    return (
        <ScrollToBottom className="scroll-to-bottom-bg">
            <pre id="code-pre">
                <code
                    className="logs-code"
                    dangerouslySetInnerHTML={{
                        __html:
                            hljs.highlight(conteudo, {
                                language: "java",
                            }).value + "<br /><br />",
                    }}
                />
            </pre>
        </ScrollToBottom>
    );
};

export default Code;
