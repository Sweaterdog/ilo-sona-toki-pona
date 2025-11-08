// Comprehensive Exercise Bank - 100+ questions
const EXERCISES_BANK = [
  // === BEGINNER LEVEL (Lessons 0-2) ===
  // Pronunciation & Basic Sentences
  {
    id: 1,
    level: 'beginner',
    requiredLessons: [0],
    question: "How is 'toki' pronounced?",
    answer: "TOH-kee",
    alternatives: ["toh-kee", "toh kee"],
    explanation: "Stress on first syllable"
  },
  {
    id: 2,
    level: 'beginner',
    requiredLessons: [0],
    question: "How is 'pona' pronounced?",
    answer: "POH-nah",
    alternatives: ["poh-nah", "poh nah"],
    explanation: "Stress on first syllable"
  },
  {
    id: 3,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: mi pona",
    answer: "I am good",
    alternatives: ["I'm good", "we are good", "i am good"],
    explanation: "'mi' can mean I or we"
  },
  {
    id: 4,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: sina toki",
    answer: "you speak",
    alternatives: ["you talk", "you are speaking"],
    explanation: "sina = you, toki = speak"
  },
  {
    id: 5,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to toki pona: I speak",
    answer: "mi toki",
    explanation: "mi = I/we, toki = speak"
  },
  {
    id: 6,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: ona li suli",
    answer: "it is big",
    alternatives: ["he is big", "she is big", "they are big", "it is large", "he is large", "she is large", "they are large", "it is important", "he is important", "she is important", "they are important"],
    explanation: "ona = he/she/it/they, suli = big/large/important"
  },
  {
    id: 7,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to toki pona: You are good",
    answer: "sina pona",
    explanation: "No 'li' needed with sina"
  },
  {
    id: 8,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: mi lili",
    answer: "I am small",
    alternatives: ["I'm small", "we are small", "i am little", "we are little"],
    explanation: "mi = I/we, lili = small"
  },
  {
    id: 9,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to toki pona: They eat",
    answer: "ona li moku",
    explanation: "Use 'li' with ona"
  },
  {
    id: 10,
    level: 'beginner',
    requiredLessons: [1],
    question: "What word is used as a separator for subjects other than mi/sina?",
    answer: "li",
    explanation: "'li' separates subject from predicate"
  },
  {
    id: 11,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: sina ike",
    answer: "you are bad",
    alternatives: ["you're bad"],
    explanation: "sina = you, ike = bad"
  },
  {
    id: 12,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to toki pona: We speak",
    answer: "mi toki",
    explanation: "mi means both 'I' and 'we'"
  },
  {
    id: 13,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: jan pona",
    answer: "good person",
    alternatives: ["friend", "good people"],
    explanation: "Commonly used for 'friend'"
  },
  {
    id: 14,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: tomo suli",
    answer: "big house",
    alternatives: ["large house", "big building", "large building"],
    explanation: "Modifiers come after nouns"
  },
  {
    id: 15,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to toki pona: small animal",
    answer: "soweli lili",
    explanation: "soweli = animal, lili = small"
  },
  {
    id: 16,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: waso pona",
    answer: "good bird",
    alternatives: ["nice bird"],
    explanation: "waso = bird, pona = good"
  },
  {
    id: 17,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to toki pona: bad food",
    answer: "moku ike",
    explanation: "moku = food, ike = bad"
  },
  {
    id: 18,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: jan lili",
    answer: "small person",
    alternatives: ["child", "little person"],
    explanation: "Often means 'child'"
  },
  {
    id: 19,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to toki pona: big bird",
    answer: "waso suli",
    explanation: "waso = bird, suli = big"
  },
  {
    id: 20,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: kili pona",
    answer: "good fruit",
    alternatives: ["good vegetable", "nice fruit"],
    explanation: "kili = fruit/vegetable"
  },
  
  // === INTERMEDIATE LEVEL (More complex sentences) ===
  {
    id: 21,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: jan suli li pona",
    answer: "the big person is good",
    alternatives: ["the important person is good", "the large person is good"],
    explanation: "jan suli (big person) + li + pona (good)"
  },
  {
    id: 22,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The small house is bad",
    answer: "tomo lili li ike",
    explanation: "tomo lili (small house) + li + ike (bad)"
  },
  {
    id: 23,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: soweli suli li moku",
    answer: "the big animal eats",
    alternatives: ["the big animal is eating", "the large animal eats"],
    explanation: "soweli suli (big animal) + li + moku (eat)"
  },
  {
    id: 24,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: Good people speak",
    answer: "jan pona li toki",
    explanation: "jan pona (good people) + li + toki (speak)"
  },
  {
    id: 25,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: mi jan lili",
    answer: "I am a small person",
    alternatives: ["I am a child", "I'm a small person"],
    explanation: "mi + jan lili (small person/child)"
  },
  {
    id: 26,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: You are an important person",
    answer: "sina jan suli",
    alternatives: ["sina jan suli pona"],
    explanation: "sina + jan suli (big/important person)"
  },
  {
    id: 27,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: waso lili li pona",
    answer: "the small bird is good",
    alternatives: ["the little bird is good", "the small bird is nice"],
    explanation: "waso lili (small bird) + li + pona (good)"
  },
  {
    id: 28,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The bad animal is small",
    answer: "soweli ike li lili",
    explanation: "soweli ike (bad animal) + li + lili (small)"
  },
  {
    id: 29,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'friend' in toki pona?",
    answer: "jan pona",
    explanation: "Literally 'good person'"
  },
  {
    id: 30,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: tomo pona li suli",
    answer: "the good house is big",
    alternatives: ["the nice house is big", "the good building is large"],
    explanation: "tomo pona (good house) + li + suli (big)"
  },
  
  // === VOCABULARY RECALL ===
  {
    id: 31,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'mi' mean?",
    answer: "I",
    alternatives: ["me", "we", "us", "i"],
    explanation: "Can mean I, me, we, or us"
  },
  {
    id: 32,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'sina' mean?",
    answer: "you",
    explanation: "Second person pronoun"
  },
  {
    id: 33,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'ona' mean?",
    answer: "he",
    alternatives: ["she", "it", "they"],
    explanation: "Third person pronoun - can be he/she/it/they"
  },
  {
    id: 34,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'pona' mean?",
    answer: "good",
    alternatives: ["simple", "nice"],
    explanation: "Good, simple, nice, to fix"
  },
  {
    id: 35,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'ike' mean?",
    answer: "bad",
    alternatives: ["negative", "wrong"],
    explanation: "Bad, negative, unnecessary, wrong"
  },
  {
    id: 36,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'suli' mean?",
    answer: "big",
    alternatives: ["large", "important"],
    explanation: "Big, large, important"
  },
  {
    id: 37,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'lili' mean?",
    answer: "small",
    alternatives: ["little", "young"],
    explanation: "Small, little, young"
  },
  {
    id: 38,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'moku' mean?",
    answer: "food",
    alternatives: ["eat", "to eat"],
    explanation: "Food, to eat"
  },
  {
    id: 39,
    level: 'beginner',
    requiredLessons: [1],
    question: "What does 'toki' mean?",
    answer: "speak",
    alternatives: ["talk", "language", "hello"],
    explanation: "To speak, language, hello"
  },
  {
    id: 40,
    level: 'beginner',
    requiredLessons: [2],
    question: "What does 'jan' mean?",
    answer: "person",
    alternatives: ["people", "human"],
    explanation: "Person, people, humanity"
  },
  {
    id: 41,
    level: 'beginner',
    requiredLessons: [2],
    question: "What does 'tomo' mean?",
    answer: "house",
    alternatives: ["building", "room"],
    explanation: "House, building, room"
  },
  {
    id: 42,
    level: 'beginner',
    requiredLessons: [2],
    question: "What does 'soweli' mean?",
    answer: "animal",
    alternatives: ["beast", "mammal"],
    explanation: "Animal, beast, land mammal"
  },
  {
    id: 43,
    level: 'beginner',
    requiredLessons: [2],
    question: "What does 'waso' mean?",
    answer: "bird",
    alternatives: ["flying creature"],
    explanation: "Bird, flying creature"
  },
  {
    id: 44,
    level: 'beginner',
    requiredLessons: [2],
    question: "What does 'kili' mean?",
    answer: "fruit",
    alternatives: ["vegetable", "mushroom"],
    explanation: "Fruit, vegetable, mushroom"
  },
  
  // === GRAMMAR QUESTIONS ===
  {
    id: 45,
    level: 'beginner',
    requiredLessons: [1],
    question: "When do you use 'li'?",
    answer: "with ona",
    alternatives: ["after ona", "with subjects other than mi or sina", "with third person"],
    explanation: "Use 'li' with subjects other than mi/sina"
  },
  {
    id: 46,
    level: 'beginner',
    requiredLessons: [1],
    question: "Do you use 'li' with 'mi'?",
    answer: "no",
    explanation: "mi and sina don't use 'li'"
  },
  {
    id: 47,
    level: 'beginner',
    requiredLessons: [1],
    question: "Do you use 'li' with 'sina'?",
    answer: "no",
    explanation: "mi and sina don't use 'li'"
  },
  {
    id: 48,
    level: 'beginner',
    requiredLessons: [2],
    question: "Where do modifiers go in toki pona?",
    answer: "after the noun",
    alternatives: ["after"],
    explanation: "Modifiers come AFTER the word they modify"
  },
  {
    id: 49,
    level: 'beginner',
    requiredLessons: [2],
    question: "In 'jan pona', which word is the modifier?",
    answer: "pona",
    explanation: "pona modifies jan"
  },
  {
    id: 50,
    level: 'beginner',
    requiredLessons: [2],
    question: "Can you stack multiple modifiers?",
    answer: "yes",
    explanation: "You can use multiple modifiers after a noun"
  },
  
  // === MORE COMPLEX TRANSLATIONS ===
  {
    id: 51,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The good food is big",
    answer: "moku pona li suli",
    explanation: "moku pona (good food) + li + suli (big)"
  },
  {
    id: 52,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: jan ike li lili",
    answer: "the bad person is small",
    alternatives: ["the bad person is little"],
    explanation: "jan ike (bad person) + li + lili (small)"
  },
  {
    id: 53,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: I am a good friend",
    answer: "mi jan pona",
    alternatives: ["mi jan pona pona"],
    explanation: "mi + jan pona (good person/friend)"
  },
  {
    id: 54,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: sina soweli lili",
    answer: "you are a small animal",
    alternatives: ["you're a small animal", "you are a little animal"],
    explanation: "sina + soweli lili (small animal)"
  },
  {
    id: 55,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The small bird speaks",
    answer: "waso lili li toki",
    explanation: "waso lili (small bird) + li + toki (speak)"
  },
  {
    id: 56,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: tomo ike li lili",
    answer: "the bad house is small",
    alternatives: ["the bad building is small"],
    explanation: "tomo ike (bad house) + li + lili (small)"
  },
  {
    id: 57,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: Good animals eat",
    answer: "soweli pona li moku",
    explanation: "soweli pona (good animals) + li + moku (eat)"
  },
  {
    id: 58,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: mi tomo suli",
    answer: "I am a big house",
    alternatives: ["I'm a big house", "I am a large house"],
    explanation: "Literally 'I (am a) big house'"
  },
  {
    id: 59,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: You are important",
    answer: "sina suli",
    explanation: "sina + suli (big/important)"
  },
  {
    id: 60,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: kili suli li pona",
    answer: "the big fruit is good",
    alternatives: ["the large fruit is good", "the big vegetable is good"],
    explanation: "kili suli (big fruit) + li + pona (good)"
  },
  
  // === TRICKIER QUESTIONS ===
  {
    id: 61,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: We are small people",
    answer: "mi jan lili",
    alternatives: ["mi li jan lili"],
    explanation: "No 'li' with mi"
  },
  {
    id: 62,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: ona li jan pona suli",
    answer: "they are an important friend",
    alternatives: ["he is an important friend", "she is an important friend", "it is an important friend", "they are a big good person"],
    explanation: "jan pona suli = important friend (or big good person)"
  },
  {
    id: 63,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The small bad animal eats",
    answer: "soweli lili ike li moku",
    alternatives: ["soweli ike lili li moku"],
    explanation: "Multiple modifiers after soweli"
  },
  {
    id: 64,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "What is the toki pona word for 'hello'?",
    answer: "toki",
    explanation: "toki! means hello!"
  },
  {
    id: 65,
    level: 'intermediate',
    requiredLessons: [1],
    question: "Translate to English: pona tawa sina",
    answer: "good to you",
    alternatives: ["good toward you", "goodbye", "thank you"],
    explanation: "Common greeting/farewell phrase"
  },
  
  // === PATTERN RECOGNITION ===
  {
    id: 66,
    level: 'beginner',
    requiredLessons: [0],
    question: "Which syllable is stressed in toki pona words?",
    answer: "first",
    alternatives: ["the first", "first syllable"],
    explanation: "Always stress the first syllable"
  },
  {
    id: 67,
    level: 'beginner',
    requiredLessons: [0],
    question: "Can toki pona words end in consonants other than 'n'?",
    answer: "no",
    explanation: "Only 'n' can end a word"
  },
  {
    id: 68,
    level: 'beginner',
    requiredLessons: [0],
    question: "Does toki pona allow consonant clusters?",
    answer: "no",
    explanation: "No consonant clusters allowed"
  },
  {
    id: 69,
    level: 'beginner',
    requiredLessons: [0],
    question: "How many vowels does toki pona have?",
    answer: "5",
    alternatives: ["five"],
    explanation: "a, e, i, o, u"
  },
  {
    id: 70,
    level: 'beginner',
    requiredLessons: [0],
    question: "How is the letter 'j' pronounced in toki pona?",
    answer: "y",
    alternatives: ["like y", "like the y in yes"],
    explanation: "j sounds like English 'y'"
  },
  
  // === REVERSE TRANSLATION PRACTICE ===
  {
    id: 71,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: mi",
    answer: "I",
    alternatives: ["me", "we"],
    explanation: "First person pronoun"
  },
  {
    id: 72,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: sina",
    answer: "you",
    explanation: "Second person pronoun"
  },
  {
    id: 73,
    level: 'beginner',
    requiredLessons: [1],
    question: "Translate to English: ona",
    answer: "he",
    alternatives: ["she", "it", "they"],
    explanation: "Third person pronoun"
  },
  {
    id: 74,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: jan",
    answer: "person",
    alternatives: ["people"],
    explanation: "Person or people"
  },
  {
    id: 75,
    level: 'beginner',
    requiredLessons: [2],
    question: "Translate to English: tomo",
    answer: "house",
    alternatives: ["building"],
    explanation: "House or building"
  },
  
  // === SENTENCE BUILDING ===
  {
    id: 76,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'The person is good' in toki pona?",
    answer: "jan li pona",
    explanation: "jan (person) + li + pona (good)"
  },
  {
    id: 77,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'The bird eats' in toki pona?",
    answer: "waso li moku",
    explanation: "waso (bird) + li + moku (eat)"
  },
  {
    id: 78,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'I am a person' in toki pona?",
    answer: "mi jan",
    explanation: "mi + jan, no li needed"
  },
  {
    id: 79,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'You are a bird' in toki pona?",
    answer: "sina waso",
    explanation: "sina + waso, no li needed"
  },
  {
    id: 80,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "How do you say 'The animal is bad' in toki pona?",
    answer: "soweli li ike",
    explanation: "soweli (animal) + li + ike (bad)"
  },
  
  // === COMPREHENSIVE REVIEW ===
  {
    id: 81,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: mi jan pona lili",
    answer: "I am a small good person",
    alternatives: ["I am a small friend", "I'm a little good person"],
    explanation: "Multiple modifiers: pona and lili both modify jan"
  },
  {
    id: 82,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The big good house",
    answer: "tomo pona suli",
    alternatives: ["tomo suli pona"],
    explanation: "Both orders work for modifiers"
  },
  {
    id: 83,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: soweli pona li suli",
    answer: "the good animal is big",
    alternatives: ["the good animal is large", "the nice animal is big"],
    explanation: "soweli pona (good animal) + li + suli (big)"
  },
  {
    id: 84,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: You are a small good bird",
    answer: "sina waso pona lili",
    alternatives: ["sina waso lili pona"],
    explanation: "waso modified by pona and lili"
  },
  {
    id: 85,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: tomo lili ike li pona",
    answer: "the small bad house is good",
    alternatives: ["the little bad house is good"],
    explanation: "tomo lili ike (small bad house) + li + pona (good)"
  },
  
  // === IDENTIFICATION QUESTIONS ===
  {
    id: 86,
    level: 'beginner',
    requiredLessons: [1],
    question: "What is the subject in 'mi toki'?",
    answer: "mi",
    explanation: "mi is the subject (I/we)"
  },
  {
    id: 87,
    level: 'beginner',
    requiredLessons: [1],
    question: "What is the predicate in 'sina pona'?",
    answer: "pona",
    explanation: "pona is the predicate (good)"
  },
  {
    id: 88,
    level: 'beginner',
    requiredLessons: [2],
    question: "In 'jan pona', what is 'jan'?",
    answer: "noun",
    alternatives: ["the noun", "head noun"],
    explanation: "jan is the head noun"
  },
  {
    id: 89,
    level: 'beginner',
    requiredLessons: [2],
    question: "In 'tomo suli', what is 'suli'?",
    answer: "modifier",
    alternatives: ["adjective", "the modifier"],
    explanation: "suli modifies tomo"
  },
  {
    id: 90,
    level: 'beginner',
    requiredLessons: [1],
    question: "What part of speech is 'li'?",
    answer: "particle",
    alternatives: ["separator"],
    explanation: "li is a particle/separator"
  },
  
  // === FINAL ADVANCED QUESTIONS ===
  {
    id: 91,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The small person speaks",
    answer: "jan lili li toki",
    explanation: "jan lili (small person) + li + toki (speak)"
  },
  {
    id: 92,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: kili ike li lili",
    answer: "the bad fruit is small",
    alternatives: ["the bad vegetable is small"],
    explanation: "kili ike (bad fruit) + li + lili (small)"
  },
  {
    id: 93,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: I eat good food",
    answer: "mi moku",
    alternatives: ["mi moku e moku pona"],
    explanation: "Simple: mi moku (I eat)"
  },
  {
    id: 94,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: waso suli ike li moku",
    answer: "the big bad bird eats",
    alternatives: ["the large bad bird eats"],
    explanation: "waso suli ike (big bad bird) + li + moku (eat)"
  },
  {
    id: 95,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: They are a good big animal",
    answer: "ona li soweli pona suli",
    alternatives: ["ona li soweli suli pona"],
    explanation: "Multiple modifiers for soweli"
  },
  {
    id: 96,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: mi soweli pona",
    answer: "I am a good animal",
    alternatives: ["I'm a good animal", "we are a good animal"],
    explanation: "mi + soweli pona (good animal)"
  },
  {
    id: 97,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: The house speaks",
    answer: "tomo li toki",
    explanation: "tomo (house) + li + toki (speak) - yes, even nonsense is valid!"
  },
  {
    id: 98,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: sina kili",
    answer: "you are a fruit",
    alternatives: ["you are a vegetable", "you're a fruit"],
    explanation: "sina + kili"
  },
  {
    id: 99,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to toki pona: Good birds are big",
    answer: "waso pona li suli",
    explanation: "waso pona (good birds) + li + suli (big)"
  },
  {
    id: 100,
    level: 'intermediate',
    requiredLessons: [1, 2],
    question: "Translate to English: jan suli li jan pona",
    answer: "the big person is a good person",
    alternatives: ["the important person is a friend", "the big person is a friend"],
    explanation: "jan suli (big person) + li + jan pona (good person/friend)"
  }
];

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXERCISES_BANK };
}
