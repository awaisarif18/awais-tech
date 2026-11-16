import { Plus } from "lucide-react";

const questions = [
  {
    question: "What kinds of projects do you take on?",
    answer: "I build tools for teams that spend hours going through feedback, finding answers in documents, or checking records against each other. A good starting point is a job someone on your team already does and can show me.",
  },
  {
    question: "What should I bring to the discovery call?",
    answer: "Bring one example of the work, such as a survey response, a document question, or a record someone has to review. Tell me what takes the most time and what a good result looks like. An anonymized example works well.",
  },
  {
    question: "Can you work with the tools we already use?",
    answer: "We’ll start with where the work happens today. A first version can often use an export from your existing tools. If that saves time, we can look at connecting the systems directly.",
  },
  {
    question: "How do you check the AI’s output?",
    answer: "I test it against examples your team has reviewed, including cases people disagree on. Depending on the task, I’ll show the source behind an answer, let reviewers correct a tag, or send uncertain results to a person.",
  },
];

export function FAQ() {
  return (
    <section className="section-shell faq" id="faq" aria-labelledby="faq-title">
      <h2 className="section-title" id="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {questions.map(({ question, answer }) => (
          <details key={question} name="portfolio-faq">
            <summary>{question}<Plus aria-hidden="true" size={20} /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
