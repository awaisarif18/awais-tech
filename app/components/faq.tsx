import { Plus } from "lucide-react";

const questions = [
  {
    question: "What Does a Forward Deployed AI Engineer Do?",
    answer: "I work directly with your team to understand a manual workflow, build the software around it, and test it on examples you already handle. I focus on document review, knowledge-base chatbots, and survey analysis.",
  },
  {
    question: "Can You Build a Chatbot That Cites Our Documents?",
    answer: "Yes. A retrieval-augmented generation (RAG) chatbot searches your PDFs or knowledge base before answering. I can show which passages support an answer and test what happens when the documents do not cover the question.",
  },
  {
    question: "Can You Automate Open-Ended Survey Analysis?",
    answer: "Yes. I can build a workflow that identifies themes, scores sentiment by theme, and lets an analyst check and correct the tags. In an internal evaluation of 500 open-ended responses, my survey pipeline reached 80% theme matching and 94% sentiment accuracy.",
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
