"use server";

import { z } from "zod";

export async function createAction<TInput, TOutput>(config: {
  input?: TInput;
  schema?: z.Schema<TInput>;
  handler: (input?: TInput) => Promise<TOutput>;
}) {
  try {  
    const validatedInput = config.schema ? config.schema.parse(config.input) : config.input;
    const result = await config.handler(validatedInput);
    
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {      
      return { error: error.errors.map(err => `${err.path}: ${err.message}`).join(', ') };
    }
    return { error: "Create action error" };
  }
}