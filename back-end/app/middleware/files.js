const fs = require("fs");
const axios = require("axios");

/**
 * Verifica se o arquivo existe no diretório especificado
 * @param {string} arquivo Ex: /home/usuario/pasta/arquivo.log
 * @returns {boolean}
 */
function arquivoExiste(arquivo) {
    return fs.existsSync(arquivo);
}

/**
 * Cria um arquivo no diretório especificado, se o diretório pai não existir, ele é criado
 * @param {string} arquivo Ex: /home/usuario/pasta/arquivo.log
 */
function criarDiretorio(dir) {
    fs.mkdirSync(dir, {
        recursive: true,
    });
}

/**
 * Escreve no arquivo especificado, se o arquivo não existir, ele é criado
 * @param {string} arquivo Ex: /home/usuario/pasta/arquivo.log
 * @param {string} dados Ex.: eula=true
 * @param {boolean} append Se true, os dados serão adicionados ao final do arquivo, se false, o arquivo será sobrescrito
 */
function escreverArquivo(arquivo, dados, append) {
    try {
        if (!arquivoExiste(arquivo))
            criarDiretorio(arquivo.split("/").slice(0, -1).join("/"));
    } catch (e) {}
    if (append) fs.appendFileSync(arquivo, dados);
    else fs.writeFileSync(arquivo, dados);
}

/**
 * Lê o arquivo especificado
 * @param {string} arquivo Ex: /home/usuario/pasta/arquivo.log
 * @param {function} onResult Função de callback, recebe (err: NodeJS.ErrnoException | null, data: string) => void
 * @returns {string}
 */
function lerArquivo(arquivo, callback) {
    if (!arquivoExiste(arquivo)) escreverArquivo(arquivo, "");
    fs.readFile(arquivo, "utf8", callback);
}

/**
 * Baixa um arquivo de uma URL e salva no diretório especificado,
 * se o arquivo já existir, ele não é baixado novamente
 * @param {string} url
 * @param {string} destino
 * @param {string} nomeArquivo
 * @returns {void}
 */
async function baixar(url, destino, nomeArquivo) {
    if (destino.endsWith("/")) destino = destino.slice(0, -1);
    if (!arquivoExiste(destino)) criarDiretorio(destino);
    else if (arquivoExiste(`${destino}/${nomeArquivo}`)) return;

    console.warn("Baixando ", url);
    const arquivoBaixado = await axios.get(downloadLink, {
        responseType: "arraybuffer",
    });
    fs.writeFileSync(`${destino}/${nomeArquivo}`, arquivoBaixado.data);
}

module.exports = {
    arquivoExiste,
    criarDiretorio,
    escreverArquivo,
    lerArquivo,
    baixar,
};
