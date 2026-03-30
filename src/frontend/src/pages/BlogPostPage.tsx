import { ArrowLeft, BookOpen, Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";

interface BlogPostPageProps {
  postId: number;
  onBack: () => void;
}

const p1s1 = `I have a quarter — the old kind, from 1987, slightly worn on the edges — that I swear always lands heads. I know, I know. Every gambler thinks the dice are loaded when they're losing. But hear me out: I actually started tracking it.

Over about six months, I flipped this particular quarter 200 times in controlled conditions (yes, I'm that person). The result? Heads 109 times. Tails 91. That's a 54.5% heads rate. Not dramatic, but statistically not nothing either. I couldn't stop thinking about it.

So I went looking for answers. And what I found made me fundamentally rethink which is more trustworthy — a physical coin or a digital one.`;

const p1s2 = `Here's something that should get your attention: Persi Diaconis, a professor of mathematics and statistics at Stanford University, has spent serious academic time studying whether physical coin flips are truly fair. His research, co-authored with Susan Holmes and Richard Montgomery, found that a coin is slightly more likely to land on whichever side was facing up when you started the flip — by about 51% versus 49%.

The reason is something called precession. When a coin spins through the air, it wobbles slightly around its central axis — like a gyroscope slowing down. This wobble creates a subtle mechanical bias toward the starting face. The effect is small. But it's real, measurable, and consistent.

Diaconis also found that experienced coin flippers can actually catch the coin in the same orientation they flipped it in roughly 100% of the time if they practice. So if someone "skilled" at coin flipping is settling something important with you, well... just something to keep in mind.`;

const p1s3 = `Look, I know this sounds like nerd stuff. Bear with me for two minutes.

When this app generates a coin flip result, it calls a JavaScript function called window.crypto.getRandomValues(). That function reaches into your browser's cryptographic entropy pool — a constantly updating stream of randomness generated from things like the exact timing of your keystrokes, mouse movement microvariations, network packet arrival times, and hardware-level thermal noise.

It's the same technology that generates the encryption keys for HTTPS — the padlock you see on every secure website. When your bank sends you data over the internet, it's protected by randomness from the same source. When you flip a coin in this app, you're using the exact same class of randomness.

Cryptographically secure random numbers have no precession bias. There's no physical wobble. No worn edge. No thumb technique. The output is mathematically independent from every previous output, which is a property that even well-made physical coins can't guarantee.`;

const p1s4 = `I've been thinking about why this matters beyond coin flips specifically. We often trust physical things more than digital ones because we can see them, hold them, feel their weight. A real coin has a tangible heft that makes it seem trustworthy. A button on a screen feels abstract.

But trust should follow evidence, not intuition. My worn 1987 quarter is demonstrably biased. The window.crypto API has been audited by cryptographers, implemented by browser security teams, and tested under adversarial conditions for decades. There's genuinely more evidence that the digital flip is fair.

I'm not saying throw your coins away. There's something satisfying about a physical flip that a tap on a screen can't fully replicate. But if you're using a coin to settle something where fairness actually matters? The digital version isn't just as good — it's better. And now you know why.`;

const p2s1 = `Every weekday at noon, our team of six people would descend into what I privately called The Lunch Debate. It went like this: someone would suggest tacos, someone else would object because we had tacos Tuesday, someone would propose the Thai place, someone would point out there's a wait on Thursdays, and twenty minutes later we'd end up at the same sandwich shop we always go to anyway because it was the only option nobody actively vetoed.

This happened every single day. I timed it once: 23 minutes of group deliberation for an outcome that was predictable from minute two. We were burning nearly two hours a week on sandwiches.

My coworker Priya suggested we just flip a coin. I thought that was lazy and kind of disrespectful to the actual quality of the decision. "Where we eat matters," I said, with more conviction than it deserved. She looked at me like I was unwell. "Sam," she said, "it's lunch."`;

const p2s2 = `We gave it a shot. Over three months, I kept a running note of where the flip sent us. In that time we ate at 14 different places. Before the flip system, I'd estimate we had a rotation of maybe five.

Two of those 14 places have become genuine favorites. One was a Peruvian spot none of us had noticed despite it being two blocks away for two years. Another was a food truck that only operates on certain weekdays — we would never have found it on our own rotation because we'd never have gone looking. We stumbled into it because the coin said to walk that direction.

But here's what got more interesting to me: the coin flip also revealed a lot about what I actually wanted. Barry Schwartz wrote a book called The Paradox of Choice that I'd read in college and mostly forgotten. His central argument is that having more options doesn't make us happier — it makes us more anxious, more second-guessing, and ultimately less satisfied with whatever we choose. We spend so much energy worrying we picked wrong that we can't enjoy what we picked.

The coin flip removed that. When the coin said Peruvian place, I stopped asking whether Thai would have been better. The decision was made. There was nothing to second-guess.`;

const p2s3 = `Here's the thing I eventually figured out: the coin flip wasn't really making the decision. It was giving us permission to stop deliberating. And that's a completely different function.

For low-stakes decisions — the kind where both options are genuinely fine and the main drag is the decision process itself — the deliberation cost is higher than the decision is worth. Spending 20 minutes choosing between two acceptable lunch spots is irrational. But without a mechanism to end the debate, we kept going because stopping felt like giving up on finding the objectively correct answer.

Spoiler: there is no objectively correct answer to where to get lunch on a Thursday.

I've since started applying the same logic to other domains. Splitting chores between me and my partner — we used to negotiate, which meant we'd replay the same arguments about fairness every week. Now we flip for the ones neither of us wants. Movie selection when we can't agree: flip. Picking which of two vacation spots to book when both look great: flip and stop looking at Airbnb listings for the other one.

The flip doesn't make the outcome better. It makes the experience of deciding better. And weirdly, that often makes the outcome feel better too.`;

const p2s4 = `To be fair: coin flips don't work for everything. If one option is genuinely much better than the other, or if the stakes are high enough to warrant real analysis, a coin flip is just avoidance. I'm not suggesting you flip a coin to pick a surgeon or a mortgage.

The specific zone where flipping helps is decisions with three characteristics: the options are roughly equivalent in quality, the decision process itself is costing you real time or stress, and you're likely to be happy enough with either outcome. That's actually a surprising fraction of the daily decisions most of us obsess over.

If you're already feeling anxious reading this because you can think of three decisions you've been circling for weeks where both options are genuinely fine — that's the flip's territory. Stop the loop. Flip and move.`;

const p3s1 = `I want to be honest with you: I did not plan to spend most of a Tuesday night reading about ancient Roman coinage. I was trying to look up a quick fact for something else, and then I found the phrase "navia aut caput" — and two hours later I was reading a Latin legal text from the first century BCE.

The phrase means "ship or head." It's what Romans said instead of "heads or tails." They were flipping the denarius — a silver coin that had the emperor's profile on one side and a ship on the reverse. They'd call it like we call it. Ship came up, you won. Head came up, you lost. Or vice versa.

This practice was old even by Roman standards. The Republic had been using coin tosses to settle disputes before Julius Caesar was born. Romans didn't think of it as leaving things to chance in a lazy sense. The outcome of a coin toss was considered the will of Jupiter — the chief deity of the Roman pantheon. Random chance wasn't random at all. It was divine arbitration.

That reframing hit me kind of hard. When you think of it as "I'll let a higher power decide," the ritual makes a completely different kind of sense.`;

const p3s2 = `The tradition didn't die with Rome. It mutated through the medieval period into something the English called "cross and pile." The cross referred to the embossed Christian cross on one face of most medieval coins — which, conveniently for the symbolism, replaced Jupiter with a different theological authority. The pile was the rough anvil impression on the back from the minting process.

Cross and pile appears in English legal documents from the 13th and 14th centuries as an accepted method for settling minor property disputes. Chaucer references it. There's a 1490 dictionary that defines it as a well-established phrase. This wasn't an informal practice — it was considered legitimate enough to appear in legal contexts.

What's interesting to me is the consistency across completely different cultures and time periods. Romans, medieval Europeans, and eventually everyone else landed on the same solution independently: when you need a fast, fair, undisputed resolution to a deadlock, you let randomness decide. The mechanism and the theology changed; the function was identical.`;

const p3s3 = `Here's the most famous coin toss in American history that most people don't know was a coin toss.

December 1903. Wilbur and Orville Wright have spent years building and testing a powered aircraft. On December 14th, they're finally ready to attempt the first powered flight in history. There's one aircraft. Two brothers. So they flip a coin to decide who goes first.

Wilbur wins.

He takes the Flyer down the launch rail, gets airborne briefly, then stalls and lands hard after about 3.5 seconds. The plane is slightly damaged. Not a successful flight by their own standards.

Three days later, after repairs, Orville tries. He stays in the air for 12 seconds and covers 120 feet. Then they fly three more times that morning, the longest being 59 seconds. History records December 17th, 1903, as the first successful powered flight. And history records Orville as the pilot.

The coin flip decided who went first. But it didn't decide who made history — because the guy who won the coin toss had the unsuccessful attempt. The randomness pointed one direction; fate moved another.`;

const p3s4 = `The Super Bowl coin toss. Cricket match decisions. Parliamentary tiebreakers in some countries. Presidential election tiebreakers in certain local U.S. races — yes, this happens, and yes, they actually flip a coin.

Why does this ritual survive everything? I've come to think it's not really about fairness in the mathematical sense. A sufficiently trusted randomness source could just as well be a dice roll or a card draw. The coin flip persists because of how it works socially.

Everyone can see the coin. Everyone can see the flip. The result is visible and immediate. And because the process is transparently neutral — no algorithm anyone needs to trust, no institution making the call — everyone accepts the outcome. Not because they're happy about it, necessarily, but because they can't argue with it. The process was visibly clean.

That social function — creating uncontested acceptance of a random outcome — is genuinely hard to replace. Two thousand years of humans reaching for a coin when they need a tiebreaker is not an accident. It's a remarkably efficient solution to a remarkably persistent problem.`;

const p4s1 = `I want to be upfront: I did not start this experiment with any grand hypothesis. I started it because I was bored and slightly annoyed at myself for always defaulting to the same habits. Every morning felt like a slightly blurrier copy of the one before it. I wasn't unhappy. I was just on autopilot.

The rules were simple. Each morning, before I left the house, I identified one decision I'd been defaulting to by habit — anything small enough that both options were genuinely acceptable — and I flipped. A real coin. (I used my phone after Day 4 because I kept losing track of the coin.)

I kept a note in my phone: the date, the question, the result, and one or two sentences about what happened. Looking back at those notes now, it's kind of a strange diary.`;

const p4s2 = `Day 3: I flipped for whether to take my usual route to work or the longer one through the park. The coin said park. I grumbled a little because it adds seven minutes. About halfway through, I passed a small coffee shop I had somehow never noticed despite walking past it apparently for two years. The sign was small. The space was narrow. I went in.

I've been back probably 30 times since. They do a very specific cortado that I now consider one of my top five food and drink experiences. That's not an exaggeration. I would not have found this place without the coin.

Day 8: Flipped between two books from my unread stack. Won by coin: a dense history of the postwar German economy that a friend gave me and I had been actively avoiding. I did not want to read it. I read it anyway. It took me three weeks. It's one of the most interesting books I've read in years. I would never have read it by choice. The coin made me.

Day 17: The question was whether to text an old college friend I'd been meaning to reconnect with for eight months. The "text" vs. "not today" choice that I'd been putting in the vague future indefinitely. The coin said text. I texted. We ended up on a video call for two hours. Turns out he'd moved back to a city I travel to occasionally. We've since had dinner twice. None of that happens without Day 17.`;

const p4s3 = `Not everything was a revelation. Most flips were boring, which is kind of the point.

Day 11: Flipped between the gym and a run outside. Coin said gym. It was fine. It was a normal gym session. Nothing interesting happened.

Day 19: Flipped for what to eat for breakfast. Coin said eggs instead of my usual yogurt. The eggs were good. I don't have strong feelings about this.

Day 24: Flipped for whether to work from a coffee shop or home. Coin said coffee shop. The coffee shop was loud and I got less done. This was a bad outcome. I still don't regret the experiment — bad outcomes are data too.

The ratio across 30 days: maybe 5 or 6 genuinely interesting or positive surprises, about 20 genuinely neutral outcomes, and 4 or 5 outcomes I'd call mildly worse than my default would have been. That's a pretty favorable variance trade on habits that, by definition, weren't producing any surprises at all.`;

const p4s4 = `I'm not going to tell you to flip a coin for every decision. That's not what this is about, and it would be exhausting and also sometimes genuinely stupid.

But here's the thing: most of us have a mental queue of small decisions that we keep deferring. Not because they're hard, and not because we don't care — but because the default option has so much momentum that choosing the alternative takes a kind of friction we're not willing to generate on a random Tuesday morning.

The coin bypasses that friction completely. It makes the alternative feel arbitrary rather than deliberate, which somehow makes it easier to execute on. You're not "choosing" the long route to work. You're just following the flip. Once you're walking it, the resistance disappears.

I still flip occasionally — probably two or three times a week. Not every morning, because that became its own ritual and the point was to disrupt rituals. But when I notice I've been defaulting to the same option for a few weeks and haven't given much thought to why: I flip. And then I see what happens.

For decisions you've been overthinking for weeks, where both options are fine and the only thing stopping you is inertia — just flip. Worst case, you confirm your original instinct. Best case, you find a cortado that changes your morning commute.`;

const p5s1 = `Picture this: you flip a coin and get heads. Then heads again. Then heads, heads, heads — five in a row. I'll give you a moment to feel the weight of that streak.

Now: what's your bet on the next flip?

If your gut said tails — if you felt, even for a second, that tails was somehow "due" or "overdue" or "likely because of the streak" — you have just experienced the Gambler's Fallacy firsthand. Welcome. You're in very good company. You're also completely wrong.

The actual probability of the sixth flip landing tails: 50%. Exactly the same as it was before any of the previous five flips happened. The coin does not know it landed heads five times. It has no memory. No debt to the universe to even things out. Each flip is a completely independent event.

This is one of those facts that's easy to accept intellectually and very hard to actually feel.`;

const p5s2 = `The most dramatic real-world illustration of the Gambler's Fallacy in history happened at a roulette table in the Monte Carlo Casino in August 1913. The ball landed on black 26 times in a row.

As the streak grew, gamblers at the table started piling money on red. Ten times black. Bet red harder, because red must be coming. Fifteen times black. Double down on red — this is statistically impossible, surely red is due. Twenty times black. The crowd around the table was massive by now, all convinced that the universe owed them a correction.

Twenty-six times black. The casino made millions that night from people who believed that a streak creates an obligation for the opposite outcome.

The roulette wheel, like the coin, has no memory. A ball landing black 26 times in a row is extraordinarily unlikely — about 1 in 67 million — but once it has happened, the probability of the 27th spin being red is still exactly 18/38. The 26 previous spins are history. They're not leverage.`;

const p5s3 = `The Gambler's Fallacy isn't just a casino problem. It's everywhere people misread independent events as sequences with momentum.

Sports announcers do this constantly. A basketball player makes four shots in a row and the broadcast starts referencing their "hot hand" as if some physical state of shooting excellence has been achieved. Researchers have studied this extensively — the hot hand effect in basketball is weak at best and possibly nonexistent in most contexts. Each shot is closer to an independent event than the narrative suggests. The player isn't "on fire." They just happened to make four shots.

Investors do this too. When a stock has dropped for three consecutive days, some people reason that a rebound is "due" — that the downward streak creates upward pressure. It doesn't. Previous price movements don't create obligations for future ones. People who sell at the bottom of a correction because they're convinced the decline will continue are often making the inverse error — believing the streak predicts continuation rather than correction.

Birth record analysis in multiple countries has shown that after a run of same-sex births, families are more likely to try for another child, presumably reasoning they're "due" for the other sex. They're not. The probability of each birth is approximately 50/50 regardless of previous birth order.`;

const p5s4 = `Here's why I find this particularly relevant to coin flipping as a decision tool: one of the things that makes coin flips work so well for decisions is that they're genuinely independent. There's no streak to read. No momentum to feel. No superstition to feed.

When you use a coin to make a decision, you're explicitly invoking a process with no memory. That's a feature, not a bug. You're opting out of all the biased intuitions we project onto sequences. The coin doesn't care that you chose Thai last time. It doesn't care that your last three big decisions worked out well and you feel overdue for a bad one. It doesn't care about any of your history at all.

The coin doesn't remember. You do. And your memory — specifically, your pattern-seeking interpretation of recent history — is exactly what biases your thinking. The Gambler's Fallacy is a memory problem, not a math problem. The coin, having no memory, is immune to it.

Next time you're trying to make a decision and you notice you're reasoning from a recent streak — ask yourself: is this situation actually influenced by the streak? Or am I just doing mental roulette, waiting for the universe to even things out?

It won't. The universe doesn't do accounting.`;

const p6s1 = `I'm going to describe my home office as it existed from September through January: one broken monitor I kept meaning to dispose of, cables going to nothing plugged into a power strip, three drawers I hadn't opened since 2022, a bookshelf with no organizing logic whatsoever, and a growing pile of things I classified mentally as "needs a decision."

The reorganization project itself was not complex. I have maybe 12 square meters of space. The physical labor involved was minimal. I had a free Saturday approximately every three weeks during that four-month stretch. I started exactly zero times.

Every time I sat down to begin, I'd immediately hit a decision: which drawer do I do first? Do I throw out the cables I can't identify or do I research what they're for? Is the bookshelf organized by topic, by author, or by frequency of use? What do I do with things I don't want but feel guilty throwing away?

Every one of these decision points stalled me. I'd spend ten minutes thinking about the cables, decide it wasn't the right time to deal with them, and find something else to do. The project never started because it was never clear where to start.`;

const p6s2 = `There's a body of research, associated most prominently with psychologist Roy Baumeister, on something called ego depletion — the idea that decision-making draws from a limited cognitive resource, and that making many decisions in sequence degrades the quality of later ones. The research has had some replication challenges in recent years, so I want to be careful about overstating it. But the basic experience it describes is real and recognizable: decision-making is tiring, and tasks that front-load many decisions feel harder to start than tasks where the path is clear.

Reorganizing a room is almost entirely made of small decisions. Which pile goes first? Keep or donate? This shelf or that drawer? The task is less about physical effort and more about a continuous stream of judgment calls. If you're someone who finds decision-making effortful — and most people do when the decisions are numerous and low-stakes enough that there's no obvious right answer — you'll find reasons to delay starting.

What I was experiencing wasn't laziness or avoidance in the psychological sense. It was rational cost-avoidance of a task I had accurately modeled as exhausting.`;

const p6s3 = `In January, I sat down at my desk on a Sunday afternoon with actual resolve to get this done. I had maybe two hours before dinner plans. I stared at the office. I hit the cables question within four minutes.

On a slight impulse, I picked up my phone and flipped a coin. Heads: throw out all unidentifiable cables. Tails: bag them for later. Heads. Into the trash they went. I felt approximately nothing. I moved to the next thing.

Left drawer or right drawer? Flip. Right. I opened the right drawer. Mostly stationery I hadn't used in a year. Keep the good pens, recycle the rest? Flip. Recycle. Done.

Bookshelves: topic or frequency? Flip. Topic. I started sorting.

I didn't flip for everything. Decisions where I had an obvious preference I just made. But for the approximately 15 decision-points where I would normally have stalled — the ones where both options were genuinely equal and I just needed someone to pick — I flipped.

I finished the room in 90 minutes. Including wiping down surfaces and vacuuming. I have not thought about the cables since, because there are no cables to think about.`;

const p6s4 = `Here's what I think is happening mechanically when the coin flip works for procrastination-prone tasks, and how to use it deliberately.

First: identify whether you're dealing with a task made of real decisions or fake ones. Real decisions have meaningfully different outcomes depending on what you choose. Fake decisions are ones where both options are acceptable and you're stuck not because the stakes are high but because you're waiting for certainty that will never arrive. Organizing a bookshelf by topic versus author is a fake decision. You can reorganize it again in three years if you hate it. You will not hate it.

For fake decisions, the coin flip works perfectly. You're not abdicating judgment — you're recognizing that judgment isn't actually required here and removing the cost of unnecessary deliberation.

Second: commit to the flip. Don't flip, see the result, and then flip again because you didn't like it. The whole mechanism breaks if you do that. The coin's value is that it creates finality. If you're flipping until you get the answer you secretly wanted, you already know the answer — just do that.

Third: use it specifically for the stuck points. You don't need to flip for every micro-decision in a task. You flip for the ones where you've been stalling. They're usually identifiable — they're the ones your brain returns to with a slightly anxious quality even when you're not actively working on the task.

The coin doesn't make you productive. Removing the friction of fake decisions does. The coin is just the tool for identifying which decisions were fake all along.`;

const posts = [
  {
    id: 1,
    title: "Why I Trust a Digital Coin Flip More Than a Real One",
    date: "March 20, 2026",
    category: "Science",
    readTime: "6 min read",
    author: "Alex Rivera",
    authorBio:
      "Alex Rivera is a developer and probability nerd who once spent three hours arguing about coin bias at a hackathon. He builds tools that make randomness accessible.",
    excerpt:
      "I have a quarter that always seems to land heads. I started tracking it. Then I fell down a physics rabbit hole. Turns out, physical coins are quietly biased — and the fix is a cryptographic function your bank also uses.",
    sections: [
      { heading: "The Quarter That Started Everything", body: p1s1 },
      { heading: "A Stanford Professor Took This Seriously", body: p1s2 },
      {
        heading: "What window.crypto.getRandomValues() Actually Is",
        body: p1s3,
      },
      { heading: "Trusting Systems vs. Trusting Luck", body: p1s4 },
    ],
  },
  {
    id: 2,
    title: "The Coin Flip That Changed My Lunch Routine (And What I Learned)",
    date: "March 10, 2026",
    category: "Decision Making",
    readTime: "5 min read",
    author: "Sam Patel",
    authorBio:
      "Sam Patel writes about everyday decision-making, behavioral economics, and why humans are terrible at choosing where to eat lunch. Based in Austin, Texas.",
    excerpt:
      "Every day at noon my team spent 20 minutes deciding where to eat. I thought using a coin flip was lazy. Three months later, I had discovered two new favorite restaurants and a new theory about how we make bad decisions.",
    sections: [
      { heading: "The 12pm Problem", body: p2s1 },
      { heading: "Three Months of Flipping", body: p2s2 },
      {
        heading: "It's Not About the Outcome. It's About Permission.",
        body: p2s3,
      },
      { heading: "When the Flip Doesn't Work", body: p2s4 },
    ],
  },
  {
    id: 3,
    title: "Heads or Tails Has Been Around Longer Than Most Religions",
    date: "February 28, 2026",
    category: "History",
    readTime: "6 min read",
    author: "Jordan Kim",
    authorBio:
      "Jordan Kim is a history enthusiast and web developer who got too deep into Roman numismatic history at 2am and never recovered.",
    excerpt:
      "Romans were flipping coins before Christianity existed. Medieval England had its own version. The Wright Brothers used a coin toss to decide who flew first. Here's the surprisingly rich 2,000-year story of a ritual we still use today.",
    sections: [
      { heading: "I Went Down a Roman Rabbit Hole at 2am", body: p3s1 },
      { heading: "Medieval England and the Cross and Pile", body: p3s2 },
      {
        heading: "The Wright Brothers' Coin Toss (And What Actually Happened)",
        body: p3s3,
      },
      { heading: "Why the Ritual Keeps Surviving", body: p3s4 },
    ],
  },
  {
    id: 4,
    title: "I Flipped a Coin Every Morning for 30 Days. Here's What Happened.",
    date: "February 15, 2026",
    category: "Experiments",
    readTime: "7 min read",
    author: "Sam Patel",
    authorBio:
      "Sam Patel writes about everyday decision-making, behavioral economics, and why humans are terrible at choosing where to eat lunch. Based in Austin, Texas.",
    excerpt:
      "Every morning, one small decision got handed to a coin. I found a coffee shop I now visit three times a week. I read a book I hated and loved. I called an old friend I hadn't spoken to in two years.",
    sections: [
      { heading: "The Experiment", body: p4s1 },
      { heading: "The Good Surprises", body: p4s2 },
      { heading: "The Neutral and the Bad", body: p4s3 },
      { heading: "What I Actually Took Away From This", body: p4s4 },
    ],
  },
  {
    id: 5,
    title:
      "The Gambler's Fallacy Is Ruining Your Decision-Making (And You Don't Know It)",
    date: "January 30, 2026",
    category: "Psychology",
    readTime: "6 min read",
    author: "Alex Rivera",
    authorBio:
      "Alex Rivera is a developer and probability nerd who once spent three hours arguing about coin bias at a hackathon. He builds tools that make randomness accessible.",
    excerpt:
      'You flip heads five times in a row. You think tails is "due." You are wrong — and this specific error in reasoning has cost gamblers millions and caused investors to panic-sell into losses. Here\'s the actual math.',
    sections: [
      { heading: "The Setup", body: p5s1 },
      { heading: "Monte Carlo, 1913", body: p5s2 },
      { heading: "Where Else This Shows Up", body: p5s3 },
      { heading: "The Coin Flip Has a Secret Advantage Here", body: p5s4 },
    ],
  },
  {
    id: 6,
    title: "How to Use a Coin Flip to Stop Procrastinating",
    date: "January 15, 2026",
    category: "Productivity",
    readTime: "6 min read",
    author: "Jordan Kim",
    authorBio:
      "Jordan Kim is a history enthusiast and web developer who got too deep into Roman numismatic history at 2am and never recovered.",
    excerpt:
      "I put off reorganizing my home office for four months. Not because it was hard — because I kept getting paralyzed by tiny decisions. One afternoon, I tried flipping a coin for each one. I finished in 90 minutes.",
    sections: [
      { heading: "Four Months of Staring at a Messy Office", body: p6s1 },
      { heading: "Why Decision Fatigue Creates Procrastination", body: p6s2 },
      { heading: "The 90-Minute Afternoon", body: p6s3 },
      { heading: "The Actual Technique", body: p6s4 },
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
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <User className="w-3 h-3" />
              <span>By {post.author}</span>
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

        {/* Author Bio */}
        <div className="mt-12 p-6 rounded-2xl border border-[oklch(0.26_0.013_240/0.4)] bg-[oklch(0.16_0.008_240/0.5)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[oklch(0.73_0.15_55/0.15)] flex items-center justify-center">
              <User className="w-4 h-4 text-toss-orange" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-toss-orange">
              About the Author
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="font-semibold text-foreground">{post.author}</span>{" "}
            — {post.authorBio}
          </p>
        </div>

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
