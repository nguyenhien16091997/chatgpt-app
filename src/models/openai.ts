export interface OpenAiType {
  choices: { message: { content: string; role: string } }[];
}

export interface ChatType {
  id: string;
  ask: string;
  answer: string;
}
