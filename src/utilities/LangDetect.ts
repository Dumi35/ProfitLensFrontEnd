interface TranslationDetector {
    detect: (input: string) => Promise<[{
        detectedLanguage:any,
        confidence: any
    }]>;
    ready: Promise<void>;
    addEventListener: (
        event: 'downloadprogress',
        listener: (e: { loaded: number; total: number }) => void
    ) => void;
}

interface Translation {
    canDetect: () => Promise<'no' | 'readily' | 'afterdownload'>;
    createDetector: () => Promise<TranslationDetector>;
}

declare global {
    interface Window {
        translation: Translation;
    }
}

export default function LangDetect(input:string) {
    if ('translation' in self && 'canDetect' in self.translation) {
        // The Language Detector API is available.
        console.log('Language Detector API is available.');

        async function languageDetection(): Promise<void> {
            try {
                const canDetect: 'no' | 'readily' | 'afterdownload' = await self.translation.canDetect();
                let detector: TranslationDetector | null = null;

                if (canDetect === 'no') {
                    console.log('Language detection is not available.');
                    return;
                }

                // Create the language detector based on availability
                detector = await self.translation.createDetector();

                if (canDetect === 'afterdownload') {
                    // Attach a progress event listener if model download is required
                    detector.addEventListener('downloadprogress', (e: { loaded: number; total: number }) => {
                        console.log(`Download Progress: ${e.loaded}/${e.total}`);
                    });

                    // Wait for the detector to be ready
                    await detector.ready;
                }

                console.log('Language detection is ready to use.');
                // Example usage of the detector
                const detectedLanguages = await detector.detect(input);
                // console.log(`Detected Language: ${detectedLanguage}`);
                for (const result of detectedLanguages) {
                    // Show the full list of potential languages with their likelihood, ranked
                    // from most likely to least likely. In practice, one would pick the top
                    // language(s) that cross a high enough threshold.
                    console.log(result.detectedLanguage, result.confidence);
                  }
            } catch (error) {
                console.error('Error during language detection:', error);
            }
        }

        languageDetection();
    } else {
        console.log('Language Detector API is not available in this environment.');
    }

}