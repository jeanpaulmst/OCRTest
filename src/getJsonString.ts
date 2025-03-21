
import { Mistral } from '@mistralai/mistralai';
import dotenv from "dotenv";
import { z } from "zod";


const Head = z.object({

    FECHA_DE_EMISIÓN: z.string(),
    BOLETA_N: z.string(),
    Recaudador: z.string(),
    CUIT_Recaudador: z.string(),
    Financiador_Deudor: z.string(),
    CUIT_Deudor: z.string(),
    RNAS: z.string(),
    Domicilio: z.string()
})

const Fila = z.object({
    TIPO: z.string(),
    FACTURA: z.string(),
    FECHA_DE_EMISION : z.date(), 
    FECHA_VTO: z.date(), 
    EFECTOR_PRESTADOR: z.string(),
    SALDO_ADEUDADO: z.number()
})

const Boleta = z.object({
  head: Head,
  table: z.array(Fila),
  total: z.number()
});

const Book = z.object({
    name: z.string(),
    authors: z.array(z.string()),
  });


dotenv.config();

const getJSON = async (markdown : string) => {

    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({apiKey: apiKey});
    const agentId = process.env.AGENT_ID

    
    const chatResponse = await client.agents.complete({
        agentId: `${agentId}`,
        messages: [{role: 'user', content: markdown}],
        responseFormat: {type: 'json_object'},
    });

    //Verificar que la devolución no se undefined
    if (chatResponse.choices && chatResponse.choices.length > 0) {
        console.log('JSON:', chatResponse.choices[0].message.content);
        const jsonString = chatResponse.choices[0].message.content
        return String(jsonString)
    } else {
        console.error('No choices found in chat response');
        return ""
    }
}

export default getJSON