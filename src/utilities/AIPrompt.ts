interface LanguageModel {
    create(options?: { monitor: (m: any) => void, systemPrompt?: string }): Promise<any>;
    capabilities(): Promise<{ available: 'no' | 'readily' | 'after-download'; defaultTopK: number; maxTopK: number; defaultTemperature: number }>;
    prompt: (message: string) => Promise<string>;
}

interface ChromeAIOriginTrial {
    languageModel: LanguageModel;
}

declare global {
    interface Window {
        ai: ChromeAIOriginTrial;
    }
}

export default async function AIPrompt(promptMessage:string) {

    if (!self.ai || !self.ai.languageModel) {
        console.error("chrome.ai.languageModel is not available");
        return;
    }

    try {
        const availability: 'no' | 'readily' | 'after-download' = (await self.ai.languageModel.capabilities()).available;

        if (availability == 'no') {
            console.error('Prompt API cannot be used at the moment')
            return
        }

        //model needs to be downloaded first if availability is after-download
        const session = await self.ai.languageModel.create({
            monitor(m: any) {
                console.log('monitoring')
                m.addEventListener("downloadprogress", (e: any) => {
                    console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                });
            },
            // systemPrompt: "Pretend to be an eloquent hamster."
        });

        console.log('model is ready to be used', session)

        const stream = await session.prompt(promptMessage)
        console.log(stream)

    } catch (error) {
        console.error("An error occurred:", error);
    }
}