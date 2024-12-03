import { SummarizerFactory } from "./AISummarise";
import { WriterFactory } from "./AIWriter";

interface LanguageModelFactory {
    create(options?: { monitor?: (m: any) => void, systemPrompt?: string }): Promise<LanguageModel>;
    capabilities(): Promise<{ available: 'no' | 'readily' | 'after-download'; defaultTopK: number; maxTopK: number; defaultTemperature: number }>;
}

export interface LanguageModel {
    prompt: (message: string) => Promise<string>;
}

interface ChromeAIOriginTrial {
    languageModel: LanguageModelFactory;
    summarizer: SummarizerFactory;
    writer: WriterFactory
}

declare global {
    interface Window {
        ai: ChromeAIOriginTrial;
    }
}


export async function PromptAISetup():  Promise<LanguageModel> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!self.ai || !self.ai.languageModel) {
                throw new Error("chrome.ai.languageModel is not available")
            }
            const availability: 'no' | 'readily' | 'after-download' = (await self.ai.languageModel.capabilities()).available;

            if (availability == 'no') {
                throw new Error("Prompt API cannot be used at the moment")
            }
            
            const session = await self.ai.languageModel.create({
                systemPrompt: `You are an AI assistant that specializes in analyzing financial graph data. Whenever asked a question, refer to the provided graph context. Always interpret and respond based on this context. 
                Graph 1 is (series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'])
                `
            });

            //model needs to be downloaded first if availability is after-download
            // const session = await self.ai.languageModel.create(
            //     // systemPrompt: "Pretend to be an eloquent hamster."
            // );

            if (session) {
                resolve(session)
            }
        } catch (error) {
            console.error(error)
            reject(error)
        }

    })
}
