import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

interface BlogPostPageProps {
  postId: number;
  onBack: () => void;
}

const posts = [
  {
    id: 1,
    title: "The Science Behind a Fair Coin Flip",
    date: "March 20, 2026",
    category: "Science",
    readTime: "5 min read",
    excerpt:
      "Randomness is harder to achieve than it seems. Explore the mathematics of probability, the nature of pseudo-random number generators, and why a digital coin flip can be just as fair — or fairer — than a physical one.",
    sections: [
      {
        heading: "The Mathematics of a Coin Flip",
        body: "At its core, a coin flip is a binary random event — two equally probable outcomes, heads or tails, each with a theoretical probability of 50%. This elegant simplicity is expressed as P(H) = P(T) = 0.5, where the sum of all probabilities equals exactly 1. The Law of Large Numbers tells us that as the number of flips approaches infinity, the ratio of heads to tails converges toward this 50/50 ideal. In practice, however, even a thousand flips may show a slight lean in one direction — this is normal statistical variance, not a broken coin.\n\nBernoulli trials — named after Swiss mathematician Jacob Bernoulli — are the formal model for independent binary events like coin flips. Each trial is independent of the last, meaning a run of five heads in a row does not make tails more likely on the sixth flip. This misconception, known as the Gambler's Fallacy, has tripped up millions of decision-makers throughout history. Understanding this independence is key to trusting randomness.",
      },
      {
        heading: "What Is Randomness?",
        body: "True randomness — called hardware randomness — comes from genuinely unpredictable physical processes: radioactive decay, thermal noise in electrical circuits, or atmospheric noise. These sources produce numbers that are statistically indistinguishable from pure chance because they arise from quantum uncertainty or environmental chaos.\n\nPseudo-random number generators (PRNGs), by contrast, use deterministic algorithms starting from a seed value. Given the same seed, a PRNG will always produce the same sequence. Early PRNGs like the linear congruential generator were predictable enough to be exploited in gambling software. Modern PRNGs like the Mersenne Twister are vastly better, generating sequences that pass rigorous statistical tests — but they are still theoretically predictable if you know the seed.\n\nCryptographically Secure Pseudo-Random Number Generators (CSPRNGs) bridge this gap. They seed themselves from system entropy — the cumulative unpredictability of mouse movements, keystroke timing, hardware interrupts, and other environmental events — making them computationally infeasible to predict. Most modern operating systems and browsers expose CSPRNGs via APIs like window.crypto.getRandomValues().",
      },
      {
        heading: "Why Digital Can Be Fairer",
        body: "It might seem paradoxical: how can a software flip be fairer than a real coin? The answer lies in physical bias. Research published in the American Journal of Physics found that physically flipped coins can exhibit measurable bias based on how they are held and released. A coin starting heads-up is slightly more likely to land heads-up — by as much as 1% in controlled trials. Manufacturing imperfections, uneven weight distribution, and spin mechanics all introduce subtle asymmetries.\n\nA digital coin flip using a CSPRNG has none of these physical biases. The algorithm doesn't care which side was last shown. Each bit in the result is generated from fresh entropy, uncorrelated with previous outcomes. When you flip using this app, the result comes from window.crypto.getRandomValues() — the same cryptographic randomness underpinning HTTPS encryption and secure banking. For the purest 50/50 decision, a well-designed digital flip is the gold standard.",
      },
    ],
  },
  {
    id: 2,
    title: "10 Creative Ways to Use a Coin Flip",
    date: "March 10, 2026",
    category: "Decision Making",
    readTime: "4 min read",
    excerpt:
      "From choosing a restaurant when you can't agree to resolving who takes out the trash, the humble coin flip is the world's most underrated decision-making tool. Here are ten surprisingly clever ways to put it to work.",
    sections: [
      {
        heading: "Ten Uses You Haven't Thought Of",
        body: "**1. Restaurant Roulette.** Can't agree on Italian vs. Thai? Assign each option to a side and flip. The beauty isn't just the decision — it's the psychological reveal. If you feel disappointed when the coin lands, that's a signal you actually wanted the other option. Use the flip to surface your real preferences.\n\n**2. Chore Assignment.** Assign household tasks fairly without arguments. Make a bracket: flip to determine who picks the first chore, then alternate. The randomness removes the sting of 'you always make me do the dishes.'\n\n**3. Breaking Group Ties.** Democracy sometimes deadlocks. When a group vote ends in a tie, the coin flip is a neutral, undisputed tiebreaker that everyone can accept — because no one is to blame.\n\n**4. Creative Writing Prompts.** Assign heads = action scene and tails = dialogue scene. Flip at the start of each writing session to constrain your choices and spark creativity. Constraints are one of the most powerful creative tools available.\n\n**5. Workout Variation.** Heads = cardio, tails = strength training. Randomizing your routine prevents adaptation plateaus and keeps things mentally fresh.\n\n**6. Road Trip Route.** At every junction without a strong preference, flip the coin. Letting randomness navigate occasionally leads to the most memorable detours and discoveries.\n\n**7. Gift Selection.** Narrowed your gift ideas to two strong options? Flip for it. The resulting choice often feels more intentional to the recipient than agonizing analysis.\n\n**8. Book Reading Order.** Have a stack of unread books with no clear priority? Flip through a bracket to set your reading order. This also defeats the paralysis of finding the 'perfect next book.'\n\n**9. Settling Sports Disputes.** Who serves first? Who picks the starting position? A quick flip is faster than any argument and more fair than seniority or volume.\n\n**10. Morning Routine Order.** Shower first or coffee first? Randomizing low-stakes routines occasionally can break mental ruts and make mornings feel surprisingly fresh.",
      },
      {
        heading: "The Psychology of the Flip",
        body: "There's a deeper reason the coin flip works beyond mere randomness: it externalizes decision-making. When the stakes are low and both options are roughly equal, the mental energy spent on deliberation is often wasted. The coin flip gives permission to stop thinking and start acting.\n\nGary Klein, a cognitive psychologist known for his work on decision-making under uncertainty, notes that experienced decision-makers rely on gut recognition — a mode the coin flip can helpfully activate by surfacing emotional reactions to outcomes. Use the coin flip not just as a decider but as a diagnostic. Your emotional response when the result lands often tells you more about your actual preferences than hours of careful deliberation.",
      },
    ],
  },
  {
    id: 3,
    title: "The History of Heads or Tails",
    date: "February 28, 2026",
    category: "History",
    readTime: "6 min read",
    excerpt:
      "Long before smartphones and virtual coins, ancient Romans were flipping denarii to settle disputes. Trace the journey of the coin toss from the Roman Empire to the NFL Super Bowl — and discover why this 2,000-year-old tradition is still going strong.",
    sections: [
      {
        heading: "Ancient Origins",
        body: "The coin toss is one of humanity's oldest surviving decision-making rituals, with roots stretching back to the Roman Republic. Romans flipped the denarius — a silver coin bearing the emperor's profile — to resolve disputes. They called the practice 'navia aut caput,' meaning 'ship or head,' referring to the imagery on either side of their coins. The ship (navia) occupied the reverse; the head of the emperor, the obverse. This ancient phrasing echoes directly in the modern 'heads or tails' we use today.\n\nRomans considered the coin toss semi-sacred: a random outcome was interpreted as the will of Jupiter, king of the gods. Invoking randomness wasn't considered lazy decision-making — it was considered divine arbitration, above human bias. The practice spread through the Empire, used in legal disputes, inheritance quarrels, and even military decisions when Roman officers were equally matched in rank and authority.",
      },
      {
        heading: "Medieval Traditions",
        body: "Following the fall of Rome, coin flipping persisted through the medieval period across Europe, evolving in form as coinage changed. In medieval England, the practice was known as 'cross and pile' — the cross being the embossed Christian cross on one face of most medieval coins, and the pile being the anvil indentation visible on the reverse from the minting process.\n\nCross and pile was popular enough to be explicitly referenced in records of medieval English law as an acceptable means of settling minor disputes. Geoffrey Chaucer mentioned a form of the practice in 14th-century texts. Throughout this era, the spiritual dimension persisted: chance outcomes were seen as reflecting Providence, making the coin toss morally neutral and therefore legitimate.\n\nThe shift from religious to purely secular interpretation came gradually with the Enlightenment, as probability theory emerged and thinkers like Pascal, Fermat, and later Bernoulli began to mathematize chance. By the 18th century, the coin toss was understood as a matter of physics and probability rather than divine will — though its social legitimacy as a fair arbiter remained entirely intact.",
      },
      {
        heading: "The Modern Coin Toss",
        body: "The phrase 'heads or tails' in its modern English form became standardized in the 19th century, coinciding with the spread of industrially minted coins with clearly defined relief on both sides. As coins became more uniform, the tradition gained a democratic impartiality: every coin was essentially the same, so the flip was as fair as anything could be.\n\nThe most famous institutionalization of the coin toss in modern times is the NFL Super Bowl. Since the first Super Bowl in 1967, a ceremonial coin toss has preceded each game to determine which team gets to choose possession or field position. The Super Bowl toss has its own lore: from 1998 to 2011, the NFC won 14 consecutive tosses — a streak so improbable (probability: 1 in 16,384) that it spawned conspiracy theories and formal statistical analysis.\n\nHistorically consequential coin tosses include the 1903 Wright Brothers' flip to determine who would attempt the first powered flight (Wilbur won the toss, but his attempt failed; Orville made history three days later). In music, a coin toss reportedly influenced the lineup order of several classic rock albums. And in sports, countless championships have hinged on overtime possession decisions that began with a referee reaching into their pocket.\n\nToday, digital coin flip apps carry this 2,000-year tradition into the 21st century. What began as divine arbitration in the Roman Forum, evolved through medieval cross-and-pile and Enlightenment probability theory, persists in the form of a button press and a cryptographically secure algorithm. The mechanism has changed; the function — a fair, neutral, instantly accepted decision — has not.",
      },
    ],
  },
];

export default function BlogPostPage({ postId, onBack }: BlogPostPageProps) {
  const post = posts.find((p) => p.id === postId) ?? posts[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 pt-28 pb-20"
    >
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-toss-orange transition-colors mb-10 group"
          data-ocid="blog_post.back.button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-toss-orange bg-[oklch(0.73_0.15_55/0.1)] px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed border-l-2 border-toss-orange/40 pl-5">
            {post.excerpt}
          </p>
        </motion.header>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-10 space-y-10"
          data-ocid="blog_post.panel"
        >
          {post.sections.map((section, i) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
            >
              <h2 className="text-lg md:text-xl font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-3">
                <span className="inline-block w-6 h-0.5 bg-toss-orange flex-shrink-0" />
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.split("\n\n").map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="text-muted-foreground text-sm md:text-base leading-relaxed"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled static content
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(
                          /\*\*(.+?)\*\*/g,
                          '<strong class="text-foreground font-semibold">$1</strong>',
                        )
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-toss-orange transition-colors group"
            data-ocid="blog_post.back_bottom.button"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            More Articles
          </button>
          <span className="hidden sm:block text-muted-foreground/30">|</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Toss Blog</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
