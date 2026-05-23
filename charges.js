const CHARGES = [
  {
    id: "murder-1",
    name: "First-Degree Murder",
    plainEnglish: "Intentionally killing another person with premeditation or during a felony",
    statute: "F.S. 782.04(1)",
    degree: "Capital Felony",
    keywords: ["murder", "homicide", "kill", "first degree murder", "782.04", "capital murder", "premeditated", "death penalty"],
    aliases: ["murder one", "capital murder", "1st degree murder", "premeditated murder", "felony murder"],
    sentencing: {
      maxPenalty: "Death or Life without parole",
      mandatoryMinimum: "Life with 25-year mandatory minimum",
      prrExposure: false,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: true,
      scoresheetBase: 116,
      notes: "If state not seeking death, mandatory LWOP. Life means 25-year mandatory minimum before parole eligibility (F.S. 775.082)."
    },
    bond: {
      eligible: false,
      presumptive: "No bond — capital felony",
      bondHearingType: "Arthur hearing if state waives death",
      details: "Capital felonies are presumptively non-bondable in Florida. If State formally declines to seek death, bond may be considered under Article I, Section 14."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","STATUS HEARINGS","PRETRIAL CONFERENCE","TRIAL"],
        criticalMotions: ["Bond hearing (if non-death)","Motion to suppress","Change of venue","Speedy trial demand","Competency evaluation","Severance (multi-defendant)"],
        arraignmentDeadline: "21 days from arrest (incarcerated) / 40 days (not incarcerated)",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — capital felony (F.S. 943.0585)",
        clemencyEligible: true,
        notes: "Automatic Florida Supreme Court appeal if death sentence imposed. IAC claims often focus on penalty phase."
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful arrest or search","Search warrant defects","Fruit of the poisonous tree"],
      fifthAmendment: ["Miranda violation", "Involuntary confession", "Self-incrimination", "Double jeopardy"],
      sixthAmendment: ["IAC during guilt phase", "IAC during penalty phase", "Right to impartial jury", "Conflict of interest"],
      dueProcess: ["Brady violation", "Prosecutorial misconduct", "Fabricated evidence"],
      iacPathways: ["Failed to investigate mental health history","Failed to present mitigating evidence","Failed to challenge forensic evidence","Ineffective plea negotiation"]
    },
    strategic: {
      defenses: ["Alibi","Self-defense","Defense of others","Accident","Insufficient evidence","Insanity","Voluntary intoxication","Stand your ground"],
      commonWeaknesses: ["Eyewitness misidentification","Forensic evidence gaps","Chain of custody problems","Jailhouse informant testimony","Coercive interrogation"],
      attackVectors: ["Challenge warrant affidavit","Suppress custodial statement","Cross-examine forensic expert","Impeach cooperating witness","Exclude prior bad acts"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony (INA § 101(a)(43))",
      firearm: "Permanent disqualifier (18 U.S.C. § 922(g))",
      voting: "Not restored until clemency by Governor",
      employment: "Most professions permanently barred",
      housing: "Public housing permanently ineligible",
      professionalLicenses: "Permanent disqualification — moral turpitude",
      civilRights: "Jury service permanently forfeited without clemency"
    },
    detection: {
      warnings: [
        "Death penalty notice must be filed within 45 days of arraignment",
        "Competency evaluation mandatory if good faith basis",
        "Mandatory LWOP if death penalty not sought",
        "Automatic Florida Supreme Court review if death sentenced"
      ],
      statuteBars: []
    }
  },

  {
    id: "murder-2",
    name: "Second-Degree Murder",
    plainEnglish: "Killing someone without premeditation, but with a depraved mind",
    statute: "F.S. 782.04(2)",
    degree: "F1 — Life Felony",
    keywords: ["murder", "homicide", "second degree murder", "782.04", "depraved mind", "felony murder"],
    aliases: ["murder two", "2nd degree murder", "depraved mind murder"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "None (but 10-20-Life may apply if firearm)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 88,
      notes: "PRR sentence = mandatory minimum 15 years (F.S. 775.087). 10-20-Life applies if firearm possessed or discharged."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — F1 life felony",
      bondHearingType: "Standard bond hearing (Fla. R. Crim. P. 3.131)",
      details: "As an F1 life felony, bond may be set high but is constitutionally available. Court considers flight risk and danger."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTION HEARINGS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond reduction","Motion to suppress","Change of venue","Speedy trial demand","Statement suppression","Severance"],
        arraignmentDeadline: "21 days from arrest (incarcerated) / 40 days (not incarcerated)",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony (F.S. 943.0585)",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful stop or arrest","Warrantless search exception","Traffic stop pretext"],
      fifthAmendment: ["Miranda violations","Involuntary custodial statement","Right to remain silent"],
      sixthAmendment: ["IAC for failure to investigate","Jury instruction error","Ineffective sentencing advocacy"],
      dueProcess: ["Brady/Giglio violations","Manipulated evidence"],
      iacPathways: ["Failed to pursue self-defense theory","Failed to obtain expert","Inadequate cross-examination"]
    },
    strategic: {
      defenses: ["Self-defense","Accident","Defense of others","Insufficient evidence","Mistaken identity","No depraved mind"],
      commonWeaknesses: ["Overcharge from first-degree","Eyewitness reliability","Cause of death dispute","Medical examiner bias"],
      attackVectors: ["Attack causation evidence","Expert challenge","Suppress confession","Impeach witnesses"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights (5-7 year wait)",
      employment: "Severe limitations — most licensed fields barred",
      housing: "Significant barriers for public housing",
      professionalLicenses: "Discretionary disqualification — moral turpitude"
    },
    detection: {
      warnings: [
        "PRR exposure if qualifying prior (F.S. 775.087)",
        "10-20-Life applies if firearm involved (mandatory minimum 10-20-life)",
        "Habitual felony exposure can double sentence"
      ],
      statuteBars: []
    }
  },

  {
    id: "armed-robbery",
    name: "Armed Robbery",
    plainEnglish: "Taking property from someone using a weapon or force",
    statute: "F.S. 812.13(2)(a)",
    degree: "F1 — Life Felony",
    keywords: ["robbery", "armed", "weapon", "812.13", "armed robbery", "stickup", "strong arm", "gun"],
    aliases: ["armed robbery with firearm", "robbery with weapon", "812.13(2)(a)"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "10 years if firearm possessed (10-20-Life), 20 if discharged, 25 if death",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 74,
      notes: "10-20-Life applies separately from the substantive charge. PRR can stack. Habitual offender up to 30 years."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — violent F1",
      bondHearingType: "Standard with victim input",
      details: "Violent F1 with firearm. Court typically sets high bond. Speedy trial demand critical if detained."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond reduction","Motion to suppress","Lineup/suggestive ID challenge","Severance","Identification suppression"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful stop","Frisky/traffic stop conversion","Show-up identification"],
      fifthAmendment: ["Miranda violation","Statement voluntariness"],
      sixthAmendment: ["IAC for plea advice","IAC for identification challenge","Right to counsel at lineup"],
      dueProcess: ["Suggestive identification","Brady violation"],
      iacPathways: ["Failed to suppress identification","Failed to challenge suggestive lineup","Inadequate plea advice"]
    },
    strategic: {
      defenses: ["Misidentification","No weapon used","Consent","Duress","Coercion","Entrapment","Insufficient evidence"],
      commonWeaknesses: ["Victim misidentification","Surveillance gaps","Recovered weapon chain of custody","Informant reliability"],
      attackVectors: ["Challenging ID procedure","Forensic gaps on weapon","Deflating victim testimony timeline","Suppressing defendant statement"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / crime of violence",
      firearm: "Permanent disqualifier (18 U.S.C. § 922(g))",
      voting: "Lost — must petition for restoration of civil rights",
      employment: "Barred from most licensed professions",
      housing: "Significant barriers for public housing",
      professionalLicenses: "Discretionary — crime of violence"
    },
    detection: {
      warnings: [
        "10-20-Life mandatory minimums stack — 10 years for possession, 20 for discharge",
        "PRR exposes to 15-year mandatory minimum if qualifying prior",
        "Habitual offender sentencing can produce life sentence"
      ],
      statuteBars: []
    }
  },

  {
    id: "sexual-battery",
    name: "Sexual Battery",
    plainEnglish: "Forcing someone to submit to sexual penetration without consent",
    statute: "F.S. 794.011",
    degree: "Capital / F1 — Life Felony",
    keywords: ["sexual battery", "rape", "794.011", "sexual assault", "sex crime", "forcible rape"],
    aliases: ["rape", "sexual assault", "794.011(2)", "sexual battery with force", "capital sexual battery"],
    sentencing: {
      maxPenalty: "Life or Death (capital sexual battery — victim under 12)",
      mandatoryMinimum: "Life with 25-min if capital; F1 if same age. 25-year mandatory for lewd/lascivious certain ages",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: false,
      scoresheetBase: 92,
      notes: "Capital sexual battery (victim under 12) is death-eligible but rarely sought. Registration required. Strict reporting laws."
    },
    bond: {
      eligible: true,
      presumptive: "High or no bond depending on degree",
      bondHearingType: "High bond — victim safety consideration",
      details: "Capital sexual battery may be no-bond. F1 sexual battery — high bond. Court considers victim safety and community protection."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond hearing","Motion to suppress","Discovery enforcement","Psychological evaluation","Forensic examination"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — enumerated disqualifying sex offense",
        clemencyEligible: false
      }
    },
    constitutional: {
      fourthAmendment: ["Forensic exam warrant scope","DNA collection","Search incident to arrest"],
      fifthAmendment: ["Miranda","Psychosexual evaluation self-incrimination"],
      sixthAmendment: ["IAC for forensic expert","IAC for witnesses","Right to confront accuser"],
      dueProcess: ["DNA evidence chain of custody","Brady on forensic evidence"],
      iacPathways: ["Failed to hire DNA expert","Failed to cross-examine SANE nurse","Inadequate plea negotiations"]
    },
    strategic: {
      defenses: ["Consent","Mistake of fact","False allegation","Insufficient evidence","Misidentification"],
      commonWeaknesses: ["Delayed reporting","Incomplete forensic exam","Contaminated DNA evidence","Cross-contamination","Witness credibility"],
      attackVectors: ["SANE nurse certification challenge","DNA contamination chain","Jury bias/impeachment","Forensic report gaps"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / crime involving moral turpitude",
      firearm: "Permanent disqualifier",
      voting: "Not eligible for restoration",
      employment: "Severely limited — registered sex offender restrictions",
      housing: "Residency restrictions apply — 1,000 feet from schools etc.",
      professionalLicenses: "Permanent disqualification — moral turpitude",
      registration: "Sexual offender registration — lifetime (F.S. 943.0435)"
    },
    detection: {
      warnings: [
        "SANE exam critical — challenge protocol compliance",
        "Sexual offender registration mandatory (may require lifetime registration)",
        "Residency restrictions apply upon release",
        "10-20-Life does not apply, but PRR and habitual do"
      ],
      statuteBars: []
    }
  },

  {
    id: "kidnapping",
    name: "Kidnapping",
    plainEnglish: "Confining or moving someone against their will with intent to commit a felony",
    statute: "F.S. 787.01",
    degree: "F1 — Life Felony",
    keywords: ["kidnapping", "787.01", "abduction", "false imprisonment aggravated", "hostage", "kidnap"],
    aliases: ["kidnapping with intent", "aggravated kidnapping", "hostage taking", "787.01(1)(a)"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "None (but firearm enhancement may apply)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 74,
      notes: "Often charged with underlying felony (robbery, sexual battery). PRR and habitual apply. 10-20-Life if firearm."
    },
    bond: {
      eligible: true,
      presumptive: "Very high bond — violent F1",
      bondHearingType: "Standard with victim danger assessment",
      details: "F1 life felony with high pretrial detention risk. Court may consider no-bond depending on facts."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond hearing","Motion to suppress","Severance (if multi-charge)","Grand jury transcript","Change of venue"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful detention","Arrest without probable cause","Vehicle stop"],
      fifthAmendment: ["Miranda","Statement after invocation","Duration of interrogation"],
      sixthAmendment: ["IAC for misapplying merger doctrine","Speedy trial violation"],
      dueProcess: ["Merger doctrine — kidnapping merges if incidental to another felony"],
      iacPathways: ["Failed to argue merger","Failed to suppress identification"]
    },
    strategic: {
      defenses: ["Consent","No movement/ confinement","Merger doctrine (kidnapping incidental to other felony)","Misidentification","Insufficient evidence"],
      commonWeaknesses: ["Merger problem — if kidnapping is incidental to underlying felony","Victim credibility","Movement distance"],
      attackVectors: ["Argue merger doctrine","Minimizing movement evidence","Constructive confinement","Credibility attack"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / crime of violence",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Severe limitations",
      housing: "Public housing generally barred",
      professionalLicenses: "Discretionary — crime of violence"
    },
    detection: {
      warnings: [
        "Merger doctrine is critical — if kidnapping was incidental to another felony, separate charge may violate due process",
        "Faison v. State merger analysis required",
        "PRR and habitual offender exposure significant"
      ],
      statuteBars: []
    }
  },

  {
    id: "fentanyl-trafficking",
    name: "Fentanyl Trafficking",
    plainEnglish: "Possessing, selling, or delivering fentanyl in specified quantities",
    statute: "F.S. 893.135(1)(c)",
    degree: "F1 — Life Felony",
    keywords: ["fentanyl", "trafficking", "drug trafficking", "893.135", "opioid", "synthetic opioid", "fentanyl trafficking"],
    aliases: ["fentanyl trafficking 893.135", "fentanyl drug trafficking", "opioid trafficking"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "4 grams+: 25-year mandatory minimum. 14g+: 25-year. 28g+: 30-year. 70g+: Life mandatory.",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: true,
      scoresheetBase: 56,
      notes: "Fentanyl has the LOWEST trafficking threshold in Florida law. 4 grams triggers 25-year mandatory minimum. 70 grams = life. No drug court eligibility."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — F1 mandatory minimum trafficking",
      bondHearingType: "Standard, burden on defense to show not flight risk",
      details: "F1 with high mandatory minimum. Court considers weight threshold, flight risk, and ties to community."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond reduction","Motion to suppress (traffic stop/search warrant)","Motion for drug analysis","Franks hearing (warrant affidavit)","PCR lab motion"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 trafficking (F.S. 943.0585)",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Traffic stop validity","K9 scan reliability","Search warrant particularity","Sniffer dog alert veracity"],
      fifthAmendment: ["Miranda","Drug quantity admission","Immunity"],
      sixthAmendment: ["IAC for plea advice on mandatory minimum","Right to independent drug testing expert"],
      dueProcess: ["Chain of custody (lab results)","Weight measurement issues (net vs gross)"],
      iacPathways: ["Failed to challenge lab analysis","Failed to challenge stop","Inadequate advice on mandatory minimum exposure"]
    },
    strategic: {
      defenses: ["No constructive possession","No knowledge","Mistake of fact","No trafficking quantity (under threshold)","Government informant","Entrapment"],
      commonWeaknesses: ["Lab testing protocol gaps","Weight includes packaging (Santiago v. State issue)","Confidential informant reliability","No proof of intent to sell"],
      attackVectors: ["Suppression of evidence (bad stop/search)","Challenge CI reliability","Weight dispute — packaging included","Lack of knowledge of substance"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / drug trafficking",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Extreme barriers — drug trafficking",
      housing: "Public housing ineligible (drug trafficking)",
      professionalLicenses: "Disqualification — drug trafficking offense",
      publicBenefits: "Federal benefits suspension — drug conviction penalty"
    },
    detection: {
      warnings: [
        "4 grams triggers 25-year mandatory minimum — lowest threshold in Florida",
        "No drug court eligibility for trafficking charges",
        "Lab analysis is critical — net weight vs gross weight issue (Santiago v. State)",
        "PRR can stack with mandatory minimum for extreme sentence"
      ],
      statuteBars: []
    }
  },

  {
    id: "arson",
    name: "Arson",
    plainEnglish: "Intentionally setting fire to a structure or property",
    statute: "F.S. 806.01",
    degree: "F1 — Life Felony",
    keywords: ["arson", "806.01", "fire", "burning", "structure fire", "malicious burning"],
    aliases: ["arson structure", "arson dwelling", "aggravated arson", "806.01(1)"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "None (but enhancements apply if occupied structure)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: false,
      scoresheetBase: 74,
      notes: "Occupied structure enhancement. Arson causing injury/death escalates. PRR and habitual felony exposure."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — F1 life felony",
      bondHearingType: "Standard — danger to community considered",
      details: "F1 life felony. Court considers property damage extent and whether occupied."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond reduction","Motion to suppress","Fire investigation independent expert","Cell tower location challenge"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Fire scene search without warrant — exigency limits","Burned premises exception"],
      fifthAmendment: ["Miranda","Statement during fire investigation"],
      sixthAmendment: ["IAC for independent fire expert","Right to cross-examine fire investigators"],
      dueProcess: ["Junk science — fire investigation methodology (NFPA 921 compliance)"],
      iacPathways: ["Failed to hire fire expert","Failed to challenge origin determination"]
    },
    strategic: {
      defenses: ["Accidental fire","No intent","No probable cause for arson","Defective fire investigation","Alibi"],
      commonWeaknesses: ["Fire investigation methodology outdated","Motive evidence weak","Origin determination contested","Expert disagreement"],
      attackVectors: ["NFPA 921 compliance challenge","Expert fire investigator bias","Origin and cause evidence gaps","Motive circumstantial only"]
    },
    collateral: {
      immigration: "Mandatory deportation — crime of violence / aggravated felony",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Barred from emergency services, insurance, and licensed fields",
      housing: "Public housing barred",
      professionalLicenses: "Discretionary — crime of arson"
    },
    detection: {
      warnings: [
        "Fire investigation expert critical — old 'arson indicators' debunked by NFPA 921",
        "Origin determination is the foundation of the case",
        "Motive must be proven — reversal if only evidence is fire setting",
        "PRR and habitual felony exposure significant"
      ],
      statuteBars: []
    }
  },

  {
    id: "carjacking",
    name: "Carjacking",
    plainEnglish: "Taking a motor vehicle from someone using force, intimidation, or a weapon",
    statute: "F.S. 812.133",
    degree: "F1 — Life Felony",
    keywords: ["carjacking", "812.133", "car jacking", "auto theft aggravated", "vehicle taking"],
    aliases: ["carjacking with firearm", "812.133(2)(a)", "armed carjacking"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "10-20-Life if firearm (10 possession, 20 discharge, 25 death)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 74,
      notes: "10-20-Life applies. PRR can add 15-year mandatory minimum. Habitual up to 30 years to life."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — violent F1",
      bondHearingType: "Standard",
      details: "Armed carjacking is a violent F1. Bond may be set high or pretrial detention sought."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond reduction","Motion to suppress","Identification challenge","Surveillance video motion"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Vehicle stop","Flight from scene","Traffic stop pretext"],
      fifthAmendment: ["Miranda","Post-arrest statement"],
      sixthAmendment: ["IAC for identification procedures","Right to counsel at critical stages"],
      dueProcess: ["Suggestive identification procedures"],
      iacPathways: ["Failed to challenge ID","Failed to suppress statement","Inadequate advice on 10-20-Life exposure"]
    },
    strategic: {
      defenses: ["Misidentification","No force or intimidation","Mistake of fact","Consent","Duress","Insufficient evidence"],
      commonWeaknesses: ["Victim misidentification under stress","Surveillance quality","911 call reliability","Photo lineup suggestiveness"],
      attackVectors: ["Bad lineup procedure","Misidentification defense","Suppress statement","Surveillance gap exploitation"]
    },
    collateral: {
      immigration: "Mandatory deportation — crime of violence / aggravated felony",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Most licensed fields blocked",
      housing: "Public housing barred",
      professionalLicenses: "Discretionary disqualification"
    },
    detection: {
      warnings: [
        "10-20-Life mandatory minimums — 10 years for firearm possession",
        "PRR adds mandatory minimum 15 years if qualifying prior conviction",
        "Identification is cornerstone — bad IDs are reversible error"
      ],
      statuteBars: []
    }
  },

  {
    id: "home-invasion",
    name: "Home Invasion Robbery",
    plainEnglish: "Entering someone's home to commit robbery while armed",
    statute: "F.S. 812.135",
    degree: "F1 — Life Felony",
    keywords: ["home invasion", "812.135", "home invasion robbery", "burglary armed", "occupied dwelling"],
    aliases: ["home invasion robbery with firearm", "812.135(2)", "armed home invasion"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "10-20-Life if firearm. 10 years minimum possession, 20 discharge, 25 death/injury",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 82,
      notes: "Inside home carries higher scoresheet. 10-20-Life applies. Injury to occupant escalates penalties dramatically."
    },
    bond: {
      eligible: true,
      presumptive: "Very high or no bond",
      bondHearingType: "Standard with victim safety paramount",
      details: "Occupied dwelling robbery. Court may seek pretrial detention. Victim safety is primary consideration."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Pretrial detention hearing","Bond reduction","Suppression of evidence","Lineup challenge","Statement suppression"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Warrantless entry","Exigency exception overreach","Home search incident to arrest limits"],
      fifthAmendment: ["Miranda","Involuntary statement during home entry"],
      sixthAmendment: ["IAC for illegal entry challenge","Right to present defense"],
      dueProcess: ["Brady on in-home witness evidence"],
      iacPathways: ["Failed to move to suppress evidence from illegal entry","Failed to challenge warrant"]
    },
    strategic: {
      defenses: ["Misidentification","Consent to enter","No robbery occurred","Insufficient evidence","Mistaken address","Third-party perpetrator"],
      commonWeaknesses: ["Victim trauma impairs identification","Surveillance gaps","DNA transfer issues (touch DNA)","Imprecise timeline"],
      attackVectors: ["Entry legality","Victim ID accuracy","Forensic gaps","Photo array issues"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / burglary of dwelling",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Most professions barred — violent burglary",
      housing: "Public housing permanently barred",
      professionalLicenses: "Discretionary — moral turpitude"
    },
    detection: {
      warnings: [
        "Occupied dwelling — scoresheet significantly higher than unoccupied",
        "10-20-Life triggers are mandatory — 10 years minimum for firearm possession",
        "Any injury to occupant can trigger additional charges (aggravated battery)",
        "PRR and habitual can produce life sentence"
      ],
      statuteBars: []
    }
  },

  {
    id: "aggravated-child-abuse",
    name: "Aggravated Child Abuse",
    plainEnglish: "Intentionally harming or threatening to harm a child, causing great bodily harm or using a weapon",
    statute: "F.S. 827.03(2)",
    degree: "F1 — Life Felony",
    keywords: ["child abuse", "aggravated child abuse", "827.03", "child cruelty", "child neglect", "child harm"],
    aliases: ["child abuse aggravated", "827.03(2)", "child torture", "aggravated child neglect"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "None, but enhancement if great bodily harm",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: false,
      scoresheetBase: 74,
      notes: "Great bodily harm enhances sentence. DCF involvement mandatory. Dependency case may follow."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — F1 involving child victim",
      bondHearingType: "Standard with DCF input",
      details: "Child victim case. Bond may be high or no-bond depending on severity of harm and flight risk."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond hearing","DCF records subpoena","Medical records review","Psychological evaluation","Motion in limine (prior acts)"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — enumerated disqualifying offense",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["DCF warrantless entry","Hospital/medical records seizure"],
      fifthAmendment: ["Miranda","DCF interview without counsel — Thomas v. State issue"],
      sixthAmendment: ["IAC for medical expert","Right to confront medical witnesses"],
      dueProcess: ["Battered child syndrome scientific reliability","Shaken baby syndrome controversy"],
      iacPathways: ["Failed to hire medical expert","Failed to challenge shaken baby syndrome science","IAC for plea advice"]
    },
    strategic: {
      defenses: ["Accidental injury","Medical condition (bone disease, blood disorder)","False allegation (custody dispute)","No intent","Another cause of injury","Improper DCF interview technique"],
      commonWeaknesses: ["Shaken baby syndrome controversy (recent scientific consensus changes)","Bruise dating accuracy","Medical examiner bias","Parental stress missing"],
      attackVectors: ["Challenge medical causation evidence","DCF interview protocol (Thomas v. State)","Timeline analysis","Alternative cause"]
    },
    collateral: {
      immigration: "Mandatory deportation — crime of violence / child abuse",
      firearm: "Permanent disqualifier (felony + DV related)",
      voting: "Lost until restoration of civil rights",
      employment: "Barred from education, childcare, healthcare fields",
      housing: "Public housing severely limited",
      professionalLicenses: "Permanent disqualification for child-related professions",
      childCustody: "Significant family court consequences — termination of parental rights risk"
    },
    detection: {
      warnings: [
        "Shaken baby syndrome science is actively being reconsidered — expert critical",
        "DCF may initiate dependency proceedings parallel to criminal case",
        "Risk of termination of parental rights proceedings",
        "Medical expert is non-negotiable — causation is central"
      ],
      statuteBars: []
    }
  },

  {
    id: "cannabis-trafficking",
    name: "Cannabis Trafficking",
    plainEnglish: "Possessing, selling, or delivering cannabis in large quantities",
    statute: "F.S. 893.135(1)(a)",
    degree: "F1 — Life Felony (at highest tiers)",
    keywords: ["cannabis", "marijuana", "weed", "pot", "trafficking", "893.135", "drug trafficking", "marijuana trafficking"],
    aliases: ["marijuana trafficking", "weed trafficking", "cannabis trafficking 893.135", "pot trafficking"],
    sentencing: {
      maxPenalty: "30 years (25 lbs+) to Life (10,000 lbs+)",
      mandatoryMinimum: "25 lbs: 3-year min. 2,000 lbs: 7-year min. 10,000 lbs: 15-year min",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: true,
      scoresheetBase: 30,
      notes: "Lower scoresheet than other trafficking. Medical marijuana defense may be available with proper documentation. Much lower penalty exposure than fentanyl."
    },
    bond: {
      eligible: true,
      presumptive: "Moderate to high bond depending on weight",
      bondHearingType: "Standard",
      details: "F1 trafficking. Bond amount scaled to weight threshold and ties to community."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Motion to suppress (stop/ search warrant)","Medical marijuana defense notice","Motion for independent lab analysis (weight)","Franks hearing"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Eligible depending on adjudication — if adjudication withheld, may be eligible",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Traffic stop","K9 scan and reliability","Search warrant scope","Helicopter/ aerial surveillance"],
      fifthAmendment: ["Miranda","Drug quantity discussion"],
      sixthAmendment: ["IAC for trial vs plea advice — mandatory minimum exposure"],
      dueProcess: ["Medical marijuana affirmative defense (F.S. 381.986)","Weight including leaves vs marketable"],
      iacPathways: ["Failed to pursue medical defense","Failed to challenge stop","Inadequate advice on mandatory minimum"]
    },
    strategic: {
      defenses: ["Medical marijuana defense (valid card + compliance with F.S. 381.986)","No constructive possession","No intent to sell (personal use defense)","Under threshold (weight dispute)","Entrapment"],
      commonWeaknesses: ["Weight may include non-marketable plant material","Medical defense may reduce charges","Quantity may not exceed threshold"],
      attackVectors: ["Suppress evidence (bad stop/search)","Weight challenge","Medical marijuana defense","Lack of intent"]
    },
    collateral: {
      immigration: "Mandatory deportation — controlled substance violation (except first offense simple possession)",
      firearm: "Disqualifier if convicted",
      voting: "Lost until restoration of civil rights (but lower priority offense)",
      employment: "Barriers but lower severity than violent offenses",
      housing: "Public housing ineligible (drug trafficking)",
      professionalLicenses: "Discretionary disqualification",
      publicBenefits: "Federal benefits suspension possible"
    },
    detection: {
      warnings: [
        "Medical marijuana affirmative defense available — must show strict compliance with F.S. 381.986",
        "Weight dispute is critical — including leaves vs. marketable buds affects threshold",
        "Lowest mandatory minimum of all trafficking (3 years at 25+ lbs)",
        "Change in law: hemp/CBD defense may apply if testing not done"
      ],
      statuteBars: []
    }
  },

  {
    id: "dui-manslaughter",
    name: "DUI Manslaughter",
    plainEnglish: "Causing someone's death while driving under the influence",
    statute: "F.S. 316.193(3)(c)",
    degree: "F2 — 15 years",
    keywords: ["DUI", "manslaughter", "316.193", "drunk driving death", "DUI death", "vehicular homicide", "DUI manslaughter"],
    aliases: ["DUI causing death", "316.193(3)(c)", "vehicular homicide DUI"],
    sentencing: {
      maxPenalty: "15 years in prison",
      mandatoryMinimum: "None (but 4-year minimum if prior DUI within 5 years)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: false,
      scoresheetBase: 42,
      notes: "F2 with 15-year max. Restitution mandatory to victim's family. Driver's license revoked. Prior DUI within 5 years triggers 4-year mandatory minimum."
    },
    bond: {
      eligible: true,
      presumptive: "Moderate bond — F2 but death involved",
      bondHearingType: "Standard",
      details: "F2 with death. Bond typically set, possibly with driving restrictions. Victim impact considered."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Motion to suppress BAC results","Motion to challenge DUI investigation","Motion for independent toxicology","Motion to suppress statements"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible if convicted — F2 felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Traffic stop validity","DUI checkpoint legality","BAC test warrant requirements (consent vs. search warrant)"],
      fifthAmendment: ["Miranda","Refusal to submit to testing — adverse inference issue"],
      sixthAmendment: ["IAC for failure to challenge stop","IAC for inadequate accident reconstruction"],
      dueProcess: ["Brady on toxicology chain of custody","Officer DUI investigation protocol compliance"],
      iacPathways: ["Failed to challenge BAC admissibility","Failed to hire accident reconstruction expert"]
    },
    strategic: {
      defenses: ["No impairment (medical issue)","Improper BAC procedure (15-20 minute observation rule)","No causation (other driver at fault)","Road conditions caused accident","Rising BAC defense","Wrongful death civil settlement strategy"],
      commonWeaknesses: ["BAC test reliability — retrograde extrapolation","Field sobriety test subjectivity","No driving pattern evidence","Toxicology lab errors"],
      attackVectors: ["BAC collection procedure (time, observation, consent)","FSF/RFST methodology","Causation chain","Officer DUI protocol compliance"]
    },
    collateral: {
      immigration: "Mandatory deportation — crime of violence / aggravated felony if conviction",
      firearm: "Disqualifier while convicted felon",
      voting: "Lost until restoration of civil rights",
      employment: "Significant barriers — driving-related jobs permanently lost",
      housing: "Public housing may be available (lower severity offense)",
      professionalLicenses: "CDL permanently disqualified. Other licenses affected."
    },
    detection: {
      warnings: [
        "BAC admissibility depends on strict protocol compliance — 15-20 minute observation rule critical",
        "Causation must be proven — accident alone is not enough",
        "Restitution mandatory to surviving family",
        "Civil wrongful death case almost certain alongside criminal case",
        "Driver's license revocation for minimum 3 years (mandatory)"
      ],
      statuteBars: []
    }
  },

  {
    id: "felon-firearm",
    name: "Felon in Possession of Firearm",
    plainEnglish: "A convicted felon possessing a gun or ammunition",
    statute: "F.S. 790.23",
    degree: "F2 — 15 years (enhanced to F1 if prior violent felony)",
    keywords: ["felon firearm", "790.23", "felon possession", "possession of firearm by felon", "gun", "weapon"],
    aliases: ["felon in possession", "790.23(1)", "armed felon", "felon with a gun"],
    sentencing: {
      maxPenalty: "15 years (F2) or 30 years (F1 if 3 prior violent felonies)",
      mandatoryMinimum: "None (but PRR may apply)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: false,
      scoresheetBase: 22,
      notes: "Constructive possession issues are common. If 3 prior violent felonies, enhanced to F1 with 30-year max. PRR/habitual may apply."
    },
    bond: {
      eligible: true,
      presumptive: "Moderate bond — F2",
      bondHearingType: "Standard",
      details: "F2 felony. Standard bond typically set. Prior record may elevate bond."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Motion to suppress firearm (illegal stop/ search)","Motion to sever (if co-defendant)","Constructive possession challenge"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F2 felony conviction",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful stop and frisk","Terry stop conversion to full arrest","Vehicle search incident to arrest limits"],
      fifthAmendment: ["Miranda","Firearm ownership acknowledgment"],
      sixthAmendment: ["IAC for constructive possession instruction","IAC for motion to suppress"],
      dueProcess: ["Constructive possession requires knowledge AND dominion/control"],
      iacPathways: ["Failed to litigate constructive possession","Failed to suppress firearm"]
    },
    strategic: {
      defenses: ["No constructive possession (not in exclusive control)","No knowledge of firearm's presence","Third-party owner","Illegal search","Officer planted weapon","Stand your ground immunity (pending Supreme Court)"],
      commonWeaknesses: ["Constructive possession instruction often too broad","Joint occupancy and no evidence tying defendant to firearm"],
      attackVectors: ["Suppress firearm (illegal stop/ search)","Constructive possession jury instruction","Knowledge element"]
    },
    collateral: {
      immigration: "Mandatory deportation — firearm offense / aggravated felony",
      firearm: "Already disqualified (this is the charge itself)",
      voting: "Already lost from prior conviction",
      employment: "Further restrictions",
      housing: "Public housing ineligible for felons on supervision",
      professionalLicenses: "Further disqualification"
    },
    detection: {
      warnings: [
        "Constructive possession requires proof of knowledge AND dominion/control",
        "Mere proximity to firearm insufficient — State must show willful blindness or actual knowledge",
        "Joint occupancy cases significantly weaken constructive possession claims",
        "If juvenile adjudication is the predicate felony, some courts find it insufficient"
      ],
      statuteBars: []
    }
  },

  {
    id: "cocaine-trafficking",
    name: "Cocaine Trafficking",
    plainEnglish: "Possessing, selling, or delivering cocaine in specified quantities",
    statute: "F.S. 893.135(1)(b)",
    degree: "F1 — Life Felony (at highest tiers)",
    keywords: ["cocaine", "crack", "coke", "cocaine trafficking", "893.135", "drug trafficking", "powder cocaine", "crack cocaine"],
    aliases: ["cocaine trafficking 893.135", "powder cocaine trafficking", "crack trafficking", "coke trafficking"],
    sentencing: {
      maxPenalty: "Life (150kg+) to 30 years (28g+)",
      mandatoryMinimum: "28g: 3-year min. 200g: 7-year min. 400g: 15-year min. 150kg: Life",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": false,
      firearmEnhancement: true,
      scoresheetBase: 38,
      notes: "28 grams triggers trafficking (not 4 grams like fentanyl). Cocaine salt vs crack distinction matters for certain penalties."
    },
    bond: {
      eligible: true,
      presumptive: "High bond — F1 trafficking",
      bondHearingType: "Standard",
      details: "F1 with mandatory minimum. Bond scaled to weight and community ties."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Motion to suppress (stop/ warrant)","Independent lab analysis (purity/weight)","Franks hearing","Confidential informant identification"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 trafficking",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Traffic stop/K9 scan reliability","Search warrant — confidential informant reliability","No-knock warrant validity"],
      fifthAmendment: ["Miranda","Drug quantity admissions"],
      sixthAmendment: ["IAC for plea advice on mandatory minimum exposure","Right to independent lab analysis"],
      dueProcess: ["Lab analysis methodology (GC/MS)","Chain of custody integrity"],
      iacPathways: ["Failed to challenge traffic stop","Failed to obtain independent lab analysis","Inadequate mandatory minimum advice"]
    },
    strategic: {
      defenses: ["No constructive possession","No knowledge of substance","Not cocaine (different substance)","CI planted or unreliable","Entrapment","Below weight threshold"],
      commonWeaknesses: ["CI reliability is often the weakest link","Weight discrepancy vs purity","No video/audio of transaction"],
      attackVectors: ["CI credibility and history","No warrant or bad warrant","Weight does not meet threshold","Lab analysis gaps"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / drug trafficking",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Significant barriers",
      housing: "Public housing ineligible",
      professionalLicenses: "Disqualification — drug trafficking"
    },
    detection: {
      warnings: [
        "28g threshold (higher than fentanyl — 4g)",
        "CI credibility is frequently the core issue",
        "Mandatory minimums scale with weight — 3/7/15 years",
        "Federal vs state jurisdiction — cocaine cases often federalized",
        "Drug court eligibility limited for trafficking charges"
      ],
      statuteBars: []
    }
  },

  {
    id: "attempted-murder",
    name: "Attempted First-Degree Murder",
    plainEnglish: "Attempting to intentionally kill someone with premeditation",
    statute: "F.S. 777.04 / 782.04",
    degree: "F1 — Life Felony",
    keywords: ["attempted murder", "attempted homicide", "777.04", "attempt", "attempt to kill", "attempted 1st degree murder"],
    aliases: ["attempted first degree murder", "attempted premeditated murder", "attempted murder one", "777.04(1)"],
    sentencing: {
      maxPenalty: "Life in prison",
      mandatoryMinimum: "10-20-Life if firearm (10 possession, 20 discharge, 25 death)",
      prrExposure: true,
      habitualExposure: true,
      "10-20-life": true,
      firearmEnhancement: true,
      scoresheetBase: 56,
      notes: "10-20-Life applies. Attempt carries same score as completed murder in many cases. PRR and habitual exposure significant."
    },
    bond: {
      eligible: true,
      presumptive: "Very high bond — violent F1 life felony",
      bondHearingType: "Standard",
      details: "F1 life attempted murder. Victim safety concern. Court may set high or seek pretrial detention."
    },
    procedural: {
      pretrial: {
        stageOrder: ["ARREST","FIRST APPEARANCE","ARRAIGNMENT","DISCOVERY","MOTIONS","PRETRIAL","TRIAL"],
        criticalMotions: ["Bond hearing","Motion to suppress","Competency evaluation","Change of venue","Lesser included instruction conference"],
        arraignmentDeadline: "21 days from arrest / 40 days",
        speedyTrialPeriod: "175 days"
      },
      postconviction: {
        directAppealDeadline: "30 days from judgment",
        "3850Deadline": "2 years from conviction finality",
        "3800Deadline": "No time limit",
        sealExpunge: "Not eligible — F1 life felony",
        clemencyEligible: true
      }
    },
    constitutional: {
      fourthAmendment: ["Unlawful arrest","Search incident scope"],
      fifthAmendment: ["Miranda","Statement voluntariness"],
      sixthAmendment: ["IAC for lesser included instruction","IAC for sentencing mitigation"],
      dueProcess: ["Intent must be as specific as completed offense"],
      iacPathways: ["Failed to request lesser included","Failed to mitigate sentence","Inadequate self-defense investigation"]
    },
    strategic: {
      defenses: ["Self-defense","No premeditation (heat of passion)","Defense of others","Accident","Insufficient evidence of intent","Impossibility (legal defense)"],
      commonWeaknesses: ["Intent to kill harder to prove than completed murder","Heat of passion may reduce to attempted manslaughter"],
      attackVectors: ["Intent element — hardest for State to prove","Premeditation timing","Self-defense claim","Lesser included instruction"]
    },
    collateral: {
      immigration: "Mandatory deportation — aggravated felony / crime of violence",
      firearm: "Permanent disqualifier",
      voting: "Lost until restoration of civil rights",
      employment: "Severe limitations",
      housing: "Public housing barred",
      professionalLicenses: "Discretionary — crime of violence"
    },
    detection: {
      warnings: [
        "Intent element is the State's hardest proof — premeditation must be specific",
        "10-20-Life mandatory minimums apply (10 years for firearm)",
        "PRR and habitual exposure significant",
        "Lesser included offense (attempted manslaughter) may be available"
      ],
      statuteBars: []
    }
  }
];

const CHARGE_INDEX = CHARGES.map((c, i) => {
  const terms = [
    c.name.toLowerCase(),
    c.statute.toLowerCase(),
    c.plainEnglish.toLowerCase(),
    c.degree.toLowerCase(),
    ...(c.aliases || []).map(a => a.toLowerCase()),
    ...(c.keywords || []).map(k => k.toLowerCase())
  ];
  return { idx: i, terms };
});

function fuzzySearchCharges(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();

  const normalize = s => s.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const nq = normalize(q);

  const scored = CHARGE_INDEX.map(entry => {
    let score = 0;
    const charge = CHARGES[entry.idx];

    for (const term of entry.terms) {
      const nt = normalize(term);
      if (nt === nq) { score += 100; break; }
      if (nt.startsWith(nq)) { score += 50; break; }
      if (term.startsWith(q)) { score += 40; break; }
      if (nt.includes(nq)) { score += 20; break; }
      if (term.includes(q)) { score += 15; break; }
    }

    for (const kw of charge.keywords) {
      const nkw = normalize(kw.toLowerCase());
      if (nkw === nq) { score += 30; break; }
      if (nkw.includes(nq)) { score += 10; }
    }

    const words = nq.split(/\s+/);
    for (const word of words) {
      if (word.length < 2) continue;
      for (const term of entry.terms) {
        if (normalize(term).includes(word)) score += 5;
      }
      for (const kw of charge.keywords) {
        if (normalize(kw.toLowerCase()).includes(word)) score += 3;
      }
    }

    return { idx: entry.idx, charge, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function getThreatLevels(charge, timeline) {
  const levels = [];
  const s = charge.sentencing;
  const b = charge.bond;

  if (timeline === 'pretrial') {
    if (b && !b.eligible) {
      levels.push({ label: 'No Bond', severity: 'critical', detail: b.details });
    } else if (b && b.presumptive && b.presumptive.includes('Very high')) {
      levels.push({ label: 'High Bond Risk', severity: 'danger', detail: b.details });
    } else {
      levels.push({ label: 'Bond Possible', severity: 'warning', detail: b.details });
    }

    if (s && s.prrExposure) {
      levels.push({ label: 'PRR Exposure', severity: 'danger', detail: 'Prison Releasee Reoffender — mandatory 15-year minimum if qualifying prior' });
    }
    if (s && s['10-20-life']) {
      levels.push({ label: '10-20-Life Trigger', severity: 'critical', detail: 'Mandatory minimum 10 years if firearm possessed, 20 if discharged, 25 if death/injury' });
    }
    if (s && s.habitualExposure) {
      levels.push({ label: 'HFO Exposure', severity: 'danger', detail: 'Habitual Felony Offender — up to double or life sentence' });
    }
    if (s && s.firearmEnhancement) {
      levels.push({ label: 'Firearm Enhancement', severity: 'warning', detail: 'Firearm adds minimum mandatory time above base charge' });
    }
    if (s && s.mandatoryMinimum && !s.mandatoryMinimum.includes('None')) {
      const mm = s.mandatoryMinimum.split('.')[0];
      levels.push({ label: `Min Man: ${mm}`, severity: 'critical', detail: s.mandatoryMinimum });
    }
  }

  if (timeline === 'postconviction') {
    const pc = charge.procedural.postconviction;
    if (pc && pc.sealExpunge && pc.sealExpunge.toLowerCase().includes('not eligible')) {
      levels.push({ label: 'Seal: Ineligible', severity: 'critical', detail: pc.sealExpunge });
    } else if (pc && pc.sealExpunge && pc.sealExpunge.toLowerCase().includes('eligible')) {
      levels.push({ label: 'Seal: Eligible', severity: 'safe', detail: pc.sealExpunge });
    }
    if (charge.collateral && charge.collateral.immigration && charge.collateral.immigration.toLowerCase().includes('mandatory deportation')) {
      levels.push({ label: 'Deportation Risk', severity: 'critical', detail: charge.collateral.immigration });
    }
    if (charge.collateral && charge.collateral.firearm && charge.collateral.firearm.toLowerCase().includes('permanent')) {
      levels.push({ label: 'Firearm Ban', severity: 'danger', detail: charge.collateral.firearm });
    }
    if (charge.collateral && charge.collateral.registration) {
      levels.push({ label: 'Sex Offender Registry', severity: 'critical', detail: charge.collateral.registration });
    }
    if (pc && pc.clemencyEligible) {
      levels.push({ label: 'Clemency Possible', severity: 'warning', detail: 'Eligible to apply for clemency after 5-7 years post-supervision' });
    }
  }

  return levels;
}

function getProceduralTimeline(charge, timeline) {
  const stages = timeline === 'pretrial'
    ? (charge.procedural.pretrial.stageOrder || [])
    : ["CONVICTION","SENTENCING","DIRECT APPEAL","3.850 MOTION","3.800 MOTION","CLEMENCY","REENTRY"];

  const criticalMotions = timeline === 'pretrial'
    ? (charge.procedural.pretrial.criticalMotions || [])
    : [charge.procedural.postconviction?.directAppealDeadline || '', charge.procedural.postconviction?.['3850Deadline'] || '', charge.procedural.postconviction?.['3800Deadline'] || ''];

  return { stages, criticalMotions };
}

function getStrategicAnalysis(charge) {
  if (!charge.strategic) return null;
  return {
    defenses: charge.strategic.defenses || [],
    weaknesses: charge.strategic.commonWeaknesses || [],
    attackVectors: charge.strategic.attackVectors || [],
    constitutional: charge.constitutional || {}
  };
}

function getDetectionAlerts(charge) {
  const alerts = [];
  if (charge.detection) {
    for (const w of (charge.detection.warnings || [])) {
      alerts.push({ type: 'warning', text: w });
    }
  }
  if (charge.sentencing && charge.sentencing.prrExposure) {
    alerts.push({ type: 'critical', text: 'PRR — qualifying prior conviction triggers 15-year mandatory minimum' });
  }
  if (charge.sentencing && charge.sentencing?.['10-20-life']) {
    alerts.push({ type: 'critical', text: '10-20-Life — firearm possession triggers 10-year mandatory minimum' });
  }
  return alerts;
}
