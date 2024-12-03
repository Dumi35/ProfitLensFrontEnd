export interface SummarizerFactory {
    create(options?: {
        monitor?: (m: any) => void, options?: {
            sharedContext: string;
            type: string;
            format: string;
            length: string;
        }
    }): Promise<Summarizer>;
    capabilities(): Promise<{ available: 'no' | 'readily' | 'after-download' }>;
}

export interface Summarizer {
    prompt: (message: string) => Promise<string>;
    ready: any
}


export async function PromptAISetup(): Promise<Summarizer> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!self.ai || !self.ai.summarizer) {
                throw new Error("chrome.ai.summariser is not available")
            }

            const available = (await self.ai.summarizer.capabilities()).available;
            let summarizer;
            const options = {
                sharedContext: 'This is a scientific article',
                type: 'key-points',
                format: 'markdown',
                length: 'medium',
            };

            if (available === 'no') {
                throw new Error("Summarizer API cannot be used at the moment")
                return;
            }
            if (available === 'readily') {
                // The Summarizer API can be used immediately .              
                summarizer = await self.ai.summarizer.create({options});
                resolve(summarizer)
            } else {
                // The Summarizer API can be used after the model is downloaded.
                summarizer = await self.ai.summarizer.create({
                    monitor(m: any) {
                        m.addEventListener("downloadprogress", (e: any) => {
                            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                        });
                    },
                    options
                });
                console.log(await summarizer.ready)
            }

        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}