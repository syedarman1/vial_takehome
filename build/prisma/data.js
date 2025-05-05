"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeedData = void 0;
const crypto_1 = require("crypto");
const getSeedData = async () => {
    const formData = [
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you have any history of chronic diseases, such as diabetes, hypertension, or cardiovascular diseases?',
            answer: 'No',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Are you currently taking any prescription medications?',
            answer: 'Yes, antihypertensive medication',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Have you ever had an allergic reaction to any medications?',
            answer: 'Yes, I am allergic to penicillin.',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you smoke tobacco or use any nicotine products?',
            answer: 'No',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you regularly exercise or engage in physical activity?',
            answer: 'Yes, I walk for 30 minutes every day.',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you have a family history of cancer?',
            answer: 'Yes, my mother had breast cancer.',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Have you ever been hospitalized for any reason?',
            answer: 'Yes, I was hospitalized for surgery in 2019.',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you have any known food allergies?',
            answer: 'No',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you experience any frequent or chronic headaches?',
            answer: 'No',
        },
        {
            id: (0, crypto_1.randomUUID)(),
            question: 'Do you have any problems with your vision, such as blurred vision or eye strain?',
            answer: 'Occasionally, I experience eye strain after long periods of screen use.',
        },
    ];
    return {
        formData,
    };
};
exports.getSeedData = getSeedData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3ByaXNtYS9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUU1QixNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLFFBQVEsR0FBRztRQUNmO1lBQ0UsRUFBRSxFQUFFLElBQUEsbUJBQVUsR0FBRTtZQUNoQixRQUFRLEVBQ04sMEdBQTBHO1lBQzVHLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRDtZQUNFLEVBQUUsRUFBRSxJQUFBLG1CQUFVLEdBQUU7WUFDaEIsUUFBUSxFQUFFLHdEQUF3RDtZQUNsRSxNQUFNLEVBQUUsa0NBQWtDO1NBQzNDO1FBQ0Q7WUFDRSxFQUFFLEVBQUUsSUFBQSxtQkFBVSxHQUFFO1lBQ2hCLFFBQVEsRUFBRSw0REFBNEQ7WUFDdEUsTUFBTSxFQUFFLG1DQUFtQztTQUM1QztRQUNEO1lBQ0UsRUFBRSxFQUFFLElBQUEsbUJBQVUsR0FBRTtZQUNoQixRQUFRLEVBQUUsb0RBQW9EO1lBQzlELE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRDtZQUNFLEVBQUUsRUFBRSxJQUFBLG1CQUFVLEdBQUU7WUFDaEIsUUFBUSxFQUFFLDJEQUEyRDtZQUNyRSxNQUFNLEVBQUUsdUNBQXVDO1NBQ2hEO1FBQ0Q7WUFDRSxFQUFFLEVBQUUsSUFBQSxtQkFBVSxHQUFFO1lBQ2hCLFFBQVEsRUFBRSx5Q0FBeUM7WUFDbkQsTUFBTSxFQUFFLG1DQUFtQztTQUM1QztRQUNEO1lBQ0UsRUFBRSxFQUFFLElBQUEsbUJBQVUsR0FBRTtZQUNoQixRQUFRLEVBQUUsaURBQWlEO1lBQzNELE1BQU0sRUFBRSw4Q0FBOEM7U0FDdkQ7UUFDRDtZQUNFLEVBQUUsRUFBRSxJQUFBLG1CQUFVLEdBQUU7WUFDaEIsUUFBUSxFQUFFLHVDQUF1QztZQUNqRCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0Q7WUFDRSxFQUFFLEVBQUUsSUFBQSxtQkFBVSxHQUFFO1lBQ2hCLFFBQVEsRUFBRSxzREFBc0Q7WUFDaEUsTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNEO1lBQ0UsRUFBRSxFQUFFLElBQUEsbUJBQVUsR0FBRTtZQUNoQixRQUFRLEVBQ04sa0ZBQWtGO1lBQ3BGLE1BQU0sRUFDSix5RUFBeUU7U0FDNUU7S0FDRixDQUFBO0lBRUQsT0FBTztRQUNMLFFBQVE7S0FDVCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBNURZLFFBQUEsV0FBVyxlQTREdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByYW5kb21VVUlEIH0gZnJvbSAnY3J5cHRvJ1xuXG5leHBvcnQgY29uc3QgZ2V0U2VlZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGZvcm1EYXRhID0gW1xuICAgIHtcbiAgICAgIGlkOiByYW5kb21VVUlEKCksXG4gICAgICBxdWVzdGlvbjpcbiAgICAgICAgJ0RvIHlvdSBoYXZlIGFueSBoaXN0b3J5IG9mIGNocm9uaWMgZGlzZWFzZXMsIHN1Y2ggYXMgZGlhYmV0ZXMsIGh5cGVydGVuc2lvbiwgb3IgY2FyZGlvdmFzY3VsYXIgZGlzZWFzZXM/JyxcbiAgICAgIGFuc3dlcjogJ05vJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiByYW5kb21VVUlEKCksXG4gICAgICBxdWVzdGlvbjogJ0FyZSB5b3UgY3VycmVudGx5IHRha2luZyBhbnkgcHJlc2NyaXB0aW9uIG1lZGljYXRpb25zPycsXG4gICAgICBhbnN3ZXI6ICdZZXMsIGFudGloeXBlcnRlbnNpdmUgbWVkaWNhdGlvbicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgcXVlc3Rpb246ICdIYXZlIHlvdSBldmVyIGhhZCBhbiBhbGxlcmdpYyByZWFjdGlvbiB0byBhbnkgbWVkaWNhdGlvbnM/JyxcbiAgICAgIGFuc3dlcjogJ1llcywgSSBhbSBhbGxlcmdpYyB0byBwZW5pY2lsbGluLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgcXVlc3Rpb246ICdEbyB5b3Ugc21va2UgdG9iYWNjbyBvciB1c2UgYW55IG5pY290aW5lIHByb2R1Y3RzPycsXG4gICAgICBhbnN3ZXI6ICdObycsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgcXVlc3Rpb246ICdEbyB5b3UgcmVndWxhcmx5IGV4ZXJjaXNlIG9yIGVuZ2FnZSBpbiBwaHlzaWNhbCBhY3Rpdml0eT8nLFxuICAgICAgYW5zd2VyOiAnWWVzLCBJIHdhbGsgZm9yIDMwIG1pbnV0ZXMgZXZlcnkgZGF5LicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgcXVlc3Rpb246ICdEbyB5b3UgaGF2ZSBhIGZhbWlseSBoaXN0b3J5IG9mIGNhbmNlcj8nLFxuICAgICAgYW5zd2VyOiAnWWVzLCBteSBtb3RoZXIgaGFkIGJyZWFzdCBjYW5jZXIuJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiByYW5kb21VVUlEKCksXG4gICAgICBxdWVzdGlvbjogJ0hhdmUgeW91IGV2ZXIgYmVlbiBob3NwaXRhbGl6ZWQgZm9yIGFueSByZWFzb24/JyxcbiAgICAgIGFuc3dlcjogJ1llcywgSSB3YXMgaG9zcGl0YWxpemVkIGZvciBzdXJnZXJ5IGluIDIwMTkuJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiByYW5kb21VVUlEKCksXG4gICAgICBxdWVzdGlvbjogJ0RvIHlvdSBoYXZlIGFueSBrbm93biBmb29kIGFsbGVyZ2llcz8nLFxuICAgICAgYW5zd2VyOiAnTm8nLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IHJhbmRvbVVVSUQoKSxcbiAgICAgIHF1ZXN0aW9uOiAnRG8geW91IGV4cGVyaWVuY2UgYW55IGZyZXF1ZW50IG9yIGNocm9uaWMgaGVhZGFjaGVzPycsXG4gICAgICBhbnN3ZXI6ICdObycsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgcXVlc3Rpb246XG4gICAgICAgICdEbyB5b3UgaGF2ZSBhbnkgcHJvYmxlbXMgd2l0aCB5b3VyIHZpc2lvbiwgc3VjaCBhcyBibHVycmVkIHZpc2lvbiBvciBleWUgc3RyYWluPycsXG4gICAgICBhbnN3ZXI6XG4gICAgICAgICdPY2Nhc2lvbmFsbHksIEkgZXhwZXJpZW5jZSBleWUgc3RyYWluIGFmdGVyIGxvbmcgcGVyaW9kcyBvZiBzY3JlZW4gdXNlLicsXG4gICAgfSxcbiAgXVxuXG4gIHJldHVybiB7XG4gICAgZm9ybURhdGEsXG4gIH1cbn1cbiJdfQ==