export interface Prompt {
  role: PromptRole,
  content: string
};

export declare const PromptRole: {
  readonly System: "system";
  readonly User: "user";
  readonly Assistant: "assistant";
}

export declare type PromptRole = typeof PromptRole[keyof typeof PromptRole];