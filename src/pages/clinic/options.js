var list = [];
for (var i = 2019; i >= 1900; i--) {
  list.push({ value: i, label: i });
}

var oneToTen = [];
for (var j = 1; j <= 10; j++) {
  oneToTen.push({ value: j, label: j });
}

const options = {
  // selectedRegisteredPatient: [
  //   {
  //     value:
  //       "Username: charlie : full name (charlie chaplin) Day of Birth: 1970-12-21male",
  //     label:
  //       "Username: charlie : full name (charlie chaplin) Day of Birth: 1970-12-21male",
  //   },
  // ],
  currentTreatment: [
    { value: "Ayurveda", label: "Ayurveda" },
    { value: "Traditional Chinese Medicine",label: "Traditional Chinese Medicine",},
    { value: "regular/conventional", label: "regular/conventional" },
    { value: "naturopratic", label: "naturopratic" },
    { value: "osteopathic", label: "osteopathic" },
    { value: "shiatsu", label: "shiatsu" },
    { value: "bach-flowers", label: "bach-flowers" },
    { value: "tuina", label: "tuina" },
    { value: "reiki", label: "reiki" },
    { value: "other", label: "other" },
  ],
  familyMember: [
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    { value: "Grandpa at Father's side", label: "Grandpa at Father's side" },
    { value: "Grandma at Father's side", label: "Grandma at Father's side" },
    { value: "Grandpa at Mother's side", label: "Grandpa at Mother's side" },
    { value: "Grandma at Mother's side", label: "Grandma at Mother's side" },
    { value: "Uncle at Father's side", label: "Uncle at Father's side" },
    { value: "Uncle at Mother's side", label: "Uncle at Mother's side" },
    { value: "Aunt at Father's side", label: "Aunt at Father's side" },
    { value: "Aunt at Mother's side", label: "Aunt at Mother's side" },
    { value: "Cousin at Father's side", label: "Cousin at Father's side" },
    { value: "Cousin at Mother's side", label: "Cousin at Mother's side" },
    { value: "Nephew", label: "Nephew" },
    { value: "Niece", label: "Niece" },
    {
      value: "Granduncle at Father's side",
      label: "Granduncle at Father's side",
    },
    {
      value: "Granduncle at Mother's side",
      label: "Granduncle at Mother's side",
    },
    {
      value: "Grandaunt at Father's side",
      label: "Grandaunt at Father's side",
    },
    {
      value: "Grandaunt at Mother's side",
      label: "Grandaunt at Mother's side",
    },
  ],
  year: list,
  state: [
    {
      value: "Cured",
      label: "Cured",
    },
    {
      value: "In Treatment",
      label: "In Treatment",
    },
    {
      value: "Died",
      label: "Died",
    },
    {
      value: "Other",
      label: "Other",
    },
  ],
  socialRelationship: [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Widowed",
      label: "Widowed",
    },
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "In relationship",
      label: "In relationship",
    },
    {
      value: "Legally separated",
      label: "Legally separated",
    },
  ],
  habits: [
    {
      value: "smoking",
      label: "smoking",
    },
    {
      value: "alcohol",
      label: "alcohol",
    },
    {
      value: "coffee",
      label: "coffee",
    },
    {
      value: "tea",
      label: "tea",
    },
    {
      value: "heroin",
      label: "heroin",
    },
    {
      value: "sugar",
      label: "sugar",
    },
    {
      value: "cocaine",
      label: "cocaine",
    },
    {
      value: "marijuana",
      label: "marijuana",
    },
  ],
  employmentStatus: [
    {
      value: "full-time",
      label: "full-time",
    },
    {
      value: "part-time",
      label: "part-time",
    },
    {
      value: "freelance",
      label: "freelance",
    },
    {
      value: "retired",
      label: "retired",
    },
    {
      value: "unemployed",
      label: "unemployed",
    },
  ],
  sportFrequency: [
    {
      value: "never",
      label: "never",
    },
    {
      value: "rare",
      label: "rare",
    },
    {
      value: "sometimes",
      label: "sometimes",
    },
    {
      value: "regular",
      label: "regular",
    },
    {
      value: "very regular",
      label: "very regular",
    },
  ],
  bmiClassification: [
    {
      value: "Underweight",
      label: "Underweight",
    },
    {
      value: "Normal weight",
      label: "Normal weight",
    },
    {
      value: "Overweight",
      label: "Overweight",
    },
    {
      value: "Obesity",
      label: "Obesity",
    },
  ],
  thermalFeeling: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "chilly",
      label: "chilly",
    },
    {
      value: "hot flush",
      label: "hot flush",
    },
    {
      value: "feverish",
      label: "feverish",
    },
    {
      value: "night sweating",
      label: "night sweating",
    },
  ],
  perspiration: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "frequent",
      label: "frequent",
    },
    {
      value: "absent",
      label: "absent",
    },
    {
      value: "profuse",
      label: "profuse",
    },
    {
      value: "night sweating",
      label: "night sweating",
    },
  ],
  appetite: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "excess",
      label: "excess",
    },
    {
      value: "poor",
      label: "poor",
    },
    {
      value: "craving",
      label: "craving",
    },
  ],
  vomiting: [
    {
      value: "no",
      label: "no",
    },
    {
      value: "yes",
      label: "yes",
    },
    {
      value: "yes with blood",
      label: "yes with blood",
    },
  ],
  diet: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "vegeterian",
      label: "vegeterian",
    },
    {
      value: "meat",
      label: "meat",
    },
    {
      value: "seafood",
      label: "seafood",
    },
    {
      value: "Bionic",
      label: "Bionic",
    },
  ],
  taste: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "bitter",
      label: "bitter",
    },
    {
      value: "greasy",
      label: "greasy",
    },
    {
      value: "bland",
      label: "bland",
    },
    {
      value: "acrid/pungent",
      label: "acrid/pungent",
    },
  ],
  thirst: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "excess",
      label: "excess",
    },
    {
      value: "little",
      label: "little",
    },
    {
      value: "cold",
      label: "cold",
    },
    {
      value: "hot",
      label: "hot",
    },
  ],
  defecation: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "diarrhea",
      label: "diarrhea",
    },
    {
      value: "constipated",
      label: "constipated",
    },
    {
      value: "loose",
      label: "loose",
    },
    {
      value: "dry",
      label: "dry",
    },
  ],
  urination: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "scanty",
      label: "scanty",
    },
    {
      value: "difficult",
      label: "difficult",
    },
    {
      value: "painful",
      label: "painful",
    },
    {
      value: "frequent",
      label: "frequent",
    },
    {
      value: "frequent in the night",
      label: "frequent in the night",
    },
    {
      value: "sometimes",
      label: "sometimes",
    },
  ],
  urinationColor: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "yellow",
      label: "yellow",
    },
    {
      value: "dark yellow",
      label: "dark yellow",
    },
    {
      value: "bloody",
      label: "bloody",
    },
    {
      value: "white",
      label: "white",
    },
  ],
  sleep: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "heavy",
      label: "heavy",
    },
    {
      value: "poor",
      label: "poor",
    },
    {
      value: "restlesness",
      label: "restlesness",
    },
    {
      value: "dreamed",
      label: "dreamed",
    },
  ],
  head: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "dizzy",
      label: "dizzy",
    },
    {
      value: "drowsy",
      label: "drowsy",
    },
    {
      value: "headache",
      label: "headache",
    },
  ],
  eyes: [
    {
      value: "Normal",
      label: "Normal",
    },
    {
      value: "Blurry vision",
      label: "Blurry vision",
    },
    {
      value: "Dry",
      label: "Dry",
    },
    {
      value: "Tearing",
      label: "Tearing",
    },
    {
      value: "Continent",
      label: "Continent",
    },
    {
      value: "Red",
      label: "Red",
    },
    {
      value: "Yellow",
      label: "Yellow",
    },
    {
      value: "Lazy",
      label: "Lazy",
    },
    {
      value: "Colorblindness",
      label: "Colorblindness",
    },
    {
      value: "Lightsensitivity",
      label: "Lightsensitivity",
    },
    {
      value: "Floaters",
      label: "Floaters",
    },
    {
      value: "Discharge",
      label: "Discharge",
    },
    {
      value: "Pink",
      label: "Pink",
    },
    {
      value: "Watery",
      label: "Watery",
    },
  ],
  ear: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "ear ringing",
      label: "ear ringing",
    },
    {
      value: "poor hearing",
      label: "poor hearing",
    },
    {
      value: "pain",
      label: "pain",
    },
    {
      value: "discharge",
      label: "discharge",
    },
  ],
  nose: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "dry",
      label: "dry",
    },
    {
      value: "runny nose",
      label: "runny nose",
    },
    {
      value: "blocked sensation",
      label: "blocked sensation",
    },
    {
      value: "nasal stuffiness",
      label: "nasal stuffiness",
    },
    {
      value: "nasal congestion",
      label: "nasal congestion",
    },
    {
      value: "reduced sense of smell",
      label: "reduced sense of smell",
    },
    {
      value: "snoring",
      label: "snoring",
    },
    {
      value: "runny nose",
      label: "runny nose",
    },
    {
      value: "bleeding",
      label: "bleeding",
    },
    {
      value: "postnasal drip",
      label: "postnasal drip",
    },
    {
      value: "breathing through your mouth",
      label: "breathing through your mouth",
    },
    {
      value: "a feeling of pressure in your forehead or face",
      label: "a feeling of pressure in your forehead or face",
    },
  ],
  throat: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "dry",
      label: "dry",
    },
    {
      value: "sore",
      label: "sore",
    },
    {
      value: "difficulty swallow",
      label: "difficulty swallow",
    },
    {
      value: "swollen",
      label: "swollen",
    },
  ],
  menstruation: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "absent",
      label: "absent",
    },
    {
      value: "iregular",
      label: "iregular",
    },
    {
      value: "use of birth-control-pill",
      label: "use of birth-control-pill",
    },
  ],
  leukorrea: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "thick",
      label: "thick",
    },
    {
      value: "watery",
      label: "watery",
    },
    {
      value: "profuse",
      label: "profuse",
    },
    {
      value: "yellowish",
      label: "yellowish",
    },
    {
      value: "clear",
      label: "clear",
    },
    {
      value: "odor",
      label: "odor",
    },
  ],
  natureOfPain: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "distending",
      label: "distending",
    },
    {
      value: "sharp pricking like needle",
      label: "sharp pricking like needle",
    },
    {
      value: "dull",
      label: "dull",
    },
    {
      value: "hollow",
      label: "hollow",
    },
    {
      value: "fixed",
      label: "fixed",
    },
    {
      value: "movable",
      label: "movable",
    },
    {
      value: "lumb/numbness",
      label: "lumb/numbness",
    },
    {
      value: "nodule",
      label: "nodule",
    },
    {
      value: "dislike pressure",
      label: "dislike pressure",
    },
    {
      value: "prefer cold",
      label: "prefer cold",
    },
    {
      value: "prefer hot",
      label: "prefer hot",
    },
    {
      value: "radiating",
      label: "radiating",
    },
    {
      value: "weighty",
      label: "weighty",
    },
    {
      value: "colickly",
      label: "colickly",
    },
    {
      value: "burning",
      label: "burning",
    },
  ],
  emotionState: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "unhappy/sad",
      label: "unhappy/sad",
    },
    {
      value: "happy",
      label: "happy",
    },
    {
      value: "stressed",
      label: "stressed",
    },
    {
      value: "depressed",
      label: "depressed",
    },
    {
      value: "lonely",
      label: "lonely",
    },
    {
      value: "melancholy",
      label: "melancholy",
    },
    {
      value: "angry",
      label: "angry",
    },
  ],
  respiration: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "lower",
      label: "lower",
    },
    {
      value: "heavy feeble",
      label: "heavy feeble",
    },
  ],
  speech: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "shallow",
      label: "shallow",
    },
    {
      value: "louder",
      label: "louder",
    },
    {
      value: "feeble",
      label: "feeble",
    },
  ],
  cough: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "coarse",
      label: "coarse",
    },
    {
      value: "feeble",
      label: "feeble",
    },
    {
      value: "spurum",
      label: "spurum",
    },
    {
      value: "dry",
      label: "dry",
    },
  ],
  odor: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "stinky",
      label: "stinky",
    },
    {
      value: "foul",
      label: "foul",
    },
    {
      value: "sour",
      label: "sour",
    },
  ],
  vitality: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "dispirited",
      label: "dispirited",
    },
    {
      value: "hyperactive depressed",
      label: "hyperactive depressed",
    },
    {
      value: "anxious",
      label: "anxious",
    },
    {
      value: "stressed",
      label: "stressed",
    },
  ],
  appearance: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "heavy",
      label: "heavy",
    },
    {
      value: "fat",
      label: "fat",
    },
    {
      value: "medium",
      label: "medium",
    },
    {
      value: "slim",
      label: "slim",
    },
    {
      value: "strong",
      label: "strong",
    },
    {
      value: "weak",
      label: "weak",
    },
  ],
  colorFace: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "pale",
      label: "pale",
    },
    {
      value: "yellow",
      label: "yellow",
    },
    {
      value: "red",
      label: "red",
    },
    {
      value: "blue",
      label: "blue",
    },
    {
      value: "dark-gray",
      label: "dark-gray",
    },
  ],
  physicalAppearance: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "discoloration",
      label: "discoloration",
    },
    {
      value: "swelling",
      label: "swelling",
    },
    {
      value: "edema",
      label: "edema",
    },
    {
      value: "atrophy",
      label: "atrophy",
    },
  ],
  epigastriumPalpation: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "hard",
      label: "hard",
    },
    {
      value: "soft",
      label: "soft",
    },
  ],
  abdomenPalpation: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "distension and fullness",
      label: "distension and fullness",
    },
    {
      value: "fullness like a rubber bag",
      label: "fullness like a rubber bag",
    },
  ],
  rangeMotion: [
    {
      value: "cervical",
      label: "cervical",
    },
    {
      value: "lumbar",
      label: "lumbar",
    },
    {
      value: "shoulder",
      label: "shoulder",
    },
    {
      value: "elbow",
      label: "elbow",
    },
    {
      value: "hip",
      label: "hip",
    },
  ],
  painLevel: oneToTen,
  
  tongueShape: [
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "deviated",
      label: "deviated",
    },
    {
      value: "toothmarks",
      label: "toothmarks",
    },
    {
      value: "cracked in the center vertically",
      label: "cracked in the center vertically",
    },
    {
      value: "long",
      label: "long",
    },
    {
      value: "thin",
      label: "thin",
    },
    {
      value: "stiff",
      label: "stiff",
    },
    {
      value: "flappy",
      label: "flappy",
    },
    {
      value: "cracked over the whole tongue",
      label: "cracked over the whole tongue",
    },
  ],
  
  tongueColor: [
    {
      value: "white swollen", label: "white swollen",
    },
    {
      value: "thin rigid", label: "thin rigid",
    },
    {
      value: "toothmarks", label: "toothmarks",
    },
    {
      value: "flacid pale", label: "flacid pale",
    },
    {
      value: "red thick", label: "red thick",
    },
    {
      value: "greasy", label: "greasy",
    },
    {
      value: "yellow cracked", label: "yellow cracked",
    },
    {
      value: "white coating", label: "white coating",
    },
    {
      value: "gray coating", label: "gray coating",
    },
    {
      value: "black coating", label: "black coating",
    },
    {
      value: "purple", label: "purple",
    },
    {
      value: "normal", label: "normal",
    },
  ],

  tongueQuality: [
    {
      value: "normal", label: "normal",
    },
    {
      value: "thin", label: "thin"
    },
    {
      value: "dry", label: "dry"
    },
    {
      value: "wet/moist", label: "wet/moist"
    },
    {
      value: "peeled", label: "peeled"
    },
	
  ],
  
  gender: [
    {
      value: "Male", label: "Male" 
    },
    {
      value: "Female", label: "Female"
    },
    {
      value: "Transgender", label: "Transgender"
    },
  ],

  pulseSpeed: [
    {
      value: "normal (four beats /breath)", label: "normal (four beats /breath)" 
    },
    {
      value: "slow (chi mai 迟脉)", label: "slow (chi mai 迟脉)"
    },
    {
      value: "mild slow", label: "mild slow"
    },
    {
      value: "mild rapid", label: "mild rapid" 
    },
    {
      value: "rapid (shu mai數脈)", label: "rapid (shu mai數脈)"
    },
  ],

  pulseDepth: [
    {
      value: "normal", label: "normal" 
    },
    {
      value: "superficial (fu mai 浮脉)", label: "superficial (fu mai 浮脉)"
    },
    {
      value: "deep (chen mai 沉脉)", label: "deep (chen mai 沉脉)"
    },
  ],

  pulseStrength: [
    {
      value: "normal", label: "normal" 
    },
    {
      value: "excess (shi mai 实脉)", label: "excess (shi mai 实脉)"
    },
    {
      value: "deficiency (xu mai虚脉)", label: "deficiency (xu mai虚脉)"
    },
  ],

  pulseTension: [
    {
      value: "normal", label: "normal" 
    },
    {
      value: "wiry (xian/xuan mai弦脉)", label: "wiry (xian/xuan mai弦脉)"
    },
    {
      value: "tense (jin mai紧脉)", label: "tense (jin mai紧脉)"
    },
    {
      value: "soft (ru mai濡脉)", label: "soft (ru mai濡脉)"
    },
    {
      value: "weak (ruo mai弱脉)", label: "weak (ruo mai弱脉)"
    },
	
  ],

  pulseRhythm: [
    {
      value: "normal", label: "normal" 
    },
    {
      value: "abrupt (cu mai促脉)", label: "abrupt (cu mai促脉)"
    },
    {
      value: "knotted (jie mai结脉)", label: "knotted (jie mai结脉)"
    },
    {
      value: "regularly intermitten (dai mai代脉)", label: "regularly intermitten (dai mai代脉)"
    },
    	
  ],

  needleManipulationOptions : [
	{ value: 'even', label: 'even' },
	{ value: 'tonify', label: 'tonify' },			
	{ value: 'reduce', label: 'reduce' },									
	{ value: 'cutanousneedle', label: 'Cutanous Needle' },												
	{ value: 'imbeddingneedle', label: 'Imbedding Needle' },															
	{ value: 'bleeding3edgedneedle', label: 'Bleeding with three-edged needle' },																		
	{ value: 'warmingneedle', label: 'Warming Needle' },																					
  ],
  stimulationMethodOptions : [
	{ value: 'normal', label: 'normal' },
	{ value: 'hard', label: 'hard' },			
	{ value: 'soft', label: 'soft' },									
  ],
  moxibustion:[
    {value: 'yes', label: 'Yes'},
    {value: 'no', label: 'No'},
  ],
  materiamedica:[
    {value: 'yes', label: 'Yes'},
    {value: 'no', label: 'No'},
  ], 
  tdp:[
    {value: 'yes', label: 'Yes'},
    {value: 'no', label: 'No'},
  ],
  unit:[
    {value: 'gr', label: 'Gram'},
    {value: 'pieces', label: 'Pieces'},
  ],
};

export default options;
