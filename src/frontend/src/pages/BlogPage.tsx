import { ArrowLeft, BookOpen, Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface BlogPageProps {
  onBack: () => void;
  onOpenPost: (id: number) => void;
}

const posts = [
  {
    id: 1,
    title: "The Science Behind a Fair Coin Flip",
    date: "March 20, 2026",
    category: "Science",
    excerpt:
      "Randomness is harder to achieve than it seems. Explore the mathematics of probability, the nature of pseudo-random number generators, and why a digital coin flip can be just as fair — or fairer — than a physical one.",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "10 Creative Ways to Use a Coin Flip",
    date: "March 10, 2026",
    category: "Decision Making",
    excerpt:
      "From choosing a restaurant when you can't agree to resolving who takes out the trash, the humble coin flip is the world's most underrated decision-making tool. Here are ten surprisingly clever ways to put it to work.",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The History of Heads or Tails",
    date: "February 28, 2026",
    category: "History",
    excerpt:
      "Long before smartphones and virtual coins, ancient Romans were flipping denarii to settle disputes. Trace the journey of the coin toss from the Roman Empire to the NFL Super Bowl — and discover why this 2,000-year-old tradition is still going strong.",
    readTime: "6 min read",
  },
];

export default function BlogPage({ onBack, onOpenPost }: BlogPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 pt-28 pb-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-toss-orange transition-colors mb-10 group"
          data-ocid="blog.back.button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-toss-orange" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-toss-orange/70 mb-1">
              Insights &amp; Stories
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              Blog
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-12 ml-16">
          Thoughts on randomness, decision-making, and the coin toss.
        </p>

        {/* Post grid */}
        <div className="grid md:grid-cols-1 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              className="glass-card rounded-3xl p-7 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[oklch(0.73_0.15_55/0.3)] transition-all duration-200 group"
              data-ocid={`blog.item.${i + 1}`}
            >
              {/* Index number accent */}
              <div className="flex-shrink-0 flex items-start">
                <span className="text-6xl font-black text-[oklch(0.73_0.15_55/0.1)] leading-none select-none group-hover:text-[oklch(0.73_0.15_55/0.2)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-toss-orange bg-[oklch(0.73_0.15_55/0.1)] px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <button
                  type="button"
                  onClick={() => onOpenPost(post.id)}
                  className="flex items-center gap-2 text-sm font-bold text-toss-orange hover:gap-3 transition-all duration-200"
                  data-ocid={`blog.read_more.button.${i + 1}`}
                >
                  Read More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA back */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onBack}
            className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-full hover:shadow-[0_0_30px_oklch(0.73_0.15_55/0.6)] hover:-translate-y-0.5 transition-all duration-200"
            data-ocid="blog.home.button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
