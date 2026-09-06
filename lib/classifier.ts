export type ClassificationLabel = "memorial" | "ordinary" | "ambiguous";
export type MemorialClassification = { label: ClassificationLabel; confidence: number; reason: string; signals: string[]; interaction: "commemorate" | "like" | "confirm" };

const patterns = {
  explicit: [/passed away/, /we lost (?:my |our )?/, /died (?:last|this|on|after)/, /lost (?:him|her|them) (?:last|this|today)/],
  relationship: [/\b(mom|mother|dad|father|grandma|grandmother|grandpa|grandfather|brother|sister|husband|wife|friend|uncle|aunt|son|daughter|dog|cat|pet)\b/],
  grief: [/miss (?:him|her|them|you)/, /rest (?:easy|in peace)/, /in loving memory/, /remembering/, /without (?:mom|dad|you|him|her|them)/, /forever in (?:my|our) heart/, /years? without/],
  figurative: [/rip (?:my|to my) (?:gpa|sleep|sleep schedule|wifi|weekend|diet|plans)/, /phone died/, /battery died/, /killed me/, /i(?:'|’)m dead/, /dead tired/],
  context: [/movie|film|episode|character|tony stark|hamlet|shakespeare|imagery|history|historical|news|reportedly|celebrity|game of thrones/],
  humor: [/💀|😂|lol|lmao/]
};

export class HeuristicClassifier {
  classify(text: string): MemorialClassification {
    const t = text.toLowerCase();
    const matches = (items: RegExp[]) => items.filter((p) => p.test(t));
    const explicit = matches(patterns.explicit).length;
    const relationship = matches(patterns.relationship).length;
    const grief = matches(patterns.grief).length;
    const figurative = matches(patterns.figurative).length;
    const context = matches(patterns.context).length;
    const humor = matches(patterns.humor).length;
    const signals: string[] = [];
    if (explicit) signals.push("explicit personal loss statement");
    if (relationship) signals.push("close person or pet relationship");
    if (grief) signals.push("grief or remembrance language");
    if (figurative) signals.push("figurative death phrase");
    if (context) signals.push("fictional, academic, or news context");
    if (humor) signals.push("humorous or slang context");
    const score = explicit * 4 + relationship * 2 + grief * 3 - figurative * 7 - context * 5 - humor * 3;
    if (explicit && relationship && grief && score >= 8) return { label: "memorial", confidence: Math.min(99.4, 91 + score * .7), reason: "Multiple independent signals indicate a sincere personal memorial.", signals, interaction: "commemorate" };
    if ((explicit && relationship) || (relationship && grief)) return { label: "ambiguous", confidence: 72, reason: "Possible memorial context needs author confirmation.", signals, interaction: "confirm" };
    return { label: "ordinary", confidence: Math.min(99, 88 + Math.max(figurative, context, humor) * 3), reason: figurative || context || humor ? "Context indicates non-memorial use." : "Insufficient evidence to change the interaction.", signals: signals.length ? signals : ["no memorial pattern"], interaction: "like" };
  }
}

export const classifier = new HeuristicClassifier();
