// src/services/grokService.js

export const generateInterviewQuestions = async (
  role,
  domain,
  difficulty
) => {
  return [
    `What is ${domain}?`,
    `Explain the core concepts of ${domain}.`,
    `What are the advantages of ${domain}?`,
    `How is ${domain} used in real-world projects?`,
    `Explain advanced concepts in ${domain}.`,
    `What are common mistakes developers make in ${domain}?`,
    `How would you optimize performance in ${domain}?`,
    `What are the best practices for ${domain}?`,
    `Describe a project where you used ${domain}.`,
    `Why is ${domain} important for a ${role}?`
  ];
};

export const evaluateAnswer = async (question, answer) => {
  let score = 5;

  if (answer && answer.length > 50) score = 7;
  if (answer && answer.length > 100) score = 8;
  if (answer && answer.length > 200) score = 9;

  return {
    score,
    feedback: "Good answer. Try adding more technical details.",
    improvement:
      "Include real-world examples, edge cases, and practical implementation details."
  };
};