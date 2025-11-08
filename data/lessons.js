// Data files - lessons.js
const LESSONS_DATA = [
  {
    id: 0,
    title: "Spelling and Pronunciation",
    description: "Learn the basics of toki pona sounds and writing",
    icon: "🔤",
    words: ["jaki", "jelo", "ken", "mani", "mi", "mun", "tu", "wan", "jan", "jo", "kama", "lukin", "pan", "sama", "sin"],
    sections: [
      {
        type: "intro",
        title: "Welcome to Toki Pona!",
        content: `Toki Pona is a minimalist constructed language with only 120 words. It's designed to simplify thoughts and be easy to learn. Let's start with pronunciation!

The language toki pona only uses 14 letters of the Latin alphabet, and all of these letters have consistent pronunciations.

These are: **a, e, i, j, k, l, m, n, o, p, s, t, u, w**.

All toki pona words are spelled in lowercase, even at the start of sentences.`
      },
      {
        type: "pronunciation",
        title: "Pronunciation Guide",
        content: `The consonants (j, k, l, m, n, p, s, t, w) use the same sounds as those in English, with the exception of "j", which instead sounds like the English "y".

The vowels (a, e, i, o, u) are simpler than English. Every vowel uses the same sound in all words:

• **a** sounds like the "a" in the word "far"
• **e** sounds like the "e" in the word "bet"
• **i** sounds like the "i" in the word "bit" or "ee" in "wee"
• **o** sounds like the "o" in the word "or"
• **u** sounds like the "oo" in "oops" or "moon"

All toki pona words are pronounced with **stress on their first syllable**.`
      },
      {
        type: "cultural",
        title: "Flexibility in Pronunciation",
        content: `Since there are so few sounds, the way they can be pronounced can be very flexible. For example, some might substitute the sounds "p, t, k" with "b, d, g". 

Such a shift would cause a lot of ambiguity or confusion in other languages, but toki pona's sounds were chosen to be common to many languages and easy to distinguish.`
      },
      {
        type: "practice",
        title: "Practice Words",
        exercises: [
          { 
            question: "What English word does 'jaki' sound similar to?", 
            answer: "yucky",
            alternatives: ["yucky", "yukky", "yuckie"],
            explanation: "jaki (pronounced 'yucky') is derived from the English word 'yucky'"
          },
          { 
            question: "What English word does 'jelo' sound similar to?", 
            answer: "yellow",
            alternatives: ["yellow"],
            explanation: "jelo sounds like 'yellow'"
          },
          { 
            question: "What English word does 'mani' sound similar to?", 
            answer: "money",
            alternatives: ["money"],
            explanation: "mani sounds like 'money'"
          },
          { 
            question: "What English word does 'mun' sound similar to?", 
            answer: "moon",
            alternatives: ["moon"],
            explanation: "mun sounds like 'moon'"
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Basic Sentences",
    description: "Form your first sentences in toki pona",
    icon: "💬",
    words: ["mi", "sina", "ona", "li", "pona", "ike", "suli", "lili", "kili", "soweli"],
    sections: [
      {
        type: "intro",
        title: "Your First Sentences",
        content: `Let's start with the most basic sentence structure in toki pona:

**[noun] li [noun / adjective].**

In English, this would mean "[Noun] is (a) [noun]" or "[Noun] is [adjective]".`
      },
      {
        type: "vocabulary",
        title: "Vocabulary for This Page",
        items: [
          { word: "mi", definition: "I, me, us", examples: [] },
          { word: "sina", definition: "you", examples: [] },
          { word: "ona", definition: "he, she, they, it", examples: [] },
          { word: "li", definition: "(between subject and verb/adjective)", examples: [] },
          { word: "pona", definition: "good, simple, to improve, to fix", examples: [] },
          { word: "ike", definition: "bad, evil, complex, unnecessary", examples: [] },
          { word: "suli", definition: "big, great, important, to grow", examples: [] },
          { word: "lili", definition: "small, few, young, to shrink", examples: [] },
          { word: "kili", definition: "fruit, vegetable, mushroom", examples: [] },
          { word: "soweli", definition: "land mammal, animal", examples: [] }
        ]
      },
      {
        type: "grammar",
        title: "Basic Structure",
        content: `For example:

**ona li suli.** - (He/she/it/they) is (big/great/important).

As you can see, a single word can have multiple related meanings. In practical usage, both "ona" and "suli" will be more clear based on context.

**kili li pona.** - (Fruit/vegetable/mushroom)(s) (is/are) good.

And in this case, it doesn't make a lot of sense to use any meaning of "pona" other than "good".`
      },
      {
        type: "grammar",
        title: "Exception for mi and sina",
        content: `There is an exception to the rule. If the subject is "mi" or "sina", then it is not necessary to add the word "li". 

Instead of:
**sina li suli.** - You are important.

it's:
**sina suli.** - You are important.`
      },
      {
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            question: "Translate to toki pona: Animals are important.",
            answer: "soweli li suli",
            alternatives: ["soweli li suli."],
            explanation: "soweli = animals, li = (separator), suli = important"
          },
          {
            question: "Translate to toki pona: He is little.",
            answer: "ona li lili",
            alternatives: ["ona li lili."],
            explanation: "ona = he/she/it/they, li = (separator), lili = little/small"
          },
          {
            question: "Translate to toki pona: I am great.",
            answer: "mi suli",
            alternatives: ["mi suli."],
            explanation: "mi = I, suli = great/big. Note: no 'li' because subject is 'mi'!"
          },
          {
            question: "Translate to toki pona: You are bad.",
            answer: "sina ike",
            alternatives: ["sina ike."],
            explanation: "sina = you, ike = bad. Note: no 'li' because subject is 'sina'!"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Adjectives",
    description: "Describe things with modifiers",
    icon: "🎨",
    words: ["ala", "ale", "ali", "utala", "wawa", "suwi", "jan", "mama", "meli", "mije", "moku"],
    sections: [
      {
        type: "intro",
        title: "Making Things More Descriptive",
        content: `To define subjects and adjectives more clearly, you can add extra words as adjectives. In toki pona, an adjective that modifies a noun stands **after** the noun in question.

This is unlike English, where adjectives go before nouns, but similar to French.`
      },
      {
        type: "vocabulary",
        title: "Vocabulary for This Page",
        items: [
          { word: "ala", definition: "no, not, zero", examples: [] },
          { word: "ale/ali", definition: "all, everything, universe", examples: [] },
          { word: "utala", definition: "fight, battle, challenge", examples: [] },
          { word: "wawa", definition: "strong, powerful", examples: [] },
          { word: "suwi", definition: "sweet, cute, adorable", examples: [] },
          { word: "jan", definition: "person, people, humanity", examples: [] },
          { word: "mama", definition: "parent, ancestor, creator, origin", examples: [] },
          { word: "meli", definition: "woman, female, feminine, wife", examples: [] },
          { word: "mije", definition: "man, male, masculine, husband", examples: [] },
          { word: "moku", definition: "food, to eat", examples: [] }
        ]
      },
      {
        type: "grammar",
        title: "Adjectives After Nouns",
        content: `For example:

**jan wawa** – strong person

Many of the nouns covered before can also function as adjectives. For example, the pronouns "mi", "sina" and "ona" can serve as possessives.

**mama mi** – my parent
**soweli sina** – your animal
**moku ona** – his/her/their food

In addition, adjectives can function as nouns:

**wawa sina** – your strength
**suli ona** – his/her/their greatness/size`
      },
      {
        type: "grammar",
        title: "Multiple Adjectives and jan pona",
        content: `Of note is the phrase **"jan pona"**, which literally means "good person", but is widely (and officially) accepted to also mean **"friend"**.

Several adjectives can be added at once:

**soweli lili suwi** – cute pet ("little animal")`
      },
      {
        type: "grammar",
        title: "Example Sentences",
        content: `Here are some example sentences that demonstrate this:

**mama mi li pona.** - My parents are good.
**kili suwi li moku pona.** - Sweet fruits are good food.
**jan utala li wawa.** - The warrior ("fighting person") is strong.
**jan lili mi li suwi.** - My children ("young people") are cute.
**soweli lili li wawa ala.** - Little animals are not strong.`
      },
      {
        type: "grammar",
        title: "Important: li with Adjectives",
        content: `⚠️ It is worth noting that the particle "li" is only removed if the subject is just the word "mi" or "sina". If it has any adjectives added to it, then the particle is used.

**sina pona.** - You are good.
**sina ale li pona.** - All of you ("you all") are good.`
      },
      {
        type: "practice",
        title: "Practice Exercises",
        exercises: [
          {
            question: "Translate to English: meli mi li pona",
            answer: "my wife is good",
            alternatives: ["my woman is good", "my wife is good.", "my woman is good."],
            explanation: "meli can mean 'woman' or 'wife'"
          },
          {
            question: "Translate to English: mije sina li suli",
            answer: "your husband is big",
            alternatives: ["your man is big", "your husband is big.", "your man is big.", "your husband is large", "your man is large", "your husband is important", "your man is important"],
            explanation: "mije can mean 'man' or 'husband'"
          },
          {
            question: "Translate to toki pona: My wife is adorable.",
            answer: "meli mi li suwi",
            alternatives: ["meli mi li suwi."],
            explanation: "meli = wife/woman, mi = my, li = (separator), suwi = adorable/cute"
          },
          {
            question: "Translate to toki pona: All warriors are bad.",
            answer: "jan utala ale li ike",
            alternatives: ["jan utala ale li ike.", "jan utala ali li ike", "jan utala ali li ike."],
            explanation: "jan utala = warrior (fighting person), ale/ali = all"
          },
          {
            question: "Translate to toki pona: The small fruit is sweet.",
            answer: "kili lili li suwi",
            alternatives: ["kili lili li suwi."],
            explanation: "kili = fruit, lili = small, suwi = sweet"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Verbs and Objects",
    description: "Express actions with direct objects",
    icon: "🎯",
    words: ["e", "lukin", "pali", "jo", "wile", "kama", "ken", "open", "pini", "awen"],
    sections: [
      {
        type: "grammar",
        title: "Using 'e' for Objects",
        content: `The particle 'e' marks the direct object:
        
        mi lukin e moku = "I see the food"
        sina pali e tomo = "You make a house"
        ona li jo e soweli = "They have an animal"
        
        Structure: Subject + (li) + Verb + e + Object`
      }
    ]
  },
  {
    id: 4,
    title: "Oh no! More Vocabulary",
    description: "Expand your word knowledge",
    icon: "📚",
    words: ["ilo", "lipu", "ma", "nasin", "poki", "telo", "suno", "mun", "sewi", "anpa"],
    sections: [
      {
        type: "intro",
        title: "Building Your Vocabulary",
        content: `Let's learn more essential words to express ourselves better!`
      }
    ]
  },
  {
    id: 5,
    title: "This and That",
    description: "Demonstratives and specificity",
    icon: "👉",
    words: ["ni", "nimi", "seme", "ala", "ale", "ali", "wan", "tu", "mute", "luka"],
    sections: []
  },
  {
    id: 6,
    title: "Prepositions and Locations",
    description: "Express location and relationships",
    icon: "📍",
    words: ["lon", "tawa", "tan", "kepeken", "sama", "poka", "insa", "monsi", "sinpin", "noka"],
    sections: []
  },
  {
    id: 7,
    title: "Interjections, Questions, Commands",
    description: "Express emotions and ask questions",
    icon: "❓",
    words: ["a", "anu", "mu", "o", "kin", "taso", "en", "la", "nanpa", "weka"],
    sections: []
  },
  {
    id: 8,
    title: "Colorful Language",
    description: "Describe colors and more",
    icon: "🌈",
    words: ["laso", "jelo", "loje", "pimeja", "walo", "nasa", "musi", "utala", "unpa", "pakala"],
    sections: []
  },
  {
    id: 9,
    title: "Complex Adjectives",
    description: "Advanced modification and context",
    icon: "🔮",
    words: ["pi", "pu", "seme", "ante", "sama", "sin", "suli", "lili", "mute", "ala"],
    sections: []
  },
  {
    id: 10,
    title: "Pre-verbs and Time",
    description: "Express tense and ability",
    icon: "⏰",
    words: ["wile", "ken", "kama", "sona", "lukin", "open", "pini", "awen", "alasa", "oko"],
    sections: []
  },
  {
    id: 11,
    title: "Numbers",
    description: "Counting in toki pona",
    icon: "🔢",
    words: ["wan", "tu", "luka", "mute", "ale", "nanpa", "esun", "mani", "ijo", "kiwen"],
    sections: []
  },
  {
    id: 12,
    title: "The Final Countdown",
    description: "Advanced concepts and final words",
    icon: "🎓",
    words: ["tenpo", "sike", "lete", "seli", "pilin", "sijelo", "lawa", "palisa", "supa", "lupa"],
    sections: []
  },
  {
    id: 13,
    title: "Special Dictionary Edition",
    description: "Review and master all words",
    icon: "📖",
    words: [],
    sections: [
      {
        type: "review",
        title: "Congratulations!",
        content: `You've completed the main course! Now it's time to review and practice all 120 words.`
      }
    ]
  }
];
