const axios = require('axios');

const fs = require('fs');

// Função para ler o conteúdo do arquivo e retornar uma Promise
function readContextFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
// Função principal para obter resposta da IA
function getAutoShopAIResponse(userQuestion){
    const filePath = './arquivo.txt'; // Insira o caminho do seu arquivo aqui

    // Chamar a função para ler o conteúdo do arquivo
    return readContextFromFile(filePath)
        .then(context => {
            // Conteúdo do arquivo está disponível aqui, você pode usá-lo conforme necessário
            // Por exemplo, você pode usá-lo como o contexto na chamada da IA
            const client = axios.create({
                baseURL: 'http://localhost:1234/v1',
                headers: {'Authorization':'Bearer not-needed'}
            });

            const data = {
                model: "local-model",
                messages: [
                    {"role": "system", "content": context},
                    {"role": "user", "content": userQuestion},
                ],
                temperature: 0.3,
                max_tokens: 256
            };

            // Retorna diretamente a Promise criada pelo axios
            return client.post('/chat/completions', data)
                .then(response=> {
                    return response.data.choices[0].message.content;
                })
                .catch(error =>{
                    console.log('Error:', error);
                    return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
                });
        })
        .catch(error => {
            console.error('Erro ao ler o arquivo:', error);
            return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
        });
}

module.exports = getAutoShopAIResponse;
