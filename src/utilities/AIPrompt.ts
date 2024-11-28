interface LanguageModelFactory {
    create(options?: { monitor: (m: any) => void, systemPrompt?: string }): Promise<LanguageModel>;
    capabilities(): Promise<{ available: 'no' | 'readily' | 'after-download'; defaultTopK: number; maxTopK: number; defaultTemperature: number }>;
}

export interface LanguageModel {
    prompt: (message: string) => Promise<string>;
}

interface ChromeAIOriginTrial {
    languageModel: LanguageModelFactory;
}

declare global {
    interface Window {
        ai: ChromeAIOriginTrial;
    }
}

//write a setup and prompt functions as separate
export async function AISetup():  Promise<LanguageModel> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!self.ai || !self.ai.languageModel) {
                throw new Error("chrome.ai.languageModel is not available")
            }
            const availability: 'no' | 'readily' | 'after-download' = (await self.ai.languageModel.capabilities()).available;

            if (availability == 'no') {
                throw new Error("Prompt API cannot be used at the moment")
            }

            //model needs to be downloaded first if availability is after-download
            const session = await self.ai.languageModel.create(
                // systemPrompt: "Pretend to be an eloquent hamster."
            );

            if (session) {
                resolve(session)
            }
        } catch (error) {
            console.error(error)
            reject(error)
        }

    })
}
