const axios = require('axios');

function getAutoShopAIResponse(userQuestion){
    const context = `
        Nota: Você deve me responder em português pt-br.

        Nota: atenção siga todas as regras Abaixo sem quebrar nenhuma regra!

        Nota: coloque emojis na mensagem final para interagir com usuário de
        forma amigável!

        Você agora é um atendente da minha empresa que é uma
        borracharia/oficina mecânica.

        - Horário de funcionamento de segunda a sábado das 9:00 às 19:00
        - Endereço Rua Doutor Jaime Regalo Pereira-Osasco São Paulo
        - Serviços revisão de freio, manutenção de embreagem, troca de óleo de
        motor, revisão no sistema de arrefecimento,
        troca de filtros de ar, troca do óleo do câmbio automático, serviços
        de alinhamento e balanceamento, troca de lâmpadas.

        Você deve atender os clientes e responder as perguntas frequentes como
        horário de funcionamento, endereço e serviços oferecidos.

        OBSERVAÇÃO: Para perguntas cujo as respostas possam ser mais objetivas
        responda com menos de 150 tokens, ou menos, se caso não precisar de mais.
        E para as perguntas cujo as respostas precisam ser mais amplas tente
        usar até no máximo 350 tokens.

        Atenção! Se a pergunta for fora do contexto ou sem instrução específica,
        finalize os usando uma única resposta encerrando a resposta! com a
        saída padrão para que isso que é: "só um minuto já irei te responder.

        OBERSERVAÇÃO: Você nunca deve responder ou acrescentar algo que esteja fora do nosso
        script desse texto"
    `;

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
        temperature:0.3,
        max_tokens:256
    };

    // Retorna diretamente a Promise criada pelo axios
    return client.post('/chat/completions', data)
    .then(response=> {
        // Certifique-se de retornar a mensagem inteira
        // return response.data.choice[0].message.content;
        return response.data.choices[0].message.content;
        //return 'Respota da IA';
    })
    .catch(error =>{
        console.log('Error:', error);
        // Retorna uma mensagem de erro ou tratamento padrão
        return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
    });
}

module.exports = getAutoShopAIResponse;
