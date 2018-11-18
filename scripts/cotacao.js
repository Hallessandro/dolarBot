// Description:</github>
//   Retorna a última cotação da moeda passada como parâmetro
//
// Commands:
//   hubot cotacao moeda - Retorna a última cotação da moeda passada como parâmetro
//   hubot moedas disponiveis - Retorna a lista de moedas disponiveis para consulta
// Author:
//   hallessandro <hd.jesus93@gmail.com>

module.exports = (robot) => {
    robot.respond(/cota(c|ç)(a|ã)o do (.*)/, res => {
        let moeda = res.match[3]; 
        robot.http(`http://economia.awesomeapi.com.br/json/${moeda}/1`)
            .get() ((err, resp, body) => {
                if(err) res.reply("houve um erro na comunicação com API, tente de novo!")

                let resultado = JSON.parse(body);
                res.reply(`R$ ${resultado[0].bid}`);
            })
    });

    robot.respond(/moedas dispon(i|í)veis/, res => {
        res.reply(` segue a lista: 
            USD-BRL (Dólar Comercial)
            USD-BRLT (Dólar Turismo)
            CAD-BRL (Dólar Canadense)   
            EUR-BRL (Euro)
            GBP-BRL (Libra Esterlina)
            ARS-BRL (Peso Argentino)
            BTC-BRL (Bitcoin)
        `)
    })
}
