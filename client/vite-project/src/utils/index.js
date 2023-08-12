import { surpriseMePrompts } from "../constants";
export const getRandomPrompts = (prompts) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPromts = surpriseMePrompts[randomIndex];

  if (randomPromts === prompts) return getRandomPrompts(prompts);

  return randomPromts;
};
