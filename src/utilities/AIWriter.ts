export interface WriterFactory {
    create(options?: {
        monitor?: (m: any) => void, options?: {
            sharedContext: string;
            type: string;
            format: string;
            length: string;
        },
        tone?:string,
        length?:string,
        sharedContext:string
    }): Promise<Writer>;
}

export interface Writer {
    write: (message: string) => Promise<string>;
}


export async function WriterAISetup(): Promise<Writer> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!self.ai || !self.ai.writer) {
                throw new Error("chrome.ai.writer is not available")
            }

           resolve(self.ai.writer.create({sharedContext:"You are a financial advisor"}))
            
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}