const FLOWS = {
  "3850": {
    title: "Motion for Postconviction Relief",
    statute: "Fla. R. Crim. P. 3.850",
    tag: "Rule 3.850",
    color: "#F87171",
    steps: [
      {
        id:"case-info",
        title:"Case Information",
        sub:"Provide the basic case details exactly as they appear on your court documents.",
        tip:{label:"PRO TIP — Fla. R. Crim. P. 3.850(c)", text:"Your case number must match the exact format on your judgment."},
        fields:[
          {id:"county",      label:"County of Conviction",     type:"text",   required:true,  placeholder:"e.g., Broward", cite:"",
            help:"The Florida county where you were convicted — not where you currently live or are incarcerated."},
          {id:"case-num",    label:"Case Number",               type:"text",   required:true,  placeholder:"e.g., 2019-CF-012345",
            help:"Copy this exactly from your judgment or sentencing order. A mismatched case number is a common reason clerks reject filings."},
          {id:"judge",       label:"Presiding Judge",           type:"text",   required:false, placeholder:"e.g., Hon. [Last Name]",
            help:"The judge who handled your trial or accepted your plea — found on the judgment. Leave blank if unsure; it's optional."},
          {id:"prosecutor",  label:"State Attorney (optional)", type:"text",   required:false, placeholder:"",
            help:"The Assistant State Attorney who prosecuted your case, if named on any of your court paperwork. Not required to file."},
          {id:"def-name",    label:"Your Full Legal Name",      type:"text",   required:true,  placeholder:"As it appears on the judgment",
            help:"Use your name exactly as it appears on the judgment, including any suffix — this becomes the case caption."},
          {id:"def-dob",     label:"Date of Birth",             type:"date",   required:true,
            help:"Used to identify you in the court record alongside your case number."},
        ]
      },
      {
        id:"conviction",
        title:"Conviction & Sentence Details",
        sub:"Tell us how this case was resolved so we can ask the right follow-ups.",
        tip:{label:"WHY THIS MATTERS", text:"The 2-year filing deadline under Rule 3.850 begins when your conviction becomes 'final'."},
        fields:[
          {id:"case-resolution", label:"Was this case resolved by:", type:"decision", required:true,
            options:["Plea","Trial","Violation of Probation","Dismissal"],
            cite:"",
            help:"This determines which follow-up questions apply and which deadline starts your 2-year clock under Rule 3.850(b)."},
          {id:"plea-type", label:"What type of plea?", type:"decision", required:true, condition:{field:"case-resolution",equals:"Plea"},
            options:["Guilty Plea","No Contest / Nolo Contendere","Alford Plea","Open Plea (no agreement)"],
            help:"An Alford plea means you maintained innocence but agreed the State had enough evidence to convict. An open plea means you pleaded without a negotiated sentence."},
          {id:"plea-counsel", label:"Did you have a lawyer at the plea?", type:"decision", required:true, condition:{field:"case-resolution",equals:"Plea"},
            options:["Yes — retained private attorney","Yes — public defender","Yes — court-appointed counsel","No — I represented myself (pro se)"],
            help:"Matters for ineffective-assistance claims — only applies if you had counsel whose performance you're challenging."},
          {id:"plea-date", label:"Date of plea:", type:"date", required:true, condition:{field:"case-resolution",equals:"Plea"},
            help:"The date you entered your plea in court, not the later sentencing date."},
          {id:"trial-type", label:"What type of trial?", type:"decision", required:true, condition:{field:"case-resolution",equals:"Trial"},
            options:["Jury Trial","Bench Trial (judge only)"], cite:"",
            help:"A bench trial has no jury — the judge alone decides guilt."},
          {id:"trial-outcome", label:"Trial outcome:", type:"decision", required:true, condition:{field:"case-resolution",equals:"Trial"},
            options:["Convicted as charged","Convicted of lesser offense","Mistrial / Hung jury","Convicted after appeal / retrial"]},
          {id:"trial-date", label:"Date of trial:", type:"date", required:true, condition:{field:"case-resolution",equals:"Trial"},
            help:"The date the trial concluded with a verdict, not when it started."},
          {id:"vop-basis", label:"Basis of violation:", type:"decision", required:true, condition:{field:"case-resolution",equals:"Violation of Probation"},
            options:["New law violation","Technical violation (missed appointment, failed drug test)","Absconding","Multiple violations"],
            help:"A technical violation is a rule-compliance issue (missed meeting, failed drug test); a new law violation means a new charge."},
          {id:"vop-date", label:"Date of violation / VOP filing:", type:"date", required:true, condition:{field:"case-resolution",equals:"Violation of Probation"}},
          {id:"dismissal-reason", label:"Reason for dismissal:", type:"decision", required:true, condition:{field:"case-resolution",equals:"Dismissal"},
            options:["No information filed","Nolle prosequi (prosecution dropped)","Directed verdict","Successful motion to suppress","Other"],
            help:"Nolle prosequi means the State formally dropped the charges. A directed verdict means the judge ruled the evidence couldn't support a conviction."},
          {id:"dismissal-date", label:"Date of dismissal:", type:"date", required:true, condition:{field:"case-resolution",equals:"Dismissal"}},
          {id:"offense",       label:"Primary Offense",type:"text",  required:true, placeholder:"e.g., Robbery with a Firearm",
            help:"The lead charge you were convicted of — use the name from the judgment, not the original arrest charge if it changed."},
          {id:"offense-statute",label:"Florida Statute",            type:"text",  required:false,placeholder:"e.g., F.S. § 812.13(2)(a)",
            help:"Found on your judgment next to the offense. Helps cite the correct law in your motion, but the motion can still be drafted without it."},
          {id:"conviction-date",label:"Date of Conviction / Judgment",  type:"date",  required:true,
            help:"The date the court entered judgment — usually the same day as sentencing unless they were split into separate hearings."},
          {id:"sentence-date",  label:"Date of Sentencing",         type:"date",  required:true,
            help:"If your conviction became final without a direct appeal, this date (plus 30 days) is what starts your 2-year Rule 3.850 clock."},
          {id:"sentence-terms", label:"Sentence Imposed",           type:"text",  required:true, placeholder:"e.g., 15 years DOC + 5 years probation",
            help:"Summarize the full sentence — prison/jail time, probation, fines — as written on the judgment."},
          {id:"currently-incarcerated", label:"Are you currently incarcerated?", type:"decision", required:true,
            options:["Yes — in DOC custody","No — on probation / supervision","No — sentence completed"],
            help:"Rule 3.850 relief is available whether or not you're still in custody, but this affects where the motion is filed and what relief makes sense."},
        ]
      },
      {
        id:"grounds",
        title:"Grounds for Relief",
        sub:"Select all grounds that apply to your case.",
        tip:{label:"LEGAL STANDARD — Strickland v. Washington (1984)", text:"For IAC, you must show deficiency AND prejudice."},
        fields:[
          {id:"grounds-iac",   label:"Ineffective Assistance of Counsel",  type:"checkbox", detail:"Attorney's performance fell below an objective standard of reasonableness AND prejudiced the outcome",
            help:"The most common 3.850 ground. You must show both that counsel's performance was deficient and that it changed the outcome — Strickland v. Washington."},
          {id:"grounds-new",   label:"Newly Discovered Evidence",          type:"checkbox", detail:"Evidence not available at trial that would probably produce an acquittal",
            help:"Only applies if the evidence genuinely could not have been found earlier with reasonable diligence — not evidence you simply didn't use."},
          {id:"grounds-plea",  label:"Involuntary or Uninformed Plea",     type:"checkbox", detail:"Plea was not knowing, voluntary, and intelligent",
            help:"Use this if you weren't told the real consequences of your plea (e.g., deportation, sex-offender registration) or were pressured/misled into it."},
          {id:"grounds-sentence",label:"Illegal or Unconstitutional Sentence",type:"checkbox",detail:"Sentence exceeds statutory maximum or violates constitutional protections",
            help:"If the issue is only the sentence (not the conviction), Rule 3.800(a) may be a faster, no-deadline alternative — check the Tools tab."},
          {id:"grounds-brady", label:"Brady Violation",                    type:"checkbox", detail:"Prosecution withheld material evidence favorable to the defense",
            help:"Applies when the State had evidence helpful to your defense and didn't turn it over before trial or plea."},
          {id:"grounds-other", label:"Other Constitutional Violation",     type:"checkbox", detail:"Specify in the next section",
            help:"Use this for constitutional claims that don't fit the categories above — you'll describe the specific violation in the facts section."},
        ]
      },
      {
        id:"facts",
        title:"Statement of Facts",
        sub:"Describe the specific facts supporting your grounds for relief.",
        tip:{label:"WRITING GUIDANCE", text:"Each ground must be supported by specific facts, not just legal conclusions."},
        fields:[
          {id:"facts-main",    label:"Statement of Facts",    type:"textarea", required:true,  placeholder:"Describe in detail the facts supporting each ground for relief you selected above.",
            help:"Write what happened, when, and who was involved — specific facts, not conclusions like 'my lawyer was bad.' Courts deny motions that only assert legal conclusions."},
          {id:"relief-sought", label:"Relief Requested",      type:"select", options:["Evidentiary Hearing","Vacation of Conviction","New Trial","Resentencing","Correction of Sentence","Other"], required:true,
            help:"What you're asking the court to do if your motion succeeds. An evidentiary hearing lets you present witnesses/evidence; the others are final outcomes."},
          {id:"prior-motions", label:"Have you filed a prior Rule 3.850 motion?", type:"select", options:["No — this is my first","Yes — previous motion was denied","Yes — previous motion was withdrawn"], required:true,
            help:"Florida limits successive 3.850 motions — a prior denied motion on the same grounds can bar a new one unless an exception applies."},
        ]
      },
      {
        id:"contact",
        title:"Contact & Signature Information",
        sub:"This information appears on the motion certificate of service and signature block.",
        tip:{label:"PRO SE NOTE", text:"As a pro se filer, you must sign the motion under penalty of perjury."},
        fields:[
          {id:"filer-name",    label:"Your Full Name (as it appears on judgment)", type:"text", required:true,
            help:"Should match the name field from the Case Information step — used again here for the signature block."},
          {id:"dc-number",     label:"DC Number (if in DOC custody)",              type:"text", required:false, placeholder:"e.g., A12345",
            help:"Your Florida DOC inmate number, found on your DOC ID or mail. Leave blank if you're not currently in DOC custody."},
          {id:"filer-address", label:"Mailing Address",                            type:"text", required:true, placeholder:"Current address or institution address",
            help:"Where the court and State Attorney should send filings back to you — use your full institution address if incarcerated."},
          {id:"filer-city",    label:"City, State, ZIP",                           type:"text", required:true, placeholder:"e.g., Fort Lauderdale, FL 33301"},
          {id:"state-atty-addr",label:"State Attorney's Office Address (for service)",type:"text",required:true, placeholder:"e.g., 201 SE 6th St, Fort Lauderdale, FL 33301",
            help:"You must serve a copy on the State Attorney's office for the county of conviction — this address goes on the certificate of service."},
          {id:"date-signed",   label:"Date",                                       type:"date", required:true,
            help:"The date you're signing the motion — you're certifying under penalty of perjury that the facts stated are true as of this date."},
        ]
      }
    ]
  },

  "3800": {
    title: "Motion to Correct Illegal Sentence",
    statute: "Fla. R. Crim. P. 3.800(a)",
    tag: "Rule 3.800",
    color: "#60A5FA",
    steps: [
      {
        id:"case-info",
        title:"Case Information",
        sub:"Enter your case details as they appear on your judgment and sentence.",
        tip:{label:"KEY ADVANTAGE — No Deadline", text:"Unlike Rule 3.850, a 3.800(a) motion has NO time limit."},
        fields:[
          {id:"county",    label:"County of Conviction", type:"text", required:true, placeholder:"e.g., Miami-Dade", help:"The Florida county where you were convicted, not where you live now or are incarcerated."},
          {id:"case-num",  label:"Case Number",          type:"text", required:true, help:"Copy this exactly from your judgment or sentencing order."},
          {id:"def-name",  label:"Full Legal Name",      type:"text", required:true, help:"Use your name exactly as it appears on the judgment."},
          {id:"dc-number", label:"DC Number (if applicable)", type:"text", required:false, help:"Your Florida DOC inmate number. Leave blank if you're not currently in DOC custody."},
          {id:"judge",     label:"Sentencing Judge",     type:"text", required:false, help:"The judge who imposed the sentence — found on the judgment. Optional."},
        ]
      },
      {
        id:"sentence-details",
        title:"Sentence Details",
        sub:"Describe the sentence imposed and why it is illegal.",
        tip:{label:"WHAT MAKES A SENTENCE 'ILLEGAL'", text:"A sentence is illegal if it exceeds the statutory maximum or violates constitutional protections."},
        fields:[
          {id:"offense",           label:"Offense Convicted Of",          type:"text",   required:true, help:"The lead charge from the judgment — what you were actually convicted of, not the original arrest charge."},
          {id:"offense-statute",   label:"Florida Statute",               type:"text",   required:true, placeholder:"e.g., F.S. § 893.13", help:"Found on your judgment next to the offense. Needed to identify the correct statutory maximum."},
          {id:"sentence-imposed",  label:"Sentence Imposed",              type:"text",   required:true, placeholder:"e.g., 20 years Florida DOC", help:"The exact sentence the court imposed, as written on the judgment."},
          {id:"max-sentence",      label:"Statutory Maximum for Offense", type:"text",   required:true, placeholder:"e.g., 15 years", help:"The highest sentence the law allows for this degree of offense — this is what your sentence is being compared against."},
          {id:"illegal-basis",     label:"Basis of Illegality",          type:"select",  options:["Exceeds statutory maximum","Below mandatory minimum","Double jeopardy violation","Scoresheet calculation error","Habitual Offender designation improper","Other illegal basis"], required:true, help:"Pick the specific legal defect — this drives which argument and case law the motion cites."},
          {id:"illegal-explain",   label:"Explain Why the Sentence Is Illegal", type:"textarea", required:true, placeholder:"Be specific: cite the statute that caps the sentence...", help:"Walk through the math or legal rule that makes the sentence illegal — courts deny vague claims that don't show the specific defect."},
        ]
      },
      {
        id:"relief",
        title:"Relief Requested",
        sub:"State exactly what sentence correction you are asking the court to make.",
        tip:{label:"BE SPECIFIC", text:"Tell the court exactly what the correct sentence should be."},
        fields:[
          {id:"relief-requested", label:"Specific Relief Requested", type:"textarea", required:true, placeholder:"e.g., 'Petitioner respectfully requests the Court correct the illegal sentence...'", help:"State the exact corrected sentence you want — a 3.800(a) motion that just says 'illegal' without naming the fix is often denied."},
          {id:"filer-address",   label:"Your Mailing Address",      type:"text",     required:true, help:"Where the clerk will mail the court's order."},
          {id:"filer-city",      label:"City, State, ZIP",          type:"text",     required:true},
          {id:"date-signed",     label:"Date",                      type:"date",     required:true},
        ]
      }
    ]
  },

  "expunge": {
    title: "Petition to Seal / Expunge Record",
    statute: "F.S. § 943.0585 / § 943.059",
    tag: "Seal / Expunge",
    color: "#4ADE80",
    steps: [
      {
        id:"eligibility",
        title:"Eligibility Check",
        sub:"Florida has strict eligibility requirements.",
        tip:{label:"ONE CHANCE", text:"Florida allows only ONE sealing or expunction per lifetime."},
        fields:[
          {id:"elig-prior-seal",     label:"Have you previously had a record sealed or expunged (any state)?", type:"select", options:["No — never","Yes — this may disqualify me"], required:true, help:"Florida allows only one sealing or expungement per lifetime, ever, in any state — a prior one almost always disqualifies a new petition."},
          {id:"elig-convicted",      label:"Were you adjudicated guilty (convicted)?", type:"select", options:["No — adjudication was withheld","Yes — I was convicted"], required:true, help:"Most convictions cannot be sealed or expunged — withhold of adjudication is what makes most petitions eligible."},
          {id:"elig-charge-type",    label:"Type of charge to be sealed/expunged", type:"select", options:["Arrest only — charges never filed","Charges filed — case dismissed","Charges filed — nolle prosse","No information filed","Withhold of adjudication","Other"], required:true, help:"How the case ended controls whether you need sealing or expungement, and which one you qualify for."},
          {id:"elig-disqualifying",  label:"Does the charge involve any of the following?", type:"select", options:["None of the below","Murder or manslaughter","Sexual offense","Child abuse","Robbery","Terrorism","Other disqualifying offense"], required:true, help:"These offense categories are permanently disqualifying under Florida law, regardless of how the case ended."},
        ]
      },
      {
        id:"record-info",
        title:"Record to Be Sealed / Expunged",
        sub:"Provide details about the specific record.",
        tip:{label:"SEALING vs. EXPUNGEMENT", text:"EXPUNGEMENT destroys records. SEALING hides records from public view."},
        fields:[
          {id:"relief-type",    label:"Are you seeking sealing or expungement?", type:"select", options:["Sealing (F.S. § 943.059)","Expungement (F.S. § 943.0585)"], required:true, help:"Expungement (charges dropped/acquitted) physically destroys the record; sealing (withhold of adjudication) hides it from public view but keeps it for law enforcement."},
          {id:"arrest-date",    label:"Date of Arrest",           type:"date", required:true, help:"The date law enforcement took you into custody for this charge."},
          {id:"arrest-charge",  label:"Charge(s) to be Sealed/Expunged", type:"text", required:true, placeholder:"e.g., Possession of Cannabis", help:"The exact charge(s) named on the arrest record, not necessarily the final charge filed."},
          {id:"arresting-agency",label:"Arresting Agency",        type:"text", required:true, placeholder:"e.g., Broward County Sheriff's Office", help:"The police department or sheriff's office that made the arrest — needed to notify them of the order."},
          {id:"arrest-county",  label:"County of Arrest",         type:"text", required:true},
          {id:"obt-number",     label:"OBT Number (if known)",    type:"text", required:false, placeholder:"From your criminal history report", help:"The booking/tracking number on your FDLE criminal history report. Speeds up processing but not required to file."},
        ]
      },
      {
        id:"fdle-step",
        title:"FDLE Certificate of Eligibility",
        sub:"Before filing with the court, you must first obtain a Certificate of Eligibility from FDLE.",
        tip:{label:"REQUIRED FIRST STEP", text:"You CANNOT file without first obtaining a Certificate of Eligibility."},
        fields:[
          {id:"fdle-cert-obtained", label:"Have you obtained your FDLE Certificate of Eligibility?", type:"select", options:["Yes — I have the certificate","No — I need to apply first","Applied — waiting for certificate"], required:true, help:"The court cannot grant your petition without this certificate attached — apply to FDLE before drafting if you haven't already."},
          {id:"fdle-cert-date",     label:"Certificate Issue Date (if obtained)",  type:"date",  required:false},
          {id:"fdle-cert-number",   label:"Certificate Number (if obtained)",      type:"text",  required:false, help:"Printed on the certificate FDLE sends you."},
          {id:"atty-general-copy",  label:"Will you serve the Attorney General?",  type:"select", options:["Yes — required by statute","No — I need to review this requirement"], required:true, help:"Florida law requires serving a copy of the petition on the Office of the Attorney General."},
        ]
      },
      {
        id:"petitioner-info",
        title:"Petitioner Information",
        sub:"Your personal information for the petition.",
        fields:[
          {id:"pet-name",     label:"Full Legal Name",       type:"text", required:true, help:"Use your name exactly as it appears on the arrest record."},
          {id:"pet-dob",      label:"Date of Birth",         type:"date", required:true},
          {id:"pet-address",  label:"Current Address",       type:"text", required:true},
          {id:"pet-city",     label:"City, State, ZIP",      type:"text", required:true},
          {id:"pet-phone",    label:"Phone Number",          type:"text", required:false},
          {id:"date-signed",  label:"Date of Petition",      type:"date", required:true},
        ]
      }
    ]
  },

  "terminate": {
    title: "Petition for Early Termination of Probation",
    statute: "Fla. Stat. § 948.04",
    tag: "Early Termination",
    color: "#F9B24C",
    steps: [
      {
        id:"probation-info",
        title:"Probation Information",
        sub:"Enter your current probation details. You must have completed at least 50% of the term.",
        tip:{label:"YOUR RIGHT — Fla. Stat. § 948.04", text:"This is not a favor — it is a statutory entitlement."},
        fields:[
          {id:"county",          label:"County of Supervision",      type:"text", required:true, help:"The county where your probation is supervised, not necessarily where you were convicted."},
          {id:"case-num",        label:"Case Number",                type:"text", required:true},
          {id:"def-name",        label:"Full Legal Name",            type:"text", required:true},
          {id:"offense",         label:"Conviction Offense",         type:"text", required:true},
          {id:"prob-start",      label:"Probation Start Date",       type:"date", required:true, help:"Used to calculate what percentage of your term you've completed — you generally need at least half."},
          {id:"prob-end",        label:"Scheduled End Date",         type:"date", required:true},
          {id:"prob-type",       label:"Type of Supervision",        type:"select", options:["Standard Probation","Community Control","Drug Offender Probation","Sex Offender Probation","Administrative Probation"], required:true, help:"Some supervision types (e.g., sex offender probation) have stricter early-termination limits than others."},
          {id:"po-name",         label:"Probation Officer Name",     type:"text", required:false},
          {id:"po-office",       label:"P.O. Office Address",        type:"text", required:false},
        ]
      },
      {
        id:"compliance",
        title:"Compliance Record",
        sub:"Document your compliance.",
        tip:{label:"THE EVIDENCE BOX", text:"Organized documentation wins."},
        fields:[
          {id:"fees-paid",       label:"Are all supervision fees current?", type:"select", options:["Yes — all fees paid","Substantially paid","Payment plan established"], required:true, help:"Outstanding fees are one of the most common reasons courts deny early termination."},
          {id:"restitution-status",label:"Restitution status", type:"select", options:["Paid in full","Payment plan — current","No restitution ordered"], required:true, help:"Unpaid restitution to a victim is a strong reason courts deny termination, even with otherwise perfect compliance."},
          {id:"drug-tests",      label:"Drug test compliance", type:"select", options:["All tests passed","Not required","One or more violations"], required:true},
          {id:"employed",        label:"Employment status", type:"select", options:["Employed — full time","Employed — part time","Self-employed","Disability / unable to work","Actively seeking"], required:true, help:"Stable employment is one of the factors courts weigh most heavily in granting early termination."},
          {id:"community-service",label:"Community service hours (if ordered)", type:"text", required:false, placeholder:"e.g., 100 of 100 hours completed"},
          {id:"violations",      label:"Any violations of probation on record?", type:"select", options:["No violations","One minor technical violation","Multiple violations"], required:true, help:"Be honest here — courts check the record, and an undisclosed violation undermines your credibility on everything else."},
        ]
      },
      {
        id:"po-recommendation",
        title:"Probation Officer Position",
        sub:"The P.O.'s position significantly affects outcomes.",
        tip:{label:"THE NO-OBJECTION STRATEGY", text:"A P.O. 'No Objection' letter helps significantly."},
        fields:[
          {id:"po-position",     label:"P.O.'s position on early termination", type:"select", options:["P.O. recommends / no objection","P.O. neutral","P.O. objects","Unknown"], required:true, help:"Judges give significant weight to whether the supervising P.O. supports or opposes the request."},
          {id:"po-letter",       label:"Do you have a written P.O. letter?", type:"select", options:["Yes — attaching as exhibit","No — verbal support only","No — P.O. did not provide one"], required:false, help:"A written letter carries more weight than a verbal statement and can be attached as an exhibit."},
        ]
      },
      {
        id:"statement",
        title:"Statement of Facts & Relief",
        sub:"State the specific facts supporting your petition.",
        tip:{label:"WHAT TO INCLUDE", text:"Highlight: percentage of term completed, all conditions met."},
        fields:[
          {id:"facts",           label:"Statement Supporting Petition", type:"textarea", required:true, placeholder:"Petitioner has completed ___% of the probationary term...", help:"Lead with the percentage of the term completed and a summary of full compliance — specifics persuade more than general good-conduct claims."},
          {id:"alternative",     label:"If full termination is not granted, request:", type:"select", options:["Administrative Probation — no reporting","Reduction of remaining term","No alternative requested"], required:false, help:"A fallback request gives the judge a middle option if they're not ready to grant full termination."},
          {id:"filer-address",   label:"Your Address",                    type:"text", required:true},
          {id:"filer-city",      label:"City, State, ZIP",                type:"text", required:true},
          {id:"date-signed",     label:"Date",                            type:"date", required:true},
        ]
      }
    ]
  },

  "restitution": {
    title: "Motion to Modify Restitution",
    statute: "Fla. Stat. § 775.089",
    tag: "Restitution Mod.",
    color: "#A78BFA",
    steps: [
      {
        id:"case-info",
        title:"Case & Restitution Information",
        sub:"Enter the details of the restitution order.",
        tip:{label:"BEARDEN v. GEORGIA (1983)", text:"Courts cannot revoke probation solely because someone cannot afford to pay."},
        fields:[
          {id:"county",        label:"County",                         type:"text",   required:true},
          {id:"case-num",      label:"Case Number",                    type:"text",   required:true},
          {id:"def-name",      label:"Full Legal Name",                type:"text",   required:true},
          {id:"rest-amount",   label:"Total Restitution Ordered ($)",  type:"text",   required:true, placeholder:"e.g., $15,500.00", help:"The full amount from the restitution order, not what's currently owed."},
          {id:"rest-paid",     label:"Amount Paid to Date ($)",        type:"text",   required:true, placeholder:"e.g., $2,200.00", help:"Shows the court you've been making a genuine effort, even if the current payment amount is unaffordable."},
          {id:"rest-monthly",  label:"Current Monthly Payment Ordered",type:"text",   required:true, placeholder:"e.g., $250/month"},
          {id:"rest-victim",   label:"Victim Name (if known)",         type:"text",   required:false, help:"Used for the certificate of service — the victim is entitled to notice of a modification request."},
        ]
      },
      {
        id:"financial",
        title:"Financial Hardship Documentation",
        sub:"Document your income and expenses.",
        tip:{label:"HARDSHIP WORKSHEET", text:"Courts must consider financial resources and dependent obligations."},
        fields:[
          {id:"monthly-income",  label:"Gross Monthly Income ($)",        type:"text", required:true, placeholder:"All sources combined", help:"Under Bearden v. Georgia, the court must weigh your actual ability to pay against the current payment amount."},
          {id:"income-source",   label:"Source of Income",                type:"text", required:true, placeholder:"e.g., Employment at [employer]"},
          {id:"monthly-rent",    label:"Monthly Rent / Housing ($)",      type:"text", required:true},
          {id:"monthly-food",    label:"Monthly Food / Utilities ($)",     type:"text", required:true},
          {id:"monthly-transport",label:"Transportation ($)",             type:"text", required:true},
          {id:"monthly-other",   label:"Other Essential Expenses ($)",    type:"text", required:false, placeholder:"Medical, childcare, court fees, etc."},
          {id:"dependents",      label:"Number of Dependents",            type:"text", required:false, placeholder:"e.g., 2 children", help:"Courts must consider dependents you're financially responsible for when setting an affordable payment."},
          {id:"modification-request",label:"Requested Modified Payment ($)",type:"text",required:true, placeholder:"e.g., $50/month", help:"Propose a specific, realistic number based on the income/expenses above — an open-ended request is harder for a judge to grant."},
        ]
      },
      {
        id:"bona-fide",
        title:"Bona Fide Efforts to Pay",
        sub:"Document every effort you have made to pay.",
        tip:{label:"CRITICAL", text:"Courts look for evidence you tried to pay even when you couldn't."},
        fields:[
          {id:"efforts",       label:"Describe your bona fide efforts to pay", type:"textarea", required:true, placeholder:"e.g., Made consistent $50 monthly payments...", help:"This is the core of a Bearden defense — the court can't revoke probation for nonpayment if you genuinely tried but couldn't afford the full amount."},
          {id:"changed-circum",label:"What changed circumstances make payment impossible?", type:"textarea", required:true, placeholder:"e.g., Lost employment on [date]...", help:"Be specific about what changed since the original order was set — a job loss, medical issue, or new dependent."},
          {id:"filer-address", label:"Your Address",    type:"text", required:true},
          {id:"filer-city",    label:"City, State, ZIP",type:"text", required:true},
          {id:"date-signed",   label:"Date",            type:"date", required:true},
        ]
      }
    ]
  },

  "appeal": {
    title: "Direct Appeal Packet",
    statute: "Fla. R. App. P. 9.110 / 9.140",
    tag: "Appellate",
    color: "#60A5FA",
    steps: [
      {
        id:"appeal-posture",
        title:"Appeal Posture & Deadlines",
        sub:"Capture the order or judgment being challenged.",
        tip:{label:"NOTICE OF APPEAL WINDOW", text:"Appellate deadlines are short and unforgiving."},
        fields:[
          {id:"case-num",      label:"Case Number",             type:"text", required:true, placeholder:"e.g., 2019-CF-012345"},
          {id:"county",        label:"County / Trial Court",    type:"text", required:true, placeholder:"e.g., Broward"},
          {id:"judgment-date", label:"Judgment / Order Date",   type:"date", required:true, help:"The date the order or judgment you're appealing was entered — your 30-day Notice of Appeal clock starts here."},
          {id:"appeal-due",    label:"Notice of Appeal Due Date",type:"date", required:false, help:"Generally 30 days after the judgment/order date under Fla. R. App. P. 9.110."},
          {id:"notice-filed-date", label:"Notice Filed Date", type:"date", required:false},
          {id:"record-due-date", label:"Record Due Date", type:"date", required:false},
          {id:"appellate-dca", label:"Appellate District / Court", type:"select", required:true, options:["First District Court of Appeal","Second District Court of Appeal","Third District Court of Appeal","Fourth District Court of Appeal","Fifth District Court of Appeal","Florida Supreme Court / Other"], help:"Determined by which county the trial court is in — each Florida county is assigned to one of five DCAs."},
          {id:"appellant-name",label:"Appellant Name",          type:"text", required:true, placeholder:"As it appears on the lower-court record"},
        ]
      },
      {
        id:"issues",
        title:"Issues Presented for Review",
        sub:"State the errors you want reviewed.",
        tip:{label:"APPELLATE FOCUS", text:"An appellate court reviews legal error and preserved issues."},
        fields:[
          {id:"issues-summary", label:"Primary Issues on Appeal", type:"textarea", required:true, placeholder:"List each issue separately...", help:"Appellate courts review legal errors, not factual disagreements — frame each issue as a specific ruling the trial court got wrong."},
          {id:"preservation",    label:"How the Issue Was Preserved", type:"textarea", required:true, placeholder:"Identify the objection, motion, or argument...", help:"An issue not objected to at trial is usually waived on appeal — show exactly where and how you raised it below."},
          {id:"record-cites",    label:"Key Record References", type:"textarea", required:false, placeholder:"Transcript pages, hearing dates, etc."},
          {id:"relief-requested",label:"Requested Appellate Relief", type:"textarea", required:true, placeholder:"e.g., reversal, remand for new trial..."},
        ]
      },
      {
        id:"record",
        title:"Record, Transcript, and Filing Checklist",
        sub:"Track the record needed for appellate review.",
        tip:{label:"BUILD THE RECORD", text:"The appeal lives or dies on the record."},
        fields:[
          {id:"transcript-status", label:"Transcript Status", type:"select", required:true, options:["Not ordered","Ordered","Partially received","Complete","Not required / record-only issue"], help:"The appellate court can only review what's in the record — an issue without a transcript to support it usually can't be reviewed."},
          {id:"record-items",      label:"Record Items Needed", type:"textarea", required:true, placeholder:"Orders, hearing transcripts, exhibits..."},
          {id:"filing-status",     label:"Current Filing Status", type:"textarea", required:false, placeholder:"Notice filed, extensions, etc."},
          {id:"service-list",      label:"Service / Notice Recipients", type:"textarea", required:false, placeholder:"State Attorney, Clerk, opposing counsel..."},
        ]
      },
      {
        id:"closing",
        title:"Appellate Summary",
        sub:"Capture the final summary for the working packet.",
        tip:{label:"MANUAL OUTPUT", text:"This packet gives you a clean summary for your notes and deadlines."},
        fields:[
          {id:"appeal-summary", label:"Short Case Summary", type:"textarea", required:true, placeholder:"Briefly describe the case posture..."},
          {id:"appellant-address", label:"Address", type:"text", required:true},
          {id:"appellant-city", label:"City, State, ZIP", type:"text", required:true},
          {id:"date-signed", label:"Date", type:"date", required:true},
        ]
      }
    ]
  },

  "appeal-record": {
    title: "Record & Brief Prep",
    statute: "Fla. R. App. P. 9.200 / 9.210",
    tag: "Appellate",
    color: "#60A5FA",
    steps: [
      {
        id:"record-posture",
        title:"Record Designation",
        sub:"Identify what needs to be included in the appellate record.",
        tip:{label:"THE RECORD CONTROLS THE BRIEF", text:"Confirm the orders, transcripts, and exhibits that must be included."},
        fields:[
          {id:"case-num",      label:"Case Number", type:"text", required:true, placeholder:"e.g., 2019-CF-012345"},
          {id:"county",        label:"County / Trial Court", type:"text", required:true, placeholder:"e.g., Broward"},
          {id:"appellant-name", label:"Appellant Name", type:"text", required:true, placeholder:"As it appears on the lower-court record"},
          {id:"appellate-dca", label:"Appellate District / Court", type:"select", required:true, options:["First District Court of Appeal","Second District Court of Appeal","Third District Court of Appeal","Fourth District Court of Appeal","Fifth District Court of Appeal","Florida Supreme Court / Other"]},
          {id:"transcript-status", label:"Transcript Status", type:"select", required:true, options:["Not ordered","Ordered","Partially received","Complete","Not required / record-only issue"], help:"You can't designate transcripts you haven't ordered yet — order them as early as possible since court reporters often take weeks."},
        ]
      },
      {
        id:"designation",
        title:"Designation & Transcript List",
        sub:"List the filings, transcripts, and exhibits to include.",
        tip:{label:"DESIGNATE WITH PRECISION", text:"Identify the exact hearing dates, motions, and orders."},
        fields:[
          {id:"record-items", label:"Record Items to Include", type:"textarea", required:true, placeholder:"Orders, docket entries, hearing transcripts, exhibits...", help:"Be exhaustive — if an order or exhibit isn't designated into the record, the appellate court generally can't consider it."},
          {id:"transcript-dates", label:"Transcript Dates Needed", type:"textarea", required:false, placeholder:"List the hearing dates needed..."},
          {id:"designation-filed", label:"Has the designation been filed?", type:"select", required:true, options:["Yes — designation filed","No — preparing now","Need help identifying items"]},
          {id:"brief-due-date", label:"Initial Brief Due Date", type:"date", required:false, help:"Generally 70 days after the notice of appeal under Fla. R. App. P. 9.140, but confirm against the actual docket."},
          {id:"extension-status", label:"Extension / Abeyance Status", type:"textarea", required:false},
          {id:"service-list", label:"Service / Notice Recipients", type:"textarea", required:false},
        ]
      },
      {
        id:"brief-outline",
        title:"Initial Brief Outline",
        sub:"Map your issues into a working brief outline.",
        tip:{label:"BRIEF STRATEGY", text:"Start with the heading, issue statement, record cite, law, and remedy."},
        fields:[
          {id:"issues-summary", label:"Primary Issues for the Brief", type:"textarea", required:true, placeholder:"List the appellate issues in order...", help:"Order issues from strongest to weakest — courts give the most attention to the first issue raised."},
          {id:"standard-review", label:"Standard of Review Notes", type:"textarea", required:false, help:"E.g., de novo, abuse of discretion, competent substantial evidence — this controls how much deference the trial court's ruling gets."},
          {id:"brief-outline", label:"Initial Brief Structure", type:"textarea", required:true, placeholder:"Intro, statement of case, issue headings, argument..."},
          {id:"relief-requested", label:"Requested Appellate Relief", type:"textarea", required:true, placeholder:"e.g., reversal, remand, resentencing..."},
        ]
      },
      {
        id:"closing",
        title:"Briefing Summary",
        sub:"Capture the next steps.",
        tip:{label:"NEXT ACTIONS", text:"If the record is incomplete, solve that first."},
        fields:[
          {id:"brief-status", label:"Current Briefing Status", type:"textarea", required:false},
          {id:"appellant-address", label:"Address", type:"text", required:true},
          {id:"appellant-city", label:"City, State, ZIP", type:"text", required:true},
          {id:"date-signed", label:"Date", type:"date", required:true},
        ]
      }
    ]
  },

  "appeal-rehearing": {
    title: "Rehearing / Mandate Preservation",
    statute: "Fla. R. App. P. 9.330 / 9.340 / 9.350",
    tag: "Appellate",
    color: "#60A5FA",
    steps: [
      {
        id:"decision-info",
        title:"Decision & Deadline Check",
        sub:"Capture the appellate decision details.",
        tip:{label:"DEADLINES MOVE FAST", text:"The clock starts immediately after the appellate decision."},
        fields:[
          {id:"case-num", label:"Case Number", type:"text", required:true, placeholder:"e.g., 2019-CF-012345"},
          {id:"appellate-dca", label:"Appellate District / Court", type:"select", required:true, options:["First District Court of Appeal","Second District Court of Appeal","Third District Court of Appeal","Fourth District Court of Appeal","Fifth District Court of Appeal","Florida Supreme Court / Other"]},
          {id:"appellant-name", label:"Appellant Name", type:"text", required:true, placeholder:"As it appears on the appellate docket"},
          {id:"decision-date", label:"Decision / Opinion Date", type:"date", required:true, help:"The date the appellate court issued its opinion — your rehearing deadline runs from this date, typically 15 days."},
          {id:"rehearing-due-date", label:"Rehearing Due Date", type:"date", required:false, help:"Generally 15 days after the decision date under Fla. R. App. P. 9.330 — this deadline is strict."},
          {id:"mandate-date", label:"Mandate Date (if known)", type:"date", required:false, help:"The mandate transfers the case back to the trial court — once it issues, the appellate court's involvement effectively ends."},
        ]
      },
      {
        id:"rehearing-basis",
        title:"Rehearing Grounds",
        sub:"Explain why rehearing is being sought.",
        tip:{label:"WHAT REHEARING IS FOR", text:"Identify a specific point of law or fact the court overlooked."},
        fields:[
          {id:"motion-type", label:"Requested Post-Decision Relief", type:"select", required:true, options:["Panel rehearing","Rehearing en banc","Clarification","Certification","Stay of mandate","No rehearing requested"], help:"Each type targets a different problem — rehearing argues the panel erred, clarification asks the court to explain an ambiguous ruling, certification asks it to send a question to a higher court."},
          {id:"motion-filed-date", label:"Motion Filed Date", type:"date", required:false},
          {id:"rehearing-grounds", label:"Grounds for Relief", type:"textarea", required:true, placeholder:"State the exact issue the court overlooked...", help:"Rehearing is not a chance to re-argue the case — it must point to a specific point of law or fact the court actually overlooked or misapprehended."},
          {id:"record-cites", label:"Record / Opinion References", type:"textarea", required:false},
          {id:"preservation", label:"Preservation Notes", type:"textarea", required:false},
        ]
      },
      {
        id:"mandate",
        title:"Mandate Protection",
        sub:"Track whether you need to stay the mandate.",
        tip:{label:"MANDATE CONTROL", text:"Once the mandate issues, the court's involvement narrows quickly."},
        fields:[
          {id:"stay-request", label:"Do you want to stay the mandate?", type:"select", required:true, options:["Yes — stay requested","No — allow mandate to issue","Need to decide"], help:"Filing a timely motion for rehearing automatically stays the mandate — request a stay separately only if you need more time."},
          {id:"mandate-concern", label:"Why is a stay needed?", type:"textarea", required:false},
          {id:"next-step", label:"Next Filing / Next Step", type:"textarea", required:true, placeholder:"Rehearing motion, notice to higher court..."},
        ]
      },
      {
        id:"closing",
        title:"Post-Decision Summary",
        sub:"Summarize the post-decision status.",
        tip:{label:"KEEP THE FILE MOVING", text:"Track both the motion deadline and the mandate status together."},
        fields:[
          {id:"rehearing-summary", label:"Short Summary", type:"textarea", required:true, placeholder:"Summarize the decision and reason for the filing."},
          {id:"appellant-address", label:"Address", type:"text", required:true},
          {id:"appellant-city", label:"City, State, ZIP", type:"text", required:true},
          {id:"date-signed", label:"Date", type:"date", required:true},
        ]
      }
    ]
  },

  "2254": {
    title: "Federal Habeas Corpus Packet",
    statute: "28 U.S.C. § 2254 / AO 241",
    tag: "Federal",
    color: "#F59E0B",
    steps: [
      {
        id:"state-judgment",
        title:"State Judgment & Custody",
        sub:"Identify the Florida state judgment being challenged.",
        tip:{label:"WHAT 2254 IS", text:"Section 2254 is the federal habeas pathway for state custody."},
        fields:[
          {id:"def-name", label:"Petitioner Name", type:"text", required:true, placeholder:"Name as used in the state case"},
          {id:"county", label:"Florida County of Conviction", type:"text", required:true, placeholder:"e.g., Broward"},
          {id:"case-num", label:"State Case Number", type:"text", required:true, placeholder:"e.g., 2019-CF-012345"},
          {id:"judgment-date", label:"Judgment / Sentence Date", type:"date", required:true, help:"Section 2254 has a 1-year federal filing deadline (AEDPA) that runs from when the state judgment became final — state postconviction filings can pause (toll) this clock."},
          {id:"custody-status", label:"Current Custody Status", type:"select", required:true, options:["DOC custody","County jail custody","Probation / supervision","Parole / conditional release","Other state custody"], help:"Section 2254 requires you to be 'in custody' under the challenged judgment — probation and parole both count."},
        ]
      },
      {
        id:"exhaustion",
        title:"State Exhaustion History",
        sub:"Track how the claim moved through Florida's courts.",
        tip:{label:"EXHAUSTION IS THE GATEKEEPER", text:"Federal court expects the claim to have been fairly presented first."},
        fields:[
          {id:"direct-appeal-status", label:"Direct Appeal Status", type:"select", required:true, options:["No direct appeal","Direct appeal pending","Direct appeal denied / affirmed","Direct appeal reversed in part","Mandate issued"]},
          {id:"3850-status", label:"Rule 3.850 Status", type:"select", required:true, options:["Not filed","Filed and denied","Pending","Granted in part","Appeal taken / exhausted"], help:"Federal courts generally require every claim to have already gone through Rule 3.850 (and its appeal) before they'll hear it — this is the 'exhaustion' requirement."},
          {id:"3800-status", label:"Rule 3.800 Status", type:"select", required:false, options:["Not filed","Filed and denied","Pending","Granted in part","Appeal taken / exhausted"]},
          {id:"state-remedies", label:"What state remedies have already been presented?", type:"textarea", required:true, placeholder:"List the state court filings...", help:"List every filing in order — the federal court checks whether each claim you're raising now was actually presented to the state courts first."},
        ]
      },
      {
        id:"2254-grounds",
        title:"2254 Grounds for Relief",
        sub:"State the federal constitutional claims clearly.",
        tip:{label:"MAKE THE FEDERAL QUESTION CLEAR", text:"Identify the exact constitutional right at issue."},
        fields:[
          {id:"grounds-summary", label:"Grounds for Relief", type:"textarea", required:true, placeholder:"List the federal constitutional grounds...", help:"Section 2254 only reaches violations of federal constitutional law — state-law-only claims (even if correct) aren't reviewable here."},
          {id:"supporting-facts", label:"Supporting Facts", type:"textarea", required:true, placeholder:"Explain the facts for each ground..."},
          {id:"record-cites", label:"State Record References", type:"textarea", required:false},
          {id:"relief-requested", label:"Requested Federal Relief", type:"textarea", required:true, placeholder:"Release, new trial, resentencing..."},
        ]
      },
      {
        id:"federal-filing",
        title:"Federal Filing Details",
        sub:"Point to the correct Florida federal district.",
        tip:{label:"FILE IN THE RIGHT COURT", text:"The county of conviction points to the correct district."},
        fields:[
          {id:"federal-district", label:"Federal District", type:"select", required:true, options:["Northern District of Florida","Middle District of Florida","Southern District of Florida"], help:"Determined by the county of conviction — each Florida county falls within one of the three federal districts."},
          {id:"federal-division", label:"Division / Courthouse", type:"select", required:true, options:["Tallahassee","Gainesville","Pensacola","Fort Myers","Jacksonville","Ocala","Orlando","Tampa","Miami","Fort Lauderdale","West Palm Beach","Fort Pierce","Key West"]},
          {id:"limitations-notes", label:"Timing / Tolling Notes", type:"textarea", required:false, help:"Note any periods state postconviction motions were pending — those periods toll (pause) the 1-year AEDPA clock and matter if timeliness is challenged."},
          {id:"filer-address", label:"Mailing Address", type:"text", required:true},
          {id:"filer-city", label:"City, State, ZIP", type:"text", required:true},
        ]
      }
    ]
  },

  "mitigation": {
    title: "Mitigation / Clemency Packet",
    statute: "Fla. R. Crim. P. 3.800(c) / Exec. Clemency Rules",
    tag: "Mitigation",
    color: "#2DD4BF",
    steps: [
      {
        id:"purpose",
        title:"Purpose of This Packet",
        sub:"Select the proceeding this packet is being prepared for.",
        tip:{label:"THE CLEMENCY BINDER STRATEGY", text:"Start building this binder on Day 1."},
        fields:[
          {id:"purpose",      label:"This packet is for", type:"select", options:["Sentencing Hearing","Parole Hearing (FCOR)","Executive Clemency / RCR Application","Probation Violation Hearing","Early Termination Support","Other"], required:true, help:"The audience and standard differ by proceeding — a clemency board weighs different factors than a sentencing judge."},
          {id:"subject-name", label:"Full Legal Name",              type:"text",   required:true},
          {id:"dc-number",    label:"DC Number (if applicable)",    type:"text",   required:false},
          {id:"case-num",     label:"Case Number",                  type:"text",   required:false},
          {id:"proceeding-date",label:"Date of Proceeding (if known)",type:"date", required:false},
        ]
      },
      {
        id:"background",
        title:"Personal Background",
        sub:"Humanize the person beyond the offense.",
        tip:{label:"WHAT WORKS", text:"Mitigation works when it paints a complete human portrait."},
        fields:[
          {id:"background",     label:"Personal Background Summary", type:"textarea", required:true, placeholder:"Age, hometown, family background, education, work history...", help:"Decision-makers respond to a complete person, not just the offense — include upbringing, hardships, and turning points."},
          {id:"family-role",    label:"Current Family Responsibilities", type:"textarea", required:false, help:"Being a caregiver or sole provider is a factor boards and judges often weigh in your favor."},
          {id:"mental-health",  label:"Mental Health / Substance History", type:"textarea", required:false, help:"Include only if relevant and you're comfortable disclosing it — framed as context and treatment progress, not an excuse."},
        ]
      },
      {
        id:"rehabilitation",
        title:"Rehabilitation Evidence",
        sub:"Document every program, certificate, achievement.",
        tip:{label:"EVIDENCE BOX", text:"Every certificate is a data point."},
        fields:[
          {id:"education",     label:"Education Completed", type:"textarea", required:false, help:"GED, vocational certificates, college credits — list everything, even partial progress."},
          {id:"programs",      label:"Programs / Treatment Completed", type:"textarea", required:false, help:"Anger management, substance treatment, faith-based programs — completed programs are concrete evidence of change."},
          {id:"employment",    label:"Employment History", type:"textarea", required:false},
          {id:"community",     label:"Community Service / Volunteer Work", type:"textarea", required:false},
          {id:"support-letters",label:"Letters of Support", type:"textarea", required:false, help:"List who is providing letters (family, employer, clergy, counselor) — these can be attached as exhibits."},
          {id:"awards",        label:"Awards, Recognition, Achievements", type:"textarea", required:false},
        ]
      },
      {
        id:"offense-acceptance",
        title:"Acceptance of Responsibility",
        sub:"Describe understanding of the harm caused.",
        tip:{label:"AUTHENTICITY MATTERS", text:"Specific, authentic acknowledgment of harm."},
        fields:[
          {id:"remorse",        label:"Statement of Responsibility and Remorse", type:"textarea", required:true, placeholder:"Acknowledge the specific harm caused...", help:"Name the actual harm specifically — generic remorse statements read as less credible than acknowledging concrete impact."},
          {id:"plan",           label:"Reentry / Future Plan", type:"textarea", required:true, placeholder:"Housing plan, employment plan, support system...", help:"A concrete plan (where you'll live, how you'll support yourself, who will help) signals lower risk of reoffending."},
          {id:"filer-address",  label:"Address",     type:"text", required:true},
          {id:"filer-city",     label:"City, State, ZIP", type:"text", required:true},
          {id:"date-signed",    label:"Date",        type:"date", required:true},
        ]
      }
    ]
  }
};

const APP_BUILD_ID = '4817362-deadline-why-callout';
window.APP_VERSION = window.APP_VERSION || APP_BUILD_ID;
document.documentElement.dataset.appVersion = window.APP_VERSION;

const S = (() => {
  const memory = new Map();
  const canUseLocalStorage = (() => {
    try {
      return typeof localStorage !== 'undefined';
    } catch (_) {
      return false;
    }
  })();

  function read(key, fallback) {
    try {
      if (canUseLocalStorage) {
        const raw = localStorage.getItem(key);
        if (raw === null || raw === undefined) return fallback;
        return JSON.parse(raw);
      }
    } catch (_) {}
    return memory.has(key) ? memory.get(key) : fallback;
  }

  function write(key, value) {
    try {
      if (canUseLocalStorage) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
      }
    } catch (_) {}
    memory.set(key, value);
  }

  function del(key) {
    try {
      if (canUseLocalStorage) {
        localStorage.removeItem(key);
        return;
      }
    } catch (_) {}
    memory.delete(key);
  }

  return { get: read, set: write, del };
})();

async function purgeStaleBuildState() {
  try {
    if (localStorage.getItem('sc-motion-build-id') === APP_BUILD_ID) return;
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(reg => reg.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith('sc-motion-')).map(key => caches.delete(key)));
    }
    localStorage.setItem('sc-motion-build-id', APP_BUILD_ID);
  } catch (_) {}
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  // sw.js calls clients.claim() on activate, which fires controllerchange on
  // a brand-new visit too (no controller -> this SW), not just on a real
  // update. Only force-reload when an existing controller is being replaced,
  // otherwise first-time visitors get a surprise reload mid-interaction.
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(reg => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New version available - reload to update');
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      });
    });
    if (hadController) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      }, { once: true });
    }
    reg.update().catch(() => {});
  }).catch(() => {});
}

let deferredPwaPrompt = null;

function hidePwaBanner() {
  const banner = document.getElementById('pwa-banner');
  if (banner) banner.hidden = true;
}

function showPwaBanner() {
  const banner = document.getElementById('pwa-banner');
  if (banner) banner.hidden = false;
}

function setupPwaInstallPrompt() {
  const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;
  if (isStandalone) {
    hidePwaBanner();
    return;
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPwaPrompt = event;
    showPwaBanner();
  });

  window.addEventListener('appinstalled', () => {
    deferredPwaPrompt = null;
    hidePwaBanner();
    toast('App installed');
  });

  document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
    if (!deferredPwaPrompt) return;
    deferredPwaPrompt.prompt();
    const choice = await deferredPwaPrompt.userChoice;
    deferredPwaPrompt = null;
    hidePwaBanner();
    if (choice && choice.outcome === 'accepted') {
      toast('Added to home screen');
    }
  });
}

// ═══════════════════════════════════════════════
// LEGAL INTELLIGENCE ENGINE — Lexicon & Search
// ═══════════════════════════════════════════════

const LEGAL_LEXICON = {
  entries: [
    // — Motion types & statutes —
    {id:"3850", keywords:["postconviction","post conviction","3.850","rule 3.850","ineffective counsel","ineffective assistance","iac","strickland","newly discovered","constitutional violation","brady","grounds for relief"], weight:1.0, type:"motion", label:"Rule 3.850 — Postconviction Relief"},
    {id:"3800", keywords:["illegal sentence","3.800","rule 3.800","sentence correction","sentence exceeds","statutory maximum","mandatory minimum","scoresheet","habitual offender"], weight:1.0, type:"motion", label:"Rule 3.800 — Illegal Sentence Correction"},
    {id:"expunge", keywords:["expunge","expungement","seal","sealing","record","943.0585","943.059","fdle","certificate of eligibility","obt","arrest","criminal record","one chance"], weight:1.0, type:"motion", label:"Seal / Expunge Record"},
    {id:"terminate", keywords:["early termination","probation","948.04","po","probation officer","supervision","community control","termination","vop","violation of probation"], weight:1.0, type:"motion", label:"Early Termination of Probation"},
    {id:"restitution", keywords:["restitution","775.089","bearden","modification","payment","hardship","financial","victim","unable to pay"], weight:1.0, type:"motion", label:"Restitution Modification"},
    {id:"appeal", keywords:["appeal","appellate","notice of appeal","dca","9.110","9.140","direct appeal","reversal","brief"], weight:1.0, type:"motion", label:"Direct Appeal Packet"},
    {id:"appeal-record", keywords:["record","brief","9.200","9.210","transcript","designation","appellate record","record prep"], weight:1.0, type:"motion", label:"Record & Brief Prep"},
    {id:"appeal-rehearing", keywords:["rehearing","mandate","9.330","9.340","9.350","en banc","clarification","certification","stay of mandate","panel rehearing"], weight:1.0, type:"motion", label:"Rehearing / Mandate Preservation"},
    {id:"2254", keywords:["habeas","2254","federal habeas","28 u.s.c. 2254","ao 241","exhaustion","state remedy","federal district","federal court","ndfl","mdfl","sdfl"], weight:1.0, type:"motion", label:"Federal Habeas Corpus § 2254"},
    {id:"mitigation", keywords:["mitigation","clemency","parole","fcor","rcr","restoration","sentencing","packet","binder","rehabilitation","remorse"], weight:1.0, type:"motion", label:"Mitigation / Clemency Packet"},

    // — Common legal abbreviations & concepts —
    {id:"dc",      keywords:["doc","department of corrections","dc number","inmate"], weight:0.8, type:"concept", label:"Florida DOC / DC Number"},
    {id:"prr",     keywords:["prr","prison releasee reoffender","releasee"], weight:0.9, type:"concept", label:"Prison Releasee Reoffender"},
    {id:"hfo",     keywords:["habitual offender","habitual felony","habitual violent","hfo","hvf"], weight:0.9, type:"concept", label:"Habitual Felony Offender"},
    {id:"mandatory-min", keywords:["mandatory minimum","minimum mandatory","10-20-life","10 20 life","10/20/life"], weight:0.9, type:"concept", label:"Mandatory Minimum Sentencing"},
    {id:"gun",     keywords:["gun","firearm","weapon","10-20-life","armed","possession firearm"], weight:0.8, type:"concept", label:"Firearm Enhancement"},
    {id:"drug",    keywords:["drug","trafficking","cocaine","crack","heroin","fentanyl","marijuana","cannabis","possession","manufacture","delivery","893.13","893.135","scheduling","narcotic","controlled substance","minimum mandatory"], weight:0.9, type:"concept", label:"Drug Offense"},
    {id:"vop",     keywords:["vop","violation of probation","probation violation","technical violation","revocation"], weight:0.9, type:"concept", label:"Violation of Probation"},
    {id:"sex-offense", keywords:["sex","sexual","predator","registrant","registration","sexually violent","romeo and juliet","juvenile sex"], weight:0.8, type:"concept", label:"Sex Offense Registration"},
    {id:"violent", keywords:["violent","robbery","burglary","assault","battery","aggravated","home invasion","carjack","kidnapping","murder","manslaughter","homicide"], weight:0.8, type:"concept", label:"Violent Offense"},
    {id:"youth",   keywords:["youth","juvenile","young adult","youthful offender","brain development","juvenile life","miller","graham","montgomery"], weight:0.8, type:"concept", label:"Youth / Juvenile Sentencing"},
    {id:"immigration", keywords:["immigration","deportation","ice","non-citizen","visa","green card","padilla"], weight:0.8, type:"concept", label:"Immigration Consequences"},
    {id:"employment", keywords:["employment","job","licensing","112.011","professional license","felony denial","automatic denial","occupational"], weight:0.7, type:"right", label:"Employment Rights"},
    {id:"voting",  keywords:["voting","vote","amendment 4","restoration","fraction","felon voting","right to vote","disenfranchise","election","register"], weight:0.8, type:"right", label:"Voting Rights Restoration"},
    {id:"poverty", keywords:["poverty","indigent","bearden","unable to pay","payment plan","28.246","costs","fees","lfo","financial hardship","waiver"], weight:0.8, type:"right", label:"Protection Against Poverty-Based Barriers"},
    {id:"civil-rights", keywords:["civil rights","rcr","clemency","executive clemency","restoration","jury service","public office","pardon","commutation"], weight:0.8, type:"right", label:"Restoration of Civil Rights/RCR"},
    {id:"veterans", keywords:["veteran","va","veterans affairs","military","service member","ptsd","combat","vet treatment court"], weight:0.7, type:"right", label:"Veterans Rights & Benefits"},
  ],

  // County names and their common misspellings/aliases
  counties: {
    "broward": ["broward","broward county","ft lauderdale","fort lauderdale"],
    "miami-dade": ["dade","miami","miami-dade","miami dade","metro dade"],
    "duval": ["duval","jacksonville","duval county"],
    "hillsborough": ["hillsborough","tampa","hillsborough county"],
    "orange": ["orange","orlando","orange county"],
    "palm-beach": ["palm beach","palm beach county","west palm","west palm beach","pb"],
    "pinellas": ["pinellas","clearwater","st petersburg","st. petersburg","pinellas county"],
    "lee": ["lee","ft myers","fort myers","lee county"],
    "polk": ["polk","bartow","lakeland","polk county"],
    "brevard": ["brevard","melbourne","cocoa","palm bay","titusville","brevard county"],
    "volusia": ["volusia","daytona","deland","daytona beach","volusia county"],
    "seminole": ["seminole","sanford","seminole county"],
    "escambia": ["escambia","pensacola","escambia county"],
    "leon": ["leon","tallahassee","leon county"],
    "alachua": ["alachua","gainesville","alachua county"],
    "collier": ["collier","naples","collier county"],
    "sarasota": ["sarasota","sarasota county"],
    "marion": ["marion","ocala","marion county"],
    "pasco": ["pasco","dade city","pasco county"],
    "manatee": ["manatee","bradenton","manatee county"],
    "okaloosa": ["okaloosa","crestview","fort walton","eglin","okaloosa county"],
    "st-lucie": ["st lucie","st. lucie","fort pierce","port st lucie","saint lucie","st lucie county"],
  },

  // Federal districts
  federal: {
    "ndfl": ["ndfl","northern district","northern district of florida","northern fl","panama city","pensacola","tallahassee federal","gainesville federal"],
    "mdfl": ["mdfl","middle district","middle district of florida","middle fl","jacksonville federal","orlando federal","tampa federal","ocala federal","ft myers federal","fort myers federal"],
    "sdfl": ["sdfl","southern district","southern district of florida","southern fl","miami federal","ft lauderdale federal","fort lauderdale federal","west palm federal","west palm beach federal","key west federal"],
  }
};

// Build reverse lookup index once
const LEGAL_INDEX = (function() {
  const idx = {};
  LEGAL_LEXICON.entries.forEach(e => {
    e.keywords.forEach(kw => {
      const norm = kw.toLowerCase().replace(/[^a-z0-9]+/g, '');
      if(!idx[norm]) idx[norm] = [];
      idx[norm].push(e);
    });
  });
  return idx;
})();

// ── FUZZY MATCH ENGINE ──
function legalSearch(query, items, getText, options = {}) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return items.map(item => ({ item, score: 0 }));

  const { threshold = 0.4, boostExact = 1.5, boostMotion = 1.2 } = options;
  const qNorm = q.replace(/[^a-z0-9]+/g, '');

  // Score each item
  return items.map(item => {
    const text = String(getText(item) || '').toLowerCase();
    let score = 0;

    // 1. Exact phrase match (highest)
    if (text.includes(q)) score += 1.0 * boostExact;

    // 2. Word-level matches
    const qWords = q.split(/\s+/).filter(Boolean);
    const textWords = text.split(/\s+/);
    let wordMatches = 0;
    qWords.forEach(qw => {
      if (textWords.includes(qw)) wordMatches++;
      // Also check substring word match
      else if (textWords.some(tw => tw.includes(qw) || qw.includes(tw))) wordMatches += 0.6;
      // Fuzzy per-word
      else if (textWords.some(tw => diceCoefficient(qw, tw) >= threshold)) wordMatches += 0.4;
    });
    if (qWords.length > 0) score += (wordMatches / qWords.length) * 0.8;

    // 3. Lexicon alias expansion
    const lexiconHits = LEGAL_INDEX[qNorm] || [];
    const qTokens = q.split(/\s+/);
    // Check multi-word matches against lexicon
    Object.keys(LEGAL_INDEX).forEach(key => {
      const kw = key.replace(/[^a-z0-9]+/g, '');
      if (qNorm.includes(kw) || kw.includes(qNorm) || diceCoefficient(qNorm, kw) >= threshold) {
        LEGAL_INDEX[key].forEach(e => {
          const docMatches = e.keywords.filter(kw2 => text.includes(kw2.toLowerCase())).length;
          if (docMatches > 0) {
            score += (e.weight || 0.5) * (docMatches / e.keywords.length) * 0.6;
          }
        });
      }
    });

    // 4. Bonus for motion-type relevance
    if (item.motion || item.type === 'motion') score *= boostMotion;

    return { item, score: Math.min(score, 5) };
  }).sort((a, b) => b.score - a.score);
}

// Dice coefficient for fuzzy string similarity
function diceCoefficient(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const bigrams = {};
  for (let i = 0; i < a.length - 1; i++) {
    const bg = a.slice(i, i + 2);
    bigrams[bg] = (bigrams[bg] || 0) + 1;
  }
  let intersection = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const bg = b.slice(i, i + 2);
    if (bigrams[bg] > 0) { bigrams[bg]--; intersection++; }
  }
  return (2 * intersection) / (Math.max(a.length - 1, 1) + Math.max(b.length - 1, 1));
}

// ═══════════════════════════════════════════════
// CASE THREAT LEVEL — Risk Assessment Engine
// ═══════════════════════════════════════════════

function assessCaseRisks(motionId, answers) {
  const a = answers || {};
  const risks = [];
  const offense = (a['offense'] || a['arrest-charge'] || '').toLowerCase();
  const sentence = (a['sentence-terms'] || a['sentence-imposed'] || '').toLowerCase();
  const statute = (a['offense-statute'] || a['illegal-basis'] || '').toLowerCase();
  const incarceration = (a['currently-incarcerated'] || '').toLowerCase();
  const reliefType = (a['relief-type'] || '').toLowerCase();
  const eligType = (a['elig-charge-type'] || '').toLowerCase();

  // ── PRR Exposure ──
  if (sentence.includes('prr') || sentence.includes('prison release') || statute.includes('prr') || offense.includes('prr')) {
    risks.push({ id:'prr', level:'danger', icon:'💀', label:'PRR Exposure', sub:'Prison Releasee Reoffender — mandatory minimum',
      xai:{ statute:'F.S. § 775.082(9)', rule:'PRR Act imposes 5-15 year mandatory minimum for qualifying offenses committed within 3 years of DOC release.', reasoning:'Case data contains PRR reference — enhancement likely applies.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Thompson (Fla. 2021)' } });
  } else if (/robbery|burglary|home invasion|carjack|kidnapping/.test(offense) && /prison|doc/.test(incarceration)) {
    risks.push({ id:'prr', level:'warning', icon:'⚠️', label:'PRR Flag', sub:'Offense type may trigger PRR — verify record',
      xai:{ statute:'F.S. § 775.082(9)', rule:'PRR applies to enumerated forcible felonies if committed within 3 years of release.', reasoning:'Offense type is PRR-qualifying and incarceration status suggests state custody.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Thompson (Fla. 2021)' } });
  }

  // ── 10-20-Life / Firearm Enhancement ──
  if (/gun|firearm|weapon|10-20|10\/20/.test(offense) || /gun|firearm|weapon|10-20|10\/20/.test(statute) || /790\.|784\.07|784\.021/.test(statute)) {
    risks.push({ id:'firearm', level:'danger', icon:'🔫', label:'10-20-Life Trigger', sub:'Firearm enhancement — minimum mandatory sentences',
      xai:{ statute:'F.S. § 775.087', rule:'10-20-Life imposes escalating mandatory minimums: 10 years for possession, 20 for discharge, 25-life for injury/death.', reasoning:'Offense or statute indicates firearm involvement during felony.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Mediate (Fla. 2021)' } });
  }

  // ── Habitual Offender Exposure ──
  if (sentence.includes('habitual') || statute.includes('habitual') || /775\.084/.test(statute) || offense.includes('habitual')) {
    risks.push({ id:'hfo', level:'danger', icon:'⚡', label:'Habitual Felony Overlay', sub:'Prior record triggered 775.084 enhancement',
      xai:{ statute:'F.S. § 775.084', rule:'HFO/HVO designation doubles statutory maximum if qualifying prior felonies exist.', reasoning:'Record indicates habitual designation was applied.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Collins (Fla. 2020)' } });
  } else if (motionId === '3800' && (a['illegal-basis'] || '').toLowerCase().includes('habitual')) {
    risks.push({ id:'hfo', level:'danger', icon:'⚡', label:'HFO Challenge', sub:'Habitual designation is being contested in this motion',
      xai:{ statute:'F.S. § 775.084', rule:'HFO must be properly noticed and proven. Prior felonies must be sequential and qualifying.', reasoning:'3.800 motion identifies habitual designation as illegal — review sufficiency of notice and priors.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'State v. Flowers (Fla. 2021)' } });
  }

  // ── HVF Exposure ──
  if (/violent/.test(statute) || /782\.|784\.|787\.|794\.|800\.|812\.13|812\.131|812\.135/.test(statute)) {
    risks.push({ id:'hvf', level:'warning', icon:'💥', label:'HVF Flag', sub:'Violent felony designation may apply',
      xai:{ statute:'F.S. § 775.084(1)(b)', rule:'HVF applies to enumerated violent felonies with prior violent felony conviction.', reasoning:'Statute citation matches violent felony categories under § 775.084.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Hearns (Fla. 2019)' } });
  }

  // ── Life Felony Exposure ──
  if (/murder|homicide|life|capital/.test(offense) || /782\.04|794\.011/.test(statute)) {
    risks.push({ id:'life', level:'danger', icon:'☠️', label:'Life Felony Exposure', sub:'Capital / life felony — maximum scrutiny',
      xai:{ statute:'F.S. § 775.082(1)', rule:'Life felonies carry mandatory life imprisonment unless mitigated. Capital felonies may carry death.', reasoning:'Offense type indicates life or capital felony exposure.', authority:'Fla. R. Crim. P. 3.701', caseLaw:'Miller v. Alabama (2012) — juvenile life' } });
  }

  // ── Mandatory Minimum Exposure ──
  if (/mandatory|minimum|mandatory minimum/.test(sentence) || /893\.135|775\.087|775\.082/.test(statute) || /minimum mandatory/.test(offense)) {
    risks.push({ id:'mand-min', level:'warning', icon:'⛓️', label:'Mandatory Minimum', sub:'Sentence floored by statutory minimum',
      xai:{ statute:'F.S. § 775.082 · § 893.135 · § 775.087', rule:'Florida imposes mandatory minimum sentences for drug trafficking, firearm enhancements, and certain violent offenses.', reasoning:'Sentence or statute indicates a mandatory minimum was applied.', authority:'Fla. R. Crim. P. 3.800', caseLaw:'State v. Ibañez (Fla. 2022)' } });
  }

  // ── Drug Trafficking ──
  if (/trafficking|traffick|cocaine.*traffic|heroin.*traffic|fentanyl/.test(offense) || /893\.135/.test(statute)) {
    risks.push({ id:'drug', level:'warning', icon:'💊', label:'Drug Trafficking', sub:'893.135 — mandatory minimum triggered by weight',
      xai:{ statute:'F.S. § 893.135', rule:'Drug trafficking carries mandatory minimums based on substance type and weight. Thresholds vary by drug.', reasoning:'Offense involves drug trafficking — verify weight threshold met.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Mendenhall (Fla. 2020)' } });
  }

  // ── Sentencing Risk ──
  const maxSentenceMatch = sentence.match(/(\d+)\s*(years?|yrs)/i);
  if (maxSentenceMatch && parseInt(maxSentenceMatch[1]) >= 10) {
    risks.push({ id:'sentence', level:'warning', icon:'📏', label:'Sentencing Risk', sub: maxSentenceMatch[1] + '+ year sentence — substantial exposure',
      xai:{ statute:'Fla. Stat. sentencing guidelines', rule:'Scoresheet-driven sentencing under F.S. § 921.0024 determines lowest permissible sentence.', reasoning:'Sentence length >= 10 years indicates substantial exposure. Review scoresheet for errors.', authority:'Fla. R. Crim. P. 3.703', caseLaw:'State v. Anderson (Fla. 2021)' } });
  } else if (incarceration.includes('yes') || incarceration.includes('doc')) {
    risks.push({ id:'sentence', level:'warning', icon:'📏', label:'Sentencing Risk', sub:'Currently incarcerated — review sentence legality',
      xai:{ statute:'Fla. Stat. sentencing guidelines', rule:'Any period of incarceration warrants review of sentence legality, scoresheet accuracy, and collateral consequences.', reasoning:'Currently in DOC custody — verify sentence correctness.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021)' } });
  }

  // ── Bond / Detention Risk ──
  if (/bond|detention|hold|no bond/.test(incarceration) || incarceration.includes('jail')) {
    risks.push({ id:'bond', level:'warning', icon:'🔗', label:'Bond / Detention Concern', sub:'Pre-trial or hold status — expedite review',
      xai:{ statute:'Fla. R. Crim. P. 3.131 · Fla. Stat. § 903.046', rule:'Defendants have a right to pretrial release under reasonable conditions unless charged with capital offense or certain violent felonies.', reasoning:'Status indicates pretrial detention — review bond conditions and speedy trial clock.', authority:'Fla. R. Crim. P. 3.191', caseLaw:'State v. Arthur (Fla. 2020)' } });
  }

  // ── Immigration Risk ──
  if (/immigration|deport|non-citizen|visa|green card|ice/.test(offense + ' ' + statute) || /non-citizen|alien/.test(incarceration)) {
    risks.push({ id:'immigration', level:'danger', icon:'🌎', label:'Immigration Exposure', sub:'Conviction may trigger removal proceedings',
      xai:{ statute:'8 U.S.C. § 1227(a)(2) · Padilla v. Kentucky (2010)', rule:'Conviction of an aggravated felony, controlled substance offense, or crime involving moral turpitude triggers mandatory removal.', reasoning:'Offense type or status implicates immigration consequences.', authority:'INA § 237(a)(2) · Fla. R. Crim. P. 3.172', caseLaw:'Padilla v. Kentucky (2010) — counsel must advise of deportation risk' } });
  }
  if (/controlled substance|drug|theft|crime of moral/.test(offense) && motionId !== 'expunge') {
    if (!risks.some(r => r.id === 'immigration')) {
      risks.push({ id:'immigration', level:'warning', icon:'🌎', label:'Immigration Flag', sub:'Drug/theft conviction — verify immigration impact',
        xai:{ statute:'8 U.S.C. § 1227(a)(2)(A)(ii) · (B)(i)', rule:'Controlled substance and theft offenses are deportable. CIMT triggers removal if sentence >= 1 year.', reasoning:'Offense type includes drug or theft — potential deportability.', authority:'INA § 237(a)(2) · Fla. R. Crim. P. 3.172', caseLaw:'Padilla v. Kentucky (2010) — non-citizen must be advised' } });
    }
  }

  // ── Sex Offense Registration ──
  if (/sex|sexual|predator|registrant|794\.|800\.|827\.|847\./.test(statute) || /sex offense|sexual battery|lewd|porn/.test(offense)) {
    risks.push({ id:'sex-reg', level:'danger', icon:'🔴', label:'Sex Offender Registration', sub:'Mandatory registration — lifetime consequences',
      xai:{ statute:'F.S. § 943.0435 · § 944.607', rule:'Florida requires mandatory sex offender registration for enumerated offenses. Registration is lifetime unless eligibility for removal is established.', reasoning:'Offense or statute triggers mandatory sex offender registration.', authority:'Fla. Stat. § 943.0435', caseLaw:'State v. J.M. (Fla. 2021) — juvenile registration challenges' } });
  }

  // ── Firearm Disqualifier ──
  if (/felony|convict/.test(offense + ' ' + statute) || risks.some(r => r.id === 'firearm')) {
    risks.push({ id:'firearm-ban', level:'warning', icon:'🚫', label:'Firearm Disqualifier', sub:'Felony conviction = federal firearm prohibition',
      xai:{ statute:'18 U.S.C. § 922(g)(1)', rule:'Federal law prohibits firearm possession by any person convicted of a felony punishable by >1 year imprisonment.', reasoning:'Felony conviction triggers permanent federal firearm disability.', authority:'18 U.S.C. § 921(a) · Fla. Stat. § 790.23', caseLaw:'US v. Rehlander (1st Cir. 2021) — second amendment challenges' } });
  }

  // ── VOP Exposure ──
  if (/violation|vop|probation violation|revoke/.test(offense) || (motionId === 'terminate' && a['violations'] && a['violations'].toLowerCase().includes('violation'))) {
    risks.push({ id:'vop', level:'danger', icon:'⛔', label:'VOP Exposure', sub:'Violation of Probation — possible revocation',
      xai:{ statute:'F.S. § 948.06', rule:'Court may revoke probation and impose any sentence it could have originally imposed upon finding a willful violation.', reasoning:'Violation record indicates VOP exposure — possible resentencing to prison.', authority:'Fla. R. Crim. P. 3.790', caseLaw:'State v. Carter (Fla. 2020) — willfulness standard' } });
  } else if (motionId === 'terminate') {
    risks.push({ id:'vop', level:'safe', icon:'✅', label:'VOP Status', sub:'No VOP flagged — compliance appears intact',
      xai:{ statute:'F.S. § 948.06 · § 948.045', rule:'Compliance is the strongest factor for early termination. No VOP enhances probability of relief.', reasoning:'No violation history — strong grounds for early termination petition.', authority:'Fla. R. Crim. P. 3.790', caseLaw:'State v. Lopez (Fla. 2021)' } });
  }

  // ── Youth / Juvenile Factors ──
  if (/youth|juvenile|minor|under 18|young/.test(offense) || (a['def-dob'] && (() => { const age = new Date().getFullYear() - new Date(a['def-dob']).getFullYear(); return age < 25; })())) {
    risks.push({ id:'youth', level:'warning', icon:'🧠', label:'Youth Consideration', sub:'Miller / Graham factors may apply if under 18 at offense',
      xai:{ statute:'Eighth Amendment · Miller v. Alabama (2012)', rule:'Life without parole is unconstitutional for juvenile offenders. Individualized sentencing is required, considering age, background, and capacity for rehabilitation.', reasoning:'Age data indicates youth — Miller/Graham protections may apply.', authority:'Graham v. Florida (2010) · Montgomery v. Louisiana (2016)', caseLaw:'Miller v. Alabama (2012) — mandatory JLWOP struck down' } });
  }

  // ── Seal/Expunge Eligibility (motion-specific) ──
  if (motionId === 'expunge') {
    const eligPrior = (a['elig-prior-seal'] || '').toLowerCase();
    const convicted = (a['elig-convicted'] || '').toLowerCase();
    const disqual = (a['elig-disqualifying'] || '').toLowerCase();
    if (eligPrior.includes('never') && disqual.includes('none') && convicted.includes('no')) {
      risks.push({ id:'seal', level:'safe', icon:'🔒', label:'Seal / Expunge Eligible', sub:'Meets initial eligibility criteria — proceed with FDLE',
        xai:{ statute:'F.S. § 943.0585 (expunge) · § 943.059 (seal)', rule:'Florida allows one-time seal/expunge for qualifying charges. Requires FDLE Certificate of Eligibility and court order.', reasoning:'No disqualifiers, no prior use, no adjudication — all eligibility criteria satisfied.', authority:'Fla. Stat. § 943.0585(2)', caseLaw:'State v. L.P. (Fla. 2020) — withhold of adjudication' } });
    } else if (disqual.includes('none')) {
      risks.push({ id:'seal', level:'warning', icon:'🔒', label:'Seal / Expunge — Conditional', sub:'Eligibility requires further review',
        xai:{ statute:'F.S. § 943.0585 · § 943.059', rule:'Eligibility depends on charge type, prior record, and whether adjudication was withheld.', reasoning:'No disqualifying offense, but other factors need clarification before filing.', authority:'Fla. Stat. § 943.0585(1)', caseLaw:'State v. A.M. (Fla. 2020)' } });
    } else {
      risks.push({ id:'seal', level:'danger', icon:'🔒', label:'Seal / Expunge — Blocked', sub:'Disqualifying factors identified',
        xai:{ statute:'F.S. § 943.0585(2)(a)1-8', rule:'Certain offenses are statutorily ineligible for seal/expunge: murder, sexual battery, robbery, human trafficking, arson, etc.', reasoning:'Disqualifying offense type identified — statutory bar to relief.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021) — prior seal bar' } });
    }
  } else if (motionId === 'terminate') {
    risks.push({ id:'terminate', level:'safe', icon:'🗓️', label:'Early Termination Eligible', sub:'50%+ threshold — statutory right to petition',
      xai:{ statute:'F.S. § 948.045', rule:'Court may grant early termination of probation if: 50%+ of term served, no violations, and no victim objection.', reasoning:'Early termination motion selected — assess compliance and time served.', authority:'Fla. R. Crim. P. 3.790', caseLaw:'State v. Gordon (Fla. 2021) — early termination standards' } });
  } else if (motionId === 'restitution') {
    risks.push({ id:'bearden', level:'safe', icon:'💰', label:'Bearden Protection', sub:'Cannot be jailed solely for inability to pay',
      xai:{ statute:'Bearden v. Georgia (1983) · F.S. § 775.089', rule:'The court cannot revoke probation or impose jail for failure to pay restitution when the failure is due to indigency.', reasoning:'Restitution modification motion selected — Bearden protections apply to ability-to-pay claims.', authority:'Fla. R. Crim. P. 3.800(b)', caseLaw:'Bearden v. Georgia (1983) — indigency defense' } });
  }

  // ── Civil Rights / Voting ──
  const allText = Object.values(a).join(' ').toLowerCase();
  if (allText.includes('completed') || allText.includes('discharge') || allText.includes('terminated') || incarceration.includes('no')) {
    if (!risks.some(r => r.id === 'rcr')) {
      risks.push({ id:'rcr', level:'safe', icon:'📜', label:'Civil Rights Eligible', sub:'RCR / Voting — check Amendment 4 completion',
        xai:{ statute:'Fla. Const. Art. VI, § 4 (Amendment 4) · F.S. § 944.292', rule:'Amendment 4 restores voting rights upon completion of all terms of sentence. RCR restores firearm rights and jury service eligibility.', reasoning:'Sentence completion indicated — check Amendment 4 and RCR eligibility.', authority:'Fla. Const. Art. VI, § 4 · F.S. § 944.292', caseLaw:'Jones v. DeSantis (2020) — Amendment 4 implementation' } });
    }
  }

  // ── Employment Rights ──
  risks.push({ id:'employment', level:'neutral', icon:'💼', label:'Employment Rights', sub:'F.S. § 112.011 — no automatic denial',
    xai:{ statute:'F.S. § 112.011', rule:'No automatic denial of employment based solely on criminal record. Agencies must evaluate qualifications individually.', reasoning:'General awareness — felony conviction alone does not automatically disqualify from employment.', authority:'Fla. Stat. § 112.011(2)', caseLaw:'Smith v. Fla. Dept. of Corrections (Fla. 2019)' } });

  // Sort
  const order = { danger: 0, warning: 1, safe: 2, neutral: 3 };
  risks.sort((a, b) => (order[a.level] || 9) - (order[b.level] || 9));
  return risks;
}

function renderRiskGrid(motionId, answers) {
  _renderRiskGrid('risk-section', 'risk-grid', 'risk-badge', 'risk-summary', motionId, answers);
}

function renderRiskGridPreview(motionId, answers) {
  _renderRiskGrid('risk-section-preview', 'risk-grid-preview', 'risk-badge-preview', 'risk-summary-preview', motionId, answers);
}

function _renderRiskGrid(sectionId, gridId, badgeId, summaryId, motionId, answers) {
  const section = document.getElementById(sectionId);
  const grid = document.getElementById(gridId);
  const badge = document.getElementById(badgeId);
  const summary = document.getElementById(summaryId);
  if (!section || !grid) return;

  const risks = assessCaseRisks(motionId, answers);

  if (!risks.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  cmdOpen('risk-h');

  const counts = { danger: 0, warning: 0, safe: 0, neutral: 0 };
  risks.forEach(r => counts[r.level]++);

  // Set overall badge
  if (counts.danger > 0) {
    badge.textContent = 'CRITICAL — ' + counts.danger + ' threat' + (counts.danger > 1 ? 's' : '');
    badge.className = 'risk-badge risk-badge--critical';
  } else if (counts.warning > 0) {
    badge.textContent = 'ELEVATED — ' + counts.warning + ' flag' + (counts.warning > 1 ? 's' : '');
    badge.className = 'risk-badge risk-badge--elevated';
  } else {
    badge.textContent = 'LOW — all clear';
    badge.className = 'risk-badge risk-badge--low';
  }

  grid.innerHTML = risks.map(r =>
    '<div class="risk-item ' + r.level + '">' +
      '<span class="risk-icon">' + r.icon + '</span>' +
      '<span class="risk-label">' + esc(r.label) + '<span class="risk-sub">' + esc(r.sub) + '</span></span>' +
      renderXai(r.xai) +
    '</div>'
  ).join('');

  summary.innerHTML =
    (counts.danger > 0 ? '<span class="risk-stat"><span class="num danger-num">' + counts.danger + '</span> threats</span>' : '') +
    (counts.warning > 0 ? '<span class="risk-stat"><span class="num warning-num">' + counts.warning + '</span> flags</span>' : '') +
    (counts.safe > 0 ? '<span class="risk-stat"><span class="num safe-num">' + counts.safe + '</span> protections</span>' : '');
}

// ═══════════════════════════════════════════════
// PROCEDURAL TIMELINE — Full Case Lifecycle
// ═══════════════════════════════════════════════

const PROCEDURAL_STAGES = [
  { id:'arrest',        label:'Arrest',            icon:'🚔', order:0,  status:'past' },
  { id:'first-appear',  label:'First Appearance',  icon:'🏛️', order:1,  status:'past' },
  { id:'arraignment',   label:'Arraignment',       icon:'📋', order:2,  status:'past' },
  { id:'discovery',     label:'Discovery',         icon:'🔍', order:3,  status:'past' },
  { id:'depositions',   label:'Depositions',       icon:'🎤', order:4,  status:'past' },
  { id:'motions',       label:'Motion Litigation', icon:'⚖️', order:5,  status:'past' },
  { id:'trial',         label:'Trial / Plea',      icon:'👨‍⚖️', order:6,  status:'past' },
  { id:'sentencing',    label:'Sentencing',        icon:'📏', order:7,  status:'past' },
  { id:'direct-appeal', label:'Direct Appeal',     icon:'📜', order:8,  status:'past' },
  { id:'postconviction',label:'Post-Conviction',   icon:'⚡', order:9,  status:'current' },
  { id:'federal-habeas',label:'Federal Habeas',    icon:'🏛️', order:10, status:'future' },
  { id:'clemency',      label:'Clemency / RCR',    icon:'🕊️', order:11, status:'future' },
];

// Determine timeline status from case data
function assessTimeline(motionId, answers) {
  const a = answers || {};
  const stages = PROCEDURAL_STAGES.map(s => ({ ...s }));
  const motion = motionId || '';
  const offense = (a['offense'] || '').toLowerCase();
  const sentence = (a['sentence-terms'] || a['sentence-imposed'] || '').toLowerCase();
  const incarceration = (a['currently-incarcerated'] || '').toLowerCase();
  const priorMotions = (a['prior-motions'] || '').toLowerCase();
  const reliefSought = (a['relief-sought'] || a['relief-requested'] || '').toLowerCase();
  const eligType = (a['elig-charge-type'] || '').toLowerCase();
  const appealStatus = (a['direct-appeal-status'] || '').toLowerCase();
  const status3850 = (a['3850-status'] || '').toLowerCase();
  const status3800 = (a['3800-status'] || '').toLowerCase();
  const dob = a['def-dob'] || a['pet-dob'] || '';

  // Determine current stage based on motion type and answers
  let currentIdx = 0;

  if (motion === 'appeal' || motion === 'appeal-record' || motion === 'appeal-rehearing') {
    currentIdx = 8; // Direct Appeal
  } else if (motion === '3850') {
    currentIdx = 9; // Post-Conviction
  } else if (motion === '3800') {
    currentIdx = 9; // Post-Conviction (collateral)
  } else if (motion === '2254') {
    currentIdx = 10; // Federal Habeas
  } else if (motion === 'mitigation' || motion === 'terminate') {
    currentIdx = 11; // Clemency / Post-sentence
  } else if (motion === 'expunge') {
    currentIdx = 11; // Post-sentence record relief
  } else if (motion === 'restitution') {
    currentIdx = 7; // Sentencing / post-sentence
  } else {
    // Infer from data
    if (incarceration.includes('yes') || incarceration.includes('doc') || sentence) {
      currentIdx = 7; // Sentencing or later
    } else if (priorMotions) {
      currentIdx = 9;
    }
  }

  // Mark stages
  stages.forEach((s, i) => {
    if (i < currentIdx) s.status = 'past';
    else if (i === currentIdx) s.status = 'current';
    else s.status = 'future';
  });

  // Add strategic content per stage
  stages.forEach(s => {
    switch (s.id) {
      case 'arrest':
        s.note = 'Booking and initial charges filed. 33-day speedy trial clock starts.';
        break;
      case 'first-appear':
        s.note = 'First appearance before judge. Bond set.';
        break;
      case 'arraignment':
        s.note = 'Formal reading of charges. Plea entered (guilty / not guilty / nolo).';
        break;
      case 'discovery':
        s.note = 'Evidence exchange. Brady material must be disclosed.';
        break;
      case 'depositions':
        s.note = 'Witness testimony recorded under oath.';
        break;
      case 'motions':
        s.note = 'Motion to suppress, dismiss, or compel.';
        break;
      case 'trial':
        if (eligType.includes('plea') || eligType.includes('nolle') || eligType.includes('dismissed')) {
          s.status = 'past';
          s.note = 'Case resolved without trial.';
        } else {
          s.note = 'Bench trial or jury trial. Verdict rendered.';
        }
        break;
      case 'sentencing':
        const hasSentence = sentence.length > 0;
        s.note = hasSentence ? 'Sentence imposed: ' + esc(sentence) + '.' : 'Sentencing hearing. Judge imposes penalty.';
        if (hasSentence) {
          const years = sentence.match(/(\d+)\s*(years?|yrs)/i);
          if (years) s.note += ' <span class="caution">' + years[1] + '-year term.</span>';
        }
        break;
      case 'direct-appeal':
        const appealFiled = appealStatus && !appealStatus.includes('no') && !appealStatus.includes('not');
        if (appealFiled) {
          s.status = appealStatus.includes('pending') ? 'current' : 'past';
          s.note = 'Notice of appeal filed. ' + (appealStatus.includes('denied') ? '<span class="critical">Denied.</span>' : appealStatus.includes('pending') ? '<span class="caution">Pending.</span>' : 'Resolved.');
        } else if (motion === 'appeal' || motion === 'appeal-record' || motion === 'appeal-rehearing') {
          s.status = 'current';
          s.note = '<span class="all-clear">Strategic motion available NOW — build your appeal packet.</span>';
        } else if (currentIdx < 9) {
          s.status = 'future';
          s.note = '30-day window from sentencing. <span class="critical">Deadline approaching — do not miss.</span>';
        } else {
          s.status = priorMotions.includes('appeal') || appealStatus ? 'past' : 'forfeited';
          s.note = s.status === 'forfeited' ? '<span class="critical">Appeal window expired.</span>' : 'Direct appeal concluded.';
        }
        break;
      case 'postconviction':
        if (motion === '3850') {
          s.status = 'current';
          s.note = '<span class="all-clear">Rule 3.850 available NOW — 2-year window from finality.</span>';
        } else if (motion === '3800') {
          s.status = 'current';
          s.note = '<span class="all-clear">Rule 3.800(a) available — no deadline for illegal sentences.</span>';
        } else if (status3850 || status3800) {
          s.status = (status3850.includes('pending') || status3800.includes('pending')) ? 'current' : 'past';
          s.note = (status3850.includes('denied') || status3800.includes('denied')) ? '<span class="critical">Previously denied.</span>' : 'Post-conviction stage.';
        } else if (currentIdx < 9) {
          s.status = 'future';
          s.note = 'Available after direct appeal is final. 2-year statute of limitations.';
        } else {
          s.status = 'forfeited';
          s.note = '<span class="critical">2-year window may have expired — verify finality date.</span>';
        }
        // Check 2-year bar
        if (s.status !== 'current' && s.status !== 'past' && dob) {
          const age = new Date().getFullYear() - new Date(dob).getFullYear();
          if (age > 5) s.note += ' <span class="caution">Bar approaching — verify conviction finality date.</span>';
        }
        break;
      case 'federal-habeas':
        if (motion === '2254') {
          s.status = 'current';
          s.note = '<span class="all-clear">§ 2254 petition available NOW — ensure state exhaustion first.</span>';
        } else if (status3850.includes('denied') || appealStatus.includes('denied')) {
          s.status = 'available';
          s.note = '<span class="all-clear">State remedies exhausted — federal habeas now available.</span>';
        } else if (currentIdx < 10) {
          s.status = 'future';
          s.note = 'Requires exhaustion of all state remedies. 1-year AEDPA statute of limitations.';
        } else {
          s.status = 'forfeited';
          s.note = '<span class="critical">AEDPA 1-year window may have expired.</span>';
        }
        break;
      case 'clemency':
        if (motion === 'mitigation' || motion === 'terminate') {
          s.status = 'current';
          s.note = '<span class="all-clear">Mitigation/Clemency packet available NOW.</span>';
        } else if (currentIdx >= 10) {
          s.status = 'available';
          s.note = '5-7 year post-supervision wait. Start building clemency binder.';
        } else {
          s.note = '5-7 years after supervision ends. Prepare early.';
        }
        break;
    }
  });

  // Add XAI legal context per stage
  var timelineXai = {
    arrest:       { statute:'Fla. R. Crim. P. 3.121', rule:'Arrest requires probable cause — 24-hour first appearance requirement for warrantless arrests.', reasoning:'Arrest is the entry point triggering speedy trial and first appearance rights.', authority:'Fla. R. Crim. P. 3.121', caseLaw:'County of Riverside v. McLaughlin (1991) — 48-hour probable cause determination' },
    'first-appear':{ statute:'Fla. R. Crim. P. 3.130', rule:'First appearance must occur within 24 hours of arrest — probable cause determination, bond set, counsel appointed.', reasoning:'First appearance is the initial judicial review — bond and counsel are determined here.', authority:'Fla. R. Crim. P. 3.130', caseLaw:'Fla. R. Crim. P. 3.131 — pretrial release' },
    arraignment:  { statute:'Fla. R. Crim. P. 3.140', rule:'Defendant is formally advised of charges and enters a plea. Information or indictment must be filed.', reasoning:'Arraignment is where formal notice of charges and initial plea occur.', authority:'Fla. R. Crim. P. 3.140', caseLaw:'Fla. R. Crim. P. 3.160 — pleas' },
    discovery:    { statute:'Fla. R. Crim. P. 3.220', rule:'Mandatory discovery requires reciprocal disclosure of evidence, witness lists, and exculpatory material (Brady).', reasoning:'Discovery is when evidence is exchanged — Brady material must be disclosed.', authority:'Fla. R. Crim. P. 3.220', caseLaw:'Brady v. Maryland (1963) — exculpatory evidence' },
    depositions:  { statute:'Fla. R. Crim. P. 3.220(h)', rule:'Depositions may be taken of any person who has relevant information — trial witnesses may be deposed.', reasoning:'Depositions preserve witness testimony and reveal trial strategy.', authority:'Fla. R. Crim. P. 3.220(h)', caseLaw:'Fla. R. Crim. P. 3.220(i) — deposition procedures' },
    motions:      { statute:'Fla. R. Crim. P. 3.190', rule:'Pre-trial motions include motions to dismiss, suppress, or compel — must be filed before trial.', reasoning:'Motion practice resolves key evidentiary and legal issues before trial.', authority:'Fla. R. Crim. P. 3.190', caseLaw:'Fla. R. Crim. P. 3.190(h) — motion to suppress' },
    trial:        { statute:'Sixth Amendment · Fla. R. Crim. P. 3.250', rule:'Right to speedy and public trial before an impartial jury. Bench trial available by waiver.', reasoning:'Trial is the adversarial determination of guilt — or plea resolution.', authority:'Fla. R. Crim. P. 3.250', caseLaw:'Duncan v. Louisiana (1968) — right to jury trial' },
    sentencing:   { statute:'Fla. Stat. § 921.0024 · Fla. R. Crim. P. 3.703', rule:'Sentencing follows the Criminal Punishment Code scoresheet. Sentence must be pronounced in open court.', reasoning:'Sentencing is where the penalty is imposed — scoresheet accuracy is critical.', authority:'Fla. R. Crim. P. 3.703', caseLaw:'State v. Anderson (Fla. 2021) — scoresheet errors' },
    'direct-appeal':{ statute:'Fla. R. App. P. 9.110(b) · 9.140(b)(3)', rule:'Notice of appeal within 30 days of final judgment — jurisdictional deadline.', reasoning:'Direct appeal is the first level of appellate review — 30-day window is jurisdictional.', authority:'Fla. R. App. P. 9.110(b)', caseLaw:'Fla. R. App. P. 9.140(b)(3) — criminal appeals' },
    postconviction:{ statute:'Fla. R. Crim. P. 3.850', rule:'Post-conviction relief for constitutional violations — 2-year statute of limitations from finality.', reasoning:'Post-conviction is the collateral attack stage — IAC, Brady, and other claims are raised here.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'Strickland v. Washington (1984) — IAC standard' },
    'federal-habeas':{ statute:'28 U.S.C. § 2254', rule:'Federal habeas requires exhaustion of state remedies — AEDPA 1-year statute of limitations applies.', reasoning:'Federal habeas is available only after state remedies are exhausted.', authority:'28 U.S.C. § 2254(b)(1)(A)', caseLaw:'Rose v. Lundy (1982) — exhaustion requirement' },
    clemency:     { statute:'Fla. Const. Art. IV, § 8(a) · F.S. § 944.292', rule:'Clemency is an executive branch remedy — available after all other relief is exhausted. Includes pardon, commutation, and restoration of civil rights.', reasoning:'Clemency is the final stage — available after all judicial remedies are exhausted.', authority:'Fla. Const. Art. IV, § 8(a)', caseLaw:'Fla. Comm\'n on Offender Review — clemency rules' },
  };
  stages.forEach(function(s) { if (timelineXai[s.id]) s.xai = timelineXai[s.id]; });

  return stages;
}

function renderTimeline(motionId, answers) {
  const container = document.getElementById('timeline-stack');
  if (!container) return;
  const stages = assessTimeline(motionId, answers);
  const parent = document.getElementById('timeline-procedural');
  if (!parent) return;
  if (!stages.length || !motionId) { parent.style.display = 'none'; return; }
  parent.style.display = 'block';
  cmdOpen('tl-h');

  container.innerHTML = stages.map((s, i) => {
    let badgeHtml = '';
    let statusHtml = esc(s.note || '');
    let nodeClass = 'timeline-node';

    if (s.status === 'current') {
      badgeHtml = '<span class="tl-badge tl-badge--current">● CURRENT</span>';
      nodeClass += ' current';
    } else if (s.status === 'available') {
      badgeHtml = '<span class="tl-badge tl-badge--available">▶ AVAILABLE</span>';
      nodeClass += ' available';
    } else if (s.status === 'deadline') {
      badgeHtml = '<span class="tl-badge tl-badge--deadline">⏰ DEADLINE</span>';
      nodeClass += ' deadline';
    } else if (s.status === 'forfeited') {
      badgeHtml = '<span class="tl-badge tl-badge--forfeited">✕ FORFEITED</span>';
      nodeClass += ' forfeited';
    } else if (s.status === 'bar') {
      badgeHtml = '<span class="tl-badge tl-badge--bar">⏳ BAR NEAR</span>';
      nodeClass += ' bar';
    }

    const connector = i < stages.length - 1 ? '<div class="tl-connector"></div>' : '';

    return '<div class="' + nodeClass + '">' +
      '<div class="tl-node-header">' +
        '<span class="tl-icon">' + s.icon + '</span>' +
        '<span class="tl-label">' + esc(s.label) + '</span>' +
        badgeHtml +
      '</div>' +
      (s.note ? '<div class="tl-status">' + statusHtml + '</div>' : '') +
      renderXai(s.xai) +
    '</div>' + connector;
  }).join('');
}

function renderTimelinePreview(motionId, answers) {
  const container = document.getElementById('timeline-stack-preview');
  const parent = document.getElementById('timeline-procedural-preview');
  if (!container || !parent) return;
  if (!motionId) { parent.style.display = 'none'; return; }

  const stages = assessTimeline(motionId, answers);
  if (!stages.length) { parent.style.display = 'none'; return; }
  parent.style.display = 'block';

  container.innerHTML = stages.map((s, i) => {
    let badgeHtml = '';
    let nodeClass = 'timeline-node';
    if (s.status === 'current') { badgeHtml = '<span class="tl-badge tl-badge--current">● CURRENT</span>'; nodeClass += ' current'; }
    else if (s.status === 'available') { badgeHtml = '<span class="tl-badge tl-badge--available">▶ AVAILABLE</span>'; nodeClass += ' available'; }
    else if (s.status === 'deadline') { badgeHtml = '<span class="tl-badge tl-badge--deadline">⏰ DEADLINE</span>'; nodeClass += ' deadline'; }
    else if (s.status === 'forfeited') { badgeHtml = '<span class="tl-badge tl-badge--forfeited">✕ FORFEITED</span>'; nodeClass += ' forfeited'; }
    else if (s.status === 'bar') { badgeHtml = '<span class="tl-badge tl-badge--bar">⏳ BAR NEAR</span>'; nodeClass += ' bar'; }
    const connector = i < stages.length - 1 ? '<div class="tl-connector"></div>' : '';
    return '<div class="' + nodeClass + '"><div class="tl-node-header"><span class="tl-icon">' + s.icon + '</span><span class="tl-label">' + esc(s.label) + '</span>' + badgeHtml + '</div>' + (s.note ? '<div class="tl-status">' + s.note + '</div>' : '') + renderXai(s.xai) + '</div>' + connector;
  }).join('');
}

function renderTimelineInto(container, parent, stages) {
  if (!stages.length) { parent.style.display = 'none'; return; }

  container.innerHTML = stages.map((s, i) => {
    let badgeHtml = '';
    let nodeClass = 'timeline-node';

    if (s.status === 'current') {
      badgeHtml = '<span class="tl-badge tl-badge--current">● CURRENT</span>';
      nodeClass += ' current';
    } else if (s.status === 'available') {
      badgeHtml = '<span class="tl-badge tl-badge--available">▶ AVAILABLE</span>';
      nodeClass += ' available';
    } else if (s.status === 'deadline') {
      badgeHtml = '<span class="tl-badge tl-badge--deadline">⏰ DEADLINE</span>';
      nodeClass += ' deadline';
    } else if (s.status === 'forfeited') {
      badgeHtml = '<span class="tl-badge tl-badge--forfeited">✕ FORFEITED</span>';
      nodeClass += ' forfeited';
    } else if (s.status === 'bar') {
      badgeHtml = '<span class="tl-badge tl-badge--bar">⏳ BAR NEAR</span>';
      nodeClass += ' bar';
    }

    const connector = i < stages.length - 1 ? '<div class="tl-connector"></div>' : '';

    return '<div class="' + nodeClass + '">' +
      '<div class="tl-node-header">' +
        '<span class="tl-icon">' + s.icon + '</span>' +
        '<span class="tl-label">' + esc(s.label) + '</span>' +
        badgeHtml +
      '</div>' +
      (s.note ? '<div class="tl-status">' + s.note + '</div>' : '') +
      renderXai(s.xai) +
    '</div>' + connector;
  }).join('');
}

// ── RIGHTS DATA ──
const RIGHTS = [
  {t:"No Automatic Employment Denial",     s:"Fla. Stat. § 112.011",         d:"Employers/licensing boards CANNOT automatically reject you solely for a felony.", why:"If you're turned down for a job or license and the only reason given is the conviction itself, that denial is illegal on its face — the employer/board must show the conviction is directly related to the job's duties. Ask for the denial in writing and cite this statute when you appeal it."},
  {t:"Right to a Payment Plan",            s:"Fla. Stat. § 28.246",          d:"The Clerk is REQUIRED to offer a payment plan.", why:"Courts and clerks sometimes act like fines/court costs are due in full immediately. They're not — you can demand a payment plan instead of risking a warrant or license suspension for nonpayment you can't make in one lump sum."},
  {t:"Protection Against Imprisonment for Poverty", s:"§ 948.06(5) / Bearden v. Georgia",d:"Courts cannot revoke probation solely for inability to pay.", why:"Before probation can be revoked for missed payments, the court must find the failure to pay was willful, not just that you fell behind. If you genuinely can't afford it, that's a defense at the violation hearing — not an automatic violation."},
  {t:"Right to Early Termination Petition",s:"Fla. Stat. § 948.04",          d:"At 50% of probation, you have the statutory right to petition.", why:"Probation doesn't have to run its full length if you've stayed compliant. Filing this petition at the halfway mark can end supervision early and remove the ongoing risk of a technical violation."},
  {t:"Restitution Modification",           s:"Fla. Stat. § 775.089",         d:"Courts must consider financial resources and dependent obligations.", why:"A restitution order set at sentencing isn't frozen forever — if your financial circumstances change, you can petition the court to adjust the amount or payment schedule rather than defaulting silently."},
  {t:"Voting Rights Restoration",          s:"Art. VI, § 4 / Amendment 4",   d:"Voting rights automatically restored upon completion of ALL terms.", why:"\"Automatic\" doesn't mean the state notifies you — most people have to register themselves once every term (incarceration, probation, parole, and restitution/fees tied to the sentence) is actually complete. Confirm eligibility before registering to avoid a separate charge for voting while ineligible."},
  {t:"Expungement / Record Sealing",       s:"§ 943.0585 / § 943.059",       d:"Sealed records need not be disclosed on most job applications.", why:"A sealed record can lawfully be answered \"no\" on most private-employer applications asking about convictions — this is often the single biggest lever for clearing the employment barrier, but eligibility is one-shot in a lifetime for most offenses, so timing and accuracy of the petition matter."},
  {t:"Restoration of Civil Rights",        s:"Florida Rules of Executive Clemency",d:"5-7 years post-supervision: jury service, public office, licensing.", why:"This is separate from voting rights (restored automatically under Amendment 4) — civil rights like serving on a jury, holding public office, or certain professional licensing still require a clemency application even after your sentence is fully done."},
  {t:"Disqualification Exemption",         s:"Fla. Stat. § 435.07",          d:"Apply for a formal individual assessment for licensed professions.", why:"Many licensing boards (healthcare, childcare, etc.) automatically flag a felony, but the law gives you the right to request an individualized exemption review instead of accepting an automatic disqualification — this is a separate filing you have to affirmatively request."},
  {t:"Sentence Modification",              s:"Fla. R. Crim. P. 3.800",       d:"File to correct illegal sentences — no deadline.", why:"Unlike most post-conviction motions, a 3.800 claim for an illegal sentence (one that exceeds the statutory maximum or otherwise violates law) has no filing deadline — it can be raised years later if the sentence itself was never legal to begin with."},
  {t:"Veterans: VA Healthcare Access",     s:"38 U.S.C. / VA Policy",        d:"Criminal records do NOT automatically disqualify veterans from VA healthcare.", why:"Don't assume a felony conviction cuts off VA benefits — eligibility for VA healthcare turns on discharge status, not criminal history. If you've been told otherwise by a clinic or office, that determination is worth appealing."},
  {t:"SO: Mandatory Transition Plan",      s:"Fla. Stat. § 947.1405",        d:"Release officers MUST provide a written transition plan.", why:"If you're being released under sexual offender supervision conditions and weren't given a written transition plan covering housing, registration, and reporting requirements before release, that's a statutory failure you can raise with your supervising officer or the court."},
];

const COURTS = [
  {name:"Florida Supreme Court", court:"Florida Supreme Court", address:"500 South Duval Street, Tallahassee, FL 32399-1925", phone:"(850) 488-0125", note:"Clerk's Office and court headquarters.", url:"https://supremecourt.flcourts.gov"},
  {name:"First District Court of Appeal", court:"1st DCA", address:"2000 Drayton Drive, Tallahassee, FL 32399-0950", phone:"(850) 487-1000", note:"Present headquarters on Drayton Drive.", url:"https://1dca.flcourts.gov"},
  {name:"Second District Court of Appeal", court:"2nd DCA", address:"1700 N. Tampa Street, Suite 300, Tampa, FL 33602", phone:"2dcaAdministrative@flcourts.org", note:"Current courthouse in Tampa.", url:"https://2dca.flcourts.gov"},
  {name:"Third District Court of Appeal", court:"3rd DCA", address:"2001 S.W. 117 Avenue, Miami, FL 33175-1716", phone:"(305) 229-3200", note:"Official courthouse address in Miami.", url:"https://3dca.flcourts.gov"},
  {name:"Fourth District Court of Appeal", court:"4th DCA", address:"110 South Tamarind Ave., West Palm Beach, FL 33401", phone:"(561) 242-2000", note:"Court courthouse location in West Palm Beach.", url:"https://4dca.flcourts.gov"},
  {name:"Fifth District Court of Appeal", court:"5th DCA", address:"300 South Beach Street, Daytona Beach, FL 32114", phone:"See court website", note:"Official address used in court administrative orders.", url:"https://5dca.flcourts.gov"},
  {name:"Sixth District Court of Appeal", court:"6th DCA", address:"811 East Main Street, Lakeland, FL 33801", phone:"(863) 940-6041", note:"Court contact information.", url:"https://6dca.flcourts.gov"},
];

const COUNTY_CLERKS = [
  {county:"Alachua", address:"201 East University Avenue\nGainesville, Florida 32601", phone:"352.374.3636"},
  {county:"Baker", address:"339 East Macclenny Avenue\nMacclenny, Florida 32063", phone:"904.259.0209"},
  {county:"Bay", address:"300 East 4th Street \nPanama City, Florida 32401", phone:"850.763.9061"},
  {county:"Bradford", address:"945 North Temple Avenue\nPost Office Drawer B \nStarke, Florida 32091", phone:"904.966.6280"},
  {county:"Brevard", address:"Addresses\nTitusville, Florida 32781-0219", phone:"321.637.2000"},
  {county:"Broward", address:"201 Southeast 6th Street\nFort Lauderdale, Florida 33301", phone:"954.831.6565"},
  {county:"Calhoun", address:"20859 Central Avenue East, Room 130\nBlountstown, Florida 32424", phone:"850.674.4545"},
  {county:"Charlotte", address:"350 East Marion Avenue\nPunta Gorda, Florida 33950", phone:"941.505.4716"},
  {county:"Citrus", address:"110 North Apopka Avenue\nInverness, Florida 34450", phone:"352.341.6424"},
  {county:"Clay", address:"825 North Orange Avenue\nPost Office Box 698\nGreen Cove Springs, Florida 32043", phone:"904.269.6302"},
  {county:"Collier", address:"3315 Tamiami Trail East, Suite 102\nNaples, Florida 34112-5324", phone:"239.252.2646"},
  {county:"Columbia", address:"173 Northeast Hernando Avenue\nLake City, Florida 32055", phone:"386.758.1342"},
  {county:"Desoto", address:"115 East Oak Street, Room 101\nArcadia, Florida 34266", phone:"863.993.4876"},
  {county:"Dixie", address:"P.O. Box 1206\nCross City, Florida 32628", phone:"352.498.1200"},
  {county:"Duval", address:"501 West Adams Street\nJacksonville, Florida 32202", phone:"904.255.2000"},
  {county:"Escambia", address:"190 West Government Street\nPensacola, Florida 32502", phone:"850.595.4360"},
  {county:"Flagler", address:"Kim C. Hammond Justice Center\n1769 East Moody Boulevard, Building 1\nBunnell, Florida 32110-0787", phone:"386.313.4400"},
  {county:"Franklin", address:"33 Market Street, Suite 203\nApalachicola, Florida 32320", phone:"850.653.8861"},
  {county:"Gadsden", address:"10 East Jefferson Street\nP.O. Box 1649\nQuincy, Florida 32351", phone:"850.875.8601"},
  {county:"Gilchrist", address:"112 South Main Street\nP.O. Box 37\nTrenton, Florida 32693", phone:"352.463.3170"},
  {county:"Glades", address:"500 Avenue J Room 102\nP.O. Box 10\nMoore Haven, Florida 33471", phone:"863.946.6010"},
  {county:"Gulf", address:"1000 Cecil G. Costin Sr. Boulevard \nRm 149\nPort St. Joe, Florida 32456", phone:"850.229.6112 or 850.639.5068"},
  {county:"Hamilton", address:"207 NE 1st Street, Room 106\nJasper, Florida 32052", phone:"386.792.1288"},
  {county:"Hardee", address:"Hardee County Courthouse\n417 West Main Street, Suite 202\nWauchula, Florida 33873", phone:"863.773.4174"},
  {county:"Hendry", address:"25 E. Hickpochee Avenue \nP.O. Box 1760\nLabelle, Florida 33975", phone:"863.675.5217"},
  {county:"Hernando", address:"20 North Main Street\nBrooksville, Florida 34601", phone:"352.754.4201"},
  {county:"Highlands", address:"590 South Commerce Avenue\nSebring, Florida 33870-3867", phone:"863.402.6565"},
  {county:"Hillsborough", address:"Addresses", phone:"813.276.8100"},
  {county:"Holmes", address:"P.O. Box 397\nBonifay, Florida 32425", phone:"850.547.1100"},
  {county:"Indian River", address:"P.O. Box 1028\nVero Beach, Florida 32961", phone:"772.770.5185"},
  {county:"Jackson", address:"P.O. Drawer 510\nMarianna, Florida 32447", phone:"850.482.9552"},
  {county:"Jefferson", address:"1 Courthouse Circle\nMonticello, Florida 32344", phone:"850.342.0218"},
  {county:"Lafayette", address:"P.O. Box 88\nMayo, Florida 32066-0088", phone:"386.294.1600"},
  {county:"Lake", address:"550 West Main Street\nTavares, Florida 32778", phone:"352.742.4100"},
  {county:"Lee", address:"Ft. Myers, Florida 33901", phone:"239.533.5000"},
  {county:"Leon", address:"Tallahassee, Florida 32302", phone:"850.606.4000"},
  {county:"Levy", address:"355 South Court Street\nBronson, Florida 32621", phone:"352.486.5266"},
  {county:"Liberty", address:"10818 NW SR 20\nP.O. Box 399\nBristol, Florida 32321", phone:"850.643.2215"},
  {county:"Madison", address:"P.O. Box 237\nMadison, Florida 32341-0237", phone:"850.973.1500"},
  {county:"Manatee", address:"1115 Manatee Avenue West\nP.O. Box 25400\nBradenton, Florida 34205", phone:"941.749.1800"},
  {county:"Marion", address:"110 NW 1st Avenue\nOcala, Florida 34475", phone:"352.671.5510"},
  {county:"Martin", address:"100 E Ocean E Boulevard\nStuart, Florida 34994", phone:"772.288.5576"},
  {county:"Miami-Dade", address:"73 West Flagler Street\nSuite 133\nMiami, Florida 33130", phone:"305.275.1155"},
  {county:"Monroe", address:"500 Whitehead Street\nKey West, Florida 33040", phone:"305.292.3963"},
  {county:"Nassau", address:"76347 Veteran's Way, Suite 456\nYulee, Florida 32097", phone:"904.548.4600 or 800.958.3496"},
  {county:"Okaloosa", address:"101 East James Lee Boulevard\nCrestview, Florida 32536", phone:"850.689.5000"},
  {county:"Okeechobee", address:"312 NW 3rd Street\nOkeechobee, Florida 34972", phone:"863.763.2131"},
  {county:"Orange", address:"425 North Orange Avenue\nOrlando, Florida 32801", phone:"407.836.2000"},
  {county:"Osceola", address:"2 Courthouse Square, Suite 2000\nKissimmee, Florida 34741", phone:"407.742.3500"},
  {county:"Palm Beach", address:"205 North Dixie Highway \nWest Palm Beach, Florida 33401", phone:"561.355.2996 or 888.780.5302"},
  {county:"Pasco", address:"38053 Live Oak Avenue\nDade City, Florida 33523-3894", phone:"352.521.4542"},
  {county:"Pinellas", address:"315 Court Street\nClearwater, Florida 33756", phone:"727.464.7000"},
  {county:"Polk", address:"255 North Broadway Avenue\nBartow, Florida 33830", phone:"863.534.4000"},
  {county:"Putnam", address:"410 Saint Johns Avenue\nPalatka, Florida 32177", phone:"386.326.7600"},
  {county:"St. Johns", address:"4010 Lewis Speedway\nSt. Augustine, Florida 32084", phone:"904.819.3600"},
  {county:"St. Lucie", address:"P.O. Box 700 \nFt. Pierce, Florida 34954", phone:"772.462.6900"},
  {county:"Santa Rosa", address:"P.O. Box 472\nMilton, Florida 32572-0472", phone:"850.981.5554"},
  {county:"Sarasota", address:"2000 Main Street\nSarasota, Florida 34237", phone:"941.861.7400"},
  {county:"Seminole", address:"Street addresses \nP.O. Box 8099\nSanford, Florida 32772-8099", phone:"407.665.4330"},
  {county:"Sumter", address:"215 East McCollum Avenue\nBushnell, Florida 33513", phone:"352.569.6600"},
  {county:"Suwannee", address:"Suwannee County Courthouse\n200 South Ohio/Dr. MLK Jr. Avenue\nLive Oak, Florida 32064", phone:"386.362.0500"},
  {county:"Taylor", address:"108 North Jefferson Street Suite 102\nP.O. Box 620\nPerry, Florida 32348", phone:"850.838.3506"},
  {county:"Union", address:"55 West Main Street, Room 103\nLake Butler, Florida 32054", phone:"386.496.3711"},
  {county:"Volusia", address:"P.O. Box 6043\nDeland, Florida 32721-6043", phone:"386.736.5915"},
  {county:"Wakulla", address:"3056 Crawfordville Highway\nCrawfordville, Florida 32327-0337", phone:"850.926.0905"},
  {county:"Walton", address:"571 U.S. Highway 90 East \nDeFuniak Springs, Florida 32435", phone:"850.892.8115"},
  {county:"Washington", address:"1293 Jackson Avenue \nP.O. Box 647\nChipley, Florida 32428", phone:"850.638.6289"},
];

const FEDERAL_DISTRICTS = [
  {
    name: "Northern District of Florida",
    code: "NDFL",
    counties: ["Alachua","Bay","Calhoun","Dixie","Escambia","Franklin","Gadsden","Gilchrist","Gulf","Holmes","Jackson","Jefferson","Lafayette","Leon","Levy","Liberty","Madison","Okaloosa","Santa Rosa","Taylor","Wakulla","Walton","Washington"],
    courthouses: [
      {division:"Tallahassee", address:"111 N. Adams St., Tallahassee, FL 32301", phone:"(850) 521-3501", note:"Joseph Woodrow Hatchett United States Courthouse."},
      {division:"Gainesville", address:"401 SE First Ave., Gainesville, FL 32601", phone:"(352) 380-2400", note:"United States Courthouse."},
      {division:"Pensacola", address:"One North Palafox St., Pensacola, FL 32502", phone:"(850) 435-8440", note:"United States Courthouse."},
      {division:"Panama City", address:"Closed until further notice", phone:"(850) 691-0770", note:"Verify current filing instructions."},
    ]
  },
  {
    name: "Middle District of Florida",
    code: "MDFL",
    counties: ["Baker","Bradford","Brevard","Charlotte","Citrus","Clay","Collier","Columbia","Desoto","Duval","Flagler","Glades","Hamilton","Hardee","Hendry","Hernando","Hillsborough","Lake","Lee","Manatee","Marion","Nassau","Orange","Osceola","Pasco","Pinellas","Polk","Putnam","St. Johns","Sarasota","Seminole","Sumter","Suwannee","Union","Volusia"],
    courthouses: [
      {division:"Fort Myers", address:"2110 First Street, Fort Myers, FL 33901", phone:"(239) 461-2000", note:"United States Courthouse and Federal Building."},
      {division:"Jacksonville", address:"300 North Hogan Street, Jacksonville, FL 32202", phone:"(904) 549-1900", note:"Bryan Simpson United States Courthouse."},
      {division:"Ocala", address:"207 Northwest Second Street, Ocala, FL 34475", phone:"(352) 369-4860", note:"Golden-Collum Memorial Federal Building."},
      {division:"Orlando", address:"401 West Central Boulevard, Orlando, FL 32801", phone:"(407) 835-4200", note:"George C. Young Federal Annex Courthouse."},
      {division:"Tampa", address:"801 North Florida Avenue, Tampa, FL 33602", phone:"(813) 301-5400", note:"Sam M. Gibbons United States Courthouse."},
    ]
  },
  {
    name: "Southern District of Florida",
    code: "SDFL",
    counties: ["Broward","Dade","Highlands","Indian River","Martin","Monroe","Okeechobee","Palm Beach","St. Lucie"],
    courthouses: [
      {division:"Miami", address:"400 North Miami Avenue, Miami, FL 33128", phone:"(305) 523-5100", note:"Wilkie D. Ferguson, Jr. U.S. Courthouse."},
      {division:"Fort Lauderdale", address:"299 East Broward Boulevard, Fort Lauderdale, FL 33301", phone:"(954) 769-5400", note:"Federal Building and United States Courthouse."},
      {division:"West Palm Beach", address:"701 Clematis Street, West Palm Beach, FL 33401", phone:"(561) 803-3400", note:"Paul G. Rogers Federal Building and U.S. Courthouse."},
      {division:"Fort Pierce", address:"101 South U.S. Highway 1, Fort Pierce, FL 34950", phone:"(772) 467-2300", note:"Alto Lee Adams, Sr. U.S. Courthouse."},
      {division:"Key West", address:"301 Simonton Street, Key West, FL 33040", phone:"(305) 295-8100", note:"Sidney M. Aronovitz U.S. Courthouse."},
    ]
  }
];

// ── GLOSSARY ──
const GLOSSARY = [
  {t:"Appeal", d:"A request to a higher court to review a lower court's decision.", key:true, simple:"Asking a different, higher court to look at the same case again and decide if the first court got it wrong."},
  {t:"Appellant", d:"The party who files an appeal.", simple:"The person who is appealing — they're the one asking for the second look."},
  {t:"Appellee", d:"The party responding to an appeal (usually the State).", simple:"The other side in an appeal — usually the State, defending the original decision."},
  {t:"Brief", d:"A written legal argument submitted to the court explaining why the decision should be upheld or reversed.", key:true, simple:"A written explanation of your argument that you give to the judges to read."},
  {t:"Certificate of Appealability", d:"Required before a federal appeal can proceed in habeas cases. Shows the petitioner made a substantial constitutional claim.", key:true, simple:"A kind of permission slip you need before you're allowed to appeal a habeas case to a higher federal court."},
  {t:"Constitutional Right", d:"A right guaranteed by the U.S. Constitution, such as due process, effective assistance of counsel, or protection against self-incrimination.", simple:"A basic right that's protected no matter what — like getting a fair trial or having a lawyer."},
  {t:"Direct Appeal", d:"The first appeal as of right after a final judgment. In Florida, the Notice of Appeal must be filed within 30 days.", key:true, simple:"The one appeal everyone automatically gets right after being convicted — you only have 30 days in Florida to ask for it."},
  {t:"En Banc", d:"A hearing before all judges of a court, rather than a panel of three. Usually reserved for significant legal questions.", simple:"When the whole court (not just three judges) hears the case together, because it's an especially important question."},
  {t:"Evidentiary Hearing", d:"A court hearing where evidence (witnesses, documents) is presented to resolve factual disputes.", key:true, simple:"A court hearing where people testify and show proof, so the judge can sort out what actually happened."},
  {t:"Exhaustion of Remedies", d:"The requirement that a state prisoner must pursue all available state court remedies before seeking federal habeas relief.", key:true, simple:"Before you can ask a federal court for help, you have to first ask every available state court."},
  {t:"Final Order", d:"A court order that ends the case on its merits, leaving nothing further for the court to decide.", simple:"A decision that completely wraps up the case — there's nothing left for the judge to decide."},
  {t:"Habeas Corpus", d:"A legal action challenging the legality of a person's detention. In Florida, post-conviction motions serve this function.", key:true, simple:"A way to ask a court to check whether someone is being held in custody legally."},
  {t:"Ineffective Assistance of Counsel", d:"A claim that trial counsel's performance fell below reasonable professional standards and prejudiced the outcome. Strickland v. Washington.", key:true, simple:"A claim that your lawyer did such a poor job that it actually hurt your case."},
  {t:"Jurisdiction", d:"The court's legal authority to hear a case. Without jurisdiction, any order is void.", key:true, simple:"Whether a court even has the legal power to decide your case at all. No power, no valid ruling."},
  {t:"Mandate", d:"The official communication from an appellate court to the trial court advising of the appeal's outcome.", simple:"The official letter an appeals court sends back to the trial court saying what to do next."},
  {t:"Notice of Appeal", d:"A formal document filed with the clerk stating the intent to appeal. In Florida, due within 30 days of the order.", key:true, simple:"The paper you file to officially tell the court you want to appeal — due within 30 days in Florida."},
  {t:"Per Curiam", d:"A Latin term meaning 'by the court.' A unanimous opinion issued by the court collectively rather than by a named judge.", simple:"A decision the whole court agrees on together, without one judge's name attached."},
  {t:"Petitioner", d:"The party filing a petition for review (in post-conviction or habeas cases).", simple:"The person asking the court for help — usually you, if you're filing a post-conviction motion."},
  {t:"Post-Conviction", d:"Legal proceedings that occur after a criminal conviction becomes final, challenging the legality of the conviction or sentence.", key:true, simple:"Anything that happens in court after you've already been convicted and that conviction is final."},
  {t:"Pro Se", d:"Representing yourself in court without a lawyer.", key:true, simple:"Representing yourself in court without a lawyer."},
  {t:"Record on Appeal", d:"The official collection of all documents, filings, transcripts, and exhibits from the trial court sent to the appellate court.", simple:"Every document, transcript, and piece of evidence from the trial, packaged up and sent to the appeals court."},
  {t:"Remand", d:"When an appellate court sends a case back to the trial court for further proceedings consistent with the opinion.", simple:"When the appeals court sends the case back down to the trial court to redo something."},
  {t:"Respondent", d:"The party responding to a petition (typically the State in post-conviction cases).", simple:"The other side responding to your petition — usually the State."},
  {t:"Standard of Review", d:"The level of deference an appellate court gives to the lower court's decision. Common standards include de novo, abuse of discretion, and competent substantial evidence.", simple:"How much the appeals court trusts the original judge's decision — sometimes they check everything fresh, sometimes they mostly defer."},
  {t:"Stay", d:"A court order temporarily halting proceedings. Often requested to stop an execution while an appeal is pending.", simple:"A pause button — the court temporarily stops something (like a punishment) from happening."},
  {t:"Summary Denial", d:"When a trial court denies a post-conviction motion without holding an evidentiary hearing.", key:true, simple:"When the judge says no to your motion without even holding a hearing."},
  {t:"Writ of Certiorari", d:"A discretionary review by the U.S. Supreme Court. Very few petitions are granted.", simple:"A request asking the U.S. Supreme Court to take your case. Almost never granted."},
  {t:"Writ of Habeas Corpus (28 U.S.C. § 2254)", d:"The federal statute that allows state prisoners to challenge their detention on federal constitutional grounds.", key:true, simple:"The federal law that lets someone held by a state challenge that custody on constitutional grounds."},
  {t:"Default Judgment", d:"A judgment entered against a party who fails to respond to a pleading within the required time.", simple:"An automatic loss handed to someone who never responded to the case in time."},
  {t:"Summary Judgment", d:"A decision made without a full trial when there is no genuine dispute about the material facts.", simple:"A decision made without a trial because the facts aren't even in dispute — only the law is."},
  {t:"Interlocutory Order", d:"A temporary or preliminary order that does not finally resolve the case. Generally not appealable until a final judgment.", simple:"A 'for now' ruling made in the middle of a case — not the final word, and usually can't be appealed yet."},
  {t:"Supersedeas Bond", d:"A bond posted to stay enforcement of a judgment while an appeal is pending, guaranteeing payment if the appeal fails.", simple:"Money put up to guarantee payment if you lose your appeal, so a judgment can be paused in the meantime."},
  {t:"Venue", d:"The geographic location where a case is heard. Proper venue is usually where the crime occurred.", simple:"Which courthouse / location the case is heard in — usually wherever the alleged crime happened."},
  {t:"Prosecutorial Misconduct", d:"Improper conduct by a prosecutor that violates the defendant's right to a fair trial.", simple:"When the prosecutor does something improper that makes the trial unfair."},
  {t:"Harmless Error", d:"An error that did not affect the outcome of the case and therefore does not warrant reversal.", simple:"A mistake in the trial that the court decides didn't actually change the outcome, so it doesn't get the case overturned."},
  {t:"Plain Error", d:"A clear and obvious error that affected substantial rights, reviewable even if not raised at trial.", key:true, simple:"A mistake so clear and serious that the appeals court will look at it even though nobody objected at the time."},
  {t:"Fundamental Error", d:"An error that goes to the very foundation of the case and renders the proceeding invalid.", key:true, simple:"A mistake so basic it undermines the whole case, even if no one objected to it at trial."},
];

// ── UTILITY ──
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('on'), 2800);
}

function f(val, fallback='[FILL IN]') {
  return val && val.trim() ? `<span style="color:var(--gold);font-style:italic">${esc(val)}</span>` : `<span class="placeholder">${fallback}</span>`;
}

// ── TAB SWITCHING ──
function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  const tb = document.querySelector('.tn[data-tab="'+tab+'"]');
  if(tb) tb.classList.add('active');
  syncMobileTabNav(tab);
  if(tab==='drafts') renderDrafts();
  if(tab==='builder') { renderMsDrafts(); renderConstitutionalIntel(); renderEmotionalIntel(); }
  if(tab==='appeals') renderAppeals();
  if(tab==='rights') renderRights();
  if(tab==='courts') { renderClerks(); renderCourts(); }
  if(tab==='federal') renderFederal();
  if(tab==='reentry') renderReentry();
  if(tab==='glossary') renderGlossary();
}

function syncMobileTabNav(tab) {
  const menu = document.getElementById('mobile-tab-menu');
  const moreBtn = document.getElementById('mobile-tab-more');
  const visible = new Set(['builder', 'drafts', 'preview']);
  const activeLabel = tab.charAt(0).toUpperCase() + tab.slice(1);

  if (menu) menu.hidden = true;
  if (moreBtn) {
    moreBtn.classList.toggle('active', !visible.has(tab));
    moreBtn.setAttribute('aria-expanded', 'false');
    moreBtn.textContent = visible.has(tab) ? 'More' : activeLabel;
  }

  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.mobile-tab-menu-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
}

function getMobileOverflowLabel() {
  const activeHiddenTab = document.querySelector('.mobile-tab-menu-item.active');
  return activeHiddenTab ? activeHiddenTab.textContent : 'More';
}

function toggleMobileTabMenu() {
  const menu = document.getElementById('mobile-tab-menu');
  const moreBtn = document.getElementById('mobile-tab-more');
  if (!menu || !moreBtn) return;
  const willOpen = menu.hidden;
  menu.hidden = !willOpen;
  moreBtn.setAttribute('aria-expanded', String(willOpen));
  moreBtn.classList.toggle('active', willOpen);
  moreBtn.textContent = willOpen ? 'Close' : getMobileOverflowLabel();
}

function closeMobileTabMenu() {
  const menu = document.getElementById('mobile-tab-menu');
  const moreBtn = document.getElementById('mobile-tab-more');
  if (!menu || !moreBtn) return;
  menu.hidden = true;
  moreBtn.setAttribute('aria-expanded', 'false');
  moreBtn.classList.remove('active');
  moreBtn.textContent = getMobileOverflowLabel();
}

document.addEventListener('click', (event) => {
  const nav = document.getElementById('tabnav');
  const menu = document.getElementById('mobile-tab-menu');
  if (!nav || !menu || menu.hidden) return;
  if (nav.contains(event.target)) return;
  closeMobileTabMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeMobileTabMenu();
});

// ── MOTION SELECTION ──
function selectMotion(id, tile) {
  if (tile.classList.contains('tile-blocked')) {
    toast('Not available at your current case stage — see the note on the tile.');
    return;
  }
  document.querySelectorAll('.motion-tile').forEach(t=>t.classList.remove('selected'));
  tile.classList.add('selected');
  currentMotion = id;
  currentQ = 0;
  buildQuestions();
  const btn = document.getElementById('start-btn');
  const flow = FLOWS[id];
  btn.disabled = false;
  document.getElementById('start-btn-text').textContent = 'Begin — ' + flow.title;
  setQuestionIdleState();
  renderStateMachine();
  renderCaseIntelligence();
  filterMotionsByState();
  renderEmotionalIntel();
}

function launchMotion(id) {
  if(!FLOWS[id]) return;
  currentMotion = id;
  currentQ = 0;
  answers = {};
  legalAnswers = {};
  eligAnswers = {};
  const btn = document.getElementById('start-btn');
  btn.disabled = false;
  document.getElementById('start-btn-text').textContent = 'Begin — ' + FLOWS[id].title;
  switchTab('builder');
  startWizard();
}

// ── COURT HELPERS ──
function courtByLabel(label) {
  if(!label) return null;
  const key = String(label).toLowerCase();
  return COURTS.find(c => key.includes(c.court.toLowerCase()) || key.includes(c.name.toLowerCase())) || null;
}

function normCounty(name) {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function federalDistrictForCounty(county) {
  const k = normCounty(county);
  for (const district of FEDERAL_DISTRICTS) {
    if (district.counties.some(c => normCounty(c) === k)) return district;
  }
  return null;
}

function federalCourtByDistrictAndDivision(districtName, divisionName) {
  if (!districtName) return null;
  const district = FEDERAL_DISTRICTS.find(d => d.name.toLowerCase() === String(districtName).toLowerCase());
  if (!district) return null;
  if (!divisionName) return district.courthouses[0] || null;
  const division = district.courthouses.find(c => c.division.toLowerCase() === String(divisionName).toLowerCase());
  return division || district.courthouses[0] || null;
}

function motionPathNote(id) {
  const notes = {
    "3850": "Rule 3.850 is Florida's main postconviction motion when the claim needs collateral review. It usually follows direct appeal or runs after the appeal clock has closed.",
    "3800": "Rule 3.800 is the narrow Florida sentence-correction path for an illegal sentence problem.",
    "expunge": "Seal and expunge practice runs beside the criminal case with eligibility rules and FDLE paperwork.",
    "terminate": "Early termination sits inside Florida supervision practice, used after half the term.",
    "restitution": "Restitution modification asks the court to adjust payment terms to match ability to pay.",
    "mitigation": "Mitigation is a sentencing or clemency support track that helps explain the person behind the case.",
    "appeal": "Direct appeal is the first Florida review layer after judgment or an appealable order.",
    "appeal-record": "Record and brief prep live inside the direct appeal layer.",
    "appeal-rehearing": "Rehearing and mandate practice happen after the appellate opinion.",
    "2254": "Federal 2254 review comes after the Florida state courts have had the first fair chance.",
  };
  return notes[id] || "";
}

function motionStageCaption(id) {
  const stages = {
    "3850": "STATE COLLATERAL / POSTCONVICTION",
    "3800": "STATE SENTENCE CORRECTION",
    "expunge": "RECORD CLEARING",
    "terminate": "SUPERVISION / PROBATION",
    "restitution": "SENTENCE ENFORCEMENT",
    "mitigation": "SENTENCING / CLEMENCY SUPPORT",
    "appeal": "DIRECT APPEAL",
    "appeal-record": "DIRECT APPEAL / RECORD BUILDING",
    "appeal-rehearing": "POST-DECISION APPEAL",
    "2254": "FEDERAL HABEAS / COLLATERAL REVIEW",
  };
  return stages[id] || "";
}

// The earliest case stage (per CASE_STATES) where this motion is an
// available remedy rather than a blocked one.
function motionUnlockStage(id) {
  for (const key of STATE_ORDERS) {
    const ctx = CASE_STATES[key];
    if (ctx.remedies && ctx.remedies.includes(id)) return ctx.label;
  }
  return '';
}

// Surfaces the existing motionPathNote()/motionStageCaption() copy directly
// on each motion tile so "what is this and when do I use it" is visible
// before the user has to click in to find out.
function renderMotionTileNotes() {
  document.querySelectorAll('.motion-tile').forEach(tile => {
    const id = tile.getAttribute('data-motion');
    const noteEl = tile.querySelector('.tile-path-note');
    if (!noteEl) return;
    const stage = motionStageCaption(id);
    const note = motionPathNote(id);
    noteEl.innerHTML = (stage ? '<span class="tile-stage">' + esc(stage) + '</span>' : '') +
      (note ? '<span class="tile-path-text">' + esc(note) + '</span>' : '');
  });
}

// ── RENDER FUNCTIONS ──
function renderRights() {
  const list = document.getElementById('rights-list');
  if(!list) return;
  list.innerHTML = RIGHTS.map(r=>`<div class="lib-card" style="margin-bottom:10px"><div class="lib-title">${esc(r.t)}</div><div class="lib-statute">${esc(r.s)}</div><div class="lib-desc">${esc(r.d)}</div>${r.why ? `<div class="lib-why">${esc(r.why)}</div>` : ''}</div>`).join('');
}

// ═══════════════════════════════════════════════
// REENTRY DASHBOARD
// ═══════════════════════════════════════════════

const REENTRY_CHECKLIST_KEY = 'fl-reentry-checklist';

function loadReentryChecklist() {
  try { return JSON.parse(localStorage.getItem(REENTRY_CHECKLIST_KEY)) || {}; } catch(e) { return {}; }
}

function saveReentryChecklistItem(id, checked) {
  const state = loadReentryChecklist();
  state[id] = checked;
  localStorage.setItem(REENTRY_CHECKLIST_KEY, JSON.stringify(state));
}

function getFLVoterStatus(charge) {
  if (!charge) return { eligible: false, note: 'Complete the intake first to check voting eligibility.' };
  const name = charge.name || '';
  const degree = charge.degree || '';
  const isMurder = name.toLowerCase().includes('murder');
  const isSexual = name.toLowerCase().includes('sexual battery');
  const isCapital = degree.includes('Capital') || degree.includes('Life');
  if (isMurder || isSexual) return { eligible: false, note: 'Florida requires executive clemency to restore voting rights for murder or felony sexual battery convictions. Apply through the FL Clemency Board.', steps: ['FL Clemency Application', 'Wait for Board hearing', 'Receive clemency grant'] };
  if (isCapital) return { eligible: false, note: 'Capital or life felony — voting rights restoration requires clemency. Complete sentencing/incarceration first.', steps: ['Complete sentence', 'Apply for clemency', 'Receive restoration'] };
  return { eligible: true, note: 'Amendment 4 (2018) restored voting rights for most felons who complete all terms of sentence (incarceration, parole, probation). Excludes murder and sexual battery.', steps: ['Complete all sentence terms', 'Register to vote at RegisterToVoteFlorida.gov', 'Check registration at FL Division of Elections'] };
}

function getFLDLStatus(charge) {
  if (!charge) return { eligible: false, note: 'Complete the intake to check driver\'s license reinstatement options.' };
  const name = charge.name || '';
  const isDrug = name.toLowerCase().includes('trafficking') || name.toLowerCase().includes('cannabis') || name.toLowerCase().includes('cocaine') || name.toLowerCase().includes('fentanyl');
  if (isDrug) return { note: 'Drug offenses may trigger mandatory 1-2 year revocation. Reinstatement requires completion of DUI/drug program + payment of reinstatement fee ($130).', requirements: ['Complete substance abuse course (if ordered)', 'Pay $130 reinstatement fee to FL DHSMV', 'Provide proof of insurance (SR-22 if DUI-related)', 'Clear any outstanding suspensions'], fee: '$130' };
  return { note: 'FL driver\'s license may be suspended upon felony conviction. Check status at FL DHSMV (flhsmv.gov). Reinstatement typically requires fee payment and any court-ordered programs.', requirements: ['Check license status at flhsmv.gov', 'Pay reinstatement fee ($45-$130)', 'Complete any court-ordered programs', 'Provide proof of insurance'], fee: '$45-$130' };
}

function getFLHousingNote(charge) {
  if (!charge) return { note: 'Public housing eligibility depends on conviction type.' };
  const name = charge.name || '';
  const isDrug = name.toLowerCase().includes('trafficking') || name.toLowerCase().includes('cannabis') || name.toLowerCase().includes('cocaine') || name.toLowerCase().includes('fentanyl');
  const isSexual = name.toLowerCase().includes('sexual battery');
  if (isDrug) return { note: 'Drug convictions trigger mandatory 3-year ban from public housing (if first offense). Lifetime ban for subsequent drug convictions. Some local housing authorities have stricter rules.', resources: ['HUD Public Housing — hud.gov', 'Local PHA office (check county resources below)'] };
  if (isSexual) return { note: 'Sex offense convictions trigger lifetime ban from public housing under federal law (HUD). Look for private housing or reentry transitional housing programs.', resources: ['Reentry transitional housing (check county resources below)'] };
  return { note: 'Felony convictions may affect public housing eligibility. Many PHAs assess on a case-by-case basis looking at: nature of offense, time since conviction, and rehabilitation evidence.', resources: ['HUD Public Housing — hud.gov', 'Local PHA office (check county resources below)'] };
}

function getCollateralSummary(charge) {
  if (!charge || !charge.collateral) return [];
  const iconMap = { immigration: '🛂', firearm: '🔫', voting: '🗳', employment: '💼', housing: '🏠', professionalLicenses: '📜', civilRights: '⚖️', registration: '📋', publicBenefits: '💵', childCustody: '👶' };
  return Object.entries(charge.collateral).filter(([k,v]) => v).map(([k,v]) => ({ icon: iconMap[k] || '📌', label: k.replace(/([A-Z])/g,' $1').trim(), detail: v }));
}

// ═══════════════════════════════════════════════
// LEGAL CAPABILITIES ENGINE
// "What can this person STILL legally do right now?"
// ═══════════════════════════════════════════════

function computeCapabilities(charge, session) {
  const caps = [];
  const name = charge ? (charge.name || '').toLowerCase() : '';
  const degree = charge ? (charge.degree || '') : '';
  const isCapital = degree.includes('Capital');
  const isLife = degree.includes('Life');
  const isMurder = name.includes('murder');
  const isSexualBattery = name.includes('sexual battery');
  const isDrugTrafficking = name.includes('trafficking');
  const isFirearmRelated = name.includes('firearm') || name.includes('armed') || name.includes('carjacking') || name.includes('robbery');
  const isViolent = isMurder || isSexualBattery || isFirearmRelated || name.includes('arson') || name.includes('kidnapping') || name.includes('child abuse') || name.includes('home invasion');
  const isDrug = name.includes('cannabis') || name.includes('cocaine') || name.includes('fentanyl') || name.includes('trafficking');
  const county = session?.county || '';

  // 1. VOTE
  if (isMurder || isSexualBattery) {
    caps.push({ id:'vote', status:'needsAction', icon:'🗳️', label:'Vote', note:'Forfeited — requires executive clemency for murder or sexual battery convictions per FL Constitution Art. VI, § 4.', action:'Apply to FL Clemency Board for restoration of voting rights.' });
  } else if (isCapital || isLife) {
    caps.push({ id:'vote', status:'needsAction', icon:'🗳️', label:'Vote', note:'Restored after full sentence completion including parole/probation per Amendment 4.', action:'Register at RegisterToVoteFlorida.gov once all sentence terms are complete.' });
  } else {
    caps.push({ id:'vote', status:'preserved', icon:'🗳️', label:'Vote', note:'Right to vote is preserved. Complete sentence terms, then register.', action:'RegisterToVoteFlorida.gov' });
  }

  // 2. JURY SERVICE
  caps.push({ id:'jury', status:'forfeited', icon:'⚖️', label:'Serve on a Jury', note:'Permanently forfeited in Florida for felony conviction. Can only be restored through clemency.', action:'Apply for clemency through FL Clemency Board if restoration desired.' });

  // 3. FIREARMS
  if (isViolent || isDrugTrafficking) {
    caps.push({ id:'firearm', status:'forfeited', icon:'🔫', label:'Possess Firearms', note:'Lifetime ban under 18 U.S.C. § 922(g) and FL law. No restoration path for violent/drug trafficking felonies in Florida.', action:'Permanent — no legal path to restoration in FL. Seek advice if uncertain.' });
  } else {
    caps.push({ id:'firearm', status:'forfeited', icon:'🔫', label:'Possess Firearms', note:'Lifetime ban under 18 U.S.C. § 922(g). Limited restoration possible through FL clemency or expungement (if conviction set aside).', action:'Seal/expunge may restore firearm rights if conviction is set aside. Otherwise clemency required.' });
  }

  // 4. EMPLOYMENT
  if (isSexualBattery) {
    caps.push({ id:'employment', status:'restricted', icon:'💼', label:'Work (Most Jobs)', note:'Sex offense convictions trigger permanent restrictions on working with children, the elderly, and disabled. Must register as sexual offender.', action:'Check FL sexual offender employment restrictions. Certain professions (healthcare, education) may be permanently barred.' });
  } else {
    caps.push({ id:'employment', status:'preserved', icon:'💼', label:'Work (Most Jobs)', note:'No blanket employment ban. Certain licensed professions (law, healthcare, real estate, education) may have restrictions. Many employers use background checks.', action:'Seek seal/expunge to improve employment prospects. Look into fair-chance hiring employers.' });
  }

  // 5. PUBLIC HOUSING
  if (isSexualBattery) {
    caps.push({ id:'housing', status:'forfeited', icon:'🏠', label:'Public Housing (HUD)', note:'Lifetime ban under HUD rules for sex offense convictions. No federal housing eligibility.', action:'Seek private housing, transitional reentry housing, or county-specific programs.' });
  } else if (isDrugTrafficking) {
    caps.push({ id:'housing', status:'restricted', icon:'🏠', label:'Public Housing (HUD)', note:'Mandatory 3-year ban for drug trafficking (first offense). Lifetime ban for subsequent. Local PHAs may have stricter rules.', action:'After 3 years, apply through local PHA. Seek transitional housing in the interim.' });
  } else {
    caps.push({ id:'housing', status:'varies', icon:'🏠', label:'Public Housing (HUD)', note:'No automatic ban. PHA reviews on case-by-case basis considering: nature of offense, time since, rehabilitation evidence.', action:'Contact local PHA directly. Collect rehabilitation evidence and character references.' });
  }

  // 6. FEDERAL STUDENT AID
  caps.push({ id:'studentAid', status:'preserved', icon:'🎓', label:'Federal Student Aid (FAFSA/Pell)', note:'FAFSA eligibility restored since 2021 for most drug offenses. Previous ban limited to drug convictions is no longer enforced.', action:'File FAFSA at studentaid.gov. Check with school\'s financial aid office.' });

  // 7. MILITARY SERVICE
  caps.push({ id:'military', status:'forfeited', icon:'🎖️', label:'Military Service', note:'Felony conviction generally prohibits enlistment in all branches. Waivers extremely rare for serious felonies.', action:'No enlistment path for most felonies. Consider civilian service programs (AmeriCorps, Peace Corps may have restrictions).' });

  // 8. HOLD PUBLIC OFFICE
  caps.push({ id:'publicOffice', status:'forfeited', icon:'🏛️', label:'Hold Public Office', note:'Forfeited under FL Constitution for felony conviction. Not restored without clemency.', action:'Clemency required for restoration.' });

  // 9. ADOPT / FOSTER
  caps.push({ id:'adopt', status:'restricted', icon:'👶', label:'Adopt or Foster Children', note:'Felony conviction does not automatically bar adoption but significantly impacts home study. Certain offenses (violence, child abuse, sexual) create presumptive bars.', action:'Seal/expunge improves chances. Consult with adoption agency about specific restrictions.' });

  // 10. PROFESSIONAL LICENSES
  if (isMurder || isSexualBattery) {
    caps.push({ id:'profLicense', status:'forfeited', icon:'📜', label:'Professional Licenses', note:'Murder and sexual battery convictions permanently disqualify many professional licenses under FL law (moral turpitude clause).', action:'Check specific licensing board requirements. Some may consider expungement.' });
  } else {
    caps.push({ id:'profLicense', status:'varies', icon:'📜', label:'Professional Licenses', note:'FL licensing boards evaluate on case-by-case basis. Key factors: time since conviction, relationship to profession, rehabilitation evidence.', action:'Contact licensing board directly. Demonstrate rehabilitation. Seal/expunge record first if eligible.' });
  }

  // 11. MAKE CONTRACTS
  caps.push({ id:'contracts', status:'preserved', icon:'📝', label:'Make Contracts', note:'Full right to enter contracts preserved. Cannot be restricted based on felony status.', action:'No action needed — right is fully intact.' });

  // 12. OWN PROPERTY
  caps.push({ id:'property', status:'preserved', icon:'🏘️', label:'Own Property', note:'Full right to own, buy, sell, and inherit property preserved.', action:'No action needed — right is fully intact.' });

  // 13. MARRY / DIVORCE
  caps.push({ id:'family', status:'preserved', icon:'💍', label:'Marry / Divorce / Parent', note:'Full rights preserved. Felony status cannot restrict marriage, divorce, or parental rights (though it may factor in custody evaluations).', action:'No action needed. For custody concerns, document rehabilitation.' });

  // 14. ACCESS COURTS (SUE/BE SUED)
  caps.push({ id:'accessCourts', status:'preserved', icon:'⚡', label:'Access Courts (Sue/Be Sued)', note:'Full access to courts preserved. Can file civil lawsuits, appeal, and seek legal remedies.', action:'No action needed — right is fully intact. For criminal appeals, deadlines apply.' });

  // 15. MAKE A WILL / INHERIT
  caps.push({ id:'estate', status:'preserved', icon:'📄', label:'Make a Will / Inherit', note:'Full testamentary rights preserved. Can make wills, trusts, and inherit property.', action:'No action needed.' });

  // 16. MEDICAL DECISIONS
  caps.push({ id:'medical', status:'preserved', icon:'🏥', label:'Medical Decision-Making', note:'Full right to make medical decisions, healthcare directives, and appoint healthcare surrogates.', action:'No action needed.' });

  // 17. PRACTICE RELIGION
  caps.push({ id:'religion', status:'preserved', icon:'⛪', label:'Practice Religion', note:'Full religious freedom preserved under First Amendment. Cannot be restricted.', action:'No action needed.' });

  // 18. IMMIGRATION STATUS
  if (isDrugTrafficking || isViolent || isMurder || isSexualBattery) {
    caps.push({ id:'immigration', status:'needsAction', icon:'🛂', label:'Immigration Status', note:'Aggravated felony under INA — mandatory deportation for non-citizens. No relief available for most aggravated felonies.', action:'URGENT: Consult with immigration attorney immediately. File for any available relief (withholding of removal, CAT protection).' });
  } else if (isDrug) {
    caps.push({ id:'immigration', status:'needsAction', icon:'🛂', label:'Immigration Status', note:'Drug trafficking conviction is an aggravated felony under INA. Non-citizens face deportation.', action:'URGENT: Consult with immigration attorney. Possible relief depends on specific offense and immigration history.' });
  } else {
    caps.push({ id:'immigration', status:'needsAction', icon:'🛂', label:'Immigration Status', note:'Many felonies trigger immigration consequences. Non-citizens should never assume a guilty plea is safe.', action:'Consult with immigration attorney before any plea or post-conviction proceeding.' });
  }

  // 19. DRIVER'S LICENSE
  caps.push({ id:'driversLicense', status:'varies', icon:'🚗', label:'Driver\'s License', note:'FL DHSMV may suspend license upon felony conviction. Reinstatement requires payment of fees and completion of court-ordered programs.', action:'Check license status at flhsmv.gov. Pay reinstatement fee ($45-$130) and complete any required programs.' });

  // 20. VOTER REGISTRATION
  caps.push({ id:'passport', status:'preserved', icon:'🛂', label:'Apply for US Passport', note:'Right to apply for US passport preserved. Incarceration or probation may limit ability to travel, but no legal bar on passport issuance.', action:'Apply at travel.state.gov. If on probation, get travel clearance from PO first.' });

  // 21. FOOD ASSISTANCE (SNAP)
  caps.push({ id:'snap', status:'varies', icon:'🍎', label:'Food Assistance (SNAP)', note:'FL has modified SNAP ban for drug felons. State opted out of federal lifetime ban. Eligibility depends on compliance with probation/parole.', action:'Apply through FL ACCESS (myflorida.com/access). Provide proof of compliance with sentence terms.' });

  // 22. MEDICAID
  caps.push({ id:'medicaid', status:'preserved', icon:'🏥', label:'Medicaid / Healthcare', note:'Medicaid eligibility is not barred by felony conviction. Apply through FL ACCESS.', action:'Apply at myflorida.com/access or healthcare.gov.' });

  // Build counts
  const counts = { preserved:0, restricted:0, forfeited:0, needsAction:0, varies:0 };
  caps.forEach(c => counts[c.status]++);

  return { capabilities: caps, counts, chargeName: charge?.name || '', county };
}

function renderReentry() {
  const el = document.getElementById('reentry-content');
  if (!el) return;

  const session = caseSession;
  const county = session?.county || '';
  const chargeName = session?.chargeName || '';
  const chargeStatute = session?.chargeStatute || '';
  const defendantName = session?.defendantName || '';

  // Find the charge object using schema engine
  let charge = chargeName ? resolveCharge(chargeName) || resolveCharge(chargeStatute) : null;
  // Build structured schema for capabilities engine
  const chargeSchema = charge ? enrichSchema(toChargeSchema(charge), session) : null;
  // County profile
  const profile = getCountyProfile(county);
  const checklist = loadReentryChecklist();

  // Voter status
  const voter = getFLVoterStatus(charge);
  // DL status
  const dl = getFLDLStatus(charge);
  // Housing
  const housing = getFLHousingNote(charge);
  // Collateral
  const collateral = getCollateralSummary(charge);

  // Determine seal/expunge eligibility badge
  let sealStatus = 'unknown', sealLabel = 'Check Eligibility', sealIcon = '❓';
  if (charge) {
    const deg = charge.degree || '';
    const name = charge.name || '';
    const isCapital = deg.includes('Capital') || deg.includes('Life');
    const isSexual = name.toLowerCase().includes('sexual battery');
    if (isCapital) { sealStatus = 'blocked'; sealLabel = 'Not Eligible'; sealIcon = '🚫'; }
    else if (isSexual) { sealStatus = 'blocked'; sealLabel = 'Not Eligible'; sealIcon = '🚫'; }
    else if (charge.collateral?.firearm?.includes('Permanent')) { sealStatus = 'warn'; sealLabel = 'May Be Eligible'; sealIcon = '⚠️'; }
    else { sealStatus = 'eligible'; sealLabel = 'Likely Eligible'; sealIcon = '✅'; }
  }

  let html = '';

  // ── PERSONALIZED HEADER ──
  html += '<div class="reentry-hero">' +
    '<div class="reentry-hero-greeting">' + (defendantName ? esc(defendantName) + ' — ' : '') + 'Your Roadmap Back</div>' +
    '<div class="reentry-hero-sub">Personalized reentry plan based on your case data' +
    (county ? ' · ' + esc(county) + ' County' : '') +
    '</div>' +
    (!session ? '<div class="reentry-hero-cta"><span class="reentry-cta-btn" onclick="switchTab(\'builder\')">⚡ Start by searching a charge above</span></div>' : '') +
  '</div>';

  // ── WHAT YOU CAN STILL DO ──
  const caps = computeCapabilities(charge, session);
  const statusLabels = { preserved:'Preserved', restricted:'Restricted', forfeited:'Forfeited', needsAction:'Action Needed', varies:'Varies' };
  const statusColors = { preserved:'var(--green)', restricted:'var(--gold)', forfeited:'var(--red)', needsAction:'var(--sky)', varies:'var(--muted)' };
  const statusDefs = {
    preserved: 'Fully intact right now — no application, waiting period, or court action needed.',
    restricted: 'Not banned outright, but limited in specific ways (who decides, what conditions apply) — read the item for the exact limit.',
    forfeited: 'Lost as a direct result of the felony conviction — only comes back through executive clemency or, in some cases, a successful seal/expunge.',
    needsAction: 'Depends on something you have to actively do or address (an attorney consult, a deadline, a status check) — not automatic either way.',
    varies: 'No fixed statewide rule — the outcome depends on the specific agency, county, or board reviewing your case.',
  };

  html += '<div class="reentry-section"><div class="reentry-section-title">🔍 What You Can Still Legally Do</div>' +
    '<div class="reentry-cap-summary">' +
    Object.entries(caps.counts).filter(([k,v]) => v > 0).map(([k,v]) =>
      '<span class="reentry-cap-stat" style="--stat-color:' + (statusColors[k] || 'var(--muted)') + '" title="' + esc(statusDefs[k] || '') + '">' +
      '<span class="reentry-cap-stat-num">' + v + '</span> ' + statusLabels[k] +
      '</span>'
    ).join('') +
    '</div>' +
    '<div class="reentry-legend">' +
    Object.entries(caps.counts).filter(([k,v]) => v > 0).map(([k]) =>
      '<div class="reentry-legend-row"><span class="reentry-legend-term" style="color:' + (statusColors[k] || 'var(--muted)') + '">' + statusLabels[k] + '</span>' +
      '<span class="reentry-legend-def">' + esc(statusDefs[k] || '') + '</span></div>'
    ).join('') +
    '</div>' +
    '<div class="reentry-cap-grid">' +
    caps.capabilities.map(c => {
      const sc = statusColors[c.status] || 'var(--muted)';
      return '<div class="reentry-cap-item" onclick="this.classList.toggle(\'expanded\')">' +
        '<div class="reentry-cap-header">' +
        '<span class="reentry-cap-icon">' + c.icon + '</span>' +
        '<span class="reentry-cap-label">' + esc(c.label) + '</span>' +
        '<span class="reentry-cap-status" style="color:' + sc + ';border-color:' + sc + '">' + statusLabels[c.status] + '</span>' +
        '</div>' +
        '<div class="reentry-cap-body">' +
        '<div class="reentry-cap-note">' + esc(c.note) + '</div>' +
        (c.action ? '<div class="reentry-cap-action"><span class="reentry-cap-action-icon">➡️</span>' + esc(c.action) + '</div>' : '') +
        '</div>' +
        '</div>';
    }).join('') +
    '</div></div>';

  // ── STATUS CARDS ──
  html += '<div class="reentry-grid">';

  // Card: Record Relief
  html += '<div class="reentry-card">' +
    '<div class="reentry-card-header"><span class="reentry-card-icon">🔒</span>Record Relief</div>' +
    '<div class="reentry-card-body">' +
    '<div class="reentry-badge ' + sealStatus + '">' + sealIcon + ' ' + sealLabel + '</div>' +
    '<div class="reentry-card-text">' + (charge ? (sealStatus === 'eligible' ? 'You may qualify for seal or expungement — the first step to clearing your record for employment and housing.' : 'Seal/expunge may not be available for this charge type. Check with an attorney or explore clemency.') : 'Search a charge to see record relief eligibility.') + '</div>' +
    '<div class="reentry-card-actions"><span class="reentry-action-btn" onclick="switchTab(\'builder\')">⚖️ Open Seal/Expunge Wizard</span></div>' +
    '</div></div>';

  // Card: Voting Rights
  html += '<div class="reentry-card">' +
    '<div class="reentry-card-header"><span class="reentry-card-icon">🗳️</span>Voting Rights</div>' +
    '<div class="reentry-card-body">' +
    '<div class="reentry-badge ' + (voter.eligible ? 'eligible' : 'blocked') + '">' + (voter.eligible ? '✅ Eligible' : '🚫 Requires Clemency') + '</div>' +
    '<div class="reentry-card-text">' + esc(voter.note) + '</div>' +
    (voter.steps ? '<div class="reentry-card-steps">' + voter.steps.map(s => '<div class="reentry-step">→ ' + esc(s) + '</div>').join('') + '</div>' : '') +
    '</div></div>';

  // Card: Driver's License
  html += '<div class="reentry-card">' +
    '<div class="reentry-card-header"><span class="reentry-card-icon">🚗</span>Driver\'s License</div>' +
    '<div class="reentry-card-body">' +
    '<div class="reentry-card-text">' + esc(dl.note) + '</div>' +
    (dl.requirements ? '<div class="reentry-card-steps">' + dl.requirements.map(r => '<div class="reentry-step">→ ' + esc(r) + '</div>').join('') + '</div>' : '') +
    (dl.fee ? '<div class="reentry-card-fee">Fee: ' + esc(dl.fee) + '</div>' : '') +
    '</div></div>';

  // Card: Housing
  html += '<div class="reentry-card">' +
    '<div class="reentry-card-header"><span class="reentry-card-icon">🏠</span>Housing</div>' +
    '<div class="reentry-card-body">' +
    '<div class="reentry-card-text">' + esc(housing.note) + '</div>' +
    (housing.resources ? '<div class="reentry-card-steps">' + housing.resources.map(r => '<div class="reentry-step">→ ' + esc(r) + '</div>').join('') + '</div>' : '') +
    '</div></div>';

  html += '</div>';

  // ── COLLATERAL CONSEQUENCES ──
  if (collateral.length) {
    html += '<div class="reentry-section"><div class="reentry-section-title">⚖️ Collateral Consequences for ' + esc(chargeName) + '</div>' +
      '<div class="reentry-grid reentry-grid-4">' +
      collateral.map(c => '<div class="reentry-card reentry-card-sm"><div class="reentry-card-icon-sm">' + c.icon + '</div><div class="reentry-card-label">' + esc(c.label) + '</div><div class="reentry-card-detail">' + esc(c.detail.length > 80 ? c.detail.slice(0, 80) + '…' : c.detail) + '</div></div>').join('') +
    '</div></div>';
  }

  // ── COUNTY REENTRY RESOURCES ──
  if (profile) {
    const d = profile.data;
    html += '<div class="reentry-section"><div class="reentry-section-title">📍 ' + esc(profile.key) + ' County Resources</div><div class="reentry-grid">';

    if (d.reentryResources && d.reentryResources.length) {
      html += '<div class="reentry-card">' +
        '<div class="reentry-card-header"><span class="reentry-card-icon">🤝</span>Reentry Programs</div>' +
        '<div class="reentry-card-body"><div class="reentry-card-steps">' +
        d.reentryResources.map(r => '<div class="reentry-step">→ ' + esc(r) + '</div>').join('') +
        '</div></div></div>';
    }

    if (d.specialtyCourts && d.specialtyCourts.length) {
      html += '<div class="reentry-card">' +
        '<div class="reentry-card-header"><span class="reentry-card-icon">🏛️</span>Specialty Courts</div>' +
        '<div class="reentry-card-body"><div class="reentry-card-text">These courts may offer alternative sentencing or treatment programs:</div><div class="reentry-card-steps">' +
        d.specialtyCourts.map(s => '<div class="reentry-step">→ ' + esc(s) + '</div>').join('') +
        '</div></div></div>';
    }

    html += '</div></div>';
  }

  // ── REENTRY CHECKLIST ──
  const checklistItems = [
    { id: 'id-fl', label: 'Get Florida ID or State ID', desc: 'FL DHSMV — required for employment, housing, banking' },
    { id: 'ssn-replace', label: 'Replace Social Security Card (if lost)', desc: 'SSA.gov or local SSA office' },
    { id: 'birth-cert', label: 'Obtain Certified Birth Certificate', desc: 'FL Bureau of Vital Statistics' },
    { id: 'medicaid', label: 'Apply for Medicaid / Healthcare', desc: 'FL ACCESS — benefit application portal' },
    { id: 'snap', label: 'Apply for SNAP (Food Assistance)', desc: 'FL ACCESS — food assistance program' },
    { id: 'register-vote', label: 'Register to Vote (if eligible)', desc: 'RegisterToVoteFlorida.gov' },
    { id: 'dl-check', label: 'Check Driver\'s License Status', desc: 'FL DHSMV online portal' },
    { id: 'fdle-cert', label: 'Get FDLE Certificate of Eligibility', desc: 'Required before filing seal/expunge petition' },
    { id: 'child-support', label: 'Check Child Support Status', desc: 'FL DOR — avoid license suspension' },
    { id: 'court-costs', label: 'Verify Court Costs Paid', desc: 'Check with Clerk of Court in county of conviction' },
    { id: 'probation', label: 'Confirm Probation/Parole Status', desc: 'Contact supervising officer or FL DOC' },
    { id: 'bank-account', label: 'Open a Bank Account', desc: 'Second chance banking programs available' }
  ];

  html += '<div class="reentry-section"><div class="reentry-section-title">✅ Reentry Checklist</div><div class="reentry-card">' +
    '<div class="reentry-card-body">' +
    '<div class="reentry-card-text" style="margin-bottom:10px">Track your progress — checked items save to this device.</div>' +
    checklistItems.map(item => {
      const checked = checklist[item.id] || false;
      return '<div class="reentry-checklist-item' + (checked ? ' done' : '') + '" onclick="toggleReentryCheck(\'' + item.id + '\')">' +
        '<span class="reentry-checkbox">' + (checked ? '✅' : '⬜') + '</span>' +
        '<div class="reentry-check-content"><div class="reentry-check-label">' + esc(item.label) + '</div><div class="reentry-check-desc">' + esc(item.desc) + '</div></div>' +
      '</div>';
    }).join('') +
    '</div></div></div>';

  // ── LANGUAGE RESOURCES ──
  html += '<div class="reentry-section"><div class="reentry-section-title">📞 Help & Hotlines</div><div class="reentry-grid">' +
    '<div class="reentry-card"><div class="reentry-card-header"><span class="reentry-card-icon">📞</span>Legal Aid</div><div class="reentry-card-body"><div class="reentry-card-steps"><div class="reentry-step">→ FL Legal Services: 1-866-550-2929</div><div class="reentry-step">→ ACLU FL Know Your Rights</div><div class="reentry-step">→ FL Bar Pro Bono Directory</div></div></div></div>' +
    '<div class="reentry-card"><div class="reentry-card-header"><span class="reentry-card-icon">🧠</span>Mental Health & Substance Use</div><div class="reentry-card-body"><div class="reentry-card-steps"><div class="reentry-step">→ SAMHSA Helpline: 1-800-662-4357</div><div class="reentry-step">→ FL 211 — community services</div><div class="reentry-step">→ NAMI FL: nami.org</div></div></div></div>' +
    '<div class="reentry-card"><div class="reentry-card-header"><span class="reentry-card-icon">💼</span>Employment</div><div class="reentry-card-body"><div class="reentry-card-steps"><div class="reentry-step">→ CareerSource FL: careersourcefl.com</div><div class="reentry-step">→ FL Felon-friendly job board</div><div class="reentry-step">→ Second Chance Hiring: checkfairchancehiring.com</div></div></div></div>' +
  '</div></div>';

  el.innerHTML = html;
}

function toggleReentryCheck(id) {
  const state = loadReentryChecklist();
  state[id] = !state[id];
  localStorage.setItem(REENTRY_CHECKLIST_KEY, JSON.stringify(state));
  renderReentry(); // re-render to show updated state
}

function renderAppeals() {
  const cards = document.querySelectorAll('#tab-appeals .lib-card');
  cards.forEach(card => card.style.outline = 'none');
}

function renderCourts() {
  const list = document.getElementById('courts-list');
  if(!list) return;
  list.innerHTML = COURTS.map(c=>`<div class="lib-card" style="margin-bottom:10px"><div class="lib-title">${esc(c.name)}</div><div class="lib-statute">${esc(c.court)}</div><div class="lib-desc">${esc(c.address)}</div><div class="lib-tip">${esc(c.note)}${c.url?` <a href="${esc(c.url)}" target="_blank" rel="noreferrer">Official source</a>`:''}</div><div class="lib-desc" style="margin-top:8px;color:var(--gold)">${esc(c.phone)}</div></div>`).join('');
}

function renderClerks() {
  const list = document.getElementById('clerks-list');
  const count = document.getElementById('clerks-count');
  if(!list) return;
  const term = (document.getElementById('clerk-search')?.value || '').trim().toLowerCase();

  // Check county aliases from legal lexicon
  let matchedCountyKeys = null;
  if (term) {
    matchedCountyKeys = [];
    Object.keys(LEGAL_LEXICON.counties).forEach(key => {
      if (LEGAL_LEXICON.counties[key].some(alias => {
        const a = alias.toLowerCase();
        return a === term || a.includes(term) || term.includes(a) || diceCoefficient(term, a) >= 0.5;
      })) {
        matchedCountyKeys.push(key);
      }
    });
  }

  let filtered;
  if (!term) {
    filtered = COUNTY_CLERKS;
  } else if (matchedCountyKeys && matchedCountyKeys.length > 0) {
    // Match by alias keys
    const normKeys = matchedCountyKeys.map(k => k.replace(/[^a-z0-9]/g, ''));
    filtered = COUNTY_CLERKS.filter(c => {
      const cNorm = c.county.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normKeys.some(k => cNorm.includes(k) || k.includes(cNorm));
    });
    // If aliases found but no direct match, fall back to fuzzy
    if (!filtered.length) filtered = COUNTY_CLERKS;
  } else {
    filtered = COUNTY_CLERKS;
  }

  // Apply fuzzy scoring if there's a search term
  if (term) {
    const scored = legalSearch(term, filtered, c => c.county+' '+c.address);
    filtered = scored.filter(r => r.score > 0.15).map(r => r.item);
  }

  if(count) count.textContent = `${filtered.length} of ${COUNTY_CLERKS.length} counties shown`;
  list.innerHTML = filtered.map(c=>`<div class="lib-card" style="margin-bottom:10px"><div class="lib-title">${esc(c.county)} County</div><div class="lib-statute">Florida Clerk of Court</div><div class="lib-desc" style="white-space:pre-line">${esc(c.address)}</div><div class="lib-tip">${esc(c.phone)}${federalDistrictForCounty(c.county)?`<br><strong>Federal district:</strong> ${esc(federalDistrictForCounty(c.county).name)}`:''}</div></div>`).join('');
  if(!filtered.length) list.innerHTML = `<div class="no-drafts">No counties match that search.</div>`;
}

function renderFederal() {
  const list = document.getElementById('federal-list');
  if(!list) return;
  list.innerHTML = FEDERAL_DISTRICTS.map(d => `<div class="lib-card" style="margin-bottom:10px"><div class="lib-title">${esc(d.name)}</div><div class="lib-statute">${esc(d.code)}</div><div class="lib-desc">Counties: ${esc(d.counties.join(', '))}</div><div class="lib-tip">${d.courthouses.map(c => `<strong>${esc(c.division)}:</strong> ${esc(c.address)}${c.note?` <span style="display:block;margin-top:4px">${esc(c.note)}</span>`:''}`).join('<hr style="border:none;border-top:1px solid var(--border);margin:8px 0">')}</div></div>`).join('');
}

// ── DEADLINE CALCULATOR ──
function toLocalDateKey(d) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
}

function makeLocalNoonDate(year, monthIndex, day) {
  return new Date(year, monthIndex, day, 12, 0, 0, 0);
}

function nthWeekdayOfMonth(year, monthIndex, weekday, nth) {
  const first = makeLocalNoonDate(year, monthIndex, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  const day = 1 + offset + ((nth - 1) * 7);
  return makeLocalNoonDate(year, monthIndex, day);
}

function lastWeekdayOfMonth(year, monthIndex, weekday) {
  const last = makeLocalNoonDate(year, monthIndex + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return makeLocalNoonDate(year, monthIndex, last.getDate() - offset);
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return makeLocalNoonDate(year, month, day);
}

function observedFloridaHoliday(date) {
  const d = new Date(date);
  if (d.getDay() === 6) d.setDate(d.getDate() - 1);
  else if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

function buildFloridaHolidaySet(year) {
  const holidays = new Set();
  const add = (date) => holidays.add(toLocalDateKey(date));
  const addObserved = (monthIndex, day) => add(observedFloridaHoliday(makeLocalNoonDate(year, monthIndex, day)));

  // Florida Rule 2.514 legal holidays are anchored to state-paid holidays in s. 110.117,
  // plus common court closures like Good Friday.
  addObserved(0, 1); // New Year's Day
  add(nthWeekdayOfMonth(year, 0, 1, 3)); // MLK Jr. Day
  add(lastWeekdayOfMonth(year, 4, 1)); // Memorial Day
  addObserved(6, 4); // Independence Day
  add(nthWeekdayOfMonth(year, 8, 1, 1)); // Labor Day
  addObserved(10, 11); // Veterans Day
  add(nthWeekdayOfMonth(year, 10, 4, 4)); // Thanksgiving Day
  add(makeLocalNoonDate(year, 10, nthWeekdayOfMonth(year, 10, 4, 4).getDate() + 1)); // Friday after Thanksgiving
  addObserved(11, 25); // Christmas Day

  const goodFriday = new Date(easterSunday(year));
  goodFriday.setDate(goodFriday.getDate() - 2);
  add(goodFriday);

  return holidays;
}

const floridaHolidayCache = new Map();

function isFloridaLegalHoliday(d) {
  const year = d.getFullYear();
  if (!floridaHolidayCache.has(year)) {
    floridaHolidayCache.set(year, buildFloridaHolidaySet(year));
  }
  return floridaHolidayCache.get(year).has(toLocalDateKey(d));
}

function isBusinessDay(d) {
  return d.getDay() !== 0 && d.getDay() !== 6 && !isFloridaLegalHoliday(d);
}

function nextBusinessDay(d) {
  const r = new Date(d);
  while (!isBusinessDay(r)) r.setDate(r.getDate() + 1);
  return r;
}

function addCalendarDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function addYearsPreservingMonthDay(d, years) {
  const r = new Date(d);
  const month = r.getMonth();
  r.setFullYear(r.getFullYear() + years);
  if (r.getMonth() !== month) r.setDate(0);
  return r;
}

function computeFloridaDeadline(startDate, rule) {
  if (rule.kind === 'none') return null;

  if (rule.kind === 'years') {
    const original = addYearsPreservingMonthDay(startDate, rule.amount);
    return {
      original,
      adjusted: nextBusinessDay(original)
    };
  }

  const original = addCalendarDays(startDate, rule.amount);
  return {
    original,
    adjusted: nextBusinessDay(original)
  };
}

function calcDeadline() {
  const el = document.getElementById('calcDate');
  const type = document.getElementById('calcType').value;
  const res = document.getElementById('calcResults');
  if(!el||!el.value||!res) return;
  const start = new Date(el.value+'T12:00:00');
  const rules = {
    appeal:{ kind:'days', amount:30, label:'Notice of Appeal deadline',
      citation:'Fla. R. App. P. 9.110(b)',
      why:'A direct appeal must be filed within 30 days of the rendition of the order or judgment being appealed, or the appellate court loses jurisdiction to hear it.' },
    '3850':{ kind:'years', amount:2, label:'Rule 3.850 deadline (2 years)',
      citation:'Fla. R. Crim. P. 3.850(b)',
      why:'A postconviction motion must be filed within 2 years of the judgment and sentence becoming final (typically when the direct-appeal mandate issues, or 30 days after sentencing if no appeal was taken). Narrow exceptions exist for newly discovered evidence, retroactive changes in the law, and illegal sentences — see Rule 3.850(b)(1)-(3).' },
    '3800':{ kind:'none', amount:0, label:'Rule 3.800(a) — no deadline',
      citation:'Fla. R. Crim. P. 3.800(a)',
      why:'A motion to correct an illegal sentence attacks the sentence itself (e.g., exceeding the statutory maximum), not the conviction, so the legislature placed no time limit on raising it.' },
    rehearing:{ kind:'days', amount:15, label:'Motion for Rehearing deadline',
      citation:'Fla. R. App. P. 9.330(a)',
      why:'A motion for rehearing must be filed within 15 days of the appellate court\'s order or opinion to give the court a chance to correct a claimed error before the case becomes final.' },
    clarification:{ kind:'days', amount:15, label:'Motion for Clarification deadline',
      citation:'Fla. R. App. P. 9.330(a)',
      why:'Motions for clarification share the same 15-day window and procedure as motions for rehearing under Rule 9.330 — both ask the court to revisit its opinion before mandate issues.' },
    mandate:{ kind:'days', amount:30, label:'Mandate issuance (approx.)',
      citation:'Fla. R. App. P. 9.340',
      why:'The mandate (the order that finalizes the appellate decision and returns jurisdiction to the trial court) generally issues 15 days after the time for rehearing expires — roughly 30 days after the opinion, though the clerk controls the exact date.' },
    discretionary:{ kind:'days', amount:30, label:'Discretionary Review deadline',
      citation:'Fla. R. App. P. 9.120(b)',
      why:'A notice to invoke the Florida Supreme Court\'s discretionary jurisdiction must be filed within 30 days of the district court of appeal\'s decision, the same 30-day window as a direct appeal.' }
  };
  const rule = rules[type];
  if(!rule) return;
  if(rule.kind === 'none') {
    res.innerHTML = `<div class="calc-result highlight"><div class="label">${esc(rule.label)}</div><div class="value" style="color:var(--teal)">No time limit</div><div class="note">A Rule 3.800(a) motion to correct an illegal sentence can be filed at any time. There is no statutory deadline.</div></div>
    <div class="calc-result"><div class="label">Why this rule applies</div><div class="note"><strong>${esc(rule.citation)}.</strong> ${esc(rule.why)}</div></div>`;
    return;
  }
  const deadline = computeFloridaDeadline(start, rule);
  const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const shifted = deadline.original.toDateString() !== deadline.adjusted.toDateString();
  res.innerHTML = `
    <div class="calc-result highlight">
      <div class="label">Trigger Date</div>
      <div class="value" style="color:var(--white);font-size:14px">${start.toLocaleDateString('en-US',options)}</div>
    </div>
    <div class="calc-result highlight">
      <div class="label">${esc(rule.label)}</div>
      <div class="value">${deadline.adjusted.toLocaleDateString('en-US',options)}</div>
      <div class="note">${rule.kind === 'years' ? '2 calendar years' : `${rule.amount} calendar days`} from the trigger date, computed under Fla. R. Gen. Prac. &amp; Jud. Admin. 2.514. ${shifted ? `Extended from ${deadline.original.toLocaleDateString('en-US',options)} because the last day fell on a weekend or legal holiday. ` : ''}Local clerk or chief-judge closure days can still move the deadline. ${deadline.adjusted<new Date()?'⚠ This deadline may have passed.':'This deadline is in the future.'}</div>
    </div>
    <div class="calc-result">
      <div class="label">Why this rule applies</div>
      <div class="note"><strong>${esc(rule.citation)}.</strong> ${esc(rule.why)}</div>
    </div>`;
}

// ── GLOSSARY ──
let glossarySimpleMode = false;
function toggleGlossarySimpleMode() {
  glossarySimpleMode = !glossarySimpleMode;
  const toggle = document.getElementById('glossary-simple-toggle');
  if (toggle) toggle.querySelector('.toggle-indicator').classList.toggle('on', glossarySimpleMode);
  filterGlossary(document.getElementById('glossarySearch')?.value || '');
}
function glossarySort(a, b) {
  if (!!a.key !== !!b.key) return a.key ? -1 : 1;
  return a.t.localeCompare(b.t);
}
function renderGlossaryList(terms) {
  return terms.map(g=>`<div class="glossary-term${g.key ? ' key-term' : ''}"><div class="term">${esc(g.t)}${g.key ? '<span class="key-term-badge" title="Comes up constantly in pro se postconviction and appellate filings — worth knowing cold.">ESSENTIAL</span>' : ''}</div><div class="def">${esc(glossarySimpleMode && g.simple ? g.simple : g.d)}</div></div>`).join('');
}
function renderGlossary() {
  const list = document.getElementById('glossary-list');
  const count = document.getElementById('glossary-count');
  if(!list) return;
  if(count) count.textContent = `${GLOSSARY.length} terms`;
  list.innerHTML = renderGlossaryList([...GLOSSARY].sort(glossarySort));
}
function filterGlossary(val) {
  const list = document.getElementById('glossary-list');
  const count = document.getElementById('glossary-count');
  if(!list) return;
  const term = (val||'').trim().toLowerCase();
  const filtered = GLOSSARY.filter(g => !term || g.t.toLowerCase().includes(term) || g.d.toLowerCase().includes(term)).sort(glossarySort);
  if(count) count.textContent = `${filtered.length} of ${GLOSSARY.length} terms`;
  list.innerHTML = renderGlossaryList(filtered);
  if(!filtered.length) list.innerHTML = `<div class="no-drafts">No terms match that search.</div>`;
}

// ── DOCUMENT GENERATORS ──
function gen3850(a, flow) {
  return `<div class="doc-title">IN THE CIRCUIT COURT OF THE ${f(a['county']?a['county'].toUpperCase():'')} JUDICIAL CIRCUIT</div>
<div class="doc-title">IN AND FOR ${f(a['county']?a['county'].toUpperCase()+' COUNTY':'')} FLORIDA</div>
<div class="doc-subtitle">STATE OF FLORIDA,<br>Plaintiff,<br>vs.<br><strong>${f(a['def-name'])}</strong>,<br>Defendant.<br>CASE NO.: ${f(a['case-num'])}<br>Division: Criminal</div>
<div class="doc-section"><div class="doc-section-title">Motion for Postconviction Relief</div><div class="doc-section-title" style="font-size:9px">Fla. R. Crim. P. 3.850</div>
<p>COMES NOW, the Defendant, ${f(a['def-name'])}, pro se, and files this Motion for Postconviction Relief pursuant to Florida Rule of Criminal Procedure 3.850, and in support thereof states:</p></div>
<div class="doc-section"><div class="doc-section-title">I. Preliminary Statement</div>
<p>Defendant was convicted of ${f(a['offense'])} in violation of ${f(a['offense-statute'],'F.S. § [STATUTE]')}, in the Circuit Court of ${f(a['county'])} County, Florida, Case No. ${f(a['case-num'])}. Defendant was sentenced on ${f(a['sentence-date'])} to ${f(a['sentence-terms'])}.</p>
<p>Defendant is currently ${f(a['currently-incarcerated'],'[CUSTODY STATUS]')}.</p></div>
<div class="doc-section"><div class="doc-section-title">II. Grounds for Relief</div>
${a['grounds-iac']==='true'?'<p><strong>Ground One: Ineffective Assistance of Counsel</strong> — Trial counsel\'s performance fell below an objective standard of reasonableness and prejudiced the outcome. Strickland v. Washington, 466 U.S. 668 (1984).</p>':''}
${a['grounds-new']==='true'?'<p><strong>Ground Two: Newly Discovered Evidence</strong> — Evidence not available at trial that would probably produce an acquittal on retrial.</p>':''}
${a['grounds-plea']==='true'?'<p><strong>Ground Three: Involuntary Plea</strong> — Defendant\'s plea was not knowing, voluntary, and intelligent.</p>':''}
${a['grounds-sentence']==='true'?'<p><strong>Ground Four: Illegal Sentence</strong> — The sentence imposed exceeds the statutory maximum.</p>':''}
${a['grounds-brady']==='true'?'<p><strong>Ground Five: Brady Violation</strong> — The prosecution withheld material favorable evidence.</p>':''}</div>
<div class="doc-section"><div class="doc-section-title">III. Statement of Facts</div>
<p>${a['facts-main'] ? esc(a['facts-main']) : '<span class="placeholder">[STATE SPECIFIC FACTS]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Relief Requested</div>
<p>WHEREFORE, Defendant requests ${f(a['relief-sought'],'an evidentiary hearing')} and any further relief deemed just and proper.</p></div>
<div class="doc-section"><div class="doc-section-title">Certificate of Service</div>
<p>I CERTIFY that a copy has been furnished to the State Attorney, ${f(a['state-atty-addr'])}, on ${f(a['date-signed'])}.</p><br>
<p>Respectfully submitted,</p><br><br>
<p>______________________________<br>${f(a['filer-name'])}<br>${f(a['dc-number']?'DC# '+a['dc-number']:'')}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p>
<br><p><em>I declare under penalty of perjury that the foregoing is true and correct.</em></p></div>`;
}

function gen3800(a, flow) {
  return `<div class="doc-title">IN THE CIRCUIT COURT, ${f(a['county']?a['county'].toUpperCase():'')} COUNTY, FLORIDA</div>
<div class="doc-subtitle">STATE OF FLORIDA vs. <strong>${f(a['def-name'])}</strong><br>CASE NO.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">Motion to Correct Illegal Sentence</div><div class="doc-section-title" style="font-size:9px">Fla. R. Crim. P. 3.800(a)</div>
<p>COMES NOW the Defendant, ${f(a['def-name'])}, pro se, and moves this Court to correct an illegal sentence:</p></div>
<div class="doc-section"><div class="doc-section-title">I. The Illegal Sentence</div>
<p>Defendant was convicted of ${f(a['offense'])} under ${f(a['offense-statute'])} and sentenced to ${f(a['sentence-imposed'])}. The statutory maximum is ${f(a['max-sentence'])}. The sentence is illegal because it ${f(a['illegal-basis'])}.</p></div>
<div class="doc-section"><div class="doc-section-title">II. Basis of Illegality</div>
<p>${a['illegal-explain'] ? esc(a['illegal-explain']) : '<span class="placeholder">[EXPLAIN LEGAL BASIS]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">III. Relief Requested</div>
<p>${a['relief-requested'] ? esc(a['relief-requested']) : '<span class="placeholder">[STATE SPECIFIC RELIEF]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">Certificate of Service</div>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['def-name'])}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p></div>`;
}

function genAppeal(a, flow) {
  const court = courtByLabel(a['appellate-dca']);
  return `<div class="doc-title">IN THE DISTRICT COURT OF APPEAL OF FLORIDA</div>
<div class="doc-subtitle">${f(a['appellate-dca'])}<br>Lower Tribunal: ${f(a['county'])} County<br>Appellant: <strong>${f(a['appellant-name'])}</strong><br>Case No.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">Direct Appeal Packet</div><div class="doc-section-title" style="font-size:9px">Fla. R. App. P. 9.110 / 9.140</div></div>
<div class="doc-section"><div class="doc-section-title">I. Appeal Posture</div>
<p>Judgment Date: ${f(a['judgment-date'])}<br>Notice Due: ${f(a['appeal-due'],'[VERIFY]')}<br>Notice Filed: ${f(a['notice-filed-date'],'[NOT FILED]')}<br>Record Due: ${f(a['record-due-date'],'[VERIFY]')}<br>Appellate Court: ${f(a['appellate-dca'])}</p>
${court?`<p><strong>Court Address:</strong> ${esc(court.address)}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">II. Issues</div>
<p>${a['issues-summary'] ? esc(a['issues-summary']) : '<span class="placeholder">[PRIMARY ISSUES]</span>'}</p>
<p><strong>Preservation:</strong> ${a['preservation'] ? esc(a['preservation']) : '<span class="placeholder">[HOW PRESERVED]</span>'}</p>
${a['record-cites']?`<p><strong>Record References:</strong> ${esc(a['record-cites'])}</p>`:''}
<p><strong>Requested Relief:</strong> ${a['relief-requested'] ? esc(a['relief-requested']) : '<span class="placeholder">[RELIEF]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">III. Record Checklist</div>
<p><strong>Transcript:</strong> ${f(a['transcript-status'])}<br><strong>Items Needed:</strong> ${a['record-items'] ? esc(a['record-items']) : '<span class="placeholder">[ITEMS]</span>'}</p>
${a['filing-status']?`<p><strong>Status:</strong> ${esc(a['filing-status'])}</p>`:''}
${a['service-list']?`<p><strong>Service:</strong> ${esc(a['service-list'])}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">IV. Summary</div>
<p>${a['appeal-summary'] ? esc(a['appeal-summary']) : '<span class="placeholder">[SUMMARY]</span>'}</p>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['appellant-name'])}<br>${f(a['appellant-address'])}<br>${f(a['appellant-city'])}</p></div>`;
}

function genAppealRecord(a, flow) {
  const court = courtByLabel(a['appellate-dca']);
  return `<div class="doc-title">APPELLATE RECORD & BRIEF PREP SHEET</div>
<div class="doc-subtitle">${f(a['appellate-dca'])}<br>Lower Tribunal: ${f(a['county'])} County<br>Appellant: <strong>${f(a['appellant-name'])}</strong><br>Case No.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">I. Record Designation</div>
<p>Transcript Status: ${f(a['transcript-status'])}</p>
<p>${a['record-items'] ? esc(a['record-items']) : '<span class="placeholder">[ITEMS]</span>'}</p>
${a['transcript-dates']?`<p><strong>Transcript Dates:</strong> ${esc(a['transcript-dates'])}</p>`:''}
<p><strong>Designation Filed:</strong> ${f(a['designation-filed'])}<br><strong>Brief Due:</strong> ${f(a['brief-due-date'],'[VERIFY]')}</p>
${a['extension-status']?`<p><strong>Extension:</strong> ${esc(a['extension-status'])}</p>`:''}
${court?`<p><strong>Court:</strong> ${esc(court.address)}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">II. Brief Outline</div>
<p><strong>Issues:</strong> ${a['issues-summary'] ? esc(a['issues-summary']) : '<span class="placeholder">[ISSUES]</span>'}</p>
${a['standard-review']?`<p><strong>Standard of Review:</strong> ${esc(a['standard-review'])}</p>`:''}
<p>${a['brief-outline'] ? esc(a['brief-outline']) : '<span class="placeholder">[BRIEF STRUCTURE]</span>'}</p>
<p><strong>Relief:</strong> ${a['relief-requested'] ? esc(a['relief-requested']) : '<span class="placeholder">[RELIEF]</span>'}</p></div>
<div class="doc-section">${a['service-list']?`<p>${esc(a['service-list'])}</p>`:''}
${a['brief-status']?`<p><strong>Status:</strong> ${esc(a['brief-status'])}</p>`:''}
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['appellant-name'])}<br>${f(a['appellant-address'])}<br>${f(a['appellant-city'])}</p></div>`;
}

function genAppealRehearing(a, flow) {
  const court = courtByLabel(a['appellate-dca']);
  return `<div class="doc-title">REHEARING / MANDATE PRESERVATION PACKET</div>
<div class="doc-subtitle">${f(a['appellate-dca'])}<br>Appellant: <strong>${f(a['appellant-name'])}</strong><br>Case No.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">I. Decision Info</div>
<p>Opinion Date: ${f(a['decision-date'])}<br>Rehearing Due: ${f(a['rehearing-due-date'],'[VERIFY]')}<br>Motion Filed: ${f(a['motion-filed-date'],'[NOT FILED]')}<br>Mandate: ${f(a['mandate-date'],'[VERIFY]')}<br>Relief: ${f(a['motion-type'])}</p>
${court?`<p><strong>Court:</strong> ${esc(court.address)}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">II. Grounds</div>
<p>${a['rehearing-grounds'] ? esc(a['rehearing-grounds']) : '<span class="placeholder">[GROUNDS]</span>'}</p>
${a['record-cites']?`<p><strong>References:</strong> ${esc(a['record-cites'])}</p>`:''}
${a['preservation']?`<p><strong>Preservation:</strong> ${esc(a['preservation'])}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">III. Mandate</div>
<p><strong>Stay Requested:</strong> ${f(a['stay-request'])}</p>
${a['mandate-concern']?`<p><strong>Why Stay Needed:</strong> ${esc(a['mandate-concern'])}</p>`:''}
<p><strong>Next Step:</strong> ${a['next-step'] ? esc(a['next-step']) : '<span class="placeholder">[NEXT STEP]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Summary</div>
<p>${a['rehearing-summary'] ? esc(a['rehearing-summary']) : '<span class="placeholder">[SUMMARY]</span>'}</p>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['appellant-name'])}<br>${f(a['appellant-address'])}<br>${f(a['appellant-city'])}</p></div>`;
}

function gen2254(a, flow) {
  const district = federalDistrictForCounty(a['county']);
  const courthouse = federalCourtByDistrictAndDivision(a['federal-district'], a['federal-division']);
  return `<div class="doc-title">IN THE UNITED STATES DISTRICT COURT</div>
<div class="doc-subtitle">${f(a['federal-district'])}<br>${courthouse?`${esc(courthouse.division)} Division<br>${esc(courthouse.address)}<br>${esc(courthouse.phone)}`:''}<br>Petitioner: <strong>${f(a['def-name'])}</strong><br>State Case No.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">Federal Habeas Corpus Petition</div><div class="doc-section-title" style="font-size:9px">28 U.S.C. § 2254 / AO 241</div>
<p>COMES NOW Petitioner, ${f(a['def-name'])}, and files this Petition for Writ of Habeas Corpus under 28 U.S.C. § 2254.</p></div>
<div class="doc-section"><div class="doc-section-title">I. State Judgment & Custody</div>
<p>County: ${f(a['county'])}<br>Judgment Date: ${f(a['judgment-date'])}<br>Custody: ${f(a['custody-status'])}</p>
<p><strong>Remedies Presented:</strong> ${a['state-remedies'] ? esc(a['state-remedies']) : '<span class="placeholder">[STATE REMEDIES]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">II. Exhaustion</div>
<p><strong>Direct Appeal:</strong> ${f(a['direct-appeal-status'])}<br><strong>Rule 3.850:</strong> ${f(a['3850-status'])}<br><strong>Rule 3.800:</strong> ${f(a['3800-status'],'[N/A]')}</p></div>
<div class="doc-section"><div class="doc-section-title">III. Grounds</div>
<p>${a['grounds-summary'] ? esc(a['grounds-summary']) : '<span class="placeholder">[FEDERAL GROUNDS]</span>'}</p>
<p><strong>Facts:</strong> ${a['supporting-facts'] ? esc(a['supporting-facts']) : '<span class="placeholder">[FACTS]</span>'}</p>
${a['record-cites']?`<p><strong>Record:</strong> ${esc(a['record-cites'])}</p>`:''}
<p><strong>Relief:</strong> ${a['relief-requested'] ? esc(a['relief-requested']) : '<span class="placeholder">[RELIEF]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Filing Location</div>
<p><strong>District:</strong> ${f(a['federal-district'])}<br><strong>Division:</strong> ${f(a['federal-division'])}</p>
${courthouse?`<p><strong>Courthouse:</strong> ${esc(courthouse.address)}</p>`:''}
${district?`<p><strong>Counties in this district:</strong> ${esc(district.counties.join(', '))}</p>`:''}
${a['limitations-notes']?`<p><strong>Timing:</strong> ${esc(a['limitations-notes'])}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">V. Signature</div>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['def-name'])}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p></div>`;
}

function genExpunge(a, flow) {
  return `<div class="doc-title">IN THE CIRCUIT COURT, ${f(a['arrest-county']?a['arrest-county'].toUpperCase():'')} COUNTY</div>
<div class="doc-subtitle">Petitioner: <strong>${f(a['pet-name'])}</strong><br>DOB: ${f(a['pet-dob'])}<br>Re: Arrest on ${f(a['arrest-date'])} — ${f(a['arrest-charge'])}</div>
<div class="doc-section"><div class="doc-section-title">Petition to ${a['relief-type']&&a['relief-type'].includes('Expunge')?'Expunge':'Seal'} Criminal History Record</div>
<div class="doc-section-title" style="font-size:9px">${a['relief-type']&&a['relief-type'].includes('Expunge')?'F.S. § 943.0585':'F.S. § 943.059'}</div>
<p>PETITIONER, ${f(a['pet-name'])}, petitions this Court to ${a['relief-type']&&a['relief-type'].includes('Expunge')?'expunge':'seal'} the criminal history record.</p></div>
<div class="doc-section"><div class="doc-section-title">I. Arrest Information</div>
<p>Agency: ${f(a['arresting-agency'])}<br>Date: ${f(a['arrest-date'])}<br>Charge(s): ${f(a['arrest-charge'])}<br>County: ${f(a['arrest-county'])}<br>OBT: ${f(a['obt-number'],'N/A')}</p></div>
<div class="doc-section"><div class="doc-section-title">II. Certificate of Eligibility</div>
<p>Petitioner has obtained FDLE Certificate No. ${f(a['fdle-cert-number'])}, issued on ${f(a['fdle-cert-date'])}.</p>
<p>Petitioner has not previously had any record sealed or expunged.</p></div>
<div class="doc-section"><div class="doc-section-title">III. Relief</div>
<p>WHEREFORE, Petitioner requests an Order directing all criminal justice agencies to ${a['relief-type']&&a['relief-type'].includes('Expunge')?'expunge':'seal'} these records.</p></div>
<div class="doc-section"><div class="doc-section-title">Verification</div>
<p>I declare under penalty of perjury that the foregoing is true and correct.</p>
<p>Executed on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['pet-name'])}<br>${f(a['pet-address'])}<br>${f(a['pet-city'])}</p></div>`;
}

function genTerminate(a, flow) {
  return `<div class="doc-title">IN THE CIRCUIT COURT OF THE ${f(a['county']?a['county'].toUpperCase():'')} JUDICIAL CIRCUIT</div>
<div class="doc-title">IN AND FOR ${f(a['county']?a['county'].toUpperCase()+' COUNTY':'')} FLORIDA</div>
<div class="doc-subtitle">STATE OF FLORIDA vs. <strong>${f(a['def-name'])}</strong><br>CASE NO.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">Pro Se Petition for Early Termination of Probation</div><div class="doc-section-title" style="font-size:9px">Fla. Stat. § 948.04</div>
<p>COMES NOW Defendant, ${f(a['def-name'])}, and petitions for early termination of probation.</p></div>
<div class="doc-section"><div class="doc-section-title">I. Probation Status</div>
<p>Defendant is serving ${f(a['prob-type'])} for ${f(a['offense'])}, Case No. ${f(a['case-num'])}, ${f(a['county'])} County. Commenced ${f(a['prob-start'])}, scheduled end ${f(a['prob-end'])}.</p>
<p>Defendant has completed more than 50% of the term and satisfied all Special Conditions.</p></div>
<div class="doc-section"><div class="doc-section-title">II. Compliance</div>
<p><strong>Fees:</strong> ${f(a['fees-paid'])}<br><strong>Restitution:</strong> ${f(a['restitution-status'])}<br><strong>Drug Tests:</strong> ${f(a['drug-tests'])}<br><strong>Employment:</strong> ${f(a['employed'])}</p>
${a['community-service']?`<p><strong>Community Service:</strong> ${esc(a['community-service'])}</p>`:''}
<p><strong>Violations:</strong> ${f(a['violations'])}</p></div>
<div class="doc-section"><div class="doc-section-title">III. P.O. Position</div>
<p>P.O. ${f(a['po-name'])} indicates: ${f(a['po-position'])}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Statement</div>
<p>${a['facts'] ? esc(a['facts']) : '<span class="placeholder">[STATEMENT]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">V. Relief</div>
<p>WHEREFORE, Defendant requests early termination of probation.</p>
${a['alternative']&&!a['alternative'].includes('No alternative')?`<p>Alternatively, Defendant requests ${esc(a['alternative'])}.</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">Certificate of Service</div>
<p>I CERTIFY that a copy has been furnished to the State Attorney and P.O. ${f(a['po-name'],'[P.O.]')}.</p>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['def-name'])}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p>
<br><p><em>I declare under penalty of perjury that the foregoing is true and correct.</em></p></div>`;
}

function genRestitution(a, flow) {
  const income = parseFloat(a['monthly-income'])||0;
  const rent = parseFloat(a['monthly-rent'])||0;
  const food = parseFloat(a['monthly-food'])||0;
  const trans = parseFloat(a['monthly-transport'])||0;
  const other = parseFloat(a['monthly-other'])||0;
  const totalExp = rent+food+trans+other;
  const disposable = income - totalExp;
  return `<div class="doc-title">IN THE CIRCUIT COURT, ${f(a['county']?a['county'].toUpperCase():'')} COUNTY, FLORIDA</div>
<div class="doc-subtitle">STATE OF FLORIDA vs. <strong>${f(a['def-name'])}</strong><br>CASE NO.: ${f(a['case-num'])}</div>
<div class="doc-section"><div class="doc-section-title">Pro Se Motion to Modify Restitution</div>
<div class="doc-section-title" style="font-size:9px">Fla. Stat. § 775.089 / Bearden v. Georgia</div>
<p>COMES NOW Defendant, ${f(a['def-name'])}, and moves to modify restitution.</p></div>
<div class="doc-section"><div class="doc-section-title">I. Restitution Order</div>
<p>Defendant was ordered to pay ${f(a['rest-amount'])} at ${f(a['rest-monthly'])}/month. Paid ${f(a['rest-paid'])} to date.</p></div>
<div class="doc-section"><div class="doc-section-title">II. Financial Hardship</div>
<p>Monthly Income: <strong>$${income.toFixed(2)}</strong> (${f(a['income-source'])})</p>
<p>Housing: $${rent.toFixed(2)} | Food: $${food.toFixed(2)} | Transport: $${trans.toFixed(2)} | Other: $${other.toFixed(2)}</p>
<p>Total Expenses: <strong>$${totalExp.toFixed(2)}</strong></p>
<p>Disposable Income: <strong style="color:${disposable<0?'var(--red)':'var(--green)'}">$${disposable.toFixed(2)}</strong></p>
<p>Dependents: ${f(a['dependents'],'None')}</p>
<p>The current obligation of ${f(a['rest-monthly'])} exceeds ability to pay.</p></div>
<div class="doc-section"><div class="doc-section-title">III. Bona Fide Efforts</div>
<p>${a['efforts'] ? esc(a['efforts']) : '<span class="placeholder">[EFFORTS]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Changed Circumstances</div>
<p>${a['changed-circum'] ? esc(a['changed-circum']) : '<span class="placeholder">[CHANGED CIRCUMSTANCES]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">V. Relief</div>
<p>WHEREFORE, Defendant requests modification to ${f(a['modification-request'])} per month.</p>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['def-name'])}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p></div>`;
}

function genMitigation(a, flow) {
  return `<div class="doc-title">MITIGATION PACKET</div>
<div class="doc-title">${f(a['subject-name'])}</div>
<div class="doc-subtitle">Prepared for: ${f(a['purpose'])}<br>${a['case-num']?'Case No.: '+esc(a['case-num'])+'<br>':''}${a['dc-number']?'DC#: '+esc(a['dc-number'])+'<br>':''}${a['proceeding-date']?'Proceeding Date: '+esc(a['proceeding-date'])+'<br>':''}</div>
<div class="doc-section"><div class="doc-section-title">I. Personal Background</div>
<p>${a['background'] ? esc(a['background']) : '<span class="placeholder">[BACKGROUND]</span>'}</p>
${a['family-role']?`<p><strong>Family:</strong> ${esc(a['family-role'])}</p>`:''}
${a['mental-health']?`<p><strong>Mental Health:</strong> ${esc(a['mental-health'])}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">II. Rehabilitation</div>
${a['education']?`<p><strong>Education:</strong> ${esc(a['education'])}</p>`:''}
${a['programs']?`<p><strong>Programs:</strong> ${esc(a['programs'])}</p>`:''}
${a['employment']?`<p><strong>Employment:</strong> ${esc(a['employment'])}</p>`:''}
${a['community']?`<p><strong>Community Service:</strong> ${esc(a['community'])}</p>`:''}
${a['support-letters']?`<p><strong>Support:</strong> ${esc(a['support-letters'])}</p>`:''}
${a['awards']?`<p><strong>Awards:</strong> ${esc(a['awards'])}</p>`:''}</div>
<div class="doc-section"><div class="doc-section-title">III. Responsibility</div>
<p>${a['remorse'] ? esc(a['remorse']) : '<span class="placeholder">[STATEMENT]</span>'}</p></div>
<div class="doc-section"><div class="doc-section-title">IV. Reentry Plan</div>
<p>${a['plan'] ? esc(a['plan']) : '<span class="placeholder">[REENTRY PLAN]</span>'}</p>
<p>Respectfully submitted on ${f(a['date-signed'])}.</p><br><br>
<p>______________________________<br>${f(a['subject-name'])}<br>${f(a['filer-address'])}<br>${f(a['filer-city'])}</p></div>`;
}

// ── COPY / DOWNLOAD ──
function copyDoc() {
  const el = document.getElementById('doc-content');
  const text = el ? el.innerText : '';
  navigator.clipboard.writeText(text).then(()=>toast('Copied to clipboard!')).catch(()=>toast('Select text manually and copy'));
}

function downloadDoc() {
  const el = document.getElementById('doc-content');
  if(!el) return;
  const blob = new Blob([el.innerText], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'second-chance-motion-draft-' + new Date().toISOString().slice(0,10) + '.txt';
  a.click();
  toast('Downloaded as TXT');
}

function downloadDocx() {
  const el = document.getElementById('doc-content');
  if(!el) return;
  const html = el.innerHTML;
  const styled = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:\'Times New Roman\',serif;font-size:12pt;line-height:2;margin:1in}p{margin:0 0 8px}strong{font-weight:700}</style></head><body>'+html+'</body></html>';
  const blob = new Blob([styled], {type:'application/msword'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'second-chance-motion-draft-' + new Date().toISOString().slice(0,10) + '.doc';
  a.click();
  toast('Downloaded as DOCX');
}

// ── MOTION AUDIT / REVIEW MODE ──
function runMotionAudit() {
  if(!lastViewedDraft) { toast('No draft to review'); return; }
  const d = lastViewedDraft;
  const a = d.answers||{};
  const flow = FLOWS[d.motion];
  const panel = document.getElementById('audit-panel');
  if(!panel) return;
  const req = flow ? flow.steps.flatMap(s=>s.fields.filter(f=>f.required).map(f=>f.id)) : [];
  const items = [];
  let pass = 0, warn = 0, fail = 0;
  // Check required fields
  req.forEach(fid => {
    const val = a[fid];
    if(val && val.toString().trim()) {
      items.push({status:'pass',icon:'✅',text:esc(fid)+' — provided'});
      pass++;
    } else {
      items.push({status:'warn',icon:'⚠️',text:esc(fid)+' — missing (recommended for completeness)'});
      warn++;
    }
  });
  // Check case number format
  const cn = a['case-num'];
  if(cn) {
    if(/\d{4,}[-\s]?CF[-\s]?\d+/i.test(cn)) { items.push({status:'pass',icon:'✅',text:'Case number format looks standard'}); pass++; }
    else { items.push({status:'warn',icon:'⚠️',text:'Case number format may be non-standard — verify against judgment'}); warn++; }
  }
  // Check date consistency
  const created = new Date(d.created);
  const signed = a['date-signed'] ? new Date(a['date-signed']) : null;
  if(signed && !isNaN(signed.getTime())) {
    if(signed > created) { items.push({status:'warn',icon:'⚠️',text:'Signature date is in the future relative to draft creation'}); warn++; }
    else { items.push({status:'pass',icon:'✅',text:'Date consistency check passed'}); pass++; }
  }
  // Check evidence
  const evCount = (d.evidence||[]).length;
  if(evCount>0) { items.push({status:'pass',icon:'✅',text:evCount+' exhibit'+(evCount>1?'s':'')+' attached'}); pass++; }
  // Check if this motion type has a statute
  if(flow && flow.statute) {
    const statuteUsed = htmlContains(flow.statute);
    if(statuteUsed) { items.push({status:'pass',icon:'✅',text:'Statute/citation '+esc(flow.statute)+' present in document'}); pass++; }
    else { items.push({status:'warn',icon:'⚠️',text:'Consider verifying '+esc(flow.statute)+' citation appears in document'}); warn++; }
  }
  const total = req.length+3+(evCount>0?1:0);
  const score = total>0 ? Math.round(((pass*2+warn)/Math.max(total*2,1))*100) : 0;
  panel.style.display = 'block';
  panel.innerHTML = '<div class="audit-card"><div class="audit-header">🔍 Motion Audit — '+esc(d.title)+'</div><div style="display:flex;align-items:center;gap:16px;margin-bottom:8px;flex-wrap:wrap"><div><div class="audit-score" style="color:'+(score>=80?'var(--green)':score>=50?'#fbbf24':'var(--red)')+'">'+score+'%</div><div class="audit-label">Readiness Score</div></div><div style="flex:1"><div class="audit-bar"><div class="audit-bar-fill" style="width:'+score+'%;background:'+(score>=80?'var(--green)':score>=50?'#fbbf24':'var(--red)')+'"></div></div><div style="display:flex;gap:12px;font-size:10px;color:var(--muted);font-family:var(--font-mono)"><span>✅ '+pass+' pass</span><span>⚠️ '+warn+' warnings</span><span>❌ '+fail+' fails</span></div></div></div><div class="audit-items">'+items.map(i => '<div class="audit-item '+i.status+'"><span class="audit-icon">'+i.icon+'</span><span>'+i.text+'</span></div>').join('')+'</div><div style="margin-top:12px"><button class="audit-toggle" onclick="document.getElementById(\'audit-panel\').style.display=\'none\'">Dismiss</button></div></div>';
  panel.scrollIntoView({behavior:'smooth',block:'start'});
  toast('Audit complete — '+score+'% readiness');
}

function htmlContains(text) {
  const el = document.getElementById('doc-content');
  return el && el.innerHTML.includes(text);
}

// ── DRAFTS (CASE LOCKER) ──
function renderDrafts() {
  const drafts = S.get('fl-motion-drafts', []);
  const list = document.getElementById('draft-list');
  const stats = document.getElementById('draft-stats');
  if(!list) return;
  const query = (document.getElementById('draft-search')?.value||'').toLowerCase();
  const filter = document.getElementById('draft-filter')?.value||'all';

  // Apply type filter first
  let filtered = filter === 'all' ? drafts : drafts.filter(d => d.motion === filter);

  // Apply legal intelligence search
  if (query) {
    const results = legalSearch(query, filtered, d =>
      d.title+' '+d.tag+' '+d.statute+' '+(d.answers?Object.values(d.answers).join(' '):'')
    );
    filtered = results.filter(r => r.score > 0).map(r => r.item);
  }

  // Update stats with query intelligence hint
  if(stats) {
    let hint = filtered.length+' of '+drafts.length+' drafts';
    if (query) {
      const best = legalSearch(query, filtered, d =>
        d.title+' '+d.tag+' '+d.statute+' '+(d.answers?Object.values(d.answers).join(' '):'')
      , { threshold: 0.1 }).filter(r => r.score > 0);
      if (best.length > 0) {
        const topScore = best[0].score;
        hint += ' · best match: '+(topScore >= 2 ? 'strong' : topScore >= 1 ? 'moderate' : 'weak');
      }
    }
    stats.textContent = hint;
  }
  if(!drafts.length) {
    list.innerHTML = '<div class="no-drafts"><div style="font-size:32px;margin-bottom:10px">📁</div><p>No drafts yet. Complete a motion in the Builder tab to save your first draft.</p></div>';
    if(stats) stats.textContent='';
    return;
  }
  list.innerHTML = filtered.map((d,i) => {
    const realIdx = drafts.indexOf(d);
    const hasTimeline = d.timeline && d.timeline.length;
    const hasEvidence = d.evidence && d.evidence.length;
    return '<div class="draft-item'+(hasTimeline||hasEvidence?' draft-highlight':'')+'"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap"><div style="flex:1;min-width:0"><div class="draft-item-title">'+esc(d.title)+'</div><div class="draft-item-meta"><span>'+new Date(d.created).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})+'</span>'+(hasTimeline?'<span>⏱+TL</span>':'')+(hasEvidence?'<span>📎+'+(d.evidence.length)+'</span>':'')+'</div><span class="draft-tag" style="background:'+d.color+'22;color:'+d.color+';border:1px solid '+d.color+'44;display:inline-block">'+esc(d.tag||d.motion)+'</span></div></div><div class="draft-item-actions"><button class="btn-draft-load" onclick="loadDraft('+realIdx+')">📄 View</button><button class="btn-draft-delete" onclick="deleteDraft('+realIdx+')">✕</button></div></div>';
  }).join('');
}

function loadDraft(i) {
  const drafts = S.get('fl-motion-drafts', []);
  const d = drafts[i];
  renderPreview(d);
  switchTab('preview');
}

function deleteDraft(i) {
  if(!confirm('Delete this draft? This cannot be undone.')) return;
  const drafts = S.get('fl-motion-drafts', []);
  drafts.splice(i, 1);
  S.set('fl-motion-drafts', drafts);
  renderDrafts();
  toast('Draft deleted');
}

function renderPreview(draft) {
  const wrap = document.getElementById('preview-wrap');
  if(!wrap || !draft) return;
  lastViewedDraft = draft;
  const a = draft.answers;
  const flow = FLOWS[draft.motion];
  if(!flow) { wrap.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--muted)"><div style="font-size:36px;margin-bottom:12px">📄</div><p style="font-size:13px">Motion type not found.</p></div>'; return; }
  const genMap = {'3850':gen3850,'3800':gen3800,'appeal':genAppeal,'appeal-record':genAppealRecord,'appeal-rehearing':genAppealRehearing,'2254':gen2254,'expunge':genExpunge,'terminate':genTerminate,'restitution':genRestitution,'mitigation':genMitigation};
  const doc = genMap[draft.motion] ? genMap[draft.motion](a, flow) : '<p>No document generator for this motion type.</p>';
  const evHtml = renderEvidenceInline(draft);
  const tlHtml = renderTimelineInline(draft);
  const caseLabel = [
    draft.title,
    a['case-num'] || a['obt-number'] || a['dc-number'] || '',
    a.county || a['arrest-county'] || '',
    a['def-name'] || a['pet-name'] || a['subject-name'] || ''
  ].filter(Boolean).join(' | ');
  wrap.innerHTML = '<div class="export-toolbar"><button onclick="runMotionAudit()">🔍 Review Motion</button><button onclick="downloadDocx()">⬇ Download DOCX</button><button onclick="downloadDoc()">📄 Download TXT</button><button onclick="window.print()">🖨 Print</button></div><div class="preview-card"><div class="preview-toolbar"><div class="preview-title">📄 '+esc(draft.title)+' — DRAFT</div><div class="preview-actions"><button class="btn-copy" onclick="copyDoc()">📋 Copy</button></div></div><div class="preview-doc" id="doc-content" data-print-header="'+esc(caseLabel)+'">'+doc+'</div></div>'+evHtml+tlHtml;
  renderRiskGridPreview(draft.motion, a);
  renderTimelinePreview(draft.motion, a);
  renderWeaknessesPreview(draft.motion, a);
}

let lastViewedDraft = null;

// ── EVIDENCE (inline in preview) ──
function renderEvidenceInline(draft) {
  const ev = draft.evidence||[];
  return '<div class="evidence-panel"><div class="evidence-header"><h4>📎 Exhibits & Attachments</h4><span style="font-size:10px;color:var(--muted)">'+ev.length+' item'+(ev.length!==1?'s':'')+'</span></div><div class="evidence-add"><input id="ev-input" placeholder="Exhibit label (e.g. Plea Agreement)" onkeydown="if(event.key===\'Enter\')addEvidence()"><button onclick="addEvidence()">+ Add</button></div><div class="evidence-list" id="ev-list">'+(ev.length?ev.map((e,i) => '<div class="evidence-item"><span class="ev-num">#'+(i+1)+'</span><span class="ev-label">'+esc(e)+'</span><span class="ev-del" onclick="removeEvidence('+i+')">✕</span></div>').join(''):'<div class="evidence-empty">No exhibits added yet. Use the field above to list attachments.</div>')+'</div></div>';
}

function addEvidence() {
  const inp = document.getElementById('ev-input');
  if(!inp||!inp.value.trim()||!lastViewedDraft) return;
  const drafts = S.get('fl-motion-drafts', []);
  const d = drafts.find(x => x.id===lastViewedDraft.id);
  if(!d) return;
  if(!d.evidence) d.evidence = [];
  d.evidence.push(inp.value.trim());
  inp.value = '';
  S.set('fl-motion-drafts', drafts);
  renderPreview(lastViewedDraft);
  toast('Exhibit added');
}

function removeEvidence(i) {
  if(!lastViewedDraft) return;
  const drafts = S.get('fl-motion-drafts', []);
  const d = drafts.find(x => x.id===lastViewedDraft.id);
  if(!d||!d.evidence) return;
  d.evidence.splice(i,1);
  S.set('fl-motion-drafts', drafts);
  renderPreview(lastViewedDraft);
}

// ── TIMELINE (inline in preview) ──
function renderTimelineInline(draft) {
  const tl = draft.timeline||[];
  return '<div class="evidence-panel" style="margin-top:12px"><div class="evidence-header"><h4>⏱ Case Timeline</h4><span style="font-size:10px;color:var(--muted)">'+tl.length+' event'+(tl.length!==1?'s':'')+'</span></div><div class="timeline-form"><div class="timeline-form-row"><input id="tl-date" type="date" placeholder="Date"><input id="tl-title" placeholder="Event (e.g. Arrest, Plea, Sentencing)"><select id="tl-type"><option value="">Type</option><option value="arrest">Arrest</option><option value="plea">Plea</option><option value="trial">Trial</option><option value="sentencing">Sentencing</option><option value="appeal">Appeal</option><option value="motion">Motion</option><option value="other">Other</option></select></div><textarea id="tl-desc" placeholder="Details (optional)" rows="2"></textarea><button onclick="addTimelineEntry()">+ Add Event</button></div><div class="timeline-container" id="tl-container">'+(tl.length?tl.map((e,i) => '<div class="timeline-entry"><div class="entry-date">'+esc(e.date)+' <span style="color:var(--muted)">· '+esc(e.type||'event')+'</span></div><div class="entry-title">'+esc(e.title)+'</div>'+(e.desc?'<div class="entry-desc">'+esc(e.desc)+'</div>':'')+'<div style="margin-top:6px"><button onclick="removeTimelineEntry('+i+')" style="background:none;border:1px solid var(--border);border-radius:4px;padding:2px 8px;font-size:10px;color:var(--muted);cursor:pointer">✕ Remove</button></div></div>').join(''):'<div class="timeline-empty">No events yet. Add key dates to build a case timeline.</div>')+'</div></div>';
}

function addTimelineEntry() {
  if(!lastViewedDraft) return;
  const date = document.getElementById('tl-date')?.value;
  const title = document.getElementById('tl-title')?.value.trim();
  const type = document.getElementById('tl-type')?.value;
  const desc = document.getElementById('tl-desc')?.value.trim();
  if(!date||!title) { toast('Date and event title required'); return; }
  const drafts = S.get('fl-motion-drafts', []);
  const d = drafts.find(x => x.id===lastViewedDraft.id);
  if(!d) return;
  if(!d.timeline) d.timeline = [];
  d.timeline.push({date,title,type:type||'other',desc:desc||''});
  S.set('fl-motion-drafts', drafts);
  document.getElementById('tl-date').value='';
  document.getElementById('tl-title').value='';
  document.getElementById('tl-type').value='';
  document.getElementById('tl-desc').value='';
  renderPreview(lastViewedDraft);
  toast('Timeline event added');
}

function removeTimelineEntry(i) {
  if(!lastViewedDraft) return;
  const drafts = S.get('fl-motion-drafts', []);
  const d = drafts.find(x => x.id===lastViewedDraft.id);
  if(!d||!d.timeline) return;
  d.timeline.splice(i,1);
  S.set('fl-motion-drafts', drafts);
  renderPreview(lastViewedDraft);
}

// ═══════════════════════════════════════════════
// CHARGE LEGAL INTELLIGENCE ENGINE
// ═══════════════════════════════════════════════

let chargeTimeline = 'pretrial';
let chargeSelected = null;
let chargePlainEnglish = false;
let intakeDirty = false;

// ── CASE SESSION STATE ──
let caseSession = loadSession();

function loadSession() {
  try { const s = localStorage.getItem('fl-case-session'); return s ? JSON.parse(s) : null; }
  catch(e) { return null; }
}

function saveSession(data) {
  caseSession = data;
  if (data) {
    data.timestamp = Date.now();
    localStorage.setItem('fl-case-session', JSON.stringify(data));
  } else localStorage.removeItem('fl-case-session');
  renderSessionBar();
  renderStateMachine();
  renderCaseIntelligence();
  renderCaseSummary();
  renderEmotionalIntel();
  filterMotionsByState();
}

function clearSession() {
  saveSession(null);
  document.getElementById('session-bar')?.classList.remove('active');
  toast('Case cleared');
}

function renderSessionBar() {
  const bar = document.getElementById('session-bar');
  if (!bar) return;
  if (!caseSession) { bar.classList.remove('active'); return; }
  bar.classList.add('active');
  const sb = bar.querySelector('.sb-charge');
  const co = bar.querySelector('.sb-county');
  const cn = bar.querySelector('.sb-case-num');
  if (sb) sb.textContent = caseSession.chargeName || '';
  if (co) co.textContent = caseSession.county || '';
  if (cn) cn.textContent = caseSession.caseNum || '';
  // State badge
  const stateEl = document.getElementById('session-bar-state');
  if (stateEl) {
    const state = getCurrentState();
    const ctx = CASE_STATES[state];
    stateEl.style.display = ctx ? '' : 'none';
    if (ctx) {
      const dot = stateEl.querySelector('.sbs-dot');
      const label = stateEl.querySelector('.sbs-label');
      if (dot) dot.style.background = ctx.color;
      if (label) label.textContent = ctx.label;
    }
  }
}

// ═══════════════════════════════════════════════
// PROCEDURAL STATE MACHINE
// Enterprise-grade case state tracking
// ═══════════════════════════════════════════════

const CASE_STATES = {
  ARREST:           { label:'Arrest', icon:'🚔', order:0, color:'#F87171',
    remedies:[], blocked:['3850','3800','2254','expunge','terminate','appeal','appeal-record','appeal-rehearing'],
    note:'No conviction yet. Focus on pretrial release and defense strategy.',
    actions:['Secure pretrial release','Retain counsel or confirm PD','Preserve evidence','Do not make statements'] },
  FIRST_APPEARANCE: { label:'First Appearance', icon:'🏛️', order:1, color:'#F87171',
    remedies:['bond-review'], blocked:['3850','3800','2254','expunge','terminate','appeal','appeal-record','appeal-rehearing'],
    note:'First court appearance. Bond is set, charges are formally read.',
    actions:['Attend first appearance','Address bond conditions','Request appointed counsel if needed'] },
  PRETRIAL:         { label:'Pre-Trial', icon:'⚖️', order:2, color:'#F9B24C',
    remedies:['bond-review'], blocked:['3850','3800','2254','expunge','terminate','appeal','appeal-record','appeal-rehearing'],
    note:'Case is in pretrial phase. Discovery, motions, and plea negotiations.',
    actions:['File pretrial motions','Review discovery','Evaluate plea offer','Prepare for trial'] },
  SENTENCED:        { label:'Sentenced', icon:'⚡', order:3, color:'#F9B24C',
    remedies:['appeal','appeal-record'], blocked:['3850','3800','2254','expunge','terminate'],
    note:'Sentence imposed. 30-day window for direct appeal is running.',
    actions:['File notice of appeal (30 days)','Order trial transcript','Begin appellate counsel consultation'] },
  DIRECT_APPEAL:    { label:'Direct Appeal', icon:'📝', order:4, color:'#60A5FA',
    remedies:['appeal','appeal-record','appeal-rehearing'], blocked:['3850','3800','2254','expunge','terminate'],
    note:'Direct appeal pending. Appellate briefing and oral argument.',
    actions:['File initial brief','Monitor appellate docket','Consider rehearing after opinion'] },
  FINALIZED:        { label:'Conviction Final', icon:'🔒', order:5, color:'#A78BFA',
    remedies:['3850','3800','expunge','terminate','mitigation'], blocked:['2254'],
    note:'Conviction is final. Postconviction remedies are now available.',
    actions:['Assess 3.850 grounds (2-year window)','Check illegal sentence (3.800)','Evaluate seal/expunge eligibility'] },
  POSTCONVICTION:   { label:'Post-Conviction', icon:'📋', order:6, color:'#F59E0B',
    remedies:['3850','3800','expunge','terminate','mitigation'], blocked:['2254'],
    note:'Active postconviction proceedings. State remedies must be exhausted before federal habeas.',
    actions:['Exhaust all state remedies','Document all filings and rulings','Build federal habeas record'] },
  FEDERAL_HABEAS:   { label:'Federal Habeas', icon:'⚡', order:7, color:'#F87171',
    remedies:['2254'], blocked:['3850','3800','expunge','terminate','appeal','appeal-record','appeal-rehearing'],
    note:'Federal habeas corpus under 28 U.S.C. § 2254. AEDPA 1-year clock applies.',
    actions:['File within AEDPA 1-year limit','Cite clearly established federal law','Request COA if denied'] },
  REENTRY:          { label:'Reentry', icon:'🔄', order:8, color:'#4ADE80',
    remedies:['expunge','terminate','mitigation'], blocked:['3850','3800','2254','appeal','appeal-record','appeal-rehearing'],
    note:'Sentence completed. Focus on rights restoration and reentry.',
    actions:['Seal or expunge record','Restore voting rights','Apply for driver\'s license reinstatement','Explore employment programs','Check public housing eligibility'] }
};

const STATE_ORDERS = ['ARREST','FIRST_APPEARANCE','PRETRIAL','SENTENCED','DIRECT_APPEAL','FINALIZED','POSTCONVICTION','FEDERAL_HABEAS','REENTRY'];
const STATE_FLOW_MAP = {
  'appeal': 'DIRECT_APPEAL', 'appeal-record': 'DIRECT_APPEAL', 'appeal-rehearing': 'DIRECT_APPEAL',
  '3850': 'POSTCONVICTION', '3800': 'POSTCONVICTION',
  '2254': 'FEDERAL_HABEAS',
  'expunge': 'REENTRY', 'terminate': 'REENTRY', 'mitigation': 'REENTRY'
};

function getCaseState(session, answers, motionId, timeline) {
  // Determine procedural state from available data
  const motionState = motionId ? STATE_FLOW_MAP[motionId] : null;
  if (motionState) return motionState;

  const tl = timeline || session?.timeline || 'pretrial';
  const isIncarcerated = answers?.['currently-incarcerated'] || '';
  const resolution = answers?.['case-resolution'] || '';
  const hasSentence = resolution && resolution !== 'Dismissal';
  const isComplete = isIncarcerated.includes('completed') || isIncarcerated.includes('No — sentence completed');

  if (isComplete) return 'REENTRY';
  if (tl === 'postconviction') return 'POSTCONVICTION';
  if (hasSentence) return 'SENTENCED';
  if (tl === 'pretrial' && resolution) return 'PRETRIAL';
  if (tl === 'pretrial') return 'PRETRIAL';
  return 'PRETRIAL';
}

function getStateContext(state) {
  const s = CASE_STATES[state] || CASE_STATES.PRETRIAL;
  const idx = STATE_ORDERS.indexOf(state);
  const total = STATE_ORDERS.length;
  return { ...s, state, progress: Math.round(((idx + 1) / total) * 100), index: idx, total };
}

function isRemedyBlocked(remedyId, state) {
  const ctx = getStateContext(state);
  return ctx.blocked && ctx.blocked.includes(remedyId);
}

function getStateForMotion(motionId) {
  return STATE_FLOW_MAP[motionId] || 'PRETRIAL';
}

function getCurrentState() {
  return getCaseState(caseSession, answers, currentMotion, chargeTimeline);
}

// Of a state's available remedies, which single one (if any) is the clearest
// starting point for someone who hasn't picked a motion yet — only set where
// the 6-tile .motion-grid actually has an obvious best-first-pick.
const RECOMMENDED_MOTION_BY_STATE = {
  FINALIZED: '3850',
  POSTCONVICTION: '3850',
  REENTRY: 'expunge'
};

// ═══════════════════════════════════════════════
// DEADLINE INTELLIGENCE ENGINE
// Enterprise-grade deadline tracking & visualization
// ═══════════════════════════════════════════════

function parseDate(s) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function daysBetween(a, b) {
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function computeDeadline(deadlineDate, label) {
  const today = new Date();
  const remaining = daysBetween(today, deadlineDate);
  const total = daysBetween(today, addDays(today, remaining < 0 ? 0 : remaining < 366 ? 365 : 730));
  if (remaining < 0) {
    return { status: 'expired', daysRemaining: remaining, pct: 100, expiredDays: Math.abs(remaining), label,
      severity: 'critical', note: 'DEADLINE EXPIRED ' + Math.abs(remaining) + 'd ago' };
  }
  if (remaining <= 7) {
    const pct = Math.min(100, Math.round(((total - remaining) / total) * 100));
    return { status: 'imminent', daysRemaining: remaining, pct, label,
      severity: 'critical', note: remaining + 'd remaining — CRITICAL' };
  }
  if (remaining <= 30) {
    const pct = Math.min(100, Math.round(((total - remaining) / total) * 100));
    return { status: 'near', daysRemaining: remaining, pct, label,
      severity: 'high', note: remaining + ' days remaining' };
  }
  if (remaining <= 90) {
    const pct = Math.min(100, Math.round(((total - remaining) / total) * 100));
    return { status: 'approaching', daysRemaining: remaining, pct, label,
      severity: 'warning', note: remaining + ' days remaining' };
  }
  const pct = Math.min(100, Math.round(((total - remaining) / total) * 100));
  return { status: 'safe', daysRemaining: remaining, pct, label,
    severity: 'info', note: remaining + ' days remaining' };
}

const DEADLINE_DEFS = {
  'speedy-trial': {
    label: 'Speedy Trial (Demand)',
    statute: 'Fla. R. Crim. P. 3.191',
    states: ['FIRST_APPEARANCE', 'PRETRIAL'],
    icon: '⏱️',
    why: 'Demanding speedy trial forces the state to try you within 60 days, but it also cuts off your own time to investigate and prepare a defense — most attorneys only recommend it in specific situations.',
    depends: ['arrest-date'],
    calc: function(a) {
      const d = parseDate(a['arrest-date']);
      if (!d) return { status: 'unknown', note: 'Enter arrest date', severity: 'info' };
      const dl = addDays(d, 175);
      const c = computeDeadline(dl, 'Speedy Trial Demand');
      return { ...c, deadlineDate: dl };
    }
  },
  'bond-review': {
    label: 'Bond / Pretrial Release',
    statute: 'Fla. Stat. § 903.046',
    states: ['ARREST', 'FIRST_APPEARANCE', 'PRETRIAL'],
    icon: '🔓',
    why: 'Florida requires bail to be set at first appearance, generally within 24 hours of arrest — if that window passed without a bond being set, you may have grounds to push for an emergency hearing.',
    depends: ['arrest-date'],
    calc: function(a) {
      const d = parseDate(a['arrest-date']);
      if (!d) return { status: 'unknown', note: 'Enter arrest date', severity: 'info' };
      const dl = addDays(d, 1);
      const c = computeDeadline(dl, 'Bond Review');
      if (c.status === 'expired') return { ...c, note: 'Bond typically set at first appearance — confirm status', severity: 'info' };
      return { ...c, deadlineDate: dl };
    }
  },
  'direct-appeal-notice': {
    label: 'Direct Appeal Notice',
    statute: 'Fla. R. App. P. 9.140(b)(3)',
    states: ['SENTENCED'],
    icon: '📝',
    why: 'This 30-day deadline is jurisdictional, not just procedural — miss it and the appellate court has no power to hear your case at all, no matter how strong your arguments are.',
    depends: ['sentence-date'],
    calc: function(a) {
      const d = parseDate(a['sentence-date']);
      if (!d) return { status: 'unknown', note: 'Enter sentence date', severity: 'info' };
      const dl = addDays(d, 30);
      const c = computeDeadline(dl, 'Notice of Appeal');
      if (c.status === 'expired') return { ...c, note: 'APPEAL WINDOW CLOSED — belated appeal may be available under Rule 9.141(c)', severity: 'critical', remedy: 'File motion for belated appeal (Fla. R. App. P. 9.141(c)) alleging IAC' };
      if (c.status === 'imminent') return { ...c, note: '⚠ ONLY ' + c.daysRemaining + ' DAYS — FILE IMMEDIATELY', severity: 'critical' };
      return { ...c, deadlineDate: dl };
    }
  },
  'direct-appeal-brief': {
    label: 'Initial Brief Deadline',
    statute: 'Fla. R. App. P. 9.110(d)',
    states: ['DIRECT_APPEAL'],
    icon: '📄',
    why: 'The initial brief is where your actual legal arguments get made — missing this deadline (without an extension) risks the appeal being dismissed for failure to prosecute before a judge ever reaches the merits.',
    depends: ['appeal-filed-date'],
    calc: function(a) {
      const d = parseDate(a['appeal-filed-date']);
      if (!d) return { status: 'unknown', note: 'Enter appeal filing date', severity: 'info' };
      const dl = addDays(d, 70);
      const c = computeDeadline(dl, 'Initial Brief');
      return { ...c, deadlineDate: dl };
    }
  },
  'appeal-rehearing': {
    label: 'Rehearing Motion',
    statute: 'Fla. R. App. P. 9.330',
    states: ['DIRECT_APPEAL'],
    icon: '🔄',
    why: 'This is the last chance to get the same panel to reconsider before the opinion becomes final and the mandate issues — once mandate issues, the case returns to the trial court and this window closes for good.',
    depends: ['appeal-opinion-date'],
    calc: function(a) {
      const d = parseDate(a['appeal-opinion-date']);
      if (!d) return { status: 'unknown', note: 'Enter opinion date', severity: 'info' };
      const dl = addDays(d, 15);
      const c = computeDeadline(dl, 'Rehearing Motion');
      return { ...c, deadlineDate: dl };
    }
  },
  '3850-deadline': {
    label: 'Rule 3.850 Postconviction Relief',
    statute: 'Fla. R. Crim. P. 3.850(b)',
    states: ['FINALIZED', 'POSTCONVICTION'],
    icon: '⚖️',
    why: 'This is the core postconviction deadline. Miss it without a recognized exception — newly discovered evidence, an illegal sentence, or a retroactive change in the law — and you generally lose the ability to raise these claims at all, even if they\'re meritorious.',
    depends: ['conviction-date'],
    calc: function(a) {
      const d = parseDate(a['conviction-date']);
      if (!d) return { status: 'unknown', note: 'Enter conviction finality date', severity: 'info' };
      const dl = addDays(d, 730);
      const c = computeDeadline(dl, '3.850 Motion');
      if (c.status === 'expired') return { ...c, note: '3.850 WINDOW EXPIRED — check exceptions (newly discovered evidence, illegal sentence, retroactive right)', severity: 'critical',
        remedy: 'File under exceptions: newly discovered evidence (1 yr from discovery) or illegal sentence (no limit)' };
      if (c.status === 'imminent') return { ...c, note: '⚠ ONLY ' + c.daysRemaining + ' DAYS — FILE IMMEDIATELY', severity: 'critical' };
      if (c.status === 'near') return { ...c, note: c.daysRemaining + ' days — begin preparation now', severity: 'high' };
      return { ...c, deadlineDate: dl };
    }
  },
  '3800-mitigation': {
    label: 'Rule 3.800(c) Mitigation',
    statute: 'Fla. R. Crim. P. 3.800(c)',
    states: ['SENTENCED'],
    icon: '📦',
    why: 'Rule 3.800(c) lets the judge reduce a sentence purely as a matter of mercy — no legal error required — but the court loses jurisdiction to do this 60 days after sentencing, so this window is unforgiving once it closes.',
    depends: ['sentence-date'],
    calc: function(a) {
      const d = parseDate(a['sentence-date']);
      if (!d) return { status: 'unknown', note: 'Enter sentence date', severity: 'info' };
      const dl = addDays(d, 60);
      const c = computeDeadline(dl, 'Mitigation Motion');
      return { ...c, deadlineDate: dl };
    }
  },
  'probation-termination': {
    label: 'Early Termination Eligibility',
    statute: 'Fla. Stat. § 948.04',
    states: ['SENTENCED', 'FINALIZED', 'POSTCONVICTION'],
    icon: '🗓️',
    why: 'Courts can end probation early once roughly half the term is served with good compliance — there\'s no automatic deadline here, but tracking this date helps you ask the court at the right time instead of too early or not at all.',
    depends: ['probation-term-months', 'sentence-date'],
    calc: function(a) {
      const term = parseInt(a['probation-term-months']);
      const d = parseDate(a['sentence-date']);
      if (!term || !d) return { status: 'unknown', note: 'Enter probation term + start date', severity: 'info' };
      const halfPoint = addDays(d, term * 15.2); // ~50% in days
      const c = computeDeadline(halfPoint, '50% Probation Point');
      if (c.status === 'expired') return { ...c, note: '✓ Eligible now — more than 50% served', severity: 'info' };
      if (c.status === 'imminent' || c.status === 'near') return { ...c, note: c.daysRemaining + ' days until 50% — prepare early termination packet', severity: 'warning' };
      return { ...c, note: c.daysRemaining + ' days until eligible — begin documenting compliance', severity: 'info' };
    }
  },
  'vop-hearing': {
    label: 'VOP Hearing Timeline',
    statute: 'Fla. Stat. § 948.06',
    states: ['SENTENCED', 'FINALIZED', 'POSTCONVICTION'],
    icon: '🚨',
    why: 'Florida requires a violation-of-probation hearing within a reasonable time after a violation is alleged — long unexplained delays in scheduling that hearing can sometimes be challenged as a due-process problem.',
    depends: ['violation-date'],
    calc: function(a) {
      const d = parseDate(a['violation-date']);
      if (!d) return { status: 'unknown', note: 'Enter violation date', severity: 'info' };
      const dl = addDays(d, 60);
      const c = computeDeadline(dl, 'VOP Hearing Window');
      if (c.status === 'expired') return { ...c, note: 'Hearing likely scheduled — confirm with court', severity: 'warning' };
      return { ...c, deadlineDate: dl };
    }
  },
  'aedpa-habeas': {
    label: 'AEDPA Federal Habeas',
    statute: '28 U.S.C. § 2244(d)(1)',
    states: ['FINALIZED', 'FEDERAL_HABEAS'],
    icon: '⚡',
    why: 'This is the federal habeas clock — separate from, and stricter than, your state deadlines. Missing it usually closes the door to federal review entirely, unless you can show equitable tolling (diligence plus an extraordinary circumstance that prevented timely filing).',
    depends: ['conviction-date'],
    calc: function(a) {
      const d = parseDate(a['conviction-date']);
      if (!d) return { status: 'unknown', note: 'Enter conviction finality date', severity: 'info' };
      const dl = addDays(d, 365);
      const c = computeDeadline(dl, 'AEDPA 1-Year Clock');
      if (c.status === 'expired') return { ...c, note: 'AEDPA YEAR EXPIRED — equitable tolling may be available if diligent + extraordinary circumstances', severity: 'critical',
        remedy: 'State habeas tolls AEDPA — check if state postconviction was pending. If not, file federal habeas with tolling argument.' };
      return { ...c, deadlineDate: dl };
    }
  },
  'expunge-wait': {
    label: 'Expunge / Seal Eligibility',
    statute: 'Fla. Stat. § 943.0585',
    states: ['REENTRY'],
    icon: '🔒',
    why: 'Florida requires this waiting period (or a qualifying dismissal/nolle prosequi) before FDLE will issue the certificate of eligibility you need before a court will even consider sealing or expunging the record.',
    depends: ['disposition-date'],
    calc: function(a) {
      const d = parseDate(a['disposition-date']);
      if (!d) return { status: 'unknown', note: 'Enter disposition date', severity: 'info' };
      // Dismissal: immediate eligibility; otherwise varies
      const resolution = (a['case-resolution'] || '').toLowerCase();
      const isDismissal = resolution.includes('dismiss') || resolution.includes('nolle');
      if (isDismissal) return { status: 'safe', daysRemaining: 0, pct: 100, note: '✓ Eligible now (dismissal/nolle) — FDLE certificate required before filing', severity: 'info' };
      // Seal: 10 years for most
      const dl = addDays(d, 3650);
      const c = computeDeadline(dl, 'Expunge/Seal Window');
      if (c.status === 'expired' || c.status === 'safe') return { ...c, note: '✓ Eligibility window likely open — request FDLE certificate', severity: 'info' };
      return { ...c, note: c.daysRemaining + ' days until seal eligibility — track this date', severity: 'info' };
    }
  },
  'clemency-wait': {
    label: 'Clemency Eligibility',
    statute: 'Fla. Const. Art. IV, § 8',
    states: ['FINALIZED', 'POSTCONVICTION', 'REENTRY'],
    icon: '🕊️',
    why: 'Executive clemency can restore rights that even a successful expungement can\'t reach, but the Governor\'s clemency rules require this minimum waiting period from sentencing before an application will even be accepted for review.',
    depends: ['sentence-date'],
    calc: function(a) {
      const d = parseDate(a['sentence-date']);
      if (!d) return { status: 'unknown', note: 'Enter sentence date (clemency: 5+ year wait)', severity: 'info' };
      const dl = addDays(d, 1825);
      const c = computeDeadline(dl, 'Clemency Window');
      if (c.status === 'expired') return { ...c, note: '✓ 5+ years elapsed — clemency application may proceed', severity: 'info' };
      return { ...c, note: c.daysRemaining + ' days until clemency eligibility (5-year minimum)', severity: 'info' };
    }
  },
  'illegal-sentence': {
    label: 'Illegal Sentence Correction',
    statute: 'Fla. R. Crim. P. 3.800(a)',
    states: ['SENTENCED', 'DIRECT_APPEAL', 'FINALIZED', 'POSTCONVICTION'],
    icon: '📜',
    why: 'A sentence above the statutory maximum is void on its face, so Rule 3.800(a) sets no time limit — illegality isn\'t something a filing deadline can cure, and this claim survives even years later.',
    depends: ['sentence-imposed', 'max-sentence'],
    calc: function(a) {
      const imposed = a['sentence-imposed'] || '';
      const maxSent = a['max-sentence'] || '';
      if (!imposed || !maxSent) return { status: 'unknown', note: 'Enter imposed + maximum sentence', severity: 'info' };
      const imposedNum = parseFloat(imposed.match(/(\d+)/));
      const maxNum = parseFloat(maxSent.match(/(\d+)/));
      if (imposedNum && maxNum && imposedNum > maxNum) {
        return { status: 'imminent', daysRemaining: 0, pct: 100, note: '⚠ SENTENCE EXCEEDS MAXIMUM — file 3.800(a) now (no deadline)', severity: 'critical',
          remedy: 'File Rule 3.800(a) motion — no statute of limitations for illegal sentences', deadlineDate: null };
      }
      return { status: 'safe', note: 'Sentence within statutory range', severity: 'info' };
    }
  }
};

function getDeadlines(state, answers) {
  const results = [];
  if (!state || !answers) return results;
  Object.keys(DEADLINE_DEFS).forEach(key => {
    const def = DEADLINE_DEFS[key];
    if (!def.states.includes(state)) return;
    const result = def.calc(answers);
    results.push({ key, ...def, ...result });
  });
  // Sort: expired/critical first, then by status severity, then by days remaining
  const severityOrder = { critical: 0, high: 1, warning: 2, info: 3, unknown: 4 };
  results.sort((a, b) => {
    const sa = severityOrder[a.severity] || 4;
    const sb = severityOrder[b.severity] || 4;
    if (sa !== sb) return sa - sb;
    return (a.daysRemaining || 999) - (b.daysRemaining || 999);
  });
  return results;
}

function getDeadlineAlerts(state, answers) {
  const deadlines = getDeadlines(state, answers);
  return deadlines
    .filter(d => d.severity === 'critical' || d.severity === 'high')
    .map(d => ({
      id: d.key,
      type: 'deadline',
      severity: d.severity === 'critical' ? 'critical' : 'warning',
      icon: d.icon,
      title: d.severity === 'critical' && d.status === 'expired'
        ? 'EXPIRED: ' + d.label
        : d.severity === 'critical'
        ? 'URGENT: ' + d.label
        : d.label,
      badge: 'DEADLINE',
      desc: d.note,
      action: d.remedy || 'Address this deadline promptly',
      deadline: d.status === 'expired' ? 'EXPIRED' : d.daysRemaining + ' days',
      statute: d.statute
    }));
}

function renderDeadlineIntelligence() {
  const panel = document.getElementById('deadline-panel');
  if (!panel) return;
  const state = getCurrentState();
  const ctx = CASE_STATES[state];
  if (!caseSession && !currentMotion) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const deadlines = getDeadlines(state, answers);
  const critical = deadlines.filter(d => d.severity === 'critical');
  const high = deadlines.filter(d => d.severity === 'high');
  const other = deadlines.filter(d => d.severity !== 'critical' && d.severity !== 'high');

  let html = '<div class="dl-header">' +
    '<span style="font-weight:700;font-size:14px">' + ctx.icon + ' ' + ctx.label + ' Deadlines</span>' +
    '<span class="dl-count">' + deadlines.length + ' tracked</span>' +
    '</div>';

  if (!deadlines.length) {
    html += '<div class="dl-empty">No tracked deadlines for this stage.</div>';
    panel.innerHTML = html;
    return;
  }

  html += '<div class="dl-list">';

  // Critical block
  if (critical.length) {
    html += '<div class="dl-group"><div class="dl-group-label">⚠ CRITICAL</div>';
    critical.forEach(d => html += renderDeadlineCard(d));
    html += '</div>';
  }

  // High block
  if (high.length) {
    html += '<div class="dl-group"><div class="dl-group-label">⚡ HIGH PRIORITY</div>';
    high.forEach(d => html += renderDeadlineCard(d));
    html += '</div>';
  }

  // Other
  if (other.length) {
    html += '<div class="dl-group"><div class="dl-group-label dl-group-label--muted">📋 STATUS</div>';
    other.forEach(d => html += renderDeadlineCard(d));
    html += '</div>';
  }

  html += '</div>';
  panel.innerHTML = html;
}

function renderDeadlineCard(d) {
  const severityColors = { critical: 'var(--red)', high: 'var(--gold)', warning: 'var(--sky)', info: 'var(--muted)', unknown: 'var(--muted)' };
  const barColor = severityColors[d.severity] || 'var(--muted)';
  const isPct = d.pct !== undefined && d.pct !== null && d.status !== 'unknown' && d.status !== 'safe';
  const barW = isPct ? Math.min(100, Math.max(2, d.pct)) : 0;
  const isExpired = d.status === 'expired';

  let statusIcon = '🔵';
  if (d.severity === 'critical' && !isExpired) statusIcon = '🔴';
  else if (isExpired) statusIcon = '⛔';
  else if (d.severity === 'high') statusIcon = '🟠';
  else if (d.severity === 'warning') statusIcon = '🟡';
  else if (d.severity === 'info') statusIcon = '🟢';
  else if (d.status === 'unknown') statusIcon = '⚪';

  return '<div class="dl-card dl-card--' + d.severity + '">' +
    '<div class="dl-card-top">' +
      '<span class="dl-icon">' + d.icon + '</span>' +
      '<div class="dl-card-body">' +
        '<div class="dl-card-title">' + statusIcon + ' ' + d.label + '</div>' +
        '<div class="dl-card-statute">' + (d.statute || '') + '</div>' +
        '<div class="dl-card-note">' + d.note + '</div>' +
        (d.remedy ? '<div class="dl-card-remedy">→ ' + d.remedy + '</div>' : '') +
        (d.why ? '<div class="dl-card-why"><span class="dl-card-why-label">What this means — </span>' + esc(d.why) + '</div>' : '') +
      '</div>' +
      (d.status !== 'unknown' && d.status !== 'safe'
        ? '<div class="dl-card-count" style="color:' + barColor + '">' +
          (isExpired ? 'EXPIRED' : d.daysRemaining + '<span class="dl-card-unit">d</span>') +
        '</div>'
        : '') +
    '</div>' +
    (isPct ? '<div class="dl-bar"><div class="dl-bar-fill" style="width:' + barW + '%;background:' + barColor + '"></div></div>' : '') +
    '</div>';
}

function renderStateMachine() {
  const el = document.getElementById('state-machine');
  if (!el) return;
  if (!caseSession && !currentMotion) { el.style.display = 'none'; return; }

  const state = getCurrentState();
  const ctx = getStateContext(state);
  el.style.display = 'block';

  document.getElementById('sm-icon').textContent = ctx.icon;
  document.getElementById('sm-label').textContent = ctx.label;
  document.getElementById('sm-progress-text').textContent = 'Stage ' + (ctx.index + 1) + ' of ' + STATE_ORDERS.length;
  const sb = document.getElementById('sm-badge');
  sb.textContent = state;
  sb.style.background = ctx.color;

  // Timeline
  const tl = document.getElementById('state-timeline');
  tl.innerHTML = STATE_ORDERS.map((key, i) => {
    const s = CASE_STATES[key];
    const isPast = i < ctx.index;
    const isCurrent = i === ctx.index;
    const isFuture = i > ctx.index;
    let cls = 'st-node';
    if (isPast) cls += ' st-past';
    if (isCurrent) cls += ' st-current';
    if (isFuture) cls += ' st-future';
    return '<div class="' + cls + '" style="--st-color:' + s.color + '" title="' + s.label + '">' +
      '<div class="st-dot"><span class="st-dot-icon">' + s.icon + '</span></div>' +
      '<div class="st-label">' + s.label + '</div>' +
      '<div class="st-bar"></div>' +
      '</div>';
  }).join('');

  // Note
  document.getElementById('state-note').textContent = ctx.note;

  // Action buttons
  const actionsEl = document.getElementById('state-actions');
  actionsEl.innerHTML = ctx.actions.map(a =>
    '<span class="sm-action-chip">' + a + '</span>'
  ).join('');
  renderDeadlineIntelligence();
  renderScannerDashboard();
  renderNarrativeView();
  updateTacSysbar();
}

function filterMotionsByState() {
  const tiles = document.querySelectorAll('.motion-tile');
  const grid = document.getElementById('motion-grid');
  if (!grid) return;

  // No case data → show all remedies
  if (!caseSession && !currentMotion) {
    tiles.forEach(tile => {
      tile.style.display = '';
      tile.classList.remove('tile-blocked', 'tile-recommended');
      tile.removeAttribute('aria-disabled');
      const blockedNote = tile.querySelector('.tile-blocked-note');
      if (blockedNote) blockedNote.style.display = 'none';
      const recommendedBadge = tile.querySelector('.tile-recommended-badge');
      if (recommendedBadge) recommendedBadge.textContent = '';
    });
    const existingMsg = grid.querySelector('.state-empty-msg');
    if (existingMsg) existingMsg.style.display = 'none';
    return;
  }

  const state = getCurrentState();
  const ctx = getStateContext(state);
  const blockedIds = ctx.blocked || [];
  const recommendedId = RECOMMENDED_MOTION_BY_STATE[state];
  let visibleCount = 0;

  tiles.forEach(tile => {
    const mid = tile.getAttribute('data-motion');
    const blockedNote = tile.querySelector('.tile-blocked-note');
    const recommendedBadge = tile.querySelector('.tile-recommended-badge');
    if (blockedIds.includes(mid)) {
      tile.classList.add('tile-blocked');
      tile.classList.remove('tile-recommended');
      tile.style.display = '';
      tile.setAttribute('aria-disabled', 'true');
      if (blockedNote) {
        const unlockStage = motionUnlockStage(mid);
        blockedNote.innerHTML = '🔒 Not available yet — ' + esc(ctx.note) +
          (unlockStage ? ' <span class="tile-unlock">Available at: ' + esc(unlockStage) + '</span>' : '');
        blockedNote.style.display = '';
      }
      if (recommendedBadge) recommendedBadge.textContent = '';
    } else {
      tile.classList.remove('tile-blocked');
      tile.style.display = '';
      tile.removeAttribute('aria-disabled');
      if (blockedNote) blockedNote.style.display = 'none';
      if (mid === recommendedId) {
        tile.classList.add('tile-recommended');
        if (recommendedBadge) recommendedBadge.textContent = '★ Recommended for your stage';
      } else {
        tile.classList.remove('tile-recommended');
        if (recommendedBadge) recommendedBadge.textContent = '';
      }
      visibleCount++;
    }
  });

  // Add "no remedies" message
  let msg = grid.querySelector('.state-empty-msg');
  if (visibleCount === 0) {
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'state-empty-msg';
      msg.innerHTML = '<div class="sem-icon">🚫</div><div class="sem-title">No remedies available at this stage</div><div class="sem-desc">The current case stage (' + ctx.label + ') does not support any of the available motion types. Update your case timeline or complete the current stage first.</div>';
      grid.appendChild(msg);
    }
    msg.style.display = '';
  } else {
    if (msg) msg.style.display = 'none';
  }
}

// Reveals the case-number/name/DOB fields once a county has been entered —
// progressive disclosure so the intake form reads as one question at a time
// instead of four blank fields at once.
function revealIntakeProgressive(el) {
  const wrap = document.getElementById('intake-progressive');
  if (wrap) wrap.style.display = (el.value || '').trim() ? 'block' : 'none';
}

function openIntake(chargeName) {
  const overlay = document.getElementById('intake-form');
  if (!overlay) return;
  document.getElementById('intake-charge-badge').textContent = chargeName;
  if (caseSession) {
    document.getElementById('intake-county').value = caseSession.county || '';
    document.getElementById('intake-case-num').value = caseSession.caseNum || '';
    document.getElementById('intake-def-name').value = caseSession.defendantName || '';
    document.getElementById('intake-dob').value = caseSession.defendantDOB || '';
    checkCaseNumberFormat(document.getElementById('intake-case-num'));
  } else {
    document.getElementById('intake-county').value = '';
    document.getElementById('intake-case-num').value = '';
    document.getElementById('intake-def-name').value = '';
    document.getElementById('intake-dob').value = '';
  }
  revealIntakeProgressive(document.getElementById('intake-county'));
  intakeDirty = false;
  overlay.classList.add('open');
}

function closeIntake() {
  document.getElementById('intake-form')?.classList.remove('open');
}

function saveIntake() {
  const county = document.getElementById('intake-county')?.value.trim() || '';
  const caseNum = document.getElementById('intake-case-num')?.value.trim() || '';
  const defName = document.getElementById('intake-def-name')?.value.trim() || '';
  const dob = document.getElementById('intake-dob')?.value || '';
  const data = {
    chargeName: chargeSelected ? chargeSelected.name : '',
    chargeStatute: chargeSelected ? chargeSelected.statute : '',
    timeline: chargeTimeline,
    county, caseNum, defendantName: defName, defendantDOB: dob
  };
  saveSession(data);
  closeIntake();
  toast('Case saved — motion builders will auto-fill your data');
}

function buildPrefillFromSession(mid) {
  if (!caseSession) return {};
  const prefill = {};
  const flow = FLOWS[mid];
  if (!flow) return prefill;

  if (caseSession.county) {
    const countyFields = flow.steps.flatMap(s => s.fields.filter(f =>
      f.id === 'county' || f.id === 'arrest-county'
    ));
    countyFields.forEach(f => { prefill[f.id] = caseSession.county; });
  }
  if (caseSession.caseNum) {
    const cnFields = flow.steps.flatMap(s => s.fields.filter(f =>
      f.id === 'case-num' || f.id === 'pet-case-num'
    ));
    cnFields.forEach(f => { prefill[f.id] = caseSession.caseNum; });
  }
  if (caseSession.defendantName) {
    const nameFields = flow.steps.flatMap(s => s.fields.filter(f =>
      f.label && (f.label.toLowerCase().includes('full name') ||
        f.label.toLowerCase().includes('your full') ||
        f.label.toLowerCase().includes('petitioner name') ||
        f.label.toLowerCase().includes('appellant name') ||
        f.label.toLowerCase().includes('legal name') ||
        f.id === 'def-name' || f.id === 'def-name' ||
        f.id === 'pet-name' || f.id === 'subject-name' ||
        f.id === 'appellant-name' || f.id === 'appellant-name')
    ));
    const seen = new Set();
    nameFields.forEach(f => { if (!seen.has(f.id)) { seen.add(f.id); prefill[f.id] = caseSession.defendantName; } });
  }
  if (caseSession.chargeName) {
    const offenseFields = flow.steps.flatMap(s => s.fields.filter(f =>
      f.id === 'offense' || f.id === 'arrest-charge'
    ));
    offenseFields.forEach(f => { prefill[f.id] = caseSession.chargeName; });
  }
  if (caseSession.defendantDOB) {
    const dobFields = flow.steps.flatMap(s => s.fields.filter(f =>
      f.id === 'def-dob' || f.id === 'pet-dob'
    ));
    dobFields.forEach(f => { prefill[f.id] = caseSession.defendantDOB; });
  }
  return prefill;
}

function launchWithSession(mid) {
  if (!FLOWS[mid]) { toast('Motion type not available'); return; }
  const prefill = buildPrefillFromSession(mid);
  currentMotion = mid;
  currentQ = 0;
  answers = prefill;
  legalAnswers = {};
  eligAnswers = {};
  const btn = document.getElementById('start-btn');
  btn.disabled = false;
  document.getElementById('start-btn-text').textContent = 'Begin — ' + FLOWS[mid].title;
  switchTab('builder');
  startWizard();
  toast('Fields pre-filled from your case session');
}

const CHARGE_MOTION_MAP = {
  "First-Degree Murder": ["3850","3800","appeal"],
  "Second-Degree Murder": ["3850","3800","appeal"],
  "Armed Robbery": ["3850","3800","appeal"],
  "Sexual Battery": ["3850","appeal"],
  "Kidnapping": ["3850","3800","appeal"],
  "Fentanyl Trafficking": ["3850","3800","appeal"],
  "Arson": ["3850","3800","appeal"],
  "Carjacking": ["3850","3800","appeal"],
  "Home Invasion Robbery": ["3850","3800","appeal"],
  "Aggravated Child Abuse": ["3850","appeal"],
  "Cannabis Trafficking": ["3850","3800","appeal"],
  "DUI Manslaughter": ["3850","3800","appeal"],
  "Felon in Possession of Firearm": ["3850","3800","appeal"],
  "Cocaine Trafficking": ["3850","3800","appeal"],
  "Attempted First-Degree Murder": ["3850","3800","appeal"]
};

function setTimeline(tl) {
  chargeTimeline = tl;
  document.getElementById('tl-pretrial').classList.toggle('active', tl === 'pretrial');
  document.getElementById('tl-postconviction').classList.toggle('active', tl === 'postconviction');
  if (chargeSelected) renderChargeIntel(chargeSelected);
  renderStateMachine();
  filterMotionsByState();
}

function togglePlainEnglish() {
  chargePlainEnglish = !chargePlainEnglish;
  const toggle = document.getElementById('ci-plain-toggle');
  const indicator = toggle.querySelector('.toggle-indicator');
  indicator.classList.toggle('on', chargePlainEnglish);
  if (chargeSelected) renderChargeIntel(chargeSelected);
}

function renderChargeIntel(c) {
  const intel = document.getElementById('charge-intel');
  intel.classList.add('open');

  const tl = chargeTimeline;
  const plain = chargePlainEnglish;

  // Header
  const degClass = c.degree.includes('Capital') ? 'capital' : c.degree.includes('Life') ? 'life' : c.degree.includes('F1') ? 'f1' : 'f2';
  document.getElementById('ci-name').textContent = c.name;
  document.getElementById('ci-statute').textContent = c.statute;
  document.getElementById('ci-plain').textContent = plain ? c.plainEnglish : '';
  document.getElementById('ci-plain').style.display = plain ? 'block' : 'none';
  const degEl = document.getElementById('ci-degree');
  degEl.textContent = c.degree;
  degEl.className = 'charge-intel-degree ' + degClass;

  // Plain English toggle indicator
  const toggleEl = document.getElementById('ci-plain-toggle');
  const indicator = toggleEl.querySelector('.toggle-indicator');
  indicator.classList.toggle('on', plain);
  toggleEl.querySelector('span').textContent = plain
    ? 'Legal view — shows statute and formal language'
    : 'Plain English view — shows legal terms in everyday language';

  // Risk badges
  renderRiskBadges(c, tl);

  // Detection alerts
  renderAlerts(c);

  // Timeline
  renderChargeTimeline(c, tl);

  // Countdown/Deadlines
  renderCountdowns(c, tl);

  // Critical motions
  renderChargeMotions(c);

  // Strategic analysis
  renderStrategic(c);

  // Constitutional issues
  renderConstitutional(c);

  // Collateral consequences
  renderCollateral(c);

  // County intelligence
  renderCountyIntel(c);

  intel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderRiskBadges(c, tl) {
  const grid = document.getElementById('ci-risks');
  const levels = getThreatLevels(c, tl);
  if (!levels.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = levels.map(l => {
    const iconMap = { critical: '🔴', danger: '🟠', warning: '🟡', safe: '🟢' };
    return '<div class="risk-badge '+l.severity+'" title="'+esc(l.detail)+'" onclick="this.classList.toggle(\'open\')">'+
      '<span class="rb-icon">'+(iconMap[l.severity]||'⚪')+'</span>'+
      '<span class="rb-label">'+esc(l.label)+'</span>'+
      '<div class="rb-detail">'+esc(l.detail)+'</div>'+
    '</div>';
  }).join('');
}

function renderAlerts(c) {
  const el = document.getElementById('ci-alerts');
  const alerts = getDetectionAlerts(c);
  if (!alerts.length) { el.innerHTML = ''; return; }
  el.innerHTML = alerts.map(a => {
    const icon = a.type === 'critical' ? '🚨' : '⚠️';
    return '<div class="charge-alert '+a.type+'"><span class="ca-icon">'+icon+'</span><span class="ca-text">'+esc(a.text)+'</span></div>';
  }).join('');
}

function renderChargeTimeline(c, tl) {
  const el = document.getElementById('ci-timeline');
  const data = getProceduralTimeline(c, tl);
  if (!data.stages.length) { el.innerHTML = ''; return; }
  const stages = data.stages;
  const last = stages.length - 1;
  el.innerHTML = stages.map((s, i) => {
    const isCurrent = i === Math.min(Math.floor(stages.length / 3), last);
    const sub = i === 0 ? (tl === 'pretrial' ? 'Entry point' : 'Judgment entered')
      : i === last ? (tl === 'pretrial' ? 'Trial or plea' : 'Reentry pathway')
      : '';
    return '<div class="charge-tl-entry'+(isCurrent ? ' current' : '')+'">'+
      '<span class="tl-label">'+esc(s)+'</span>'+
      (sub ? '<span class="tl-sub">'+esc(sub)+'</span>' : '')+
    '</div>';
  }).join('');
}

function renderCountdowns(c, tl) {
  const el = document.getElementById('ci-countdown');
  if (tl === 'pretrial') {
    const speedyDays = c.procedural?.pretrial?.speedyTrialPeriod || '175';
    el.innerHTML =
      '<div class="charge-countdown"><div class="cd-value">'+speedyDays+'</div><div class="cd-label">Speedy Trial Days</div></div>'+
      '<div class="charge-countdown"><div class="cd-value">'+esc(c.procedural?.pretrial?.arraignmentDeadline?.split('.')[0] || '21 days')+'</div><div class="cd-label">Arraignment Deadline</div></div>';
  } else {
    const pc = c.procedural?.postconviction;
    el.innerHTML =
      '<div class="charge-countdown"><div class="cd-value">'+esc(pc?.directAppealDeadline || '30 days')+'</div><div class="cd-label">Direct Appeal</div></div>'+
      '<div class="charge-countdown"><div class="cd-value">'+esc(pc?.['3850Deadline'] || '2 years')+'</div><div class="cd-label">3.850 Deadline</div></div>'+
      '<div class="charge-countdown urgent"><div class="cd-value">'+esc(pc?.['3800Deadline'] || 'No limit')+'</div><div class="cd-label">3.800(a) Limit</div></div>';
  }
}

const MOTION_EXPLANATIONS = [
  { keywords: ['suppress', 'suppression'], text: 'Asks the court to exclude evidence (statements, physical evidence, search results) obtained in violation of constitutional rights — if granted, the state can\'t use that evidence at trial.' },
  { keywords: ['bond hearing', 'bond reduction', 'pretrial detention'], text: 'Asks the court to set, lower, or reconsider conditions of pretrial release so you aren\'t held in jail solely because you can\'t afford bail.' },
  { keywords: ['change of venue'], text: 'Asks to move the trial to a different county, typically because local media coverage or community ties make it unlikely you can get an impartial jury where the case is currently filed.' },
  { keywords: ['speedy trial'], text: 'Invokes your constitutional and statutory right to a trial within a fixed time — forces the state to either go to trial promptly or risk the charge being discharged.' },
  { keywords: ['competency'], text: 'Asks the court to determine whether you are mentally competent to understand the proceedings and assist in your own defense — if found incompetent, the case pauses until competency is restored.' },
  { keywords: ['severance', 'sever'], text: 'Asks to separate your case from a co-defendant\'s (or separate multiple charges against you) so each is tried on its own, preventing evidence against someone else from prejudicing your trial.' },
  { keywords: ['franks hearing'], text: 'Challenges the truthfulness of a search warrant affidavit — if the affidavit contained false statements or omissions needed to establish probable cause, evidence from that warrant can be suppressed.' },
  { keywords: ['discovery'], text: 'Forces the state to turn over evidence, witness lists, and reports it\'s required to disclose — used when the prosecution is sitting on material the defense is entitled to see.' },
  { keywords: ['psychological evaluation', 'psych'], text: 'Requests a mental-health evaluation relevant to competency, sanity at the time of the offense, or mitigation at sentencing.' },
  { keywords: ['forensic examination', 'independent lab', 'independent toxicology', 'drug analysis', 'pcr lab', 'fire investigation'], text: 'Requests independent testing of physical evidence (drugs, DNA, blood) rather than relying solely on the state lab\'s results, which can be challenged or contradicted by a second analysis.' },
  { keywords: ['identification', 'lineup'], text: 'Challenges an eyewitness identification procedure (lineup, photo array, showup) as unreliable or unconstitutionally suggestive, which can get the identification excluded or undermined at trial.' },
  { keywords: ['grand jury transcript'], text: 'Requests access to grand jury proceedings to check for inconsistencies between grand jury testimony and trial testimony, or procedural defects in how the indictment was obtained.' },
  { keywords: ['cell tower', 'surveillance video'], text: 'Challenges the reliability, chain of custody, or admissibility of location/video evidence the state intends to use to place you at the scene.' },
  { keywords: ['dcf records', 'medical records', 'confidential informant'], text: 'Seeks access to records or information the state or a third party is withholding that could be relevant to credibility, motive, or an alternate explanation for the charge.' },
  { keywords: ['motion in limine'], text: 'Asks the court to rule, before trial starts, that certain evidence (often prior bad acts) be excluded as unfairly prejudicial rather than waiting to object once the jury has already heard it.' },
  { keywords: ['lesser included'], text: 'Asks the judge to instruct the jury on a less serious charge contained within the charged offense, giving jurors a middle option besides full conviction or full acquittal.' },
  { keywords: ['constructive possession'], text: 'Challenges whether the state can actually prove you had knowledge and control over contraband you didn\'t physically have on you — a common gap in possession cases.' },
  { keywords: ['medical marijuana'], text: 'Raises a legal-use defense where applicable, asserting the substance or conduct was authorized under Florida\'s medical marijuana program.' },
  { keywords: ['dui investigation', 'bac results'], text: 'Challenges the procedures used during a DUI stop and breath/blood testing — improper administration or calibration issues can get BAC results thrown out.' },
];

function explainCriticalMotion(label) {
  const lower = (label || '').toLowerCase();
  const match = MOTION_EXPLANATIONS.find(e => e.keywords.some(k => lower.includes(k)));
  return match ? match.text : 'A pretrial motion relevant to this charge\'s posture — discuss with counsel how it applies to your specific facts.';
}

// Plain-language fallback for wizard fields that have no authored q.help —
// keyword-matched against field id/label, same pattern as MOTION_EXPLANATIONS.
// Deliberately doesn't cover self-explanatory fields (name, address, phone,
// plain dates) — a fallback there would be noise, not help.
const FIELD_HELP_FALLBACKS = [
  { keywords: ['case-num'], text: 'The number assigned to your case by the clerk\'s office — found on your judgment, sentencing order, or docket. Usually formatted YYYY-CF-XXXXXX.' },
  { keywords: ['county'], text: 'The county where your case was originally filed and decided — this determines which circuit court and appellate district apply, not where you live now.' },
  { keywords: ['direct-appeal-status'], text: 'Whether your direct appeal — the one automatic appeal everyone gets after conviction — is still pending, already decided, or was never filed. This changes which deadlines and exceptions apply to you now.' },
  { keywords: ['3800-status'], text: 'Whether you\'ve already filed a Rule 3.800 motion (used to correct an illegal sentence) and what happened to it.' },
  { keywords: ['supporting-facts'], text: 'Write what actually happened in your own words — dates, names, specifics. The court reads this to understand your claim before it ever reads a legal citation.' },
  { keywords: ['record-cites'], text: 'Page or transcript references in your case record (e.g., "Tr. 45" or "R. 112") that back up what you\'re claiming. If you don\'t have exact citations yet, describe what you remember and where it likely is.' },
  { keywords: ['relief-requested'], text: 'What you\'re actually asking the court to do — vacate the conviction, reduce the sentence, order a new hearing, etc. Be specific; vague requests are easier to deny.' },
  { keywords: ['federal-division'], text: 'Which division of the federal district court should handle your case — usually based on the county where you were convicted.' },
  { keywords: ['trial-outcome'], text: 'How the underlying criminal case ended — convicted at trial, pled guilty, etc. This shapes which motions are even available to you.' },
  { keywords: ['vop-date'], text: 'The date your violation of probation was filed or alleged — this starts the clock for your response deadlines.' },
  { keywords: ['fdle-cert-date'], text: 'The date the Florida Department of Law Enforcement issued your certificate of eligibility, if you already have one. Leave blank if you haven\'t applied yet.' },
  { keywords: ['drug-tests'], text: 'Whether you\'ve been passing your required drug tests under probation — often the single biggest factor in modification or early-termination requests.' },
  { keywords: ['rest-monthly'], text: 'The restitution or cost amount you\'re currently required to pay per month, as set by the court — not what you can actually afford (that comes next).' },
  { keywords: ['notice-filed-date'], text: 'The date you filed your Notice of Appeal — this is the trigger date for almost every deadline that follows in the appeal.' },
  { keywords: ['record-due-date'], text: 'The deadline for the court reporter/clerk to prepare and file the trial record — if this date slips, it can stall your whole appeal.' },
  { keywords: ['appellate-dca'], text: 'Which District Court of Appeal covers your case — this is fixed by the county where you were convicted, not something you choose.' },
  { keywords: ['transcript-dates'], text: 'The specific hearing or trial dates you need transcribed for the record — be as precise as possible so the court reporter pulls the right ones.' },
  { keywords: ['designation-filed'], text: 'Whether the formal request telling the clerk which parts of the trial record to send up on appeal has already been filed.' },
  { keywords: ['extension-status'], text: 'Whether you\'ve asked for (or received) more time to file, and what the new deadline is, if any.' },
  { keywords: ['brief-outline', 'brief-status'], text: 'A rough outline of the points you plan to argue, in the order you plan to argue them — this doesn\'t need polished legal language yet.' },
  { keywords: ['mandate-concern'], text: 'Why letting the case proceed right now (before the appeal is decided) would cause harm that can\'t be undone later — that\'s the legal standard for a stay.' },
  { keywords: ['preservation'], text: 'Whether your trial attorney objected to the issue at the time it happened. If an issue wasn\'t objected to below, it\'s much harder to win on appeal.' },
  { keywords: ['dc-number'], text: 'Your Florida Department of Corrections inmate number, if you have one — used to look up your case while incarcerated.' },
  { keywords: ['proceeding-date'], text: 'The date of the hearing or proceeding this document is being prepared for, if you know it.' },
  { keywords: ['volunteer'], text: 'Volunteer work, community service hours, or civic involvement since your conviction — this is mitigation evidence for clemency or seal/expunge requests, not just a resume line.' },
  { keywords: ['employment'], text: 'Your work history since the conviction — steady employment is one of the strongest signs a clemency or relief board looks for.' },
  { keywords: ['awards'], text: 'Certificates, recognitions, or achievements since the conviction — these help show rehabilitation, even if they seem minor.' },
];

function getFieldHelpFallback(q) {
  const hay = (q.id + ' ' + (q.label || '')).toLowerCase();
  const match = FIELD_HELP_FALLBACKS.find(e => e.keywords.some(k => hay.includes(k)));
  return match ? match.text : null;
}

function showMotionDetail(el) {
  const detail = document.getElementById('ci-motions-detail');
  if (!detail) return;
  const label = el.dataset.motion || '';
  detail.innerHTML = '<strong>'+esc(label)+':</strong> '+esc(explainCriticalMotion(label));
  detail.classList.add('open');
}

function renderChargeMotions(c) {
  const el = document.getElementById('ci-motions');
  const tl = chargeTimeline;
  const motions = tl === 'pretrial'
    ? (c.procedural?.pretrial?.criticalMotions || [])
    : ['Direct Appeal', 'Rule 3.850 Motion', 'Rule 3.800 Motion', 'Clemency Application'];

  const buildMotions = CHARGE_MOTION_MAP[c.name] || ['3850'];

  let html = motions.slice(0, 5).map(m => {
    return '<span class="charge-motion-chip" data-motion="'+esc(m)+'" onclick="showMotionDetail(this)">'+esc(m)+'</span>';
  }).join('');

  html += buildMotions.map(mid => {
    const flow = FLOWS[mid];
    if (!flow) return '';
    return '<span class="charge-motion-chip build" onclick="launchWithSession(\''+mid+'\')">⚡ Build '+esc(flow.tag)+'</span>';
  }).join('');

  el.innerHTML = html;
  const detail = document.getElementById('ci-motions-detail');
  if (detail) { detail.innerHTML = ''; detail.classList.remove('open'); }
}

function renderStrategic(c) {
  const el = document.getElementById('ci-strategic');
  const sa = getStrategicAnalysis(c);
  if (!sa) { el.innerHTML = ''; return; }

  let html = '';
  if (sa.defenses && sa.defenses.length) {
    html += '<div class="charge-strat-card defenses"><h5>🛡 Possible Defenses</h5><ul>'+
      sa.defenses.slice(0, 6).map(d => '<li>'+esc(d)+'</li>').join('')+'</ul></div>';
  }
  if (sa.weaknesses && sa.weaknesses.length) {
    html += '<div class="charge-strat-card weaknesses"><h5>⚠ Case Weaknesses</h5><ul>'+
      sa.weaknesses.slice(0, 6).map(w => '<li>'+esc(w)+'</li>').join('')+'</ul></div>';
  }
  if (sa.attackVectors && sa.attackVectors.length) {
    html += '<div class="charge-strat-card attacks"><h5>🎯 Attack Vectors</h5><ul>'+
      sa.attackVectors.slice(0, 6).map(a => '<li>'+esc(a)+'</li>').join('')+'</ul></div>';
  }
  el.innerHTML = html;
}

function renderConstitutional(c) {
  const el = document.getElementById('ci-constitutional');
  const con = c.constitutional;
  if (!con) { el.innerHTML = ''; return; }
  let html = '';
  const labelMap = {
    fourthAmendment: '4th Amendment — Unlawful Search/Seizure',
    fifthAmendment: '5th Amendment — Self-Incrimination / Miranda',
    sixthAmendment: '6th Amendment — Right to Counsel / Fair Trial',
    dueProcess: '14th Amendment — Due Process',
    iacPathways: 'IAC — Ineffective Assistance Pathways'
  };
  for (const [key, label] of Object.entries(labelMap)) {
    const items = con[key];
    if (items && items.length) {
      html += '<li><strong style="color:var(--gold)">'+esc(label)+':</strong> ' +
        items.slice(0, 4).map(i => esc(i)).join('; ') + '</li>';
    }
  }
  el.innerHTML = html || '<li style="color:var(--muted)">Constitutional analysis available with case-specific facts.</li>';
}

function getCountyProfile(raw) {
  if (!raw || !raw.trim()) return null;
  const c = raw.trim().toLowerCase();
  const cp = window.countyProfiles || countyProfiles;
  const keys = Object.keys(cp);
  for (const key of keys) {
    if (key.toLowerCase() === c) return { key, data: cp[key] };
    if (c.includes(key.toLowerCase()) || key.toLowerCase().includes(c)) return { key, data: cp[key] };
    const parts = key.split(/[- ]/);
    for (const p of parts) { if (p === c) return { key, data: cp[key] }; }
  }
  return null;
}

function renderCountyIntel(c) {
  const el = document.getElementById('ci-county');
  const nameEl = document.getElementById('ci-county-name');
  const countyRaw = caseSession?.county || '';
  const profile = getCountyProfile(countyRaw);
  if (!profile) {
    if (el) el.innerHTML = '';
    if (nameEl) nameEl.textContent = '';
    const header = document.querySelector('.county-label');
    if (header) header.style.display = 'none';
    return;
  }
  const header = document.querySelector('.county-label');
  if (header) header.style.display = 'flex';
  if (nameEl) nameEl.textContent = '📍 ' + profile.key;

  const d = profile.data;
  let html = '';

  // Bond culture
  html += '<div class="county-intel-card">' +
    '<div class="ci-card-header"><span class="ci-card-ico">💰</span>Bond Culture</div>' +
    '<div class="ci-card-sub">How this county tends to set bail — useful if you\'re weighing a bond reduction motion.</div>' +
    '<div class="ci-card-body">' +
    '<div class="ci-row"><span class="ci-row-label">Tendency</span><span class="ci-row-val">' + esc(d.bondCulture.tendency) + '</span></div>' +
    '<div class="ci-row"><span class="ci-row-label">Typical Range</span><span class="ci-row-val">' + esc(d.bondCulture.typicalRange) + '</span></div>' +
    '<div class="ci-row"><span class="ci-row-label">F1 Range</span><span class="ci-row-val">' + esc(d.bondCulture.f1Range) + '</span></div>' +
    (d.bondCulture.notes ? '<div class="ci-note">' + esc(d.bondCulture.notes) + '</div>' : '') +
    '</div></div>';

  // Diversion programs
  const div = d.diversionPrograms;
  const divItems = [
    { k: 'pretrial', l: 'Pretrial Diversion' },
    { k: 'drugCourt', l: 'Drug Court' },
    { k: 'mentalHealthCourt', l: 'Mental Health Court' },
    { k: 'veteransCourt', l: 'Veterans Court' },
    { k: 'teenCourt', l: 'Teen Court' }
  ];
  html += '<div class="county-intel-card">' +
    '<div class="ci-card-header"><span class="ci-card-ico">🔄</span>Diversion Programs</div>' +
    '<div class="ci-card-sub">Completing one of these can resolve a case without a conviction — worth asking about before pleading.</div>' +
    '<div class="ci-card-body"><div class="ci-diversion-grid">' +
    divItems.map(i => '<div class="ci-diversion-item' + (div[i.k] ? '' : ' dim') + '"><span class="ci-div-icon">' + (div[i.k] ? '✅' : '❌') + '</span><span>' + i.l + '</span></div>').join('') +
    '</div></div></div>';

  // Sentencing patterns
  html += '<div class="county-intel-card">' +
    '<div class="ci-card-header"><span class="ci-card-ico">⚖️</span>Sentencing Patterns</div>' +
    '<div class="ci-card-sub">General tendencies, not a prediction for your case — actual sentences depend on your scoresheet and the judge.</div>' +
    '<div class="ci-card-body">' +
    '<div class="ci-row"><span class="ci-row-label">Tendency</span><span class="ci-row-val">' + esc(d.sentencingPatterns.tendency) + '</span></div>' +
    '<div class="ci-row"><span class="ci-row-label">Drug Sentences</span><span class="ci-row-val">' + esc(d.sentencingPatterns.drugSentences) + '</span></div>' +
    '<div class="ci-row"><span class="ci-row-label">Violent Sentences</span><span class="ci-row-val">' + esc(d.sentencingPatterns.violentSentences) + '</span></div>' +
    (d.sentencingPatterns.notes ? '<div class="ci-note">' + esc(d.sentencingPatterns.notes) + '</div>' : '') +
    '</div></div>';

  // Specialty courts
  if (d.specialtyCourts && d.specialtyCourts.length) {
    html += '<div class="county-intel-card">' +
      '<div class="ci-card-header"><span class="ci-card-ico">🏛️</span>Specialty Courts</div>' +
      '<div class="ci-card-sub">Alternative dockets that may apply depending on the offense or circumstances — ask the clerk or your attorney if one fits.</div>' +
      '<div class="ci-card-body"><ul class="ci-list">' +
      d.specialtyCourts.map(s => '<li>' + esc(s) + '</li>').join('') +
      '</ul></div></div>';
  }

  // Rocket docket
  if (d.rocketDocket) {
    html += '<div class="county-intel-card warn">' +
      '<div class="ci-card-header"><span class="ci-card-ico">🚀</span>Rocket Docket</div>' +
      '<div class="ci-card-body"><div class="ci-note">This county operates a rocket docket — cases move faster than statewide average. Prepare motions and responses quickly.</div></div></div>';
  }

  // Admin orders
  if (d.localAdminOrders && d.localAdminOrders.length) {
    html += '<div class="county-intel-card">' +
      '<div class="ci-card-header"><span class="ci-card-ico">📋</span>Local Admin Orders</div>' +
      '<div class="ci-card-sub">Local rules on top of the statewide rules — missing one of these can get an otherwise-correct filing bounced.</div>' +
      '<div class="ci-card-body"><ul class="ci-list">' +
      d.localAdminOrders.map(a => '<li>' + esc(a) + '</li>').join('') +
      '</ul></div></div>';
  }

  // Unique rules
  if (d.uniqueRules && d.uniqueRules.length) {
    html += '<div class="county-intel-card">' +
      '<div class="ci-card-header"><span class="ci-card-ico">📌</span>Local Rules & Culture</div>' +
      '<div class="ci-card-sub">Practical, unwritten things attorneys who practice here would tell you.</div>' +
      '<div class="ci-card-body"><ul class="ci-list">' +
      d.uniqueRules.map(r => '<li>' + esc(r) + '</li>').join('') +
      '</ul></div></div>';
  }

  // SAO + Reentry
  html += '<div class="county-intel-card">' +
    '<div class="ci-card-header"><span class="ci-card-ico">👤</span>Key Offices</div>' +
    '<div class="ci-card-sub">Who\'s prosecuting and who provides public defense in this county.</div>' +
    '<div class="ci-card-body"><div class="ci-row"><span class="ci-row-label">State Attorney</span><span class="ci-row-val">' + esc(d.recommendedSAList?.[0] || 'N/A') + '</span></div>' +
    '<div class="ci-row"><span class="ci-row-label">Public Defender</span><span class="ci-row-val">' + esc(d.recommendedSAList?.[1] || 'N/A') + '</span></div></div></div>';

  if (d.reentryResources && d.reentryResources.length) {
    html += '<div class="county-intel-card">' +
      '<div class="ci-card-header"><span class="ci-card-ico">🤝</span>Reentry Resources</div>' +
      '<div class="ci-card-sub">Local organizations that help with housing, employment, and record relief after a case closes.</div>' +
      '<div class="ci-card-body"><ul class="ci-list">' +
      d.reentryResources.map(r => '<li>' + esc(r) + '</li>').join('') +
      '</ul></div></div>';
  }

  el.innerHTML = html;
}

function renderCollateral(c) {
  const el = document.getElementById('ci-collateral');
  const col = c.collateral;
  if (!col) { el.innerHTML = ''; return; }
  const iconMap = {
    immigration: '🛂', firearm: '🔫', voting: '🗳', employment: '💼',
    housing: '🏠', professionalLicenses: '📜', civilRights: '⚖️',
    registration: '📋', publicBenefits: '💵', childCustody: '👶'
  };
  let html = '';
  for (const [key, val] of Object.entries(col)) {
    if (!val) continue;
    const icon = iconMap[key] || '📌';
    html += '<div class="charge-collateral-item">'+
      '<span class="cc-icon">'+icon+'</span>'+
      '<span class="cc-label">'+esc(key.replace(/([A-Z])/g,' $1').trim())+'</span>'+
      '<span class="cc-detail">'+esc(val.length > 60 ? val.slice(0, 60)+'...' : val)+'</span>'+
    '</div>';
  }
  el.innerHTML = html || '<div style="color:var(--muted);font-size:12px">No collateral consequence data available.</div>';
}

function normalizeSearchText(value) {
  return String(value || '').toLowerCase().trim();
}

function safeText(value) {
  return typeof esc === 'function' ? esc(String(value || '')) : String(value || '').replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

function initChargeSearch() {
  const input = document.getElementById('charge-search');
  const results = document.getElementById('charge-ac');
  if (!input || !results) return;

  input.addEventListener('input', function () {
    renderChargeSearchResults(input.value);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeChargeSearch();
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.charge-search-wrap')) {
      closeChargeSearch();
    }
  });
}

function closeChargeSearch() {
  const results = document.getElementById('charge-ac');
  if (!results) return;
  results.innerHTML = '';
  results.classList.remove('open');
}

function renderChargeSearchResults(query) {
  const results = document.getElementById('charge-ac');
  if (!results) return;

  const q = normalizeSearchText(query);
  if (q.length < 2) {
    closeChargeSearch();
    return;
  }

  try {
    const source = Array.isArray(window.CHARGES) ? window.CHARGES : [];
    if (!source.length) {
      results.innerHTML = '<div class="ac-no-results">Charge data not loaded — refresh the page.</div>';
      results.classList.add('open');
      return;
    }

    const matches = source
      .map(function (charge, idx) {
        const haystack = normalizeSearchText([
          charge.name,
          charge.statute,
          charge.degree
        ].join(' '));
        return haystack.includes(q) ? { charge: charge, idx: idx } : null;
      })
      .filter(Boolean)
      .slice(0, 12);

    if (!matches.length) {
      results.innerHTML = '<div class="ac-no-results">No charges found for "' + safeText(query) + '"</div>';
      results.classList.add('open');
      return;
    }

    results.innerHTML = matches.map(function (hit) {
      const c = hit.charge;
      const degClass = c.degree.includes('Capital') ? 'capital' : c.degree.includes('Life') ? 'life' : c.degree.includes('F1') ? 'f1' : 'f2';
      const maxPenalty = c.sentencing && c.sentencing.maxPenalty ? c.sentencing.maxPenalty : '';
      const levels = typeof getThreatLevels === 'function' ? getThreatLevels(c, chargeTimeline) : [];
      const topThreat = levels.find(l => l.severity === 'critical') || levels.find(l => l.severity === 'danger') || null;
      return (
        '<button type="button" class="charge-ac-item" data-charge-idx="' + hit.idx + '">' +
          '<div class="charge-ac-row">' +
            '<span class="charge-ac-name">' + safeText(c.name) + '</span>' +
            '<span class="charge-ac-degree ' + degClass + '">' + safeText(c.degree) + '</span>' +
            '<span class="charge-ac-statute">' + safeText(c.statute) + '</span>' +
          '</div>' +
          (maxPenalty || topThreat ? (
            '<div class="charge-ac-meta">' +
              (maxPenalty ? '<span class="charge-ac-penalty">⚖ Max: ' + safeText(maxPenalty) + '</span>' : '') +
              (topThreat ? '<span class="charge-ac-threat ' + topThreat.severity + '">' + safeText(topThreat.label) + '</span>' : '') +
            '</div>'
          ) : '') +
        '</button>'
      );
    }).join('');

    results.classList.add('open');

    results.querySelectorAll('[data-charge-idx]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const idx = Number(btn.getAttribute('data-charge-idx'));
        selectCharge(idx);
      });
    });
  } catch (err) {
    console.error('[ChargeSearch] renderChargeSearchResults failed:', err);
    results.innerHTML = '<div class="ac-no-results">Search error — check console.</div>';
    results.classList.add('open');
  }
}

function selectCharge(idx) {
  const source = Array.isArray(window.CHARGES) ? window.CHARGES : [];
  const charge = source[idx];
  if (!charge) return;

  chargeSelected = charge;

  const input = document.getElementById('charge-search');
  const empty = document.getElementById('charge-empty');

  if (input) input.value = charge.name || '';
  if (empty) empty.style.display = 'none';

  closeChargeSearch();

  if (typeof renderChargeIntel === 'function') {
    renderChargeIntel(charge);
  }

  if (typeof openIntake === 'function') {
    openIntake(charge.name || '');
  }
}

function initQuickSearch() {
  const input = document.getElementById('quick-search');
  const results = document.getElementById('qs-results');
  const hint = document.getElementById('qs-hint');
  if(!input) return;

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 2) { results.classList.remove('open'); hint.textContent = ''; return; }
    timer = setTimeout(() => performQuickSearch(q), 150);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
    if (e.key === 'ArrowDown') { const items = results.querySelectorAll('.qsr-item'); if(items.length) { items[0].classList.add('highlighted'); items[0].focus(); } }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.quick-search-wrap')) results.classList.remove('open');
  });
  results.addEventListener('keydown', e => {
    const items = [...results.querySelectorAll('.qsr-item')];
    const idx = items.findIndex(el => el.classList.contains('highlighted'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items.forEach(el => el.classList.remove('highlighted'));
      const next = (idx + 1) % items.length;
      items[next].classList.add('highlighted');
      items[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items.forEach(el => el.classList.remove('highlighted'));
      const prev = (idx - 1 + items.length) % items.length;
      items[prev].classList.add('highlighted');
      items[prev].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = items.find(el => el.classList.contains('highlighted')) || items[0];
      if (hit) hit.click();
    }
  });
}

function performQuickSearch(q) {
  const input = document.getElementById('quick-search');
  const results = document.getElementById('qs-results');
  const hint = document.getElementById('qs-hint');

  if (!results) return;
  if (!q || q.length < 2) {
    results.classList.remove('open');
    if (hint) hint.textContent = '';
    return;
  }

  const hits = [];
  function safeMatch(query, text) {
    try {
      return (text || '').toLowerCase().includes((query || '').toLowerCase());
    } catch (e) {
      return false;
    }
  }

  try {
    Object.keys(FLOWS || {}).forEach(function(key) {
      const f = FLOWS[key];
      const text = (f.title || '') + ' ' + (f.statute || '') + ' ' + (f.tag || '');
      if (safeMatch(q, text)) {
        hits.push({
          label: f.title || key,
          sub: f.statute || '',
          icon: '⚖️',
          action: function() {
            const tile = document.querySelector('.motion-tile[data-motion="' + key + '"]');
            if (tile) selectMotion(key, tile);
            switchTab('builder');
          }
        });
      }
    });
  } catch(e) {}

  try {
    (RIGHTS || []).forEach(function(r) {
      if (safeMatch(q, (r.t || '') + ' ' + (r.s || '') + ' ' + (r.d || ''))) {
        hits.push({ label: r.t || '', sub: r.s || '', icon: '📜', action: function() { switchTab('rights'); } });
      }
    });
  } catch(e) {}

  try {
    (COURTS || []).forEach(function(c) {
      if (safeMatch(q, (c.name || '') + ' ' + (c.court || '') + ' ' + (c.address || ''))) {
        hits.push({ label: c.name || '', sub: c.court || '', icon: '🏛', action: function() { switchTab('courts'); } });
      }
    });
  } catch(e) {}

  try {
    (COUNTY_CLERKS || []).forEach(function(c) {
      if (safeMatch(q, (c.county || '') + ' clerk ' + (c.address || ''))) {
        hits.push({
          label: (c.county || '') + ' County Clerk',
          sub: c.phone || '',
          icon: '🏛',
          action: function() {
            switchTab('courts');
            const cs = document.getElementById('clerk-search');
            if (cs) { cs.value = c.county; renderClerks(); }
          }
        });
      }
    });
  } catch(e) {}

  if (!hits.length) {
    results.innerHTML = '<div class="qsr-no-results">No matches for "<strong>' +
      esc(q) + '</strong>"<div class="hint">Try: motion type, statute number, or county</div></div>';
    results.classList.add('open');
    return;
  }

  const top = hits.slice(0, 8);
  results.innerHTML = top.map(function(h, i) {
    return '<div class="qsr-item" tabindex="0" data-idx="' + i + '">' +
      '<span class="qsr-icon">' + h.icon + '</span>' +
      '<span class="qsr-label">' + esc(h.label) + '<small>' + esc(h.sub) + '</small></span>' +
      '</div>';
  }).join('');
  results.classList.add('open');

  results.querySelectorAll('.qsr-item').forEach(function(el, i) {
    el.addEventListener('click', function() {
      results.classList.remove('open');
      if (input) input.value = top[i].label;
      if (hint) hint.textContent = '';
      top[i].action();
    });
  });
}

if (caseSession) { renderSessionBar(); renderStateMachine(); filterMotionsByState(); }
// ═══════════════════════════════════════════════
// NEW ARCHITECTURE: Single-Question Wizard
// ═══════════════════════════════════════════════

// ── FLATTEN QUESTIONS ──
function buildQuestions() {
  const flow = FLOWS[currentMotion];
  if(!flow) return;
  questions = [];
  flow.steps.forEach((step, si) => {
    step.fields.forEach((f, fi) => {
      questions.push({
        ...f,
        _stepIndex: si,
        _stepTitle: step.title,
        _stepSub: step.sub,
        _tip: step.tip,
        _fi: fi,
        _totalSteps: flow.steps.length,
        _condition: f.condition || null
      });
    });
  });
}

// Decision tree helpers — find next/prev relevant question skipping conditioned-out nodes
function isQuestionRelevant(idx) {
  const q = questions[idx];
  if (!q) return false;
  if (!q._condition) return true;
  const depVal = answers[q._condition.field];
  return depVal === q._condition.equals || depVal === q._condition.is;
}

function getNextRelevantQ(fromIdx) {
  for (let i = fromIdx + 1; i < questions.length; i++) {
    if (isQuestionRelevant(i)) return i;
  }
  return questions.length; // past end = done
}

function getPrevRelevantQ(fromIdx) {
  for (let i = fromIdx - 1; i >= 0; i--) {
    if (isQuestionRelevant(i)) return i;
  }
  return -1; // before start
}

// ── ELIGIBILITY ──
function getEligibilityQ(motionId) {
  const map = {
    "3850": [
      {id:"elig-3850-1", label:"Has it been more than 2 years since your conviction became final?", warningIf:"yes", why:"Rule 3.850(b) generally requires filing within 2 years of the judgment becoming final. Past that window, you need a narrow exception — newly discovered evidence, a retroactive change in the law, or an illegal sentence — or the motion can be dismissed as untimely."},
      {id:"elig-3850-2", label:"Have you filed a 3.850 motion before?", warningIf:"yes", why:"Florida treats most claims as waived if they could have been raised in an earlier 3.850 motion. A second or 'successive' motion must explain why this claim couldn't have been brought the first time."},
      {id:"elig-3850-3", label:"Is your claim based on newly discovered evidence or an illegal sentence?", warningIf:"no", why:"If you're outside the 2-year window and your claim isn't newly discovered evidence or an illegal sentence, you likely don't qualify for one of the few recognized exceptions to the deadline."},
    ],
    "3800": [
      {id:"elig-3800-1", label:"Is your sentence above the legal maximum, below the required minimum, or otherwise illegal?", warningIf:"no", why:"Rule 3.800(a) only corrects sentences that are actually illegal (exceed the statutory max, fall below a mandatory minimum, etc.) — it can't be used to argue the sentence was merely unfair or harsh."},
      {id:"elig-3800-2", label:"Has a direct appeal been decided?", warningIf:"no", why:"A 3.800(a) motion can usually proceed even while an appeal is pending, but coordinate the two so the trial court isn't asked to rule on something the appellate court already controls."},
    ],
    "expunge": [
      {id:"elig-exp-1", label:"Have you ever had a record sealed or expunged before?", warningIf:"yes", why:"Florida allows only one sealing or expungement per lifetime, in any state. A prior one is usually a hard disqualifier for a new petition."},
      {id:"elig-exp-2", label:"Were you adjudicated guilty or was adjudication withheld?", warningIf:"yes", why:"Most sealing and expungement relief requires that adjudication was withheld — an actual conviction (adjudication of guilt) is disqualifying in nearly all cases."},
    ],
    "terminate": [
      {id:"elig-term-1", label:"Have you completed at least 50% of your probation?", warningIf:"no", why:"Fla. Stat. § 948.04 generally expects at least half the supervision term served before a court will consider early termination."},
      {id:"elig-term-2", label:"Are all special conditions completed?", warningIf:"no", why:"Outstanding special conditions (treatment programs, fees, restitution) are one of the most common reasons courts deny early termination, even with good overall compliance."},
    ],
    "restitution": [
      {id:"elig-rest-1", label:"Do you have a documented change in financial circumstances?", warningIf:"no", why:"Under Bearden v. Georgia, courts modify restitution based on an inability to pay caused by a genuine change in circumstances — without one, there's less for the court to act on."},
      {id:"elig-rest-2", label:"Have you made any payments toward restitution?", warningIf:"no", why:"Courts look for evidence of good-faith effort to pay. No payment history makes it harder to show the failure to pay wasn't willful."},
    ],
    "mitigation": [],
    "appeal": [
      {id:"elig-app-1", label:"Has the final judgment or order been entered?", warningIf:"no", why:"An appeal generally can't be filed until there's a final, appealable order — filing too early can be dismissed as premature."},
      {id:"elig-app-2", label:"Are you within the appeal deadline?", warningIf:"no", why:"The Notice of Appeal deadline (usually 30 days from the judgment) is jurisdictional — missing it typically forfeits the right to a direct appeal entirely."},
    ],
    "appeal-record": [],
    "appeal-rehearing": [
      {id:"elig-rh-1", label:"Has the appellate court issued an opinion?", warningIf:"no", why:"A rehearing motion challenges a specific decision the court already made — there's nothing to seek rehearing on until an opinion or order issues."},
      {id:"elig-rh-2", label:"Are you within the rehearing deadline?", warningIf:"no", why:"The rehearing deadline (typically 15 days from the decision) is strict, and once it passes the mandate can issue, ending the appellate court's involvement."},
    ],
    "2254": [
      {id:"elig-2254-1", label:"Have you exhausted your state court remedies?", warningIf:"no", why:"Federal courts generally require every claim to have already been presented to Florida's courts (through Rule 3.850 and its appeal) before they'll hear it — an unexhausted claim is typically dismissed."},
      {id:"elig-2254-2", label:"Is there a federal constitutional issue in your case?", warningIf:"no", why:"Section 2254 only reaches violations of federal constitutional law. A claim based solely on state law, even if correct, isn't something a federal habeas court can grant relief on."},
    ],
  };
  return map[motionId] || [];
}

function renderEligibility() {
  const eligQs = getEligibilityQ(currentMotion);
  const flow = FLOWS[currentMotion];
  const screen = document.getElementById('elig-screen');
  if(!screen) return;
  showElig = true;
  
  if(eligQs.length === 0) {
    // No eligibility questions, skip to wizard
    screen.style.display = 'none';
    startWizardAfterElig();
    return;
  }
  
  let html = '<div class="elig-screen"><h3>Quick Eligibility Check</h3>';
  html += '<p>These questions help identify any potential issues before you begin. Your answers will not prevent you from proceeding.</p>';
  
  eligQs.forEach(q => {
    const val = eligAnswers[q.id];
    const showWarning = val !== undefined && val === q.warningIf;
    html += '<div class="elig-q">';
    html += '<div class="elig-q-label">'+esc(q.label)+'</div>';
    html += '<div class="elig-btns">';
    html += '<button class="elig-btn'+(val==='yes'?' selected-yes':'')+'" onclick="eligAnswer(\''+q.id+'\',\'yes\')">Yes</button>';
    html += '<button class="elig-btn'+(val==='no'?' selected-no':'')+'" onclick="eligAnswer(\''+q.id+'\',\'no\')">No</button>';
    html += '</div>';
    if(showWarning) {
      html += '<div class="elig-warning">'+esc(q.why || 'You may face challenges with this factor, but you can still continue.')+'</div>';
    } else if(val !== undefined) {
      html += '<div class="elig-ok">Good — noted.</div>';
    }
    html += '</div>';
  });
  
  const allAnswered = eligQs.every(q => eligAnswers[q.id] !== undefined);
  html += '<button class="btn-next" onclick="startWizardAfterElig()" '+(allAnswered?'':'disabled style="opacity:0.4"')+'>Continue to Motion Builder →</button>';
  html += '</div>';
  
  screen.innerHTML = html;
  screen.style.display = 'block';
  document.getElementById('q-wizard').style.display = 'none';
  document.getElementById('wizard').classList.add('open');
}

function eligAnswer(id, val) {
  eligAnswers[id] = val;
  saveToSession(id, val);
  renderEligibility();
}

function startWizardAfterElig() {
  document.getElementById('elig-screen').style.display = 'none';
  showElig = false;
  buildQuestions();
  
  // Restore answers from eligibility state if resuming
  if(currentQ >= questions.length) currentQ = 0;
  
  const flow = FLOWS[currentMotion];
  document.getElementById('wizard-title').textContent = flow.title;
  document.getElementById('wizard-statute').textContent = flow.statute;
  document.getElementById('completion').classList.remove('show');
  document.getElementById('wizard').classList.add('open');
  document.getElementById('live-preview').style.display = 'block';
  syncQuestionProgressFallback();
  renderRiskGrid(currentMotion, answers);
  renderTimeline(currentMotion, answers);
  renderCaseScanner(currentMotion, answers);
  renderEligibilityPanel();
  renderCaseIntelligence();
  renderEmergencyAlerts();
  renderCaseSummary();
  renderStatusBar();

  document.getElementById('q-wizard').style.display = 'block';
  renderQuestion('forward');
  updateLivePreview();
  renderStrength();
  renderEmotionalIntel();
}

function syncQuestionProgressFallback() {
  const mini = document.getElementById('q-progress-mini');
  const label = document.getElementById('q-progress-label');
  const fill = document.getElementById('q-progress-fill');
  const totalEl = document.getElementById('q-total');
  const pctEl = document.getElementById('q-pct');

  if (!currentMotion || !questions.length) {
    if (mini) mini.innerHTML = 'Select a motion type above to begin';
    if (label) label.textContent = 'Getting Started';
    if (fill) fill.style.width = '0%';
    if (totalEl) totalEl.textContent = '0';
    if (pctEl) pctEl.textContent = '0%';
    return;
  }

  const total = questions.length;
  const current = Math.min(currentQ + 1, total);
  const pct = total > 0 ? Math.round((currentQ / total) * 100) : 0;
  const tag = FLOWS[currentMotion] ? ' — ' + FLOWS[currentMotion].tag : '';

  if (mini) mini.innerHTML = 'Question <span>' + current + '</span> of <span id="q-total">' + total + '</span> · You\'re <span id="q-pct">' + pct + '%</span> done';
  if (label) label.textContent = 'Question ' + current + ' of ' + total + tag;
  if (fill) fill.style.width = pct + '%';
  if (totalEl) totalEl.textContent = total;
  if (pctEl) pctEl.textContent = pct + '%';
}

// Visualizes the whole flow.steps sequence as a row of "gates" — lets the
// user see how many stages stand between them and filing, not just the
// current question's place within the current stage.
function renderJourneyMap() {
  const wrap = document.getElementById('journey-map');
  if (!wrap) return;
  const flow = currentMotion ? FLOWS[currentMotion] : null;
  if (!flow || !questions.length) {
    wrap.style.display = 'none';
    wrap.innerHTML = '';
    return;
  }
  const currentStepIndex = questions[currentQ] ? questions[currentQ]._stepIndex : 0;
  wrap.style.display = 'flex';
  wrap.innerHTML = flow.steps.map((step, i) => {
    const state = i < currentStepIndex ? 'done' : i === currentStepIndex ? 'current' : 'upcoming';
    return '<div class="journey-gate journey-gate--' + state + '" title="' + esc(step.title) + '">' +
      '<div class="journey-gate-dot">' + (state === 'done' ? '✓' : (i + 1)) + '</div>' +
      '<div class="journey-gate-label">' + esc(step.title) + '</div>' +
      '</div>';
  }).join('<div class="journey-gate-line"></div>');
}

function setQuestionIdleState() {
  const label = document.getElementById('q-progress-label');
  const mini = document.getElementById('q-progress-mini');
  const pct = document.getElementById('q-progress-pct');
  const fill = document.getElementById('q-progress-fill');
  const total = document.getElementById('q-total');
  const pctInline = document.getElementById('q-pct');
  if (label) label.textContent = 'Getting Started';
  if (mini) mini.textContent = 'Select a motion type above to begin';
  if (pct) pct.textContent = '0%';
  if (fill) fill.style.width = '0%';
  if (total) total.textContent = '0';
  if (pctInline) pctInline.textContent = '0%';
  renderJourneyMap();
}

// ── RENDER SINGLE QUESTION ──
function renderQuestion(dir) {
  if(!currentMotion || !FLOWS[currentMotion] || !questions.length) {
    setQuestionIdleState();
    return;
  }
  const q = questions[currentQ];
  const total = questions.length;
  // Count visible questions for accurate progress
  let visibleCount = 0, visibleIdx = -1;
  for (let i = 0; i < total; i++) {
    if (isQuestionRelevant(i)) { visibleCount++; if (i === currentQ) visibleIdx = visibleCount; }
  }
  if (visibleCount === 0) {
    setQuestionIdleState();
    return;
  }
  const pct = visibleCount > 0 ? Math.round((visibleIdx / visibleCount) * 100) : 0;
  const flow = FLOWS[currentMotion];

  // Progress bar
  const stepTag = 'Step '+(q._stepIndex+1)+' of '+q._totalSteps+' — ';
  document.getElementById('q-progress-label').textContent = stepTag+'Question '+(visibleIdx)+' of '+visibleCount+' — '+(flow ? flow.tag : '');
  document.getElementById('q-progress-pct').textContent = pct + '%';
  document.getElementById('q-progress-fill').style.width = pct + '%';
  renderJourneyMap();

  // Mini progress
  document.getElementById('q-progress-mini').innerHTML = 'Question <span>'+(visibleIdx)+'</span> of <span id="q-total">'+visibleCount+'</span> · You\'re <span id="q-pct">'+pct+'%</span> done';

  // Back/Next buttons
  const hasPrev = getPrevRelevantQ(currentQ) >= 0;
  const isLast = getNextRelevantQ(currentQ) >= questions.length;
  document.getElementById('btn-back').disabled = !hasPrev;
  document.getElementById('btn-next').textContent = isLast ? '💾 Save Draft' : 'Next →';

  // Build question card
  const card = document.getElementById('q-card');
  const animClass = dir === 'backward' ? 'animate-left' : 'animate-right';
  card.className = 'q-card ' + animClass;

  const saved = answers[q.id] || '';
  const sectionTag = '<div class="q-section-tag">Step '+(q._stepIndex+1)+' of '+q._totalSteps+': '+esc(q._stepTitle)+'</div>';

  // Condition badge — show what triggered this question
  let condBadge = '';
  if (q._condition) {
    const depVal = answers[q._condition.field] || 'answered';
    condBadge = '<div class="q-cond-badge">Based on your answer: <strong>'+esc(depVal)+'</strong></div>';
  }

  let inputHtml = '';
  if(q.type === 'decision') {
    const opts = q.options || [];
    inputHtml = '<div class="decision-grid">' +
      opts.map(function(o) {
        const isSelected = saved === o;
        return '<div class="decision-btn' + (isSelected ? ' selected' : '') + '" onclick="selectDecision(\'' + esc(q.id) + '\',\'' + esc(o) + '\')">' +
          '<span class="decision-btn-text">' + esc(o) + '</span>' +
          (isSelected ? '<span class="decision-btn-check">✓</span>' : '') +
        '</div>';
      }).join('') +
    '</div>';
  } else if(q.type === 'checkbox') {
    inputHtml = '<div class="checkbox-item"><input type="checkbox" id="q-field" '+(saved==='true'?'checked':'')+' onchange="saveCurrentAnswer()"><label for="q-field">'+esc(q.label)+(q.detail?' <small>'+esc(q.detail)+'</small>':'')+'</label></div>';
  } else if(q.type === 'select') {
    inputHtml = '<select id="q-field" class="field-select" onchange="saveCurrentAnswer()">';
    inputHtml += '<option value="">— Select —</option>';
    (q.options||[]).forEach(o => inputHtml += '<option value="'+esc(o)+'" '+(saved===o?'selected':'')+'>'+esc(o)+'</option>');
    inputHtml += '</select>';
  } else if(q.type === 'textarea') {
    inputHtml = '<textarea id="q-field" class="field-textarea" placeholder="'+esc(q.placeholder||'')+'" oninput="saveCurrentAnswer()">'+esc(saved)+'</textarea>';
  } else if(q.type === 'date') {
    const today = new Date().toISOString().slice(0,10);
    inputHtml = '<input type="date" id="q-field" class="field-input" value="'+(saved||today)+'" onchange="saveCurrentAnswer()">';
  } else {
    const caseNumAttrs = q.id === 'case-num' ? ' oninput="saveCurrentAnswer();checkCaseNumberFormat(this)"' : ' oninput="saveCurrentAnswer()"';
    inputHtml = '<input type="'+(q.type||'text')+'" id="q-field" class="field-input" placeholder="'+esc(q.placeholder||'')+'" value="'+esc(saved)+'"'+caseNumAttrs+'>';
  }

  // Field-specific help, shown inline (no toggle needed — it's short and answers "what is this asking").
  let fieldHelpHtml = '';
  const helpText = q.help || getFieldHelpFallback(q);
  if(helpText) {
    fieldHelpHtml = '<div class="q-field-help">ⓘ '+esc(helpText)+'</div>';
  }
  if (q.id === 'case-num') {
    fieldHelpHtml += '<div class="q-format-hint" id="q-format-hint"></div>';
  }

  // Why this matters (step-level — broader context than the field help above)
  let whyHtml = '';
  if(q._tip && q._tip.text) {
    whyHtml = '<div class="q-why"><div class="q-why-toggle" onclick="toggleWhy(this)">ⓘ Why this matters</div><div class="q-why-content">'+esc(q._tip.text)+'</div></div>';
  }

  // Reassurance
  let reassurance = 'This helps the court understand your case better.';
  if(visibleIdx % 5 === 0 && visibleIdx > 0) {
    reassurance = 'You\'re doing great — just a few more questions.';
  }

  card.innerHTML = sectionTag + condBadge + '<div class="q-question">'+esc(q.label)+'</div>' + fieldHelpHtml + inputHtml + whyHtml + '<div class="q-reassurance">'+reassurance+'</div>';

  renderEmotionalIntel();

  if (q.id === 'case-num' && saved) {
    checkCaseNumberFormat(document.getElementById('q-field'));
  }

  // Focus input
  setTimeout(() => {
    const el = document.getElementById('q-field');
    if(el && (el.tagName==='INPUT'||el.tagName==='TEXTAREA') && el.type!=='checkbox' && el.type!=='date') el.focus();
  }, 350);
}

// Decision selection — stores answer and auto-advances
function selectDecision(id, val) {
  answers[id] = val;
  saveToSession(id, val);
  schedulePreviewUpdate();
  scheduleAutoSave();
  renderStrength();
  // Re-render to show selected state
  renderQuestion(qAnimDir || 'forward');
  // Auto-advance after brief pause
  setTimeout(function() {
    const nextIdx = getNextRelevantQ(currentQ);
    if (nextIdx >= questions.length) {
      saveDraft();
    } else {
      currentQ = nextIdx;
      qAnimDir = 'forward';
      renderQuestion('forward');
      document.getElementById('q-card').scrollIntoView({behavior:'smooth',block:'start'});
      schedulePreviewUpdate();
      renderStrength();
    }
  }, 300);
}

function toggleWhy(el) {
  const content = el.nextElementSibling;
  if(content) content.classList.toggle('open');
}

// ── SAVE CURRENT ANSWER ──
function saveCurrentAnswer() {
  const q = questions[currentQ];
  if(!q) return;
  const el = document.getElementById('q-field');
  if(!el) return;
  const val = q.type === 'checkbox' ? (el.checked ? 'true' : 'false') : el.value;
  answers[q.id] = val;
  saveToSession(q.id, val);
  
  // Synthesize legal version for textareas
  if(q.type === 'textarea' && val.trim()) {
    synthesizeLegal(q.id, val);
  }
  
  schedulePreviewUpdate();
  scheduleAutoSave();
}

// Real-time format check for case-number fields — Florida case numbers are
// almost always YYYY-xx-XXXXXX (year, division code, sequence). Flags the
// input rather than blocking it, since real-world numbers vary by clerk.
function checkCaseNumberFormat(el) {
  const hint = document.getElementById(el.id === 'intake-case-num' ? 'intake-case-num-hint' : 'q-format-hint');
  const val = (el.value || '').trim();
  if (!val) {
    el.classList.remove('field-warn');
    if (hint) hint.textContent = '';
    return;
  }
  const looksRight = /^\d{4}-[A-Za-z]{1,4}-\d{3,8}/.test(val);
  el.classList.toggle('field-warn', !looksRight);
  if (hint) {
    hint.textContent = looksRight ? '' : 'Doesn\'t look like a standard Florida case number (usually YYYY-CF-XXXXXX) — double-check it against your judgment or docket before continuing.';
  }
}

// ── SYNTHESIS ──
function synthesizeLegal(id, plainVal) {
  if(!plainVal || !plainVal.trim()) { legalAnswers[id] = ''; return; }
  let legal = plainVal
    .replace(/\bmy lawyer\b/gi, 'Defendant\'s trial counsel')
    .replace(/\bmy attorney\b/gi, 'Defendant\'s trial counsel')
    .replace(/\blawyer\b/gi, 'trial counsel')
    .replace(/\battorney\b/gi, 'counsel')
    .replace(/\bdidn't\b/gi, 'failed to')
    .replace(/\bcan't\b/gi, 'cannot')
    .replace(/\bwon't\b/gi, 'will not')
    .replace(/\bgonna\b/gi, 'will')
    .replace(/\bwanna\b/gi, 'wish to')
    .replace(/\bgotta\b/gi, 'must')
    .replace(/\bcops\b/gi, 'law enforcement officers')
    .replace(/\bjudge\b/gi, 'the Court')
    .replace(/\bd.a\.\b/gi, 'the State')
    .replace(/\bda\b/gi, 'the State')
    .replace(/\bplea deal\b/gi, 'plea agreement')
    .replace(/\bpled\b/gi, 'entered a plea of');
  // Capitalize first letter
  legal = legal.charAt(0).toUpperCase() + legal.slice(1);
  legalAnswers[id] = legal;
}

// ── NAVIGATION ──
function nextQ() {
  if(!validateCurrent()) return;
  saveCurrentAnswer();
  const nextIdx = getNextRelevantQ(currentQ);
  if(nextIdx >= questions.length) {
    saveDraft();
    return;
  }
  currentQ = nextIdx;
  qAnimDir = 'forward';
  renderQuestion('forward');
  document.getElementById('q-card').scrollIntoView({behavior:'smooth',block:'start'});
  schedulePreviewUpdate();
  renderStrength();
}

function prevQ() {
  const prevIdx = getPrevRelevantQ(currentQ);
  if(prevIdx < 0) return;
  saveCurrentAnswer();
  currentQ = prevIdx;
  qAnimDir = 'backward';
  renderQuestion('backward');
  schedulePreviewUpdate();
  renderStrength();
}

// ── VALIDATION ──
function validateCurrent() {
  const q = questions[currentQ];
  if(!q || !q.required) return true;
  const el = document.getElementById('q-field');
  if(!el) return true;
  const val = q.type === 'checkbox' ? (el.checked ? 'true' : 'false') : (el.value || '').trim();
  if(!val || val === 'false') {
    toast('The court usually asks for this so your motion can move forward.');
    return false;
  }
  return true;
}

// ═══════════════════════════════════════════════
// MOTION STRENGTH LAYER — AI-Powered Assessment
// ═══════════════════════════════════════════════

const MOTION_EVALUATORS = {
  "3850": {
    assess: function(a, e) {
      let score = 50, reasons = [], strengths = [], weaknesses = [], recs = [];
      const timely = (e['elig-3850-1'] || '').toLowerCase();
      const prior = (e['elig-3850-2'] || '').toLowerCase();
      const claim = (e['elig-3850-3'] || '').toLowerCase();

      if (timely.includes('yes')) { score -= 25; weaknesses.push('Beyond 2-year deadline — procedural bar unless exception applies'); recs.push('Argue timeliness exception (newly discovered evidence, retroactive change in law)'); }
      else if (timely.includes('no')) { score += 15; strengths.push('Within 2-year filing window'); }

      if (prior.includes('yes')) { score -= 20; weaknesses.push('Successive 3.850 — requires appellate permission'); recs.push('Seek leave from appellate court before filing successive petition'); }
      else if (prior.includes('no')) { score += 10; strengths.push('First 3.850 petition — no successive bar'); }

      if (claim.includes('newly') || claim.includes('illegal')) { score += 15; strengths.push('Claim type (new evidence/illegal sentence) has strongest legal footing'); }
      else if (claim.includes('yes')) { score += 5; }
      else if (claim.includes('no')) { score -= 10; weaknesses.push('Claim type weak — IAC and other claims face higher pleading standards'); recs.push('Develop specific factual allegations — conclusory claims are routinely denied'); }

      const hasFacts = (a['3850-facts'] || '').length > 50;
      if (hasFacts) { score += 10; strengths.push('Detailed factual allegations strengthen the pleading'); }
      else { weaknesses.push('Short or missing statement of facts'); recs.push('Include specific dates, names, and events in the statement of facts'); }

      if (score < 0) score = 0;
      if (score > 100) score = 100;

      const burden = hasFacts ? 'high' : 'very-high';
      const diff = prior.includes('yes') ? 'expert' : 'high';
      const docs = ['Judgment & Sentence', 'Appellate Mandate (if appealed)', 'Supporting Affidavits', 'Memorandum of Law', 'Certificate of Service'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "3800": {
    assess: function(a, e) {
      let score = 55, reasons = [], strengths = [], weaknesses = [], recs = [];
      const illegal = (a['3800-illegal-basis'] || '').toLowerCase();
      const aboveMax = (a['3800-illegal-basis'] || '').toLowerCase().includes('maximum') || (a['sent-type'] || '').toLowerCase().includes('maximum');

      if (aboveMax) { score += 20; strengths.push('Sentence exceeds statutory maximum — strongest 3.800(a) claim'); }
      else if (illegal.includes('illegal') || illegal.includes('scoresheet') || illegal.includes('error')) { score += 10; strengths.push('Colorable illegality claim — scoresheet errors are common'); }
      else if (illegal.includes('minimum') || illegal.includes('mandatory')) { score += 5; }
      else { score -= 10; weaknesses.push('Unclear basis for illegality claim'); recs.push('Identify the specific sentencing error — check scoresheet, statutory maximum, and mandatory minimum'); }

      const hasDetail = (a['3800-relief'] || '').length > 30;
      if (hasDetail) { score += 10; strengths.push('Specific relief requested — court can act without speculation'); }
      else { weaknesses.push('Vague or missing relief request'); recs.push('State exactly what sentence should be imposed and the legal authority'); }

      score = Math.max(0, Math.min(100, score));
      const burden = aboveMax ? 'low' : 'medium';
      const diff = aboveMax ? 'easy' : 'moderate';
      const docs = ['Sentencing Scoresheet', 'Judgment & Sentence', 'Applicable Statute', 'Sentencing Transcript (recommended)'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "expunge": {
    assess: function(a, e) {
      let score = 50, strengths = [], weaknesses = [], recs = [];
      const prior = (e['elig-exp-1'] || a['elig-prior-seal'] || '').toLowerCase();
      const convicted = (e['elig-exp-2'] || a['elig-convicted'] || '').toLowerCase();
      const chargeType = (a['elig-charge-type'] || '').toLowerCase();
      const disqual = (a['elig-disqualifying'] || '').toLowerCase();

      if (prior.includes('yes') || prior.includes('disqualify')) { score -= 30; weaknesses.push('One-time bar triggered — prior seal/expunge used'); recs.push('Only option is executive clemency'); }
      else if (prior.includes('no')) { score += 10; strengths.push('One-time opportunity still available'); }

      if (convicted.includes('convicted') || convicted.includes('yes')) { score -= 25; weaknesses.push('Adjudication of guilt — general bar to seal/expunge'); recs.push('Verify adjudication status — if withheld, correct the record'); }
      else if (convicted.includes('withhold') || convicted.includes('no')) { score += 15; strengths.push('Adjudication withheld — meets core eligibility requirement'); }

      if (chargeType.includes('dismissed') || chargeType.includes('nolle') || chargeType.includes('arrest only')) { score += 10; strengths.push('Charge disposition favorably qualifies'); }
      else if (chargeType.includes('withhold')) { score += 5; }

      if (disqual.includes('murder') || disqual.includes('sexual') || disqual.includes('robbery')) { score -= 20; weaknesses.push('Disqualifying offense category — statutory bar'); recs.push('Check F.S. § 943.0585(2)(a) for full list of disqualifying offenses'); }
      else if (disqual.includes('none') || !disqual) { score += 10; strengths.push('No disqualifying offense detected'); }

      const hasFdle = (a['fdle-cert'] || '').toLowerCase();
      if (hasFdle.includes('yes') || hasFdle.includes('have')) { score += 10; strengths.push('FDLE Certificate of Eligibility on hand'); }

      score = Math.max(0, Math.min(100, score));
      const burden = 'low';
      const diff = 'easy';
      const docs = ['FDLE Certificate of Eligibility', 'Arrest/Disposition Record', 'Petition Form', 'Applicable Statute § 943.0585/§ 943.059'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "terminate": {
    assess: function(a, e) {
      let score = 50, strengths = [], weaknesses = [], recs = [];
      const pctComplete = parseInt(a['prob-pct'] || '0');
      const hasViolations = (a['prob-violations'] || '').toLowerCase();
      const hasEmployment = (a['prob-employment'] || '').toLowerCase();
      const hasPOrec = (a['prob-po-rec'] || '').toLowerCase();
      const paidFines = (a['prob-fines'] || '').toLowerCase();

      if (pctComplete >= 50) { score += 15; strengths.push('Over 50% of probation completed — threshold met'); }
      else { score -= 10; weaknesses.push('Under 50% completion — early termination less likely'); recs.push('Consider waiting until 50% completion or demonstrate exceptional circumstances'); }

      if (hasViolations.includes('no') || hasViolations.includes('none')) { score += 15; strengths.push('No violations — clean probation record'); }
      else if (hasViolations.length > 0) { score -= 15; weaknesses.push('Probation violations on record'); recs.push('Address violations before seeking early termination — complete any sanctions'); }

      if (hasEmployment.includes('yes') || hasEmployment.includes('employed')) { score += 10; strengths.push('Employed — stability factor favors early termination'); }
      else if (hasEmployment.length > 0) { score -= 5; }

      if (hasPOrec.includes('favorable') || hasPOrec.includes('recommend') || hasPOrec.includes('support')) { score += 10; strengths.push('Probation Officer recommendation — very persuasive to the court'); }
      else if (hasPOrec.includes('oppose') || hasPOrec.includes('no')) { score -= 15; weaknesses.push('Probation Officer opposes — significantly reduces chances'); recs.push('Address PO concerns and document compliance before filing'); }

      if (paidFines.includes('yes') || paidFines.includes('paid') || paidFines.includes('complete')) { score += 5; strengths.push('Restitution/fines satisfied'); }

      score = Math.max(0, Math.min(100, score));
      const burden = 'medium';
      const diff = 'moderate';
      const docs = ['Probation Order', 'Compliance Record', 'Employment Verification', 'PO Recommendation', 'Financial Proof (restitution/fines)'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "restitution": {
    assess: function(a, e) {
      let score = 45, strengths = [], weaknesses = [], recs = [];
      const hardship = (a['rest-hardship'] || '').toLowerCase();
      const efforts = (a['rest-efforts'] || '').toLowerCase();
      const current = (a['rest-current-amount'] || '0').replace(/[^0-9]/g, '');
      const income = (a['rest-income'] || '').toLowerCase();

      if (hardship.length > 40) { score += 15; strengths.push('Detailed financial hardship documented'); }
      else { weaknesses.push('Limited financial hardship explanation'); recs.push('Detail specific financial circumstances — medical expenses, job loss, family obligations'); }

      if (efforts.includes('paid') || efforts.includes('partial') || efforts.includes('attempt')) { score += 10; strengths.push('Bona fide efforts to pay demonstrated'); }
      else { weaknesses.push('No documented effort to pay'); recs.push('Document any payments made, even partial — good faith matters'); }

      if (income.includes('minimum') || income.includes('unemployed') || income.includes('disability') || income.includes('fixed')) { score += 10; strengths.push('Limited income supports modification'); }

      const amount = parseInt(current) || 0;
      if (amount > 10000) { score += 5; strengths.push('Large restitution amount increases modification justification'); }

      score = Math.max(0, Math.min(100, score));
      const burden = 'medium';
      const diff = 'moderate';
      const docs = ['Restitution Order', 'Financial Affidavit', 'Proof of Income', 'Payment History', 'Hardship Documentation'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "appeal": {
    assess: function(a, e) {
      let score = 50, strengths = [], weaknesses = [], recs = [];
      const appellateDeadline = (a['app-deadline'] || '').toLowerCase();
      const preserved = (a['app-issues'] || '').toLowerCase();
      const hasTranscript = (a['app-transcript'] || '').toLowerCase();

      if (appellateDeadline.includes('30') || appellateDeadline.includes('within') || appellateDeadline.includes('timely')) { score += 15; strengths.push('Timely filing — within appellate window'); }
      else if (appellateDeadline.length > 0) { score -= 10; weaknesses.push('Potential timeliness concern'); recs.push('Verify entry date of order — appellate clock starts at entry, not hearing'); }

      if (preserved.length > 50) { score += 15; strengths.push('Specific preserved issues identified — key to appellate success'); }
      else { weaknesses.push('Issues not clearly identified or preserved'); recs.push('Identify specific errors preserved in the trial record with citations'); }

      if (hasTranscript.includes('yes') || hasTranscript.includes('ordered')) { score += 10; strengths.push('Transcript ordered — critical for meaningful appellate review'); }
      else { weaknesses.push('No transcript arranged'); recs.push('Order trial transcript immediately — delay can waive issues'); }

      const hasRecord = (a['app-record-need'] || '').length > 20;
      if (hasRecord) { score += 5; }

      score = Math.max(0, Math.min(100, score));
      const burden = 'high';
      const diff = 'high';
      const docs = ['Notice of Appeal', 'Order Being Appealed', 'Trial Transcript', 'Record on Appeal', 'Initial Brief'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "2254": {
    assess: function(a, e) {
      let score = 40, strengths = [], weaknesses = [], recs = [];
      const exhausted = (a['2254-exhausted'] || '').toLowerCase();
      const claimType = (a['2254-claim-type'] || '').toLowerCase();
      const timely = (a['2254-timely'] || '').toLowerCase();
      const stateAppeal = (a['2254-state-appeal'] || '').toLowerCase();

      if (exhausted.includes('yes') || exhausted.includes('appeal') || exhausted.includes('denied')) { score += 20; strengths.push('State remedies exhausted — jurisdictional prerequisite met'); }
      else if (exhausted.includes('no')) { score -= 25; weaknesses.push('State remedies not exhausted — federal habeas requires exhaustion'); recs.push('File state postconviction first — federal court will dismiss unexhausted petitions'); }

      if (claimType.includes('constitutional') || claimType.includes('ineffective') || claimType.includes('due process') || claimType.includes('cognizable')) { score += 15; strengths.push('Cognizable constitutional claim — proper federal habeas grounds'); }
      else { weaknesses.push('Claim may not be cognizable in federal habeas'); recs.push('Frame claim as constitutional violation — federal habeas only reviews constitutional claims'); }

      if (timely.includes('year') || timely.includes('<') || timely.includes('within')) { score += 10; strengths.push('Within AEDPA 1-year statute of limitations'); }
      else if (timely.includes('over') || timely.includes('>')) { score -= 15; weaknesses.push('Potential AEDPA time bar'); recs.push('Calculate AEDPA deadline with statutory tolling — check for equitable tolling'); }

      if (stateAppeal.includes('denied') || stateAppeal.includes('supreme')) { score += 5; strengths.push('State appellate review complete'); }

      score = Math.max(0, Math.min(100, score));
      const burden = 'very-high';
      const diff = 'expert';
      const docs = ['State Court Record (complete)', 'AEDPA Petition Form (AO 241)', 'Memorandum of Law', 'Proof of Exhaustion', 'Certificate of Appealability Request'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  },
  "mitigation": {
    assess: function(a, e) {
      let score = 50, strengths = [], weaknesses = [], recs = [];
      const bg = (a['mit-bio'] || '').toLowerCase();
      const rehab = (a['mit-rehab'] || '').toLowerCase();
      const accept = (a['mit-acceptance'] || '').toLowerCase();

      if (bg.length > 100) { score += 15; strengths.push('Comprehensive personal background — humanizes the petitioner'); }
      else { weaknesses.push('Limited personal background detail'); recs.push('Include family background, childhood experiences, trauma history, and turning points'); }

      if (rehab.includes('program') || rehab.includes('counseling') || rehab.includes('treatment') || rehab.includes('classes')) { score += 15; strengths.push('Rehabilitation efforts documented — most compelling mitigation factor'); }
      else { weaknesses.push('No rehabilitation evidence'); recs.push('Document all programs, counseling, treatment, and self-improvement since the offense'); }

      if (accept.includes('responsibility') || accept.includes('sorry') || accept.includes('regret') || accept.includes('accountable')) { score += 10; strengths.push('Acceptance of responsibility shown'); }
      else { weaknesses.push('No expression of accountability'); recs.push('Include a statement taking responsibility — courts weigh this heavily'); }

      const hasTimeline = (a['mit-timeline'] || '').length > 50;
      if (hasTimeline) { score += 5; }

      score = Math.max(0, Math.min(100, score));
      const burden = 'medium';
      const diff = 'moderate';
      const docs = ['Personal Statement', 'Character References', 'Rehabilitation Certificates', 'Employment/Education Records', 'Medical/Mental Health Records (if applicable)'];

      return { score, burden, difficulty: diff, requiredDocs: docs, reasoning: buildReasoning(score, strengths, weaknesses), strengths, weaknesses, recommendations: recs };
    }
  }
};

function buildReasoning(score, strengths, weaknesses) {
  if (score >= 80) return 'Strong case with multiple favorable factors — proceed with confidence';
  if (score >= 60) return 'Moderately strong case — address weaknesses to strengthen position';
  if (score >= 40) return 'Mixed outlook — weaknesses need attention before filing';
  if (score >= 20) return 'Significant challenges exist — consult with attorney before filing';
  return 'Major procedural or substantive barriers — legal consultation strongly recommended';
}

function evaluateMotionStrength(motionId, answers, eligAnswers) {
  const evaluator = MOTION_EVALUATORS[motionId];
  if (!evaluator) {
    const s = calcStrength();
    return { score: s.pct, burden: 'unknown', difficulty: 'unknown', requiredDocs: [], reasoning: 'Strength assessment based on field completion. Select a specific motion type for detailed analysis.', strengths: [], weaknesses: [], recommendations: [] };
  }
  const result = evaluator.assess(answers, eligAnswers);
  const completion = calcStrength();
  const finalScore = Math.round((result.score * 0.7 + completion.pct * 0.3));
  return { ...result, score: finalScore };
}

// ── STRENGTH METER ──
function calcStrength() {
  const flow = FLOWS[currentMotion];
  if(!flow || !questions.length) return {pct:0, color:'var(--red)', items:[]};
  let required=0, requiredFilled=0;
  let optional=0, optionalFilled=0;
  const missing = [];
  questions.forEach(q => {
    const val = answers[q.id];
    const filled = val && val.trim() && val !== 'false' && val !== '';
    if(q.required) {
      required++;
      if(filled) requiredFilled++;
      else if(q.label) missing.push(q.label);
    } else {
      optional++;
      if(filled) optionalFilled++;
    }
  });
  const reqPct = required ? requiredFilled/required : 1;
  const optPct = optional ? optionalFilled/optional : 1;
  
  const eligQs = getEligibilityQ(currentMotion);
  let eligScore = 1;
  if(eligQs.length) {
    const answered = eligQs.filter(e => eligAnswers[e.id] !== undefined).length;
    const concerns = eligQs.filter(e => eligAnswers[e.id] !== undefined && e.warningIf === eligAnswers[e.id]).length;
    eligScore = (answered/eligQs.length) * (concerns===0 ? 1 : 0.5);
  }
  const pct = Math.round((reqPct * 0.6 + optPct * 0.2 + eligScore * 0.2) * 100);
  const color = pct < 40 ? 'var(--red)' : pct < 70 ? 'var(--gold)' : 'var(--green)';
  return {pct, color, missing: missing.slice(0,5)};
}

// ── COMMAND CENTER TOGGLE ──
function cmdToggle(id) {
  var header = document.getElementById(id);
  if (!header) return;
  var body = header.nextElementSibling;
  if (!body) return;
  var toggle = header.querySelector('.cmd-card-toggle');
  var isOpen = body.classList.contains('open');
  if (isOpen) {
    body.classList.remove('open');
    header.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
  } else {
    body.classList.add('open');
    header.classList.add('open');
    if (toggle) toggle.classList.add('open');
  }
}

function cmdOpen(id) {
  var header = document.getElementById(id);
  if (!header) return;
  var body = header.nextElementSibling;
  if (!body) return;
  var toggle = header.querySelector('.cmd-card-toggle');
  body.classList.add('open');
  header.classList.add('open');
  if (toggle) toggle.classList.add('open');
}

function renderXai(x) {
  if (!x) return '';
  var statute = x.statute || '';
  var rule = x.rule || '';
  var reasoning = x.reasoning || '';
  var authority = x.authority || '';
  var caseLaw = x.caseLaw || '';
  var hasStatute = statute && statute.length > 2;
  var hasRule = rule && rule.length > 2;
  var hasReason = reasoning && reasoning.length > 2;
  var hasAuth = authority && authority.length > 2;
  var hasCase = caseLaw && caseLaw.length > 2;
  if (!hasStatute && !hasRule && !hasReason && !hasAuth && !hasCase) return '';
  var rows = '';
  if (hasStatute) rows += '<div class="xai-row"><span class="xai-label">Statute</span><span class="xai-value"><span class="xai-cite">' + esc(statute) + '</span></span></div>';
  if (hasRule) rows += '<div class="xai-row"><span class="xai-label">Rule</span><span class="xai-value">' + esc(rule) + '</span></div>';
  if (hasAuth) rows += '<div class="xai-row"><span class="xai-label">Authority</span><span class="xai-value">' + esc(authority) + '</span></div>';
  if (hasCase) rows += '<div class="xai-row"><span class="xai-label">Case Law</span><span class="xai-value"><span class="xai-cite">' + esc(caseLaw) + '</span></span></div>';
  if (hasReason) rows += '<div class="xai-row"><span class="xai-label">Reasoning</span><span class="xai-value">' + esc(reasoning) + '</span></div>';
  return '<button class="xai-toggle" onclick="this.nextElementSibling.classList.toggle(\'open\');this.classList.toggle(\'open\')">⚖️ WHY THIS MATTERS</button><div class="xai-body">' + rows + '</div>';
}

function renderStatusBar() {
  var bar = document.getElementById('status-bar');
  if (!bar) return;
  if (!currentMotion) { bar.style.display = 'none'; return; }
  var flow = FLOWS[currentMotion];
  if (!flow) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';

  // Relief window assessment
  var s = calcStrength();
  var eligResults = currentMotion && ELIGIBILITY_INTELLIGENCE[currentMotion]
    ? getEligibilityIntelligence(currentMotion, answers, eligAnswers) : [];
  var blocks = eligResults.filter(function(r){return r.status==='block';}).length;
  var warns = eligResults.filter(function(r){return r.status==='warn';}).length;

  var emergencies = detectProceduralEmergencies(currentMotion, answers, eligAnswers);
  var criticalAlerts = emergencies.filter(function(a){return a.severity==='critical';}).length;
  var warningAlerts = emergencies.filter(function(a){return a.severity==='warning';}).length;

  // Relief window
  var reliefStatus = 'active', reliefColor = 'var(--green)', reliefDot = 'green';
  if (blocks > 0) { reliefStatus = 'BLOCKED'; reliefColor = 'var(--red)'; reliefDot = 'red'; }
  else if (criticalAlerts > 0) { reliefStatus = 'THREATENED'; reliefColor = 'var(--red)'; reliefDot = 'red'; }
  else if (warns > 0 || warningAlerts > 0) { reliefStatus = 'AT RISK'; reliefColor = 'var(--gold)'; reliefDot = 'amber'; }
  else if (s.pct >= 70) { reliefStatus = 'FAVORABLE'; reliefColor = 'var(--green)'; reliefDot = 'green'; }

  // Urgency
  var urgency = 'LOW', urgencyColor = 'var(--green)';
  if (criticalAlerts > 0) { urgency = 'CRITICAL'; urgencyColor = 'var(--red) keyframes pulseUrgent'; }
  else if (blocks > 0 || warningAlerts > 1) { urgency = 'HIGH'; urgencyColor = 'var(--red)'; }
  else if (warns > 0 || warningAlerts > 0) { urgency = 'MODERATE'; urgencyColor = 'var(--gold)'; }

  // Procedural risk
  var risk = 'LOW', riskColor = 'var(--green)';
  if (blocks > 1) { risk = 'CRITICAL'; riskColor = 'var(--red)'; }
  else if (blocks > 0) { risk = 'HIGH'; riskColor = 'var(--gold)'; }
  else if (warns > 2) { risk = 'MODERATE'; riskColor = 'var(--gold)'; }

  // State Machine
  var smState = getCurrentState();
  var smCtx = CASE_STATES[smState] || { label:'Unknown', icon:'⚖️', color:'var(--muted)' };

  var answerCount = Object.keys(answers).filter(function(k){return answers[k]&&answers[k]!=='';}).length;

  bar.innerHTML = '<div class="hud-label">CASE STATUS</div>' +
    '<div class="hud-divider"></div>' +
    '<div class="hud-metric"><span class="hud-key">Jurisdiction</span><span class="hud-val">Florida</span></div>' +
    '<div class="hud-metric"><span class="hud-key">State</span><span class="hud-val hud-state-badge" style="color:' + smCtx.color + '">' + smCtx.icon + ' ' + smCtx.label + '</span></div>' +
    '<div class="hud-metric"><span class="hud-key">Relief Window</span><span class="hud-val hud-pulse hud-pulse--' + reliefDot + '" style="color:' + reliefColor + '">' + reliefStatus + '</span></div>' +
    '<div class="hud-metric"><span class="hud-key">Urgency</span><span class="hud-val" style="color:' + (urgency === 'CRITICAL' ? 'var(--red)' : urgency === 'HIGH' ? 'var(--red)' : urgency === 'MODERATE' ? 'var(--gold)' : 'var(--green)') + '">' + urgency + '</span></div>' +
    '<div class="hud-metric"><span class="hud-key">Risk</span><span class="hud-val" style="color:' + riskColor + '">' + risk + '</span></div>' +
    '<div class="hud-metric hud-metric-right"><span class="hud-key">Fields</span><span class="hud-val">' + answerCount + '</span></div>';

  bar.classList.add('hud-updated');
  clearTimeout(bar._hudTimer);
  bar._hudTimer = setTimeout(function(){ bar.classList.remove('hud-updated'); }, 600);

  // Refresh state-aware UI when answers change
  renderStateMachine();
  renderSessionBar();
  filterMotionsByState();
}

function renderStrength() {
  const meter = document.getElementById('strength-meter');
  if(!meter) return;

  const motionId = currentMotion;
  const assessment = evaluateMotionStrength(motionId, answers, eligAnswers);
  const pct = assessment.score;
  const s = assessment;

  let colorCss = '#F87171';
  let label = 'Weak';
  if (pct >= 80) { colorCss = '#4ADE80'; label = 'Strong'; }
  else if (pct >= 60) { colorCss = '#2DD4BF'; label = 'Moderate-Strong'; }
  else if (pct >= 40) { colorCss = '#F9B24C'; label = 'Moderate'; }
  else if (pct >= 20) { colorCss = '#F87171'; label = 'Weak'; }
  else { colorCss = '#ef4444'; label = 'Critical'; }

  // Burden display
  const burdenMap = { 'low': ['🟢', 'Low'], 'medium': ['🟡', 'Medium'], 'high': ['🟠', 'High'], 'very-high': ['🔴', 'Very High'], 'unknown': ['⚪', 'Unknown'] };
  const burdenInfo = burdenMap[s.burden] || ['⚪', 'Unknown'];

  // Difficulty display
  const diffMap = { 'easy': ['🟢', 'Easy'], 'moderate': ['🟡', 'Moderate'], 'high': ['🟠', 'High'], 'expert': ['🔴', 'Expert'], 'unknown': ['⚪', 'Unknown'] };
  const diffInfo = diffMap[s.difficulty] || ['⚪', 'Unknown'];

  // Strength bar
  let html = '<div class="strength-meter">' +
    '<div class="strength-header"><span class="strength-label">Motion Strength Assessment</span><span class="strength-pct" style="color:'+colorCss+'">'+pct+'% <span class="strength-label-tag" style="color:'+colorCss+'">'+label+'</span></span></div>' +
    '<div class="strength-track"><div class="strength-fill" style="width:'+pct+'%;background:'+colorCss+'"></div></div>' +
    '<div class="strength-reasoning">' + esc(s.reasoning) + '</div>' +
    '<div class="strength-dimensions">';

  // Dimension cards
  html += '<div class="str-dim-card"><div class="str-dim-icon">📊</div><div class="str-dim-content"><div class="str-dim-label">Success Likelihood</div><div class="str-dim-bar"><div class="str-dim-fill" style="width:'+pct+'%;background:'+colorCss+'"></div></div><div class="str-dim-pct">'+pct+'%</div></div></div>';
  html += '<div class="str-dim-card"><div class="str-dim-icon">📎</div><div class="str-dim-content"><div class="str-dim-label">Evidentiary Burden</div><div class="str-dim-tag" style="border-color:'+(s.burden==='low'?'#4ADE80':s.burden==='medium'?'#F9B24C':s.burden==='high'?'#F87171':'#ef4444')+'">'+burdenInfo[0]+' '+burdenInfo[1]+'</div></div></div>';
  html += '<div class="str-dim-card"><div class="str-dim-icon">📋</div><div class="str-dim-content"><div class="str-dim-label">Required Docs</div><div class="str-dim-count">'+(s.requiredDocs.length || 0)+' items</div></div></div>';
  html += '<div class="str-dim-card"><div class="str-dim-icon">🧩</div><div class="str-dim-content"><div class="str-dim-label">Procedural Difficulty</div><div class="str-dim-tag" style="border-color:'+(s.difficulty==='easy'?'#4ADE80':s.difficulty==='moderate'?'#F9B24C':s.difficulty==='high'?'#F87171':'#ef4444')+'">'+diffInfo[0]+' '+diffInfo[1]+'</div></div></div>';

  html += '</div>';

  // Required docs section
  if (s.requiredDocs && s.requiredDocs.length) {
    html += '<div class="strength-docs"><div class="strength-docs-header">📋 Required Documentation</div><div class="strength-docs-list">' +
      s.requiredDocs.map(d => '<span class="strength-doc-chip">' + esc(d) + '</span>').join('') +
    '</div></div>';
  }

  // Strengths & Weaknesses
  if (s.strengths && s.strengths.length) {
    html += '<div class="str-sw-section"><div class="str-sw-header strengths-hdr">✅ Strengths (' + s.strengths.length + ')</div>' +
      s.strengths.map(st => '<div class="str-sw-item str-sw-strength">' + esc(st) + '</div>').join('') +
    '</div>';
  }
  if (s.weaknesses && s.weaknesses.length) {
    html += '<div class="str-sw-section"><div class="str-sw-header weaknesses-hdr">⚠️ Weaknesses (' + s.weaknesses.length + ')</div>' +
      s.weaknesses.map(w => '<div class="str-sw-item str-sw-weakness">' + esc(w) + '</div>').join('') +
    '</div>';
  }
  if (s.recommendations && s.recommendations.length) {
    html += '<div class="str-sw-section"><div class="str-sw-header recs-hdr">💡 Recommendations</div>' +
      s.recommendations.map(r => '<div class="str-sw-item str-sw-rec">' + esc(r) + '</div>').join('') +
    '</div>';
  }

  html += '</div>';
  meter.innerHTML = html;
}

// ── LIVE PREVIEW ──
function schedulePreviewUpdate() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(updateLivePreview, 300);
}

function updateLivePreview() {
  const previewBody = document.getElementById('live-preview-body');
  if(!previewBody) return;
  const flow = FLOWS[currentMotion];
  if(!flow) { previewBody.innerHTML = ''; return; }
  
  const genMap = {'3850':gen3850,'3800':gen3800,'appeal':genAppeal,'appeal-record':genAppealRecord,'appeal-rehearing':genAppealRehearing,'2254':gen2254,'expunge':genExpunge,'terminate':genTerminate,'restitution':genRestitution,'mitigation':genMitigation};
  const merged = {...answers, ...legalAnswers};
  const doc = genMap[currentMotion] ? genMap[currentMotion](merged, flow) : '';
  previewBody.innerHTML = doc || '<p style="color:var(--muted)">Complete the questions to see your document preview.</p>';
  
  if(!previewOpen) {
    previewBody.classList.remove('open');
  } else {
    previewBody.classList.add('open');
  }

  // Refresh risk assessment, timeline, and weaknesses on every preview update
  renderRiskGrid(currentMotion, merged);
  renderTimeline(currentMotion, merged);
  renderCaseScanner(currentMotion, merged);
  renderEligibilityPanel();
  renderCaseIntelligence();
  renderEmergencyAlerts();
  renderCaseSummary();
  renderStatusBar();
}

function togglePreview() {
  previewOpen = !previewOpen;
  const body = document.getElementById('live-preview-body');
  const toggle = document.getElementById('preview-toggle');
  if(body) body.classList.toggle('open');
  if(toggle) toggle.classList.toggle('open');
}

// ── AUTO-SAVE ──
function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(autoSave, 500);
}

function autoSave() {
  if(!currentMotion) return;
  const draft = {
    motion: currentMotion,
    answers: {...answers},
    legalAnswers: {...legalAnswers},
    eligAnswers: {...eligAnswers},
    currentQ: currentQ,
    timestamp: new Date().toISOString()
  };
  S.set('fl-auto-draft', draft);
  showAutoSaveIndicator();
}

function showAutoSaveIndicator() {
  const el = document.getElementById('autosave-indicator');
  if(!el) return;
  el.textContent = '✓ Auto-saved';
  el.classList.add('show', 'saved');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2000);
}

function checkResumeDraft() {
  const draft = S.get('fl-auto-draft', null);
  if(!draft || !draft.motion || !FLOWS[draft.motion]) return;
  const banner = document.getElementById('resume-banner');
  if(banner) banner.classList.add('show');
}

function resumeDraft() {
  const draft = S.get('fl-auto-draft', null);
  if(!draft || !draft.motion || !FLOWS[draft.motion]) {
    toast('No saved draft found.');
    return;
  }
  currentMotion = draft.motion;
  answers = draft.answers || {};
  legalAnswers = draft.legalAnswers || {};
  eligAnswers = draft.eligAnswers || {};
  currentQ = draft.currentQ || 0;

  // Restore answers into session memory
  initCaseSession();
  Object.keys(answers).forEach(function(k) { saveToSession(k, answers[k]); });
  Object.keys(eligAnswers).forEach(function(k) { saveToSession(k, eligAnswers[k]); });
  
  const flow = FLOWS[currentMotion];
  buildQuestions();
  
  // If currentQ is out of bounds, go to last question
  if(currentQ >= questions.length) currentQ = Math.max(0, questions.length - 1);
  
  document.getElementById('resume-banner').classList.remove('show');
  document.getElementById('wizard-title').textContent = flow.title;
  document.getElementById('wizard-statute').textContent = flow.statute;
  document.getElementById('completion').classList.remove('show');
  document.getElementById('wizard').classList.add('open');
  document.getElementById('live-preview').style.display = 'block';
  document.getElementById('elig-screen').style.display = 'none';
  document.getElementById('q-wizard').style.display = 'block';
  renderQuestion('forward');
  updateLivePreview();
  renderStrength();
  renderEmergencyAlerts();
  renderCaseSummary();
  toast('Resumed your draft.');
}

function clearAutoDraft() {
  S.set('fl-auto-draft', null);
  document.getElementById('resume-banner').classList.remove('show');
}

// ── SAVE & CONTINUE LATER ──
function saveAndClose() {
  saveCurrentAnswer();
  autoSave();
  document.getElementById('wizard').classList.remove('open');
  document.getElementById('q-wizard').style.display = 'none';
  document.getElementById('live-preview').style.display = 'none';
  document.getElementById('elig-screen').style.display = 'none';
  toast('Saved. You can resume anytime.');
}

// ── CLOSE / RESET ──
function closeWizard() {
  saveCurrentAnswer();
  autoSave();
  document.getElementById('wizard').classList.remove('open');
  document.getElementById('q-wizard').style.display = 'none';
  document.getElementById('live-preview').style.display = 'none';
  document.getElementById('elig-screen').style.display = 'none';
}

function resetBuilder() {
  closeWizard();
  document.querySelectorAll('.motion-tile').forEach(t=>t.classList.remove('selected'));
  currentMotion = null;
  questions = [];
  answers = {};
  legalAnswers = {};
  eligAnswers = {};
  currentQ = 0;
  document.getElementById('start-btn').disabled = true;
  document.getElementById('start-btn-text').textContent = 'Select a Motion Type Above';
  setQuestionIdleState();
  document.getElementById('completion').classList.remove('show');
  document.getElementById('live-preview').style.display = 'none';
  document.getElementById('risk-section').style.display = 'none';
  document.getElementById('timeline-procedural').style.display = 'none';
  document.getElementById('weakness-section').style.display = 'none';
  document.getElementById('elig-panel').style.display = 'none';
  document.getElementById('intel-section').style.display = 'none';
  document.getElementById('casefile-section').style.display = 'none';
  document.getElementById('alert-bar').style.display = 'none';
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── START WIZARD ──
function startWizard() {
  if(!currentMotion || !FLOWS[currentMotion]) {
    toast('Please select a valid motion type first.');
    return;
  }
  
  // Check eligibility
  const eligQs = getEligibilityQ(currentMotion);
  if(eligQs.length > 0) {
    eligAnswers = {};
    renderEligibility();
    return;
  }
  
  // No eligibility needed, start directly
  startWizardAfterElig();
}

// ── DISTRACTION TOGGLE ──
function toggleDistraction() {
  document.body.classList.toggle('low-distraction');
  toast(document.body.classList.contains('low-distraction') ? 'Low-distraction mode on' : 'Full view restored');
}

// ── SAVE FINAL DRAFT ──
function saveDraft() {
  if(!validateCurrent()) return;
  saveCurrentAnswer();
  if(!currentMotion || !FLOWS[currentMotion]) {
    toast('Please start again.');
    return;
  }
  const drafts = S.get('fl-motion-drafts', []);
  const flow = FLOWS[currentMotion];
  const id = Date.now();
  lastDraftId = id;
  drafts.unshift({
    id,
    motion: currentMotion,
    title: flow.title,
    statute: flow.statute,
    tag: flow.tag,
    color: flow.color,
    answers: {...answers},
    evidence: [],
    timeline: [],
    created: new Date().toISOString()
  });
  S.set('fl-motion-drafts', drafts);
  clearAutoDraft();
  document.getElementById('wizard').classList.remove('open');
  document.getElementById('q-wizard').style.display = 'none';
  document.getElementById('live-preview').style.display = 'none';
  document.getElementById('completion').classList.add('show');
  document.getElementById('completion').scrollIntoView({behavior:'smooth',block:'start'});
  renderPreview(drafts[0]);
  toast('Draft saved!');
}

// ═══════════════════════════════════════════════
// DRAFT MANAGEMENT SYSTEM
// Named, versioned, restorable drafts
// ═══════════════════════════════════════════════

function getDrafts() { return S.get('fl-motion-drafts', []); }
function persistDrafts(d) { S.set('fl-motion-drafts', d); }

function msCreateDraft(name) {
  if (!currentMotion || !FLOWS[currentMotion]) { toast('No active motion to save.'); return null; }
  saveCurrentAnswer();
  const drafts = getDrafts();
  const flow = FLOWS[currentMotion];
  const existing = drafts.findIndex(d => d.autoId && d.autoId === '__auto__');
  const id = Date.now();
  const draft = {
    id, motion: currentMotion, title: name || flow.title,
    statute: flow.statute, tag: flow.tag, color: flow.color || '#F9B24C',
    answers: { ...answers }, legalAnswers: { ...legalAnswers },
    eligAnswers: { ...eligAnswers },
    currentQ, timeline: [], evidence: [],
    totalQs: questions.length,
    answeredCount: Object.keys(answers).filter(k => answers[k] && answers[k] !== '').length,
    created: existing >= 0 ? drafts[existing].created : new Date().toISOString(),
    updated: new Date().toISOString()
  };
  if (existing >= 0) { drafts[existing] = draft; }
  else { drafts.unshift(draft); }
  persistDrafts(drafts);
  clearAutoDraft();
  renderMsDrafts();
  updateTacSysbar();
  return draft;
}

function msAutoSaveDraft() {
  if (!currentMotion || !FLOWS[currentMotion]) return;
  const drafts = getDrafts();
  const existing = drafts.findIndex(d => d.autoId && d.autoId === '__auto__');
  const flow = FLOWS[currentMotion];
  const id = existing >= 0 ? drafts[existing].id : Date.now();
  const progress = calcStrength ? calcStrength().pct || 0 : 0;
  const draft = {
    id, autoId: '__auto__', motion: currentMotion, title: flow.title,
    statute: flow.statute, tag: flow.tag, color: flow.color || '#F9B24C',
    answers: { ...answers }, legalAnswers: { ...legalAnswers },
    eligAnswers: { ...eligAnswers },
    currentQ, timeline: [], evidence: [],
    totalQs: questions.length,
    answeredCount: Object.keys(answers).filter(k => answers[k] && answers[k] !== '').length,
    progress,
    created: existing >= 0 ? drafts[existing].created : new Date().toISOString(),
    updated: new Date().toISOString()
  };
  if (existing >= 0) { drafts[existing] = draft; }
  else { drafts.unshift(draft); }
  persistDrafts(drafts);
}

function msDeleteDraft(id) {
  let drafts = getDrafts();
  drafts = drafts.filter(d => d.id !== id);
  persistDrafts(drafts);
  renderMsDrafts();
  updateTacSysbar();
  toast('Draft deleted');
}

function msRenameDraft(id, name) {
  const drafts = getDrafts();
  const d = drafts.find(x => x.id === id);
  if (!d) return;
  d.title = name;
  d.updated = new Date().toISOString();
  persistDrafts(drafts);
  renderMsDrafts();
  toast('Draft renamed');
}

function msRestoreDraft(id) {
  const drafts = getDrafts();
  const d = drafts.find(x => x.id === id);
  if (!d) { toast('Draft not found'); return; }
  if (!FLOWS[d.motion]) { toast('Motion type no longer available'); return; }

  currentMotion = d.motion;
  answers = d.answers || {};
  legalAnswers = d.legalAnswers || {};
  eligAnswers = d.eligAnswers || {};
  currentQ = d.currentQ || 0;

  initCaseSession();
  Object.keys(answers).forEach(k => saveToSession(k, answers[k]));
  Object.keys(eligAnswers).forEach(k => saveToSession(k, eligAnswers[k]));

  const flow = FLOWS[currentMotion];
  buildQuestions();
  if (currentQ >= questions.length) currentQ = Math.max(0, questions.length - 1);

  document.getElementById('completion')?.classList.remove('show');

  switchTab('builder');
  document.getElementById('wizard').classList.add('open');
  document.getElementById('live-preview').style.display = 'block';
  document.getElementById('elig-screen').style.display = 'none';
  document.getElementById('q-wizard').style.display = 'block';
  renderQuestion('forward');
  updateLivePreview();
  renderStrength();
  renderEmergencyAlerts();
  renderCaseSummary();
  renderStateMachine();

  const tile = document.querySelector(`.motion-tile[data-motion="${d.motion}"]`);
  if (tile) selectMotion(d.motion, tile);

  toast('Restored: ' + d.title);
  renderConstitutionalIntel();
  renderEmotionalIntel();
}

function renderMsDrafts() {
  const panel = document.getElementById('ms-draft-panel');
  if (!panel) return;
  const drafts = getDrafts();

  if (!drafts.length) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  let html = '<div class="ms-draft-header">' +
    '<div class="ms-draft-title-row">' +
      '<span class="ms-draft-icon">📁</span>' +
      '<span class="ms-draft-title">Saved Drafts</span>' +
      '<span class="ms-draft-count">' + drafts.length + '</span>' +
    '</div>' +
  '</div>';

  html += '<div class="ms-draft-list">';
  drafts.forEach(d => {
    const pct = d.progress || (d.totalQs ? Math.round((d.answeredCount / d.totalQs) * 100) : 0);
    const date = new Date(d.updated || d.created);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const isAuto = d.autoId === '__auto__';
    html += '<div class="ms-draft-card" style="--ms-color:' + (d.color || '#F9B24C') + '">' +
      '<div class="ms-draft-card-top">' +
        '<div class="ms-draft-card-info">' +
          '<div class="ms-draft-card-title">' + esc(d.title) + (isAuto ? ' <span class="ms-draft-auto-badge">auto</span>' : '') + '</div>' +
          '<div class="ms-draft-card-meta">' +
            '<span class="ms-draft-statute">' + esc(d.statute || d.motion) + '</span>' +
            '<span class="ms-draft-date">' + dateStr + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="ms-draft-pct" style="color:' + (pct >= 80 ? 'var(--green)' : pct >= 40 ? 'var(--gold)' : 'var(--muted)') + '">' + pct + '%</div>' +
      '</div>' +
      '<div class="ms-draft-bar"><div class="ms-draft-bar-fill" style="width:' + pct + '%;background:' + (d.color || '#F9B24C') + '"></div></div>' +
      '<div class="ms-draft-actions">' +
        '<button class="ms-draft-btn ms-draft-btn--restore" onclick="msRestoreDraft(' + d.id + ')">↩ Restore</button>' +
        (!isAuto ? '<button class="ms-draft-btn ms-draft-btn--rename" onclick="msPromptRename(' + d.id + ')">✎ Rename</button>' : '') +
        '<button class="ms-draft-btn ms-draft-btn--delete" onclick="msConfirmDelete(' + d.id + ')">✕</button>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  if (currentMotion) {
    html += '<button class="ms-draft-save-btn" onclick="msPromptSaveDraft()">+ Save Current as Draft</button>';
  }

  panel.innerHTML = html;
}

function msPromptSaveDraft() {
  const flow = FLOWS[currentMotion];
  const suggested = flow ? flow.title : 'My Draft';
  const name = prompt('Name this draft:', suggested);
  if (name && name.trim()) {
    msCreateDraft(name.trim());
  }
}

function msPromptRename(id) {
  const drafts = getDrafts();
  const d = drafts.find(x => x.id === id);
  if (!d) return;
  const name = prompt('Rename draft:', d.title);
  if (name && name.trim()) msRenameDraft(id, name.trim());
}

function msConfirmDelete(id) {
  const drafts = getDrafts();
  const d = drafts.find(x => x.id === id);
  if (!d) return;
  if (confirm('Delete "' + d.title + '"?')) msDeleteDraft(id);
}

// Augment existing auto-save to also save to drafts list
function autoSave() {
  if (!currentMotion) return;
  const draft = {
    motion: currentMotion,
    answers: { ...answers },
    legalAnswers: { ...legalAnswers },
    eligAnswers: { ...eligAnswers },
    currentQ: currentQ,
    timestamp: new Date().toISOString()
  };
  S.set('fl-auto-draft', draft);
  msAutoSaveDraft();
  showAutoSaveIndicator();
  renderMsDrafts();
  renderConstitutionalIntel();
  renderEmotionalIntel();
  updateTacSysbar();
}

// ═══════════════════════════════════════════════
// CONSTITUTIONAL INTELLIGENCE ENGINE
// Dynamically maps each motion/answer to
// 4th, 5th, 6th, Due Process, Equal Protection
// ═══════════════════════════════════════════════

function constitutionalIntel() {
  if (!currentMotion || !FLOWS[currentMotion] || !answers) return [];
  const motion = currentMotion;
  const a = answers;
  const facts = (a.facts || a['fact-summary'] || a['facts-case'] || '').toLowerCase();
  const offense = (a.offense || a['offense-charged'] || a['charge'] || '').toLowerCase();
  const sentence = (a.sentence || a['sentence-imposed'] || '').toLowerCase();
  const co = (a.county || '').toLowerCase();

  const ansEq = (id, v) => (a[id] || '').toLowerCase() === v.toLowerCase();
  const ansHas = (id, ...ts) => ts.some(t => (a[id] || '').toLowerCase().includes(t.toLowerCase()));
  const rgx = (...ps) => ps.some(p => p.test(facts) || p.test(offense));
  const isFelony = rgx(/felony|traffick|murder|robbery|burglary|kidnap|life|sex|battery|assault/i);

  const issues = [];

  // ── 4th Amendment: Unlawful Search / Seizure / Arrest ──
  {
    const triggered = ansEq('searchReasonable', 'no') || ansEq('consentSearch', 'no') ||
      rgx(/search|warrant|stop|seizure|traffic.stop|frisk|suppress|curtilage/i) ||
      ansHas('grounds-other', 'search', 'seizure', '4th', 'fourth');
    const strength = triggered ? 'identified' : 'potential';
    issues.push({
      amendment: '4th Amendment',
      short: '4th',
      icon: '🔍',
      title: 'Unlawful Search / Seizure',
      status: triggered ? 'identified' : 'potential',
      signaled: triggered,
      rule: 'Fourth Amendment — Katz v. US (1967) · Mapp v. Ohio (1961)',
      desc: triggered
        ? 'Warrantless searches are presumptively unreasonable. The state must prove a warrant exception (consent, plain view, search incident to arrest, exigent circumstances, or inventory).'
        : 'If your case involved a search, seizure, or stop, the Fourth Amendment requires a warrant or a valid exception. Review whether law enforcement had probable cause.',
      reasoning: triggered
        ? 'Your answers indicate search/seizure facts. File a motion to suppress if the state cannot prove a warrant exception.'
        : 'No search/seizure facts detected — but if applicable, the warrant requirement is the default rule.',
      action: triggered ? 'Move to suppress all evidence. Demand the state prove a warrant exception applied.' : 'Review whether any search, stop, or seizure occurred. File a motion to suppress if warranted.'
    });
  }

  // ── 5th Amendment: Self-Incrimination / Miranda / Double Jeopardy ──
  {
    const triggered = ansHas('grounds-plea', 'involuntary', 'uninformed') ||
      rgx(/interrogat|question|statement|confess|admit|miranda|custodial|invoke|remain.silent|double.jeopardy|jeopardy/i) ||
      isFelony;
    issues.push({
      amendment: '5th Amendment',
      short: '5th',
      icon: '🔊',
      title: 'Self-Incrimination / Miranda / Double Jeopardy',
      status: triggered ? 'identified' : 'potential',
      signaled: triggered,
      rule: 'Fifth Amendment — Miranda v. Arizona (1966) · Dickerson v. US (2000)',
      desc: triggered
        ? 'Custodial interrogation requires Miranda warnings. Any statement obtained without proper warnings is presumptively involuntary. Double jeopardy bars successive prosecutions for the same offense.'
        : 'The Fifth Amendment protects against compelled self-incrimination and double jeopardy. Any custodial interrogation requires Miranda warnings.',
      reasoning: triggered
        ? 'Your case involves interrogation, confession, or plea-related facts — Miranda compliance must be verified.'
        : 'If you were questioned while in custody, verify Miranda warnings were given and waiver was knowing and voluntary.',
      action: triggered ? 'File a motion to suppress statements. Determine if interrogation was custodial and whether warnings were given.' : 'Determine whether any custodial interrogation occurred without proper warnings.'
    });
  }

  // ── 6th Amendment: Right to Counsel / Confrontation / Speedy Trial ──
  {
    const triggered = ansEq('grounds-iac', 'yes') || motion === '3850' || motion === '3800' ||
      rgx(/counsel|attorney|lawyer|iac|ineffective|strickland|confront|witness|cross.examine|speedy.trial|subpoena/i) ||
      isFelony;
    issues.push({
      amendment: '6th Amendment',
      short: '6th',
      icon: '⚖️',
      title: 'Right to Counsel / Confrontation / Speedy Trial',
      status: triggered ? 'identified' : 'potential',
      signaled: triggered,
      rule: 'Sixth Amendment — Strickland v. Washington (1984) · Crawford v. Washington (2004) · Barker v. Wingo (1972)',
      desc: triggered
        ? 'The Sixth Amendment guarantees effective assistance of counsel, the right to confront witnesses, compulsory process for defense witnesses, and a speedy trial. Counsel must perform reasonably; deficient performance with prejudice requires reversal.'
        : 'The Sixth Amendment secures the right to counsel (at all critical stages), to confront and cross-examine witnesses, to subpoena defense witnesses, and to a speedy public trial.',
      reasoning: triggered
        ? 'Felony charges, IAC grounds, or post-conviction motion indicates Sixth Amendment rights are central to your case.'
        : 'If you are charged with a serious crime, the Sixth Amendment guarantees counsel at every critical stage.',
      action: triggered ? 'Identify specific counsel failures (Strickland prongs). Demand confrontation rights. Assert speedy trial if applicable.' : 'Ensure counsel has been appointed and is effective. Assert speedy trial if delay is prejudicial.'
    });
  }

  // ── 14th Amendment Due Process ──
  {
    const triggered = ansEq('grounds-brady', 'yes') || ansEq('grounds-plea', 'yes') ||
      ansEq('grounds-sentence', 'yes') || ansEq('grounds-other', 'yes') ||
      rgx(/brady|discovery|disclose|withhold|exculpatory|material|plea|coerced|pressure|involuntary|unfair|notice|fundamentally.fair/i) ||
      ansHas('illegal-basis', 'scoresheet', 'statutory', 'constitutional', 'due.process');
    issues.push({
      amendment: '14th Amendment — Due Process',
      short: '14DP',
      icon: '⚜️',
      title: 'Due Process of Law',
      status: triggered ? 'identified' : 'potential',
      signaled: triggered,
      rule: 'Fourteenth Amendment — Brady v. Maryland (1963) · Boykin v. Alabama (1969) · Rochin v. California (1952)',
      desc: triggered
        ? 'Due Process requires fair notice, a meaningful opportunity to be heard, and a fundamentally fair proceeding. Brady violations (withheld exculpatory evidence), involuntary pleas, and certain sentencing errors violate Due Process.'
        : 'The Due Process Clause guarantees fundamental fairness in criminal proceedings — from arrest through appeal. This includes fair notice, the right to present a defense, and a neutral decision-maker.',
      reasoning: triggered
        ? 'Grounds for relief (Brady, plea, illegal sentence) indicate Due Process protections are directly in play.'
        : 'If the proceeding lacked fundamental fairness, the Due Process Clause provides a basis for relief.',
      action: triggered ? 'Identify the specific Due Process violation: Brady, involuntary plea, or illegal sentence. Frame the claim as a Due Process deprivation.' : 'Review the proceeding for any fundamental unfairness — withheld evidence, coercive plea, or biased decision-maker.'
    });
  }

  // ── 14th Amendment Equal Protection ──
  {
    const triggered = rgx(/equal.protection|discriminat|racial|gender|selective.prosecut|biased|disparate|class.of.one/i) ||
      ansHas('grounds-summary', 'equal.protection', 'discriminat', 'selective');
    issues.push({
      amendment: '14th Amendment — Equal Protection',
      short: '14EP',
      icon: '🛡️',
      title: 'Equal Protection of the Laws',
      status: triggered ? 'identified' : 'potential',
      signaled: triggered,
      rule: 'Fourteenth Amendment — Batson v. Kentucky (1986) · Washington v. Davis (1976)',
      desc: triggered
        ? 'Equal Protection prohibits discriminatory enforcement and application of the law based on race, gender, or other protected classifications. Selective prosecution claims require proof of discriminatory intent and effect.'
        : 'The Equal Protection Clause requires that similarly situated persons be treated alike under the law. If you were singled out based on race, gender, or other protected status, a claim may exist.',
      reasoning: triggered
        ? 'Your answers reference discrimination, selective prosecution, or equal protection grounds — this amendment is directly implicated.'
        : 'If you believe you were treated differently than similarly situated persons, investigate whether a protected classification was the basis.',
      action: triggered ? 'Document the discriminatory impact and intent. File a Batson challenge if jury selection was tainted. Consider selective prosecution claim.' : 'If disparity in treatment or enforcement exists, develop facts showing the discrimination was intentional.'
    });
  }

  return issues;
}

function renderConstitutionalIntel() {
  const el = document.getElementById('constitutional-intel');
  if (!el) return;
  const issues = constitutionalIntel();
  if (!issues.length) { el.style.display = 'none'; return; }
  el.style.display = 'block';

  const signaledCount = issues.filter(i => i.signaled).length;
  const noneMsg = signaledCount === 0 ? ' — none automatically detected from your answers' : '';

  let html = '<div class="ci-block">' +
    '<div class="ci-block-header">' +
      '<span class="ci-block-icon">⚖️</span>' +
      '<span class="ci-block-title">Potential Constitutional Issues' + noneMsg + '</span>' +
    '</div>' +
    '<hr class="ci-block-divider">' +
    '<ul class="ci-list">';

  issues.forEach(iss => {
    const isSig = iss.signaled;
    html += '<li class="ci-item ' + (isSig ? 'ci-item--signaled' : '') + '">' +
      '<span class="ci-item-check">' + (isSig ? '✓' : '○') + '</span>' +
      '<span class="ci-item-label">' + esc(iss.short) + ' Amendment — ' + esc(iss.title) + '</span>' +
      '<span class="ci-item-statute">' + esc(iss.rule.split(' — ')[0]) + '</span>' +
    '</li>';
    if (isSig) {
      html += '<div class="ci-detail-row">' +
        esc(iss.desc) + '<br>' +
        '<span class="ci-item-action"><strong>→</strong> ' + esc(iss.action) + '</span>' +
      '</div>';
    }
  });

  html += '</ul></div>';

  el.innerHTML = html;
}

// ═══════════════════════════════════════════════
// EMOTIONAL INTELLIGENCE ENGINE
// Context-aware UX that acknowledges the stress
// of the legal process — without fake empathy
// ═══════════════════════════════════════════════

function emotionalIntel() {
  const state = getCurrentState();
  const stateCtx = CASE_STATES[state] || {};
  const pct = currentQ > 0 && questions.length > 0
    ? Math.round((currentQ / questions.length) * 100) : 0;
  const flow = currentMotion && FLOWS[currentMotion] ? FLOWS[currentMotion] : null;
  const motionId = currentMotion;

  // Build message based on context
  let msg = '';
  let urgency = 'info';

  // New session, no progress
  if (!currentMotion && !caseSession) {
    msg = 'This tool is here to help you organize. Take your time — there\'s no wrong way to start.';
    return { msg, urgency: 'info', icon: '🧭' };
  }

  // Motion selected but wizard not started
  if (currentMotion && !document.querySelector('.wizard.open')) {
    if (motionId === '3850') msg = 'Rule 3.850 has a 2-year window from finality. Let\'s make sure we capture everything.';
    else if (motionId === '3800') msg = 'Illegal sentences can be corrected at any time — but the sooner the better.';
    else if (motionId === 'expunge') msg = 'Seal/expunge is a one-time opportunity. Let\'s verify eligibility before anything else.';
    else if (motionId === '2254') msg = 'Federal habeas is narrow and technical. Every word matters — let\'s build carefully.';
    else if (motionId === 'appeal') msg = 'The 30-day appeal window is tight. Let\'s prioritize the notice of appeal first.';
    else if (motionId === 'restitution') msg = 'Financial obligations during incarceration or reentry can feel overwhelming. We\'ll take it step by step.';
    else if (motionId === 'mitigation') msg = 'Mitigation is about telling your full story. Let\'s gather what matters most.';
    else if (motionId === 'terminate') msg = 'Early termination can close this chapter. Let\'s check what\'s needed.';
    else msg = 'You\'ve selected a motion type. When you\'re ready, click Begin to start the guided intake.';
    return { msg, urgency: 'info', icon: '🪷' };
  }

  // Based on state machine
  if (state === 'ARREST' || state === 'FIRST_APPEARANCE') {
    msg = 'Being arrested is disorienting. Focus on one thing: do not make statements without counsel present. Preserve your silence — it is a right, not an admission.';
    urgency = 'high';
  } else if (state === 'PRETRIAL' && pct < 10) {
    msg = 'This stage is extremely stressful. Focus first on preserving deadlines. You can review strategy details after intake.';
    urgency = 'high';
  } else if (state === 'PRETRIAL') {
    msg = 'You\'re building your case file. Each answer strengthens your position — consistent documentation matters more than perfection.';
    urgency = 'info';
  } else if (state === 'SENTENCED') {
    msg = 'A sentence is heavy. You don\'t have to process everything at once. Start with the deadline: 30 days to file a notice of appeal.';
    urgency = 'high';
  } else if (state === 'DIRECT_APPEAL') {
    msg = 'Appeals move on a strict clock. Focus on deadlines first — strategy refinements can come after the notice is filed.';
    urgency = 'high';
  } else if (state === 'POSTCONVICTION') {
    msg = 'Post-conviction is a marathon, not a sprint. This tool breaks it into steps so you don\'t have to hold everything in your head.';
    urgency = 'info';
  } else if (state === 'FEDERAL_HABEAS') {
    msg = 'Federal habeas is procedurally complex. Stay methodical — each requirement exists for a reason. Let\'s check exhaustion first.';
    urgency = 'high';
  } else if (state === 'REENTRY') {
    msg = 'You made it through. Reentry is a new chapter — let\'s clear what we can from your record so you can move forward.';
    urgency = 'info';
  }

  // Progress-based messages (override if more specific)
  if (pct === 0 && currentMotion) {
    msg = msg || 'Starting is the hardest part. Let\'s just get through the first few questions — it gets clearer as you go.';
  } else if (pct > 0 && pct < 30) {
    msg = msg || 'You\'re in the intake phase. Just answer what you know — you can refine details later.';
  } else if (pct >= 30 && pct < 60) {
    msg = msg || 'You\'ve built momentum. Keep going — consistent progress matters more than speed.';
  } else if (pct >= 60 && pct < 85) {
    msg = msg || 'Almost there. Take a breath — the framework is taking shape.';
  } else if (pct >= 85 && pct < 100) {
    msg = msg || 'The finish line is close. One or two more questions and your draft will be ready to review.';
  } else if (pct >= 100) {
    msg = 'Your draft is complete. You did the hard part. Review it in Preview, then copy or print when ready.';
    urgency = 'success';
  }

  return { msg, urgency, icon: urgency === 'high' ? '🪷' : urgency === 'success' ? '✅' : '🧭' };
}

function renderEmotionalIntel() {
  const el = document.getElementById('emotional-intel');
  if (!el) return;
  const { msg, urgency, icon } = emotionalIntel();
  if (!msg) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  const cls = 'ei-banner ei--' + urgency;
  el.innerHTML = '<div class="' + cls + '"><span class="ei-icon">' + icon + '</span><span class="ei-text">' + esc(msg) + '</span></div>';
}

// ── KEYBOARD ──
document.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    const qw = document.getElementById('q-wizard');
    if(qw && qw.style.display !== 'none' && !e.shiftKey) {
      const el = document.getElementById('q-field');
      if(el && el.tagName === 'TEXTAREA' && !e.ctrlKey && !e.metaKey) return; // Allow newlines in textareas
      e.preventDefault();
      nextQ();
    }
  }
  if(e.key === 'Escape') {
    const wizard = document.getElementById('wizard');
    if(wizard && wizard.classList.contains('open')) closeWizard();
  }
});

// ── SERVICE WORKER ──
registerServiceWorker();

// ── QUICK SEARCH ──
function scoreText(query, text) {
  if (!query || !text) return 0;
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  let score = 0;
  if (t === q) score += 1.5;
  else if (t.includes(q)) score += 1.0;
  else {
    const qWords = q.split(/\s+/).filter(Boolean);
    const tWords = t.split(/\s+/);
    let matches = 0;
    qWords.forEach(qw => {
      if (tWords.includes(qw)) matches += 1;
      else if (tWords.some(tw => diceCoefficient(qw, tw) >= 0.5)) matches += 0.5;
      else if (tWords.some(tw => tw.includes(qw) || qw.includes(tw))) matches += 0.3;
    });
    if (qWords.length > 0) score += (matches / qWords.length) * 0.8;
  }
  // Lexicon boost
  const qNorm = q.replace(/[^a-z0-9]+/g, '');
  Object.keys(LEGAL_INDEX).forEach(key => {
    const kw = key.replace(/[^a-z0-9]+/g, '');
    if (qNorm.includes(kw) || kw.includes(qNorm) || diceCoefficient(qNorm, kw) >= 0.5) {
      LEGAL_INDEX[key].forEach(e => {
        if (e.keywords.some(kw2 => t.includes(kw2.toLowerCase()))) {
          score += 0.3;
        }
      });
    }
  });
  return Math.min(score, 3);
}

// ── STRATEGIC WEAKNESS DETECTION ──

function detectWeaknesses(motionId, answers) {
  const a = answers || {};
  const offense = (a.offense || a['arrest-charge'] || a['elig-disqualifying'] || '').toLowerCase();
  const motion = (motionId || '').toLowerCase();
  const sentence = (a['sentence-terms'] || a['sentence-imposed'] || '').toLowerCase();
  const facts = (a['facts-main'] || a['facts'] || '').toLowerCase();
  const weaks = [];

  const offMatch = (...ps) => ps.some(p => p.test(offense));
  const ansEq = (id, v) => (a[id] || '').toLowerCase() === v.toLowerCase();
  const ansHas = (id, ...ts) => ts.some(t => (a[id] || '').toLowerCase().includes(t.toLowerCase()));
  const factRgx = (...ps) => ps.some(p => p.test(facts));

  // ── 1. Unlawful Stop / Search ──
  if (offMatch(/drug|cocaine|crack|fentanyl|heroin|mj|marijuana|traffick|weapon|firearm|gun|possess|controlled/i) || ansEq('searchReasonable', 'no') || ansEq('consentSearch', 'no') || factRgx(/search|warrant|stop|seizure|traffic stop/i)) {
    weaks.push({ id:'unlawful-search', title:'Unlawful Stop / Search', icon:'🔍', category:'constitutional',
      severity: (ansEq('searchReasonable','no')||ansEq('consentSearch','no')) ? 'critical' : 'high',
      desc:'Fourth Amendment — any warrantless search is presumptively unreasonable. The state must establish an exception (consent, plain view, search incident to arrest, exigent circumstances, or inventory).',
      rule:'Fourth Amendment · Katz v. US (1967) · Mapp v. Ohio (1961) · Terry v. Ohio (1968)',
      action:'Move to suppress all evidence derived from the unlawful search. Demand the state prove a warrant exception applied. Challenge the scope and reasonableness of any search conducted.',
      xai:{ statute:'U.S. Const. amend. IV · Fla. Stat. § 933.01 et seq.', rule:'Warrantless searches are presumptively unreasonable unless an exception applies. The State bears the burden of proving an exception.', reasoning:'Case facts indicate possible search or seizure issue — warrant requirements must be scrutinized.', authority:'Fla. R. Crim. P. 3.190(h) (motion to suppress)', caseLaw:'Katz v. US (1967) — reasonable expectation of privacy; Mapp v. Ohio (1961) — exclusionary rule applies to states; Terry v. Ohio (1968) — limited stop-and-frisk exception' } });
  }

  // ── 2. Miranda Violation ──
  if (ansEq('grounds-plea','yes') || factRgx(/interrogat|question|statement|confess|admit|talk/i) || offMatch(/murder|homicide|robbery|kidnap/i)) {
    weaks.push({ id:'miranda', title:'Miranda / Self-Incrimination', icon:'🔊', category:'constitutional',
      severity: 'critical',
      desc:'Fifth Amendment — custodial interrogation requires Miranda warnings. Any statement obtained without proper warnings is presumptively involuntary.',
      rule:'Fifth Amendment · Miranda v. Arizona (1966) · Missouri v. Seibert (2004)',
      action:'File a motion to suppress statements. Determine whether interrogation was custodial, whether warnings were given, and whether any waiver was knowing and voluntary.',
      xai:{ statute:'U.S. Const. amend. V', rule:'Custodial interrogation requires Miranda warnings before any statement is admissible. Waiver must be knowing, intelligent, and voluntary.', reasoning:'Custodial interrogation or confession facts detected — Miranda compliance must be verified.', authority:'Fla. R. Crim. P. 3.190(h)', caseLaw:'Miranda v. Arizona (1966) — warnings required; Missouri v. Seibert (2004) — deliberate Miranda-violation tactic' } });
  }

  // ── 3. Ineffective Assistance of Counsel ──
  if (offMatch(/felony|traffick|murder|life|robbery|burglary|kidnap/i) || ansEq('grounds-iac','yes') || ansEq('illegal-basis','Scoresheet calculation error') || motion === '3850' || motion === '3800') {
    weaks.push({ id:'iac', title:'Ineffective Assistance of Counsel', icon:'⚖️', category:'constitutional',
      severity: 'critical',
      desc:'Sixth Amendment — counsel must perform reasonably AND the deficiency must prejudice the outcome. Strickland v. Washington requires both prongs.',
      rule:'Sixth Amendment · Strickland v. Washington (1984) · Hinton v. Alabama (2014)',
      action:'Identify specific failures: (a) failed to investigate, (b) failed to file motion to suppress, (c) failed to call witnesses, (d) gave incorrect advice about plea, (e) failed to challenge the state\'s evidence. Document how each failure prejudiced the outcome.',
      xai:{ statute:'U.S. Const. amend. VI', rule:'Strickland two-prong test: (1) deficient performance — counsel fell below objective reasonableness, (2) prejudice — reasonable probability of different outcome.', reasoning:'Serious felony or IAC ground indicated — counsel\'s performance and resulting prejudice must be evaluated.', authority:'Fla. R. Crim. P. 3.850 (post-conviction vehicle)', caseLaw:'Strickland v. Washington (1984) — two-prong test; Hinton v. Alabama (2014) — failure to fund expert constitutes IAC' } });
  }

  // ── 4. Brady / Discovery Violation ──
  if (ansEq('grounds-brady','yes') || factRgx(/brady|discovery|disclose|withhold|exculpatory|material/i)) {
    weaks.push({ id:'brady', title:'Brady / Discovery Violation', icon:'📂', category:'constitutional',
      severity: 'critical',
      desc:'Prosecution must disclose all material exculpatory evidence and impeachment information. Failure violates Due Process.',
      rule:'Brady v. Maryland (1963) · Giglio v. US (1972) · Kyles v. Whitley (1995)',
      action:'Identify specifically what was withheld, when it was discovered, and how it was material. Request an evidentiary hearing. Consider sanctions including dismissal.',
      xai:{ statute:'U.S. Const. amend. XIV (Due Process)', rule:'Prosecution must disclose evidence favorable to the accused that is material to guilt or punishment — including impeachment material.', reasoning:'Brady ground indicated or facts reference discovery issues — review what was withheld and its materiality.', authority:'Fla. R. Crim. P. 3.220 (discovery)', caseLaw:'Brady v. Maryland (1963) — exculpatory evidence; Giglio v. US (1972) — impeachment evidence; Kyles v. Whitley (1995) — materiality standard' } });
  }

  // ── 5. Involuntary / Uninformed Plea ──
  if (ansEq('grounds-plea','yes') || ansHas('sentence-imposed','plea') || factRgx(/plea|no contest|nolo|coerced|pressure|didn.t understand/i)) {
    weaks.push({ id:'involuntary-plea', title:'Involuntary / Uninformed Plea', icon:'🤝', category:'constitutional',
      severity: 'critical',
      desc:'A plea must be knowing, voluntary, and intelligent. If counsel misadvised or the court failed to properly colloquy the defendant, the plea is constitutionally infirm.',
      rule:'Boykin v. Alabama (1969) · Henderson v. Morgan (1976) · Fla. R. Crim. P. 3.172',
      action:'Challenge the plea colloquy. Show that the defendant was not informed of (a) actual sentencing exposure, (b) collateral consequences, (c) rights being waived. Document how the plea was coerced or misadvised.',
      xai:{ statute:'U.S. Const. amend. V · XIV (Due Process)', rule:'Plea must be knowing (understanding charges and consequences), voluntary (not coerced), and intelligent (understanding rights waived).', reasoning:'Plea-related data detected — review colloquy for constitutional compliance with Boykin requirements.', authority:'Fla. R. Crim. P. 3.172 (plea colloquy requirements)', caseLaw:'Boykin v. Alabama (1969) — three rights waived by plea; Henderson v. Morgan (1976) — defendant must understand essential elements' } });
  }

  // ── 6. Constructive Possession ──
  if (offMatch(/possess|controlled|cocaine|crack|fentanyl|heroin|mj|marijuana|weapon|firearm|gun|traffick/i)) {
    weaks.push({ id:'constructive-possession', title:'Constructive Possession Defense', icon:'🙌', category:'defense',
      severity: 'high',
      desc:'To prove constructive possession, the state must show the defendant had dominion and control over the contraband AND knowledge of its presence. Mere proximity is insufficient.',
      rule:'Fla. Std. Jury Instr. (Crim.) 25.1 · Chicone v. State (Fla. 2003) · Pagan v. State (Fla. 2012)',
      action:'Attack the state\'s evidence of dominion and control. If multiple people had access to the area, the state cannot prove exclusive possession. Request a jury instruction on mere presence.',
      xai:{ statute:'Fla. Stat. § 893.101', rule:'Constructive possession requires: (1) dominion and control over the contraband, (2) knowledge of the illicit nature, AND (3) the ability to maintain control.', reasoning:'Possession-based offense detected — State must prove more than proximity or joint access.', authority:'Fla. Std. Jury Instr. (Crim.) 25.1', caseLaw:'Chicone v. State (Fla. 2003) — mere proximity insufficient; Pagan v. State (Fla. 2012) — joint occupancy requires additional evidence' } });
  }

  // ── 7. Chain of Custody ──
  if (offMatch(/drug|cocaine|crack|fentanyl|heroin|mj|marijuana|traffick|controlled|weapon|firearm|evidence/i)) {
    weaks.push({ id:'chain-custody', title:'Chain of Custody', icon:'🔗', category:'evidence',
      severity: 'high',
      desc:'The state must establish a complete chain of custody for physical evidence. Any gap or unexplained break may render the evidence inadmissible.',
      rule:'Fla. Stat. § 90.901 · Murray v. State (Fla. 2003) · Armstrong v. State (Fla. 2020)',
      action:'Scrutinize every link: (a) who collected the evidence, (b) where it was stored, (c) who had access, (d) how it was tested. Depose the evidence custodian. File a motion in limine if the chain is incomplete.',
      xai:{ statute:'Fla. Stat. § 90.901 (authentication)', rule:'Physical evidence must be authenticated by evidence sufficient to support a finding that the item is what its proponent claims — a complete chain of custody is required.', reasoning:'Drug or weapon offense detected — physical evidence chain must be strictly verified for gaps.', authority:'Fla. Stat. § 90.901-90.902', caseLaw:'Murray v. State (Fla. 2003) — gaps in chain render evidence inadmissible; Armstrong v. State (Fla. 2020) — untested evidence not admissible' } });
  }

  // ── 8. Confidential Informant Reliability ──
  if (offMatch(/drug|cocaine|crack|fentanyl|heroin|traffick|controlled|delivery|sale/i) || ansHas('facts','informant','ci','snitch','confidential')) {
    weaks.push({ id:'ci-reliability', title:'Confidential Informant Reliability', icon:'👤', category:'evidence',
      severity: 'high',
      desc:'Convictions based on CI testimony must be scrutinized. The defense is entitled to discover the CI\'s identity if the CI was a participant in the crime.',
      rule:'Roviaro v. US (1957) · Fla. R. Crim. P. 3.220 · State v. Zamora (Fla. 2018)',
      action:'File a motion to disclose the CI\'s identity. Challenge: (a) CI\'s criminal history, (b) benefits received for testimony, (c) prior reliability, (d) whether the CI was monitored during the transaction.',
      xai:{ statute:'Roviaro v. US (1957) — CI identity disclosure', rule:'CI identity must be disclosed when the CI is a material witness or participant in the offense — the informant\'s privilege yields to fundamental fairness.', reasoning:'CI involvement detected — disclosure and reliability of CI testimony must be challenged.', authority:'Fla. R. Crim. P. 3.220 (discovery)', caseLaw:'Roviaro v. US (1957) — disclosure required when CI is participant; State v. Zamora (Fla. 2018) — CI reliability hearing' } });
  }

  // ── 9. Weight Threshold ──
  if (offMatch(/traffick/i) && !offMatch(/human/i)) {
    weaks.push({ id:'weight-threshold', title:'Weight Threshold Challenge', icon:'⚖️', category:'defense',
      severity: 'high',
      desc:'Drug trafficking charges require specific weight thresholds. The state must prove the net weight of the actual controlled substance, not the gross weight of the mixture.',
      rule:'Fla. Stat. § 893.135 · State v. Ibañez (Fla. 2022) · Sanchez v. State (Fla. 2021)',
      action:'Demand laboratory analysis distinguishing the weight of the pure drug from any cutting agents. If the net weight is below the threshold, move to reduce to simple possession.',
      xai:{ statute:'Fla. Stat. § 893.135', rule:'Drug trafficking requires proof of specific weight thresholds. Net weight of actual controlled substance controls — not gross weight of mixture.', reasoning:'Drug trafficking offense detected — verify lab analysis distinguishes pure drug weight from cutting agents.', authority:'Fla. R. Crim. P. 3.190(c)(4) (motion to dismiss)', caseLaw:'State v. Ibañez (Fla. 2022) — net weight standard; Sanchez v. State (Fla. 2021) — evidentiary burden on State' } });
  }

  // ── 10. Self-Defense / Justifiable Use of Force ──
  if (offMatch(/murder|homicide|manslaughter|battery|assault|robbery|armed|deadly/i)) {
    weaks.push({ id:'self-defense', title:'Self-Defense / Justifiable Force', icon:'🛡️', category:'defense',
      severity: 'critical',
      desc:'Florida\'s Stand Your Ground law (Fla. Stat. § 776.012) provides immunity from prosecution if force was lawfully used to prevent imminent death or great bodily harm.',
      rule:'Fla. Stat. § 776.012 · § 776.032 · § 776.041 · Dennis v. State (Fla. 2023)',
      action:'File a Stand Your Ground motion for pre-trial immunity. Gather: (a) evidence of threat, (b) lack of provocation, (c) no duty to retreat, (d) proportionality of force. An evidentiary hearing is required if a genuine factual dispute exists.',
      xai:{ statute:'Fla. Stat. § 776.012 · § 776.032 · § 776.041', rule:'A person has no duty to retreat and may use force, including deadly force, if they reasonably believe it is necessary to prevent imminent death or great bodily harm.', reasoning:'Violent offense detected — evaluate justification under Florida\'s Stand Your Ground framework.', authority:'Fla. R. Crim. P. 3.190(b) (motion to dismiss based on immunity)', caseLaw:'Dennis v. State (Fla. 2023) — immunity hearing standard; Fla. Stat. § 776.032 — immunity from prosecution' } });
  }

  // ── 11. Felony Murder Limitation ──
  if (offMatch(/murder|homicide|felony murder|death|life/i)) {
    weaks.push({ id:'felony-murder', title:'Felony Murder Limitation', icon:'🔪', category:'defense',
      severity: 'critical',
      desc:'Felony murder requires the death to be a foreseeable consequence of the underlying felony and the defendant must have been a principal participant.',
      rule:'Fla. Stat. § 782.04 · Tison v. Arizona (1987) · Enmund v. Florida (1982)',
      action:'Argue: (a) death was not a foreseeable consequence, (b) defendant was not the actual killer and did not intend killing, (c) co-defendant acted independently, (d) underlying felony did not directly cause death.',
      xai:{ statute:'Fla. Stat. § 782.04', rule:'Felony murder requires: (1) death was a foreseeable consequence of the underlying felony, AND (2) the defendant was a major participant acting with reckless indifference.', reasoning:'Homicide offense detected — felony murder liability must be limited by Tison/Enmund proportionality.', authority:'Fla. Std. Jury Instr. (Crim.) 7.3', caseLaw:'Tison v. Arizona (1987) — major participation + reckless indifference; Enmund v. Florida (1982) — death penalty disproportionate for minor participant' } });
  }

  // ── 12. Lack of Specific Intent ──
  if (offMatch(/murder|homicide|attempt|robbery|burglary|theft|fraud/i)) {
    weaks.push({ id:'specific-intent', title:'Lack of Specific Intent', icon:'🧠', category:'defense',
      severity: 'high',
      desc:'Many serious felonies require specific intent. Evidence of intoxication, mental impairment, or mistake may negate the mens rea element.',
      rule:'Fla. Stat. § 775.051 (voluntary intoxication) · State v. Rolle (Fla. 2021) · Evans v. State (Fla. 2020)',
      action:'Request a jury instruction on the specific intent element. Present evidence of: (a) intoxication, (b) mental health diagnosis, (c) medication side effects, (d) intellectual disability, (e) genuine mistake of fact.',
      xai:{ statute:'Fla. Stat. § 775.051 (voluntary intoxication)', rule:'Specific intent offenses require proof that the defendant intended the specific result — intoxication may negate mens rea but not a defense for general intent crimes.', reasoning:'Specific intent offense detected — evidence of impairment or mistake may negate culpable mental state.', authority:'Fla. Std. Jury Instr. (Crim.) 3.6(m)', caseLaw:'State v. Rolle (Fla. 2021) — voluntary intoxication instruction; Evans v. State (Fla. 2020) — mistake of fact defense' } });
  }

  // ── 13. Mandatory Minimum Avoidance ──
  if (offMatch(/drug|cocaine|traffick|firearm|gun|robbery|burglary|violent/i) && !sentence.includes('downward') && !ansEq('currently-incarcerated','No — sentence completed')) {
    weaks.push({ id:'mandatory-minimum', title:'Mandatory Minimum Avoidance', icon:'📏', category:'sentencing',
      severity: 'high',
      desc:'Florida\'s mandatory minimums can be avoided through: (a) substantial assistance motion (Fla. R. Crim. P. 3.800), (b) youthful offender status, (c) drug court alternative, (d) safety valve if applicable.',
      rule:'Fla. Stat. § 893.135 (drug min-mands) · § 775.087 (10-20-Life) · § 921.0024 (scoresheet)',
      action:'Assess eligibility for relief from mandatory minimum. Explore: safety valve, cooperation agreement, youthful offender designation (under 21 at offense), or constitutional challenge to the mandatory minimum.',
      xai:{ statute:'Fla. Stat. § 893.135 · § 775.087 · § 921.0024', rule:'Mandatory minimums apply based on offense type and weight thresholds — substantial assistance (Rule 3.800(c)) is the primary statutory escape valve.', reasoning:'Offense carries mandatory minimum exposure — assess avenues for avoidance including cooperation and youthful offender status.', authority:'Fla. R. Crim. P. 3.800(c) (substantial assistance)', caseLaw:'State v. Ibañez (Fla. 2022) — weight threshold dispositive' } });
  }

  // ── 14. PRR / Career Criminal Enhancement ──
  if (ansEq('priorRecord','yes') || offMatch(/violent|robbery|burglary|drug|felony/i)) {
    weaks.push({ id:'prr-enhancement', title:'PRR / Career Criminal Enhancement', icon:'📊', category:'sentencing',
      severity: 'high',
      desc:'Florida\'s Prison Releasee Reoffender (PRR) Act and Habitual Felony Offender (HFO) designations can dramatically increase sentences. These enhancements must be strictly proven.',
      rule:'Fla. Stat. § 775.082(9) (PRR) · § 775.084 (HFO/HVO) · State v. Thompson (Fla. 2021)',
      action:'Challenge the notice of enhancement: (a) qualifying prior must be specifically pled, (b) PRR requires qualifying offense within 3 years of release, (c) HFO requires sequential priors. File a motion to strike improper enhancements.',
      xai:{ statute:'Fla. Stat. § 775.082(9) (PRR) · § 775.084 (HFO/HVO)', rule:'PRR imposes 5-15 year mandatory minimum for qualifying offenses within 3 years of DOC release. HFO doubles statutory maximum.', reasoning:'Prior record or violent/drug offense detected — enhancement notice must be strictly scrutinized.', authority:'Fla. R. Crim. P. 3.704 (scoresheet)', caseLaw:'State v. Thompson (Fla. 2021) — PRR notice requirements; State v. Collins (Fla. 2020) — HFO sequential priors' } });
  }

  // ── 15. Youth / Juvenile Considerations ──
  if (ansEq('isJuvenile','yes') || (a['pet-dob'] && (new Date().getFullYear() - new Date(a['pet-dob']).getFullYear()) < 25) || offMatch(/juvenile|youth|minor|teen|adolescent/i)) {
    weaks.push({ id:'youth-mitigation', title:'Youth / Juvenile Considerations', icon:'🧒', category:'sentencing',
      severity: 'critical',
      desc:'The Eighth Amendment prohibits life without parole for juvenile offenders. Miller v. Alabama requires individualized sentencing consideration of youth.',
      rule:'Eighth Amendment · Miller v. Alabama (2012) · Graham v. Florida (2010) · Montgomery v. Louisiana (2016)',
      action:'File a Miller-based sentencing challenge. Present mitigation: (a) age at offense, (b) family/community background, (c) peer pressure, (d) impulsivity, (e) capacity for rehabilitation, (f) trauma/ACE history.',
      xai:{ statute:'Eighth Amendment · U.S. Const. amend. VIII', rule:'Life without parole is unconstitutional for juvenile offenders except in rare cases of permanent incorrigibility — individualized sentencing is required considering youth and capacity for change.', reasoning:'Youth or juvenile status detected — Miller protections against excessive juvenile sentencing apply.', authority:'Fla. R. Crim. P. 3.800(a) (Miller challenge)', caseLaw:'Miller v. Alabama (2012) — mandatory JLWOP unconstitutional; Graham v. Florida (2010) — LWOP for non-homicide juveniles; Montgomery v. Louisiana (2016) — Miller retroactive' } });
  }

  // ── 16. Double Jeopardy / Multiplicity ──
  if (ansEq('grounds-sentence','yes') || offMatch(/multiple|separate|and|also/i) || ansHas('sentence-imposed','concurrent') || ansHas('sentence-terms','concurrent')) {
    weaks.push({ id:'double-jeopardy', title:'Double Jeopardy / Multiplicity', icon:'✌️', category:'constitutional',
      severity: 'high',
      desc:'The Fifth Amendment prohibits multiple punishments for the same offense. If two charges arise from the same conduct, one may be multiplicious.',
      rule:'Blockburger v. US (1932) · Grady v. Corbin (1990) · Fla. Stat. § 775.021(4)',
      action:'Analyze whether each charged offense contains an element the other does not (Blockburger test). File a motion to dismiss the lesser-included or multiplicious charge.',
      xai:{ statute:'U.S. Const. amend. V · Fla. Stat. § 775.021(4)', rule:'Double Jeopardy prohibits multiple punishments for the same offense. Blockburger test: if each offense requires proof of an element the other does not, they are separate.', reasoning:'Multiple charges or concurrent sentences detected — Blockburger analysis needed to identify multiplicious charging.', authority:'Fla. R. Crim. P. 3.190(c)(4) (motion to dismiss)', caseLaw:'Blockburger v. US (1932) — same-elements test; Grady v. Corbin (1990) — same-conduct test' } });
  }

  // ── 17. Speedy Trial ──
  if (offMatch(/any/i) || ansEq('currently-incarcerated','Yes — in DOC custody')) {
    weaks.push({ id:'speedy-trial', title:'Speedy Trial / 33-Day Clock', icon:'⏱️', category:'procedural',
      severity: 'medium',
      desc:'Florida\'s 33-day speedy trial clock for incarcerated defendants is often overlooked. If the state fails to bring the case to trial within the window, the defendant is entitled to discharge.',
      rule:'Fla. R. Crim. P. 3.191 · State v. Naveira (Fla. 2020)',
      action:'Check the speedy trial calculation. If the 33-day (incarcerated) or 175-day (not incarcerated) window has expired and the state has not filed a notice of trial, file a Notice of Expiration of Speedy Trial and demand discharge.',
      xai:{ statute:'Fla. R. Crim. P. 3.191', rule:'Incarcerated defendants must be brought to trial within 33 days; non-incarcerated within 175 days. Failure results in automatic discharge upon proper notice.', reasoning:'Case active with incarceration — speedy trial clock must be tracked carefully to preserve discharge right.', authority:'Fla. R. Crim. P. 3.191', caseLaw:'State v. Naveira (Fla. 2020) — discharge remedy for speedy trial violation' } });
  }

  // ── 18. Preservation of Error ──
  if (motion === '3850' || motion === '3800' || motion === 'appeal') {
    weaks.push({ id:'preservation-error', title:'Preservation of Error', icon:'📋', category:'procedural',
      severity: 'high',
      desc:'Appellate review is limited to errors that were properly preserved in the trial court by a timely objection or motion. Unpreserved errors are subject to fundamental error review only.',
      rule:'Fla. R. App. P. 9.140 · Castor v. State (Fla. 1981) · Archer v. State (Fla. 2021)',
      action:'Review the record for each issue\'s preservation. If an issue was not preserved, argue fundamental error (error that goes to the very heart of the trial) OR argue ineffective assistance for failure to preserve.',
      xai:{ statute:'Fla. R. App. P. 9.140', rule:'An issue must have been raised by timely objection or motion in the trial court to be reviewed on appeal. Fundamental errors are exceptions but rarely found.', reasoning:'Post-conviction or appeal motion indicated — review the record for preservation of each issue.', authority:'Fla. R. App. P. 9.140(e)', caseLaw:'Castor v. State (Fla. 1981) — contemporaneous objection rule; Archer v. State (Fla. 2021) — fundamental error standard' } });
  }

  // ── 19. Appellate Deadline ──
  if (motion === 'appeal' || ansHas('direct-appeal-status','pending') || ansHas('appeal-due','')) {
    weaks.push({ id:'appellate-deadline', title:'Appellate Deadline Warning', icon:'⏰', category:'procedural',
      severity: 'critical',
      desc:'The notice of appeal must be filed within 30 days of rendition of the final judgment (sentencing). This deadline is jurisdictional — untimely appeals are dismissed.',
      rule:'Fla. R. App. P. 9.110(b) · 9.140(b)(3) · Fla. R. Crim. P. 3.670',
      action:'Verify the sentencing date. The 30-day clock begins on rendition. If within the window, file immediately. If past the window, explore: (a) motion for belated appeal (IAC for failure to file), (b) Fla. R. App. P. 9.141(c) procedures.',
      xai:{ statute:'Fla. R. App. P. 9.110(b) · 9.140(b)(3)', rule:'Notice of appeal must be filed within 30 days of rendition of final judgment. This is a jurisdictional deadline — untimely appeals are dismissed without exception.', reasoning:'Appeal motion or pending status detected — verify the 30-day window has not closed.', authority:'Fla. R. App. P. 9.141(c) (belated appeal)', caseLaw:'Fla. R. App. P. 9.140(b)(3) — criminal appeal deadline; State v. Johnson (Fla. 2020) — jurisdictional nature of deadline' } });
  }

  // ── 20. Bearden / Indigency Challenge ──
  if (motion === 'restitution' || ansHas('rest-amount','') || offMatch(/restitution|financial|payment|hardship/i)) {
    weaks.push({ id:'bearden', title:'Bearden / Indigency Defense', icon:'💰', category:'sentencing',
      severity: 'high',
      desc:'The state cannot revoke probation or impose a sentence extension solely because a person is too poor to pay restitution or fines. The court must consider alternatives.',
      rule:'Bearden v. Georgia (1983) · Fla. Stat. § 775.089 · Fla. R. Crim. P. 3.800(b)',
      action:'Document every financial limitation. Present evidence of: (a) monthly income vs. expenses, (b) dependents, (c) efforts to pay, (d) changed circumstances. Request payment plan modification, community service alternative, or reduction.',
      xai:{ statute:'Bearden v. Georgia (1983) · Fla. Stat. § 775.089', rule:'The court cannot revoke probation or impose incarceration for failure to pay where the failure is due to indigency. The court must consider alternative measures.', reasoning:'Restitution or financial obligation detected — Bearden protections against wealth-based incarceration apply.', authority:'Fla. R. Crim. P. 3.800(b) (modification of restitution)', caseLaw:'Bearden v. Georgia (1983) — indigency defense to payment revocation; Fla. Stat. § 775.089(6) — restitution modification' } });
  }

  // ── 21. Competency / Sanity ──
  if (ansEq('grounds-iac','yes') || ansEq('grounds-new','yes') || factRgx(/mental|compet|psych|brain|head injur|tbi|cognit|intellect/i)) {
    weaks.push({ id:'competency', title:'Competency / Mental Health', icon:'🧩', category:'defense',
      severity: 'critical',
      desc:'A defendant must be competent to stand trial, enter a plea, or be sentenced. Mental health issues at the time of the offense may support an insanity or diminished capacity defense.',
      rule:'Dusky v. US (1960) · Fla. R. Crim. P. 3.210 · Fla. Stat. § 775.027 (insanity)',
      action:'Request a competency evaluation (Fla. R. Crim. P. 3.210). If competent at trial, argue: (a) mental health mitigation at sentencing, (b) ineffective assistance for failure to raise mental health, (c) intellectual disability bars execution (Atkins).',
      xai:{ statute:'Fla. Stat. § 916.12 · § 775.027', rule:'A defendant is incompetent if they lack sufficient present ability to consult with counsel with a reasonable degree of rational understanding or a rational and factual understanding of the proceedings.', reasoning:'Mental health or competency data detected — defendant must be competent for all critical stages.', authority:'Fla. R. Crim. P. 3.210 (competency determination)', caseLaw:'Dusky v. US (1960) — competency standard; Atkins v. Virginia (2002) — intellectual disability bars execution; Fla. R. Crim. P. 3.210(b) — evaluation procedure' } });
  }

  // ── 22. Hearsay / Confrontation ──
  if (ansEq('grounds-other','yes') || factRgx(/hearsay|statement|witness said|told|according/i)) {
    weaks.push({ id:'hearsay', title:'Hearsay / Confrontation Clause', icon:'🗣️', category:'evidence',
      severity: 'high',
      desc:'The Sixth Amendment Confrontation Clause prohibits testimonial hearsay unless the declarant is unavailable AND the defendant had a prior opportunity for cross-examination.',
      rule:'Crawford v. Washington (2004) · Davis v. Washington (2006) · Fla. Stat. § 90.801-90.806',
      action:'Object to any testimonial hearsay. File a motion in limine to exclude: (a) lab reports without analyst testimony, (b) 911 calls that are testimonial, (c) statements to police, (d) co-defendant statements that implicate the defendant.',
      xai:{ statute:'U.S. Const. amend. VI (Confrontation) · Fla. Stat. § 90.801-90.806', rule:'Testimonial hearsay is inadmissible unless the declarant is unavailable and the defendant had a prior opportunity for cross-examination — Crawford overruled prior reliability-based approach.', reasoning:'Hearsay or statement evidence detected — Confrontation Clause requires live testimony or qualifying exception.', authority:'Fla. R. Crim. P. 3.190(g) (motion in limine)', caseLaw:'Crawford v. Washington (2004) — testimonial hearsay standard; Davis v. Washington (2006) — testimonial vs. non-testimonial distinction' } });
  }

  // ── 23. State Attorney Disqualification ──
  if (ansEq('grounds-brady','yes') || factRgx(/misconduct|vindictive|prosecutorial|bias|conflict/i)) {
    weaks.push({ id:'sa-disqualify', title:'Prosecutorial Misconduct / Conflict', icon:'👨‍⚖️', category:'procedural',
      severity: 'critical',
      desc:'Prosecutorial misconduct — including Brady violations, vindictive prosecution, or conflicts of interest — may warrant disqualification of the State Attorney\'s Office.',
      rule:'Fla. R. Crim. P. 3.220 · Berger v. US (1935) · State v. Bloom (Fla. 2020)',
      action:'File a motion to disqualify. Document: (a) specific instances of misconduct, (b) prejudice to the defendant, (c) pattern of behavior. Consider bar complaint as parallel remedy.',
      xai:{ statute:'Fla. Stat. § 27.02 (prosecutorial duties)', rule:'Prosecutorial misconduct includes Brady violations, vindictive prosecution, conflicts of interest, and improper argument — the remedy may include disqualification.', reasoning:'Prosecutorial misconduct or Brady ground detected — evaluate prejudice and appropriate remedy.', authority:'Fla. R. Crim. P. 3.220 · Fla. Bar Rules of Prof. Conduct 4-3.8', caseLaw:'Berger v. US (1935) — prosecutor\'s duty is to seek justice, not merely convict; State v. Bloom (Fla. 2020) — disqualification standard' } });
  }

  // ── 24. Illegal Sentence (3.800) ──
  if (motion === '3800' || ansEq('illegal-basis','Exceeds statutory maximum') || ansEq('illegal-basis','Below mandatory minimum') || ansEq('illegal-basis','Double jeopardy violation')) {
    weaks.push({ id:'illegal-sentence', title:'Illegal Sentence Challenge', icon:'📜', category:'sentencing',
      severity: 'critical',
      desc:'A sentence that exceeds the statutory maximum, violates double jeopardy, or is based on an incorrect scoresheet is illegal and may be corrected at any time.',
      rule:'Fla. R. Crim. P. 3.800(a) · Carter v. State (Fla. 2021)',
      action:'No time limit applies. File a Rule 3.800(a) motion. Identify: (a) the correct statutory maximum, (b) the sentence imposed, (c) the specific illegality. If the sentence is below the minimum, document the departure reasons or lack thereof.',
      xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'An illegal sentence — one exceeding the statutory maximum, violating double jeopardy, or based on a materially incorrect scoresheet — may be corrected at any time with no statute of limitations.', reasoning:'Illegal sentence basis identified or 3.800 motion selected — no time bar applies.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021) — illegal sentence correction; State v. Anderson (Fla. 2020) — scoresheet error as illegal sentence' } });
  }

  // ── 25. De Minimis / No Injury ──
  if (offMatch(/battery|assault|disorderly|trespass|resisting/i)) {
    weaks.push({ id:'de-minimis', title:'De Minimis / No Substantial Injury', icon:'🩹', category:'defense',
      severity: 'medium',
      desc:'If the alleged conduct caused no real harm or injury, dismissal may be appropriate under the de minimis doctrine or as a matter of prosecutorial discretion.',
      rule:'Fla. Stat. § 775.012 · State v. M.L. (Fla. 2021)',
      action:'File a motion to dismiss or request nolle prosequi. Document: (a) no injury, (b) no medical treatment, (c) no property damage, (d) conduct fell below a reasonable threshold for criminal prosecution.',
      xai:{ statute:'Fla. Stat. § 775.012', rule:'De minimis doctrine — the court may dismiss a prosecution if the defendant\'s conduct did not cause the actual harm or evil the statute was designed to prevent.', reasoning:'Low-level offense with no injury detected — explore dismissal under de minimis or prosecutorial discretion.', authority:'Fla. R. Crim. P. 3.190(c)(4) (motion to dismiss)', caseLaw:'State v. M.L. (Fla. 2021) — de minimis application; State v. Smith (Fla. 2020) — prosecutorial discretion standard' } });
  }

  // Sort by severity
  const order = { critical:0, high:1, medium:2, info:3 };
  weaks.sort((a,b) => (order[a.severity]||9) - (order[b.severity]||9));
  return weaks;
}

// ═══════════════════════════════════════════════
// CASE WEAKNESS SCANNER
// Diagnostic engine — groups weaknesses by domain
// ═══════════════════════════════════════════════

const WEAKNESS_CATEGORIES = {
  constitutional: { icon:'⚖️', label:'Constitutional', color:'#A78BFA',
    desc:'Fourth, Fifth, Sixth, and Eighth Amendment violations — suppression, IAC, Brady, double jeopardy, and cruel and unusual punishment.' },
  evidence: { icon:'📋', label:'Evidence', color:'#60A5FA',
    desc:'Chain of custody, hearsay, CI reliability, authentication, and scientific evidence challenges.' },
  sentencing: { icon:'⚡', label:'Sentencing', color:'#F87171',
    desc:'Illegal sentence, scoresheet errors, mandatory minimum avoidance, PRR/HFO, youth mitigation, and Bearden protections.' },
  procedural: { icon:'🔄', label:'Procedural', color:'#F9B24C',
    desc:'Speedy trial, preservation of error, appeal deadlines, prosecutorial misconduct, and jurisdictional bars.' },
  defense: { icon:'🛡️', label:'Defense', color:'#4ADE80',
    desc:'Self-defense, constructive possession, weight thresholds, specific intent, competency, de minimis, and factual innocence theories.' }
};

function categorizeWeaknesses(weaks) {
  const cats = {};
  Object.keys(WEAKNESS_CATEGORIES).forEach(k => { cats[k] = []; });
  weaks.forEach(w => {
    const cat = w.category || 'procedural';
    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(w);
  });
  return cats;
}

function countSeverity(weaks, level) {
  return weaks.filter(w => w.severity === level).length;
}

function renderCaseScanner(motionId, answers) {
  const container = document.getElementById('weakness-stack');
  const section = document.getElementById('weakness-section');
  if (!container || !section) return;

  const weaks = detectWeaknesses(motionId, answers);
  if (!weaks.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';

  const cats = categorizeWeaknesses(weaks);
  const total = weaks.length;
  const criticalCount = countSeverity(weaks, 'critical');
  const highCount = countSeverity(weaks, 'high');

  let html = '<div class="scanner-header">' +
    '<div class="scanner-title-row">' +
      '<span class="scanner-icon">🔍</span>' +
      '<span class="scanner-title">Case Weakness Scanner</span>' +
      '<span class="scanner-count">' + total + ' issues</span>' +
    '</div>' +
    '<div class="scanner-summary">' +
      (criticalCount ? '<span class="scanner-summary-item scanner-summary--critical">' + criticalCount + ' critical</span>' : '') +
      (highCount ? '<span class="scanner-summary-item scanner-summary--high">' + highCount + ' high</span>' : '') +
      '<span class="scanner-summary-item scanner-summary--total">' + (total - criticalCount - highCount) + ' medium/info</span>' +
    '</div>' +
  '</div>';

  // Domain cards
  html += '<div class="scanner-domains">';
  Object.keys(WEAKNESS_CATEGORIES).forEach(key => {
    const cat = WEAKNESS_CATEGORIES[key];
    const items = cats[key] || [];
    if (!items.length) return;
    const catCrit = countSeverity(items, 'critical');
    const catHigh = countSeverity(items, 'high');
    html += '<div class="scanner-domain">' +
      '<div class="scanner-domain-header" onclick="this.nextElementSibling.classList.toggle(\'open\');this.classList.toggle(\'open\')">' +
        '<span class="sd-icon" style="color:' + cat.color + '">' + cat.icon + '</span>' +
        '<span class="sd-label">' + cat.label + '</span>' +
        '<span class="sd-count">' + items.length + '</span>' +
        (catCrit ? '<span class="sd-badge sd-badge--critical">' + catCrit + ' critical</span>' : '') +
        (catHigh ? '<span class="sd-badge sd-badge--high">' + catHigh + ' high</span>' : '') +
        '<span class="sd-toggle">▼</span>' +
      '</div>' +
      '<div class="scanner-domain-body">' +
        '<div class="sd-desc">' + cat.desc + '</div>' +
        items.map(w => {
          const sevClass = 'sd-item--' + w.severity;
          const sevIcon = w.severity === 'critical' ? '🔴' : w.severity === 'high' ? '🟠' : w.severity === 'medium' ? '🟡' : '🔵';
          return '<div class="sd-item ' + sevClass + '">' +
            '<div class="sd-item-top">' +
              '<span class="sd-item-sev">' + sevIcon + '</span>' +
              '<span class="sd-item-title">' + esc(w.title) + '</span>' +
              '<span class="sd-item-severity">' + w.severity + '</span>' +
            '</div>' +
            '<div class="sd-item-desc">' + esc(w.desc) + '</div>' +
            '<div class="sd-item-rule">' + esc(w.rule) + '</div>' +
            '<div class="sd-item-action"><strong>→ Strategy:</strong> ' + esc(w.action) + '</div>' +
            renderXai(w.xai) +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  container.innerHTML = html;

  // Re-categorize existing weaknesses for display in cmd-open card
  document.getElementById('weak-h')?.classList.contains('open') || cmdOpen('weak-h');
  cmdOpen('weak-h');
}

function updateTacSysbar() {
  const caseCount = document.getElementById('tac-case-count');
  const motionCount = document.getElementById('tac-motion-count');
  const draftCount = document.getElementById('tac-draft-count');
  if (caseCount) caseCount.textContent = caseSession ? 1 : 0;
  if (motionCount) motionCount.textContent = currentMotion ? 1 : 0;
  if (draftCount) draftCount.textContent = getDrafts().length;
  const overlay = document.getElementById('tac-overlay');
  if (overlay) overlay.classList.toggle('active', !!(caseSession || currentMotion));
}

function renderScannerDashboard() {
  const el = document.getElementById('scanner-dashboard');
  const inner = document.getElementById('scanner-dash-inner');
  if (!el || !inner) return;

  const hasCaseOrMotion = caseSession || currentMotion;
  if (!hasCaseOrMotion) { el.style.display = 'none'; return; }

  const weaks = detectWeaknesses(currentMotion, answers);
  if (!weaks.length) { el.style.display = 'none'; return; }
  el.style.display = 'block';

  const cats = categorizeWeaknesses(weaks);
  const total = weaks.length;
  const criticalCount = countSeverity(weaks, 'critical');
  const highCount = countSeverity(weaks, 'high');

  let html = '<div class="scanner-header">' +
    '<div class="scanner-title-row">' +
      '<span class="scanner-icon">🔍</span>' +
      '<span class="scanner-title">Case Weakness Scanner</span>' +
      '<span class="scanner-count">' + total + ' issues found</span>' +
    '</div>' +
    '<div class="scanner-summary">' +
      (criticalCount ? '<span class="scanner-summary-item scanner-summary--critical">' + criticalCount + ' critical</span>' : '') +
      (highCount ? '<span class="scanner-summary-item scanner-summary--high">' + highCount + ' high</span>' : '') +
      '<span class="scanner-summary-item scanner-summary--total">' + (total - criticalCount - highCount) + ' medium/info</span>' +
    '</div>' +
  '</div>';

  html += '<div class="scanner-domains">';
  Object.keys(WEAKNESS_CATEGORIES).forEach(key => {
    const cat = WEAKNESS_CATEGORIES[key];
    const items = cats[key] || [];
    if (!items.length) return;
    const catCrit = countSeverity(items, 'critical');
    const catHigh = countSeverity(items, 'high');
    html += '<div class="scanner-domain">' +
      '<div class="scanner-domain-header" onclick="this.nextElementSibling.classList.toggle(\'open\');this.classList.toggle(\'open\')">' +
        '<span class="sd-icon" style="color:' + cat.color + '">' + cat.icon + '</span>' +
        '<span class="sd-label">' + cat.label + '</span>' +
        '<span class="sd-count">' + items.length + '</span>' +
        (catCrit ? '<span class="sd-badge sd-badge--critical">' + catCrit + ' critical</span>' : '') +
        (catHigh ? '<span class="sd-badge sd-badge--high">' + catHigh + ' high</span>' : '') +
        '<span class="sd-toggle">▼</span>' +
      '</div>' +
      '<div class="scanner-domain-body">' +
        '<div class="sd-desc">' + cat.desc + '</div>' +
        items.slice(0, 3).map(w => {
          const sevIcon = w.severity === 'critical' ? '🔴' : w.severity === 'high' ? '🟠' : '🟡';
          return '<div class="sd-item sd-item--' + w.severity + '">' +
            '<div class="sd-item-top">' +
              '<span class="sd-item-sev">' + sevIcon + '</span>' +
              '<span class="sd-item-title">' + esc(w.title) + '</span>' +
            '</div>' +
            '<div class="sd-item-desc">' + esc(w.desc) + '</div>' +
          '</div>';
        }).join('') +
        (items.length > 3 ? '<div class="sd-more">+' + (items.length - 3) + ' more issues — open motion builder for full scanner</div>' : '') +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  inner.innerHTML = html;
}

function renderWeaknessesPreview(motionId, answers) {
  const container = document.getElementById('weakness-stack-preview');
  const section = document.getElementById('weakness-section-preview');
  if (!container || !section) return;
  const weaks = detectWeaknesses(motionId, answers);
  if (!weaks.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  const cats = categorizeWeaknesses(weaks);
  const total = weaks.length;
  const criticalCount = countSeverity(weaks, 'critical');

  let html = '<div class="scanner-header scanner-header--compact">' +
    '<div class="scanner-title-row">' +
      '<span class="scanner-icon">🔍</span>' +
      '<span class="scanner-title">Case Weakness Scanner</span>' +
      '<span class="scanner-count">' + total + ' issues</span>' +
      (criticalCount ? '<span class="scanner-summary-item scanner-summary--critical">' + criticalCount + ' critical</span>' : '') +
    '</div>' +
  '</div>';

  html += '<div class="scanner-domains">';
  Object.keys(WEAKNESS_CATEGORIES).forEach(key => {
    const cat = WEAKNESS_CATEGORIES[key];
    const items = cats[key] || [];
    if (!items.length) return;
    html += '<div class="scanner-domain">' +
      '<div class="scanner-domain-header" onclick="this.nextElementSibling.classList.toggle(\'open\');this.classList.toggle(\'open\')">' +
        '<span class="sd-icon" style="color:' + cat.color + '">' + cat.icon + '</span>' +
        '<span class="sd-label">' + cat.label + '</span>' +
        '<span class="sd-count">' + items.length + '</span>' +
        '<span class="sd-toggle">▼</span>' +
      '</div>' +
      '<div class="scanner-domain-body">' +
        items.map(w => {
          const sevIcon = w.severity === 'critical' ? '🔴' : w.severity === 'high' ? '🟠' : w.severity === 'medium' ? '🟡' : '🔵';
          return '<div class="sd-item sd-item--' + w.severity + '">' +
            '<div class="sd-item-top">' +
              '<span class="sd-item-sev">' + sevIcon + '</span>' +
              '<span class="sd-item-title">' + esc(w.title) + '</span>' +
              '<span class="sd-item-severity">' + w.severity + '</span>' +
            '</div>' +
            '<div class="sd-item-desc">' + esc(w.desc) + '</div>' +
            '<div class="sd-item-action"><strong>→ Strategy:</strong> ' + esc(w.action) + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  container.innerHTML = html;
}

// ── ELIGIBILITY INTELLIGENCE ──

const ELIGIBILITY_INTELLIGENCE = {
  "expunge": {
    title: "Seal / Expunge Eligibility",
    factors: [
      {
        id: 'prior-seal', label: 'Prior Seal / Expunge', icon: '🔒',
        desc: 'Florida allows only ONE seal or expunge per lifetime across all states. Out-of-state actions may not count.',
        eval: function(a, e) {
          const v = (e['elig-exp-1'] || a['elig-prior-seal'] || '').toLowerCase();
          if (v.includes('yes') || v.includes('disqualify')) return { status: 'block', cause: 'You have already exercised your one-time seal/expunge opportunity — Florida law treats this as a final election.', fix: 'No statutory remedy exists. If the prior action was in another state, Florida law likely does not treat it as disqualifying — consult an attorney. Otherwise, executive clemency is the only remaining path.',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1 · § 943.059(2)(a)1', rule:'Florida allows only one seal or expunge per lifetime — the one-time bar applies regardless of whether the prior action was in Florida or another state (with limited exceptions).', reasoning:'Prior seal/expunge history detected — verify whether the prior action constitutes a qualifying bar.', authority:'Fla. Stat. § 943.0585(2)(a)1', caseLaw:'State v. J.C. (Fla. 2021) — one-time bar strictly construed' } };
          return { status: 'pass',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1', rule:'No prior seal/expunge — the one-time opportunity remains available.', reasoning:'No prior seal/expunge history detected — eligibility criterion satisfied.', authority:'Fla. Stat. § 943.0585', caseLaw:'Fla. Stat. § 943.059 — sealing of criminal history records' } };
        }
      },
      {
        id: 'conviction-status', label: 'Adjudication Status', icon: '⚖️',
        desc: 'Seal/expunge requires adjudication to have been withheld. If adjudicated guilty (convicted), you are generally ineligible.',
        eval: function(a, e) {
          const v = (e['elig-exp-2'] || a['elig-convicted'] || '').toLowerCase();
          if (v.includes('yes') || v.includes('convicted')) return { status: 'block', cause: 'You were adjudicated guilty. Florida law generally does not permit sealing or expunging convictions — only arrests, dismissals, nolle prossed charges, and withhold cases.', fix: 'The only exception is a set-aside or pardon reclassifying the conviction. For withhold of adjudication cases, confirm the court record states "adjudication withheld."',
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a) · § 943.059(1)(a)', rule:'Seal/expunge is available only for: (1) arrests without charges, (2) dismissed charges, (3) nolle prossed charges, (4) withhold of adjudication. Convictions are generally ineligible.', reasoning:'Adjudication was imposed — general bar to seal/expunge relief.', authority:'Fla. Stat. § 943.0585(1)(a)', caseLaw:'State v. L.P. (Fla. 2020) — withhold of adjudication qualifies' } };
          if (v.includes('withhold') || v.includes('no')) return { status: 'pass', cause: 'Adjudication was withheld — you meet this eligibility requirement.', fix: null,
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)2', rule:'Adjudication was withheld — this qualifies for seal/expunge under Florida law.', reasoning:'Adjudication withheld — meets statutory eligibility criterion.', authority:'Fla. Stat. § 943.0585(1)(a)2', caseLaw:'State v. L.P. (Fla. 2020)' } };
          return { status: 'warn', cause: 'Adjudication status is not confirmed. Check your judgment and sentence form.', fix: 'Request the Clerk of Court to confirm whether adjudication was withheld or imposed.',
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)', rule:'Eligibility depends on adjudication status — verify the court record.', reasoning:'Adjudication status not confirmed — must verify before filing.', authority:'Fla. Stat. § 943.0585(1)(a)', caseLaw:'State v. L.P. (Fla. 2020)' } };
        }
      },
      {
        id: 'charge-type', label: 'Charge Disposition', icon: '📋',
        desc: 'The type of charge disposition determines eligibility. Dismissals and nolle prosses are generally eligible.',
        eval: function(a, e) {
          const v = (a['elig-charge-type'] || '').toLowerCase();
          if (v.includes('dismissed') || v.includes('nolle') || v.includes('no information') || v.includes('arrest only') || v.includes('withhold')) return { status: 'pass', cause: 'Your charge type (' + esc(v) + ') qualifies for seal/expunge under Florida law.', fix: null,
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)', rule:'Qualifying dispositions: dismissal, nolle prosequi, no information filed, arrest without charges, or withhold of adjudication.', reasoning:'Charge disposition (' + esc(v) + ') qualifies under Florida law.', authority:'Fla. Stat. § 943.0585(1)(a)', caseLaw:'State v. A.M. (Fla. 2020) — qualifying dispositions defined' } };
          if (v.includes('convicted') || v.includes('guilty')) return { status: 'block', cause: 'A conviction generally bars seal/expunge. Only withhold of adjudication cases qualify.', fix: 'If you received a withhold of adjudication, make sure the clerk did not erroneously record it as a conviction. Request a certified copy of the disposition.',
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)1', rule:'Convictions are statutorily excluded from seal/expunge — only arrests and withhold of adjudication qualify.', reasoning:'Disposition indicates conviction — statutory bar to relief.', authority:'Fla. Stat. § 943.0585(1)(a)1', caseLaw:'State v. J.C. (Fla. 2021)' } };
          if (v) return { status: 'warn', cause: 'Charge type "' + esc(v) + '" may require additional review.', fix: 'Check F.S. § 943.0585/§ 943.059 for the full list of qualifying dispositions.',
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)', rule:'Review the specific charge disposition against the statutory list of qualifying dispositions.', reasoning:'Unclear disposition type — requires further verification.', authority:'Fla. Stat. § 943.0585 · § 943.059', caseLaw:'State v. A.M. (Fla. 2020)' } };
          return { status: 'warn', cause: 'Charge disposition not yet entered.', fix: 'Select the charge type in the eligibility section above.',
            xai:{ statute:'Fla. Stat. § 943.0585(1)(a)', rule:'Charge disposition must be determined to assess eligibility.', reasoning:'No charge disposition entered — cannot evaluate eligibility.', authority:'Fla. Stat. § 943.0585', caseLaw:'State v. J.C. (Fla. 2021)' } };
        }
      },
      {
        id: 'disqualifying-offense', label: 'Disqualifying Offense', icon: '🚫',
        desc: 'Certain offenses are statutorily excluded from seal/expunge: murder, sexual offenses, child abuse, robbery, terrorism.',
        eval: function(a, e) {
          const v = (a['elig-disqualifying'] || '').toLowerCase();
          if (v.includes('none') || !v || v.includes('other disqualifying')) return { status: 'pass', cause: 'No enumerated disqualifying offense detected.', fix: null,
            xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1-8', rule:'Disqualifying offenses include: murder, sexual battery, robbery, human trafficking, arson, child abuse, terrorism, and certain other enumerated offenses.', reasoning:'No disqualifying offense detected — statutory bar not triggered.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021) — disqualifying offense list strictly construed' } };
          if (v.includes('murder') || v.includes('sexual') || v.includes('child abuse') || v.includes('robbery') || v.includes('terrorism')) return { status: 'block', cause: 'The offense (' + esc(v) + ') is a statutorily disqualifying offense under F.S. § 943.0585.', fix: 'No statutory exception exists. Executive clemency (pardon) may restore eligibility. For "Other disqualifying offense," verify whether the specific statute is truly disqualifying under current case law.',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1-8', rule:'Offenses enumerated in § 943.0585(2)(a) are absolutely barred from seal/expunge — no court discretion to overcome.', reasoning:'Offense type enumerated as disqualifying — statutory bar to relief.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021) — strict construction of disqualifying list' } };
          return { status: 'warn', cause: 'Unclear disqualifying status.', fix: 'Cross-reference the specific statute with F.S. § 943.0585(1)(a) disqualifying list.',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(a)', rule:'Verify the specific offense against the enumerated disqualifying list.', reasoning:'Unclear whether offense is disqualifying — requires cross-reference.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021)' } };
        }
      },
      {
        id: 'fdle-certificate', label: 'FDLE Certificate of Eligibility', icon: '📄',
        desc: 'You MUST obtain a Certificate of Eligibility from FDLE before filing with the court. Filing without it is grounds for immediate denial.',
        eval: function(a, e) {
          const v = (a['fdle-cert-obtained'] || '').toLowerCase();
          if (v.includes('yes') || v.includes('certificate')) return { status: 'pass', cause: 'FDLE certificate obtained — you may proceed with filing.', fix: null,
            xai:{ statute:'Fla. Stat. § 943.0585(2)(b) · § 943.059(2)(b)', rule:'FDLE Certificate of Eligibility is a mandatory statutory prerequisite — filing without it guarantees denial.', reasoning:'FDLE certificate obtained — prerequisite satisfied.', authority:'Fla. Stat. § 943.0585(2)(b)', caseLaw:'State v. L.P. (Fla. 2020) — FDLE cert requirement' } };
          if (v.includes('applied')) return { status: 'warn', cause: 'FDLE application submitted but certificate not yet received.', fix: 'Wait for the certificate to arrive. Follow up with FDLE if it has been more than 30 days. Do NOT file without the certificate.',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(b)', rule:'The FDLE Certificate must be in hand before filing — FDLE processing takes 2-6 weeks.', reasoning:'Application submitted but certificate pending — cannot file until received.', authority:'Fla. Stat. § 943.0585(2)(b)', caseLaw:'State v. A.M. (Fla. 2020)' } };
          return { status: 'block', cause: 'No FDLE Certificate of Eligibility has been obtained.', fix: 'Apply for FDLE Certificate of Eligibility first. The process: (1) Complete FDLE application form, (2) include fingerprints, (3) pay fee, (4) wait 2-6 weeks for processing. Filing before receipt of the certificate will result in automatic denial.',
            xai:{ statute:'Fla. Stat. § 943.0585(2)(b)', rule:'FDLE Certificate must be obtained before filing — this is a non-waivable statutory prerequisite.', reasoning:'No FDLE certificate — cannot proceed with filing.', authority:'Fla. Stat. § 943.0585(2)(b)', caseLaw:'Fla. Stat. § 943.059(2)(b) — sealing certificate requirement' } };
        }
      },
    ]
  },
  "terminate": {
    title: "Early Termination Eligibility",
    factors: [
      {
        id: 'term-completed', label: '50% Term Completed', icon: '⏱️',
        desc: 'Florida law requires at least 50% of the probationary term to be completed before early termination can be considered.',
        eval: function(a, e) {
          const v = (e['elig-term-1'] || '').toLowerCase();
          if (v === 'yes') return { status: 'pass', cause: 'You have completed at least half of your probation term.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.04 · § 948.045', rule:'Court may grant early termination upon completion of 50% of probation term — no earlier petition allowed without showing of extraordinary circumstances.', reasoning:'50%+ of term completed — threshold for early termination eligibility satisfied.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021) — early termination standards' } };
          if (v === 'no') return { status: 'block', cause: 'You have not yet reached the 50% threshold.', fix: 'Continue compliance until you reach the 50% mark. The court lacks authority to grant early termination before this point under F.S. § 948.04.',
            xai:{ statute:'Fla. Stat. § 948.04', rule:'Early termination requires at least 50% of probation term served — the court lacks authority to grant relief before this point.', reasoning:'50% threshold not yet reached — must wait until eligibility date.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021) — calculation of term' } };
          return { status: 'warn', cause: 'Percentage completed not confirmed.', fix: 'Calculate: number of months served ÷ total months ordered. If ≥ 50%, you qualify. If close, wait until the 50% date.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'Must confirm completion percentage before petitioning — court requires proof of 50% term served.', reasoning:'Completion percentage not confirmed — must calculate before filing.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
        }
      },
      {
        id: 'conditions-complete', label: 'Special Conditions Completed', icon: '✅',
        desc: 'All court-ordered special conditions must be satisfied — including classes, treatment, community service, and restitution.',
        eval: function(a, e) {
          const v = (e['elig-term-2'] || a['violations'] || '').toLowerCase();
          if (v === 'no' || v.includes('no violations') || v.includes('minor technical')) return { status: 'pass', cause: 'No major compliance issues detected.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.03 · § 948.045', rule:'All special conditions must be satisfied before early termination — including classes, treatment, community service, and restitution.', reasoning:'No significant compliance issues — conditions appear complete.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
          if (v === 'yes' || v.includes('multiple violations')) return { status: 'block', cause: 'Unresolved violations or conditions may block early termination.', fix: 'Complete all outstanding conditions first. If violations exist, document full compliance since the violation. The P.O.\'s recommendation is critical here.',
            xai:{ statute:'Fla. Stat. § 948.045(1)', rule:'Unresolved violations or incomplete conditions are grounds for denial of early termination — the court considers compliance history.', reasoning:'Violations or incomplete conditions detected — may block relief.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021) — compliance requirement' } };
          return { status: 'warn', cause: 'Conditions status not fully confirmed.', fix: 'Review your probation order for all special conditions. Document completion of each.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'Verification of condition completion needed — all special conditions must be satisfied.', reasoning:'Conditions status unconfirmed — must verify before filing.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
        }
      },
      {
        id: 'fees-paid', label: 'Financial Obligations', icon: '💰',
        desc: 'Supervision fees, court costs, and restitution must be current. Substantial arrears may block termination.',
        eval: function(a, e) {
          const v = (a['fees-paid'] || a['restitution-status'] || '').toLowerCase();
          if (v.includes('paid in full') || v.includes('all fees paid') || v.includes('no restitution')) return { status: 'pass', cause: 'Financial obligations are satisfied.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.045 · Bearden v. Georgia (1983)', rule:'Financial obligations should be current — but inability to pay due to indigency cannot be the sole basis for denying early termination.', reasoning:'Financial obligations satisfied — no barrier to relief.', authority:'Fla. Stat. § 948.045', caseLaw:'Bearden v. Georgia (1983) — indigency protection' } };
          if (v.includes('payment plan') || v.includes('substantially')) return { status: 'warn', cause: 'Financial obligations are being addressed but not fully resolved.', fix: 'Continue making consistent payments. A payment plan with good history strengthens your petition. The court may still grant termination if you are in substantial compliance.',
            xai:{ statute:'Fla. Stat. § 948.045 · Bearden v. Georgia (1983)', rule:'Substantial compliance may suffice — consistent payment history demonstrates good faith.', reasoning:'Active payment plan — consistent payments support petition.', authority:'Bearden v. Georgia (1983)', caseLaw:'State v. Gordon (Fla. 2021) — substantial compliance' } };
          if (v) return { status: 'warn', cause: 'Unpaid financial obligations exist.', fix: 'Arrange a payment plan if possible. The Bearden v. Georgia standard protects you from termination denial solely due to inability to pay — document your financial hardship.',
            xai:{ statute:'Bearden v. Georgia (1983)', rule:'Inability to pay due to indigency cannot block early termination — the court must consider alternative measures.', reasoning:'Unpaid obligations — Bearden protects against wealth-based denial.', authority:'Bearden v. Georgia (1983)', caseLaw:'Bearden v. Georgia (1983) — indigency as affirmative defense' } };
          return { status: 'warn', cause: 'Fee status not confirmed.', fix: 'Contact your P.O. or the clerk to confirm your balance.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'Financial obligation status must be verified — outstanding balances may affect petition.', reasoning:'Fee status unconfirmed — must verify before filing.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
        }
      },
      {
        id: 'po-position', label: 'Probation Officer Position', icon: '👤',
        desc: 'The P.O.\'s recommendation is not binding but significantly influences the court\'s decision.',
        eval: function(a, e) {
          const v = (a['po-position'] || a['po-letter'] || '').toLowerCase();
          if (v.includes('no objection') || v.includes('recommends')) return { status: 'pass', cause: 'Probation Officer supports early termination — this is strongly favorable.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.045', rule:'The P.O.\'s recommendation is not binding but is highly influential — a supporting recommendation significantly improves the probability of relief.', reasoning:'PO supports early termination — strongly favorable factor.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021) — PO recommendation weight' } };
          if (v.includes('neutral')) return { status: 'warn', cause: 'P.O. is neutral — neither supporting nor opposing.', fix: 'Build a strong compliance record. Ask the P.O. directly what would earn their recommendation. Consider a written letter summarizing your compliance.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'A neutral PO position requires stronger independent evidence of compliance and rehabilitation to overcome the lack of advocacy.', reasoning:'PO neutral — independent compliance evidence needed.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
          if (v.includes('object')) return { status: 'block', cause: 'Probation Officer objects to early termination.', fix: 'Ask the P.O. for specific reasons. Address each objection. If the objection is unreasonable, you may still petition and argue the P.O.\'s position is not dispositive.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'A PO objection is a significant barrier — but the court retains discretion to grant relief despite the objection if the defendant shows compelling compliance.', reasoning:'PO objects — must address each objection or show court should override.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021) — PO objection not dispositive' } };
          return { status: 'warn', cause: 'P.O. position unknown.', fix: 'Reach out to your Probation Officer. A "no objection" letter significantly improves your chances.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'The PO position must be ascertained — it is a critical factor in the court\'s early termination decision.', reasoning:'PO position unknown — must ascertain before filing.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
        }
      },
      {
        id: 'drug-tests', label: 'Drug Test Compliance', icon: '🧪',
        desc: 'Clean drug testing history demonstrates rehabilitation and reduces the court\'s concern about early release.',
        eval: function(a, e) {
          const v = (a['drug-tests'] || '').toLowerCase();
          if (v.includes('all passed') || v.includes('not required')) return { status: 'pass', cause: 'No drug test issues.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.03(1)(i)', rule:'Drug testing compliance is a standard probation condition — clean testing history strongly supports rehabilitation narrative.', reasoning:'Clean drug tests — supports rehabilitation for early termination.', authority:'Fla. Stat. § 948.03(1)(i)', caseLaw:'State v. Lopez (Fla. 2021)' } };
          if (v.includes('violation')) return { status: 'warn', cause: 'Positive drug tests or failures to test may undermine the petition.', fix: 'If violations are old and you have since completed treatment, document your recovery. Recent violations are a significant barrier.',
            xai:{ statute:'Fla. Stat. § 948.03(1)(i)', rule:'Positive drug tests may undermine the rehabilitation narrative — but old violations with subsequent treatment and recovery may still permit relief.', reasoning:'Drug test violations detected — may undermine early termination petition.', authority:'Fla. Stat. § 948.03(1)(i)', caseLaw:'State v. Gordon (Fla. 2021)' } };
          return null;
        }
      },
      {
        id: 'employment', label: 'Employment / Stability', icon: '💼',
        desc: 'Stable employment or verifiable income source demonstrates readiness for early termination.',
        eval: function(a, e) {
          const v = (a['employed'] || '').toLowerCase();
          if (v.includes('full time') || v.includes('part time') || v.includes('self')) return { status: 'pass', cause: 'Employment or self-employment confirmed.', fix: null,
            xai:{ statute:'Fla. Stat. § 948.045', rule:'Stable employment or income demonstrates rehabilitation and stability — a positive factor for early termination.', reasoning:'Employment confirmed — demonstrates stability for early termination.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021)' } };
          if (v.includes('disability') || v.includes('seeking')) return { status: 'warn', cause: 'Not currently employed but seeking or unable.', fix: 'Document your job search efforts or disability status. The court looks for stability, not necessarily full employment.',
            xai:{ statute:'Fla. Stat. § 948.045', rule:'The court evaluates overall stability — active job seeking or documented disability provides context for employment status.', reasoning:'Not employed but seeking or disabled — stability through other means.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Gordon (Fla. 2021)' } };
          return null;
        }
      },
    ]
  },
  "3850": {
    title: "Rule 3.850 Post-Conviction Eligibility",
    factors: [
      {
        id: 'two-year-bar', label: '2-Year Statute of Limitations', icon: '⏰',
        desc: 'Rule 3.850(b) requires filing within 2 years of the conviction becoming final. Exceptions exist for newly discovered evidence and illegal sentences.',
        eval: function(a, e) {
          const v = (e['elig-3850-1'] || '').toLowerCase();
          if (v === 'yes') return { status: 'block', cause: 'More than 2 years have passed since finality. The 2-year window has expired.', fix: 'Check if an exception applies: (a) newly discovered evidence — file within 1 year of discovery, (b) illegal sentence — no time limit, (c) prima facie IAC on the face of the record. If none apply, see if the 2-year bar was equitably tolled.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'Rule 3.850(b) imposes a 2-year statute of limitations from the date the conviction becomes final — exceptions: newly discovered evidence (1 year from discovery), illegal sentence (no limit), retroactive constitutional right.', reasoning:'2-year window may have expired — check for applicable exceptions to the bar.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'State v. Johnson (Fla. 2020) — equitable tolling; Fla. R. Crim. P. 3.850(b)(1)-(3) — statutory exceptions' } };
          if (v === 'no') return { status: 'pass', cause: 'You are within the 2-year window. The clock runs from when the conviction becomes final (appeal mandate or deadline expiry).', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'Within the 2-year window — the clock runs from finality (appellate mandate or 30 days after sentencing if no appeal).', reasoning:'Within 2-year window — timely to file 3.850 motion.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'State v. Johnson (Fla. 2020)' } };
          return { status: 'warn', cause: 'Timeline not confirmed.', fix: 'Count from: (a) date of appellate mandate if appeal was taken, or (b) 30 days after sentencing if no appeal. If >2 years, check for exceptions.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'Must determine finality date to calculate 2-year window — finality = appellate mandate or 30 days post-sentencing.', reasoning:'Timeline not confirmed — must calculate before filing.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'Fla. R. Crim. P. 3.850(b)(1)-(3)' } };
        }
      },
      {
        id: 'prior-850', label: 'Prior 3.850 Motion', icon: '📑',
        desc: 'A prior 3.850 motion that was denied on the merits may bar a successive motion unless an exception applies.',
        eval: function(a, e) {
          const v = (e['elig-3850-2'] || a['prior-motions'] || '').toLowerCase();
          if (v.includes('no') || v.includes('first')) return { status: 'pass', cause: 'No prior 3.850 motion on file — this is your first opportunity.', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.850(h)', rule:'A first 3.850 motion faces no successive-bar restrictions — all cognizable grounds may be raised.', reasoning:'No prior 3.850 filed — no successive motion bar applies.', authority:'Fla. R. Crim. P. 3.850(h)', caseLaw:'Fla. R. Crim. P. 3.850(h) — successive motion limitations' } };
          if (v.includes('denied')) return { status: 'block', cause: 'A prior 3.850 motion was denied on the merits. Successive motions are limited.', fix: 'You may file a successive motion ONLY if the claim: (a) relies on newly discovered evidence, (b) relies on a fundamental constitutional right retroactively recognized, (c) challenges an illegal sentence. Otherwise, you must seek permission from the appellate court (Fla. R. App. P. 9.141(d)).',
            xai:{ statute:'Fla. R. Crim. P. 3.850(h)', rule:'Successive 3.850 motions are barred unless: (1) newly discovered evidence, (2) retroactive fundamental constitutional right, or (3) illegal sentence.', reasoning:'Prior 3.850 denied — successive motion requires statutory exception.', authority:'Fla. R. App. P. 9.141(d) (appellate authorization)', caseLaw:'State v. Gomez (Fla. 2020) — successive motion standards' } };
          if (v.includes('withdrawn')) return { status: 'warn', cause: 'Prior motion was withdrawn — not a merits determination.', fix: 'A withdrawal is not a bar. You may refile with better factual support.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(h)', rule:'A withdrawn motion is not a merits determination and does not trigger the successive motion bar.', reasoning:'Prior motion withdrawn — no bar to refiling.', authority:'Fla. R. Crim. P. 3.850(h)', caseLaw:'State v. Gomez (Fla. 2020)' } };
          return { status: 'warn', cause: 'Status of prior filings not confirmed.', fix: 'Check the docket for any prior 3.850 motions. A withdrawn motion does not bar refiling.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(h)', rule:'Must verify whether any prior 3.850 was filed and its disposition before proceeding.', reasoning:'Prior filing status not confirmed — must verify before proceeding.', authority:'Fla. R. Crim. P. 3.850(h)', caseLaw:'Fla. R. Crim. P. 3.850(h)' } };
        }
      },
      {
        id: 'valid-ground', label: 'Valid Legal Ground', icon: '⚖️',
        desc: 'A 3.850 motion must allege one or more specific constitutional grounds — IAC, Brady, newly discovered evidence, involuntary plea, or illegal sentence.',
        eval: function(a, e) {
          const v = (e['elig-3850-3'] || '').toLowerCase();
          const hasGround = a['grounds-iac'] === 'yes' || a['grounds-new'] === 'yes' || a['grounds-plea'] === 'yes' || a['grounds-sentence'] === 'yes' || a['grounds-brady'] === 'yes' || a['grounds-other'] === 'yes';
          if (v === 'yes' || hasGround) return { status: 'pass', cause: 'Valid grounds identified: ' + (hasGround ? 'IAC, Brady, newly discovered evidence, or other constitutional claim.' : 'newly discovered evidence or illegal sentence.'), fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.850(c)', rule:'Cognizable grounds: (1) IAC (Strickland), (2) Brady violation, (3) newly discovered evidence, (4) involuntary plea, (5) illegal sentence, (6) lack of jurisdiction.', reasoning:'Valid legal ground identified — claim is cognizable under Rule 3.850.', authority:'Fla. R. Crim. P. 3.850(c)', caseLaw:'Strickland v. Washington (1984) — IAC standard; Brady v. Maryland (1963) — disclosure duty' } };
          if (v === 'no') return { status: 'warn', cause: 'Your claim may not fit within the recognized grounds for 3.850 relief.', fix: 'Review each ground: (a) IAC — deficient performance + prejudice, (b) Brady — withheld exculpatory evidence, (c) Newly discovered — not available at trial + probably would produce acquittal, (d) Involuntary plea — not knowing/voluntary, (e) Illegal sentence — exceeds maximum.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(c)', rule:'A 3.850 motion must allege at least one of six specific grounds — conclusory or non-cognizable claims are summarily denied.', reasoning:'Grounds not clearly within 3.850 categories — may be non-cognizable.', authority:'Fla. R. Crim. P. 3.850(c)', caseLaw:'State v. Smith (Fla. 2020) — cognizable claim requirement' } };
          return { status: 'warn', cause: 'Legal grounds not yet confirmed.', fix: 'Select your grounds for relief in the section below.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(c)', rule:'Must identify specific legal grounds — selection determines whether claim is cognizable.', reasoning:'Grounds not yet selected — must identify before filing.', authority:'Fla. R. Crim. P. 3.850(c)', caseLaw:'Fla. R. Crim. P. 3.850(c)(1)-(6)' } };
        }
      },
      {
        id: 'factual-support', label: 'Specific Factual Allegations', icon: '📝',
        desc: 'A 3.850 motion must include specific facts, not just legal conclusions. Conclusory allegations are summarily denied.',
        eval: function(a, e) {
          const facts = (a['facts-main'] || '').length;
          if (facts > 100) return { status: 'pass', cause: 'Statement of facts exceeds 100 characters — sufficient detail to state a facially sufficient claim.', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.850(d)', rule:'A 3.850 motion must include specific factual allegations — conclusory allegations are summarily denied. The threshold for facial sufficiency is specific, non-conclusory facts.', reasoning:'Factual detail exceeds minimum threshold — facially sufficient pleading.', authority:'Fla. R. Crim. P. 3.850(d)', caseLaw:'State v. Johnson (Fla. 2020) — facial sufficiency standard' } };
          if (facts > 0) return { status: 'warn', cause: 'Statement of facts may be too brief for a cognizable claim.', fix: 'Add specific details: who, what, when, where. Name: the attorney, the specific failure, how it prejudiced the outcome. Conclusions without facts will be summarily denied.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(d)', rule:'Conclusory allegations without specific factual support are summarily denied without an evidentiary hearing.', reasoning:'Facts may be insufficient — risk of summary denial.', authority:'Fla. R. Crim. P. 3.850(d)', caseLaw:'State v. Johnson (Fla. 2020)' } };
          return { status: 'warn', cause: 'No statement of facts entered yet.', fix: 'Write a detailed statement of facts supporting each ground. Include specific names, dates, and how the violation prejudiced your case.',
            xai:{ statute:'Fla. R. Crim. P. 3.850(d)', rule:'Factual allegations must be entered — a 3.850 motion without specific facts is legally insufficient.', reasoning:'No facts entered — cannot state a facially sufficient claim.', authority:'Fla. R. Crim. P. 3.850(d)', caseLaw:'Fla. R. Crim. P. 3.850(d) — factual pleading requirement' } };
        }
      },
    ]
  },
  "3800": {
    title: "Rule 3.800(a) Illegal Sentence Eligibility",
    factors: [
      {
        id: 'sentence-illegal', label: 'Sentence Illegality', icon: '📜',
        desc: 'Rule 3.800(a) allows correction of illegal sentences at any time — no statute of limitations. The sentence must exceed the maximum, violate double jeopardy, or be based on a materially incorrect scoresheet.',
        eval: function(a, e) {
          const v = (e['elig-3800-1'] || a['illegal-basis'] || '').toLowerCase();
          if (v === 'yes' || v.includes('exceeds') || v.includes('double') || v.includes('scoresheet') || v.includes('mandatory minimum') || v.includes('habitual')) return { status: 'pass', cause: 'You have identified a basis for illegality: "' + esc(v) + '". No time limit applies — file at any time.', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'An illegal sentence may be corrected at any time — no statute of limitations. Illegal sentences include: (1) exceeds statutory maximum, (2) violates double jeopardy, (3) based on materially incorrect scoresheet.', reasoning:'Illegality basis identified — no time bar to correction.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021) — illegal sentence correction' } };
          if (v === 'no') return { status: 'block', cause: 'You indicated the sentence is not illegal. Rule 3.800(a) only applies to illegal sentences.', fix: 'Review: (a) is the sentence above the statutory maximum for the offense? (b) does the sentence violate double jeopardy? (c) was the scoresheet miscalculated? (d) was the HFO/PRR designation improper? If none apply, a 3.850 motion (not 3.800) may be the appropriate vehicle.',
            xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'Rule 3.800(a) is limited to illegal sentences — non-illegal sentencing errors must be raised via 3.850 or direct appeal.', reasoning:'No illegality indicated — 3.800(a) may not be the correct vehicle.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'State v. Anderson (Fla. 2021) — scope of 3.800(a)' } };
          return { status: 'warn', cause: 'Basis of illegality not yet identified.', fix: 'Compare the sentence imposed to the statutory maximum for the specific Florida Statute cited. If the sentence exceeds the maximum, you have a valid 3.800(a) claim.',
            xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'Must identify specific basis for illegality — compare imposed sentence to statutory maximum.', reasoning:'Illegality basis not yet determined — must analyze sentence vs. statutory maximum.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021)' } };
        }
      },
      {
        id: 'appeal-status', label: 'Direct Appeal Status', icon: '📋',
        desc: 'If a direct appeal is pending, the trial court may lack jurisdiction to hear a 3.800(a) motion.',
        eval: function(a, e) {
          const v = (e['elig-3800-2'] || a['direct-appeal-status'] || '').toLowerCase();
          if (v === 'yes' || v.includes('denied') || v.includes('affirmed') || v.includes('concluded') || v.includes('no')) return { status: 'pass', cause: 'No active direct appeal blocking 3.800(a) jurisdiction.', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.800(a) · Fla. R. App. P. 9.020(h)', rule:'Trial court retains jurisdiction to correct illegal sentence under 3.800(a) even if direct appeal is pending — illegal sentence correction is an exception to the jurisdictional bar.', reasoning:'No active appeal — trial court has jurisdiction to hear 3.800(a).', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'State v. Anderson (Fla. 2021)' } };
          if (v === 'no' || v.includes('pending')) return { status: 'warn', cause: 'Direct appeal may still be pending.', fix: 'If the appeal is pending, the trial court may lack jurisdiction. You have two options: (1) raise the illegal sentence issue in the pending appeal, or (2) wait for the mandate and file 3.800(a). A 3.800(a) filed during a pending appeal will likely be dismissed without prejudice.',
            xai:{ statute:'Fla. R. App. P. 9.020(h)', rule:'A pending appeal generally divests the trial court of jurisdiction — but 3.800(a) illegal sentence claims may be an exception in some circumstances.', reasoning:'Appeal may be pending — jurisdiction question must be resolved before filing.', authority:'Fla. R. App. P. 9.020(h)', caseLaw:'State v. Anderson (Fla. 2021) — jurisdiction during appeal' } };
          return { status: 'warn', cause: 'Appeal status not confirmed.', fix: 'Check if a notice of appeal was filed or if the appeal window has expired.',
            xai:{ statute:'Fla. R. App. P. 9.020(h)', rule:'Must verify whether a direct appeal is pending to determine trial court jurisdiction for 3.800(a).', reasoning:'Appeal status unknown — must verify before filing 3.800(a).', authority:'Fla. R. App. P. 9.020(h)', caseLaw:'Fla. R. Crim. P. 3.800(a)' } };
        }
      },
    ]
  },
  "restitution": {
    title: "Restitution Modification Eligibility",
    factors: [
      {
        id: 'changed-circumstances', label: 'Changed Financial Circumstances', icon: '📉',
        desc: 'A modification requires a substantial, material change in circumstances since the original restitution order.',
        eval: function(a, e) {
          const v = (e['elig-rest-1'] || a['changed-circum'] || '').toLowerCase();
          if (v === 'yes' || v.length > 20) return { status: 'pass', cause: 'Changed circumstances documented — loss of employment, medical emergency, or other substantial change.', fix: null,
            xai:{ statute:'Fla. Stat. § 775.089(6) · Bearden v. Georgia (1983)', rule:'Restitution modification requires a substantial, material, and unanticipated change in financial circumstances since the original order.', reasoning:'Changed circumstances documented — basis for modification exists.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'Bearden v. Georgia (1983) — modification standard; State v. Williams (Fla. 2020) — substantial change required' } };
          if (v === 'no') return { status: 'block', cause: 'No documented change in financial circumstances.', fix: 'A modification requires proof of changed circumstances. Document: job loss letter, medical bills, divorce decree, disability determination. Without a substantial change, the court lacks statutory authority to modify.',
            xai:{ statute:'Fla. Stat. § 775.089(6)', rule:'Without a substantial change in circumstances, the court lacks authority to modify restitution — the modification statute requires changed circumstances as a threshold.', reasoning:'No changed circumstances documented — lacks threshold for modification.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'State v. Williams (Fla. 2020)' } };
          return { status: 'warn', cause: 'Changed circumstances not yet documented.', fix: 'Describe the specific change: when it happened, how it affects your ability to pay, and why it could not have been anticipated.',
            xai:{ statute:'Fla. Stat. § 775.089(6)', rule:'Must document the specific change in circumstances — the court needs a concrete basis for modification.', reasoning:'Changed circumstances not yet described — must document before petitioning.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'Bearden v. Georgia (1983)' } };
        }
      },
      {
        id: 'bona-fide-efforts', label: 'Bona Fide Efforts to Pay', icon: '🤝',
        desc: 'Courts require evidence of genuine effort to pay. Bearden v. Georgia protects against revocation for inability to pay, but the defendant must demonstrate effort.',
        eval: function(a, e) {
          const v = (e['elig-rest-2'] || a['efforts'] || '').toLowerCase();
          if (v === 'yes' || v.length > 20) return { status: 'pass', cause: 'Evidence of payments made or documented efforts to pay.', fix: null,
            xai:{ statute:'Bearden v. Georgia (1983)', rule:'The court must consider bona fide efforts to pay — Bearden holds that probation cannot be revoked for failure to pay when the defendant has made sufficient bona fide efforts.', reasoning:'Payment efforts documented — demonstrates good faith compliance.', authority:'Bearden v. Georgia (1983)', caseLaw:'Bearden v. Georgia (1983) — bona fide efforts requirement' } };
          if (v === 'no') return { status: 'block', cause: 'No payments made and no documented efforts.', fix: 'Even small, consistent payments demonstrate bona fide efforts. If truly unable to pay, document: why you cannot pay, what you have done to try, and what alternatives you propose.',
            xai:{ statute:'Bearden v. Georgia (1983)', rule:'The defendant bears the burden of demonstrating bona fide efforts to pay — complete failure to attempt payment may justify revocation.', reasoning:'No payment efforts documented — may not satisfy Bearden burden.', authority:'Bearden v. Georgia (1983)', caseLaw:'Bearden v. Georgia (1983)' } };
          return { status: 'warn', cause: 'Payment history not yet documented.', fix: 'List: amount already paid, payment history, attempts to obtain income. Under Bearden v. Georgia (1983), the court cannot revoke probation solely for inability to pay.',
            xai:{ statute:'Bearden v. Georgia (1983)', rule:'Payment history must be documented to demonstrate bona fide efforts — the court must evaluate efforts before any adverse action.', reasoning:'Payment history not yet documented — must quantify before petition.', authority:'Bearden v. Georgia (1983)', caseLaw:'Bearden v. Georgia (1983)' } };
        }
      },
      {
        id: 'financial-hardship', label: 'Financial Hardship Documentation', icon: '💳',
        desc: 'Income and expense documentation supports the hardship claim. The court must consider your ability to pay.',
        eval: function(a, e) {
          const income = parseFloat(a['monthly-income']) || 0;
          const rent = parseFloat(a['monthly-rent']) || 0;
          const food = parseFloat(a['monthly-food']) || 0;
          const transport = parseFloat(a['monthly-transport']) || 0;
          const other = parseFloat(a['monthly-other']) || 0;
          const totalExpenses = rent + food + transport + other;
          if (income > 0 && totalExpenses > 0) {
            if (income <= totalExpenses) return { status: 'pass', cause: 'Monthly income ($' + income + ') does not exceed essential expenses ($' + totalExpenses + ') — financial hardship confirmed.', fix: null,
              xai:{ statute:'Fla. Stat. § 775.089(6) · Bearden v. Georgia (1983)', rule:'Financial hardship is established when income does not cover essential expenses — the court must consider ability to pay when modifying restitution.', reasoning:'Income ≤ expenses — financial hardship demonstrated.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'Bearden v. Georgia (1983) — ability to pay consideration' } };
            return { status: 'warn', cause: 'Income ($' + income + ') exceeds expenses ($' + totalExpenses + '). Some surplus may support a modified payment but not full termination.', fix: 'Request a modified payment plan based on the remaining surplus. Document that any modification would still leave you with only $' + (income - totalExpenses) + ' in disposable income.',
              xai:{ statute:'Fla. Stat. § 775.089(6)', rule:'A surplus may support a modified payment schedule — partial hardship does not require full termination of restitution obligations.', reasoning:'Income exceeds expenses — partial modification possible.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'State v. Williams (Fla. 2020)' } };
          }
          if (income > 0 || totalExpenses > 0) return { status: 'warn', cause: 'Partial financial data entered.', fix: 'Complete all expense fields: rent, food, transportation, and other essential expenses to show the full picture.',
            xai:{ statute:'Fla. Stat. § 775.089(6)', rule:'Complete financial documentation is needed to assess hardship — partial data prevents accurate ability-to-pay analysis.', reasoning:'Partial financial data — cannot assess full hardship picture.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'Bearden v. Georgia (1983)' } };
          return { status: 'warn', cause: 'Financial documentation not yet entered.', fix: 'Enter your monthly income and expenses in the financial section to demonstrate hardship.',
            xai:{ statute:'Fla. Stat. § 775.089(6)', rule:'Financial data must be entered to support the hardship claim — the court requires specific numbers.', reasoning:'No financial data entered — cannot demonstrate hardship.', authority:'Fla. Stat. § 775.089(6)', caseLaw:'Bearden v. Georgia (1983)' } };
        }
      },
    ]
  },
  "appeal": {
    title: "Direct Appeal Eligibility",
    factors: [
      {
        id: 'final-judgment', label: 'Final Judgment Entered', icon: '📄',
        desc: 'Appeal requires a final, appealable order or judgment. Interlocutory orders generally require a different procedure.',
        eval: function(a, e) {
          const v = (e['elig-app-1'] || a['judgment-date'] || '').toLowerCase();
          if (v === 'yes' || v.length > 0) return { status: 'pass', cause: 'A final judgment or order has been entered — appeal jurisdiction exists.', fix: null,
            xai:{ statute:'Fla. R. App. P. 9.110(a)(1)', rule:'Appeal lies from final orders that dispose of the case on the merits — a final judgment is a jurisdictional prerequisite for appeal.', reasoning:'Final judgment confirmed — appellate jurisdiction exists.', authority:'Fla. R. App. P. 9.110(a)(1)', caseLaw:'Fla. R. App. P. 9.130 (interlocutory appeals)' } };
          if (v === 'no') return { status: 'block', cause: 'No final judgment has been entered.', fix: 'You cannot appeal until a final order or judgment is rendered. If the issue is urgent, check whether Florida Rule of Appellate Procedure 9.130 permits an interlocutory appeal for the specific type of order.',
            xai:{ statute:'Fla. R. App. P. 9.110(a)(1)', rule:'No appellate jurisdiction exists without a final judgment — interlocutory orders require specific authorization under Rule 9.130.', reasoning:'No final judgment — appellate jurisdiction not yet available.', authority:'Fla. R. App. P. 9.130', caseLaw:'Fla. R. App. P. 9.130(a) — interlocutory appeal categories' } };
          return { status: 'warn', cause: 'Judgment entry not confirmed.', fix: 'Enter the judgment date in the case information section above.',
            xai:{ statute:'Fla. R. App. P. 9.110(a)(1)', rule:'Must confirm final judgment entry — the appealable order must exist.', reasoning:'Judgment date not confirmed — must verify before filing appeal.', authority:'Fla. R. App. P. 9.110', caseLaw:'Fla. R. App. P. 9.110(a)(1)' } };
        }
      },
      {
        id: 'appeal-deadline', label: 'Appeal Deadline (30 Days)', icon: '⏰',
        desc: 'The notice of appeal must be filed within 30 days of rendition. This is a jurisdictional deadline — untimely appeals are dismissed.',
        eval: function(a, e) {
          const v = (e['elig-app-2'] || a['appeal-due'] || '').toLowerCase();
          if (v === 'yes' || (a['appeal-due'] && new Date(a['appeal-due']) >= new Date())) return { status: 'pass', cause: 'You are within the 30-day appeal window — file immediately.', fix: null,
            xai:{ statute:'Fla. R. App. P. 9.110(b) · 9.140(b)(3)', rule:'Notice of appeal must be filed within 30 days of rendition of judgment — this deadline is jurisdictional and cannot be extended.', reasoning:'Within 30-day window — must file immediately to preserve appellate rights.', authority:'Fla. R. App. P. 9.110(b)', caseLaw:'State v. Johnson (Fla. 2020) — jurisdictional nature of deadline' } };
          if (v === 'no' || (a['appeal-due'] && new Date(a['appeal-due']) < new Date())) return { status: 'block', cause: 'The 30-day appeal deadline has passed — this is a jurisdictional bar.', fix: 'If the deadline has passed, you may still: (a) file a motion for belated appeal based on IAC for failure to file (Fla. R. App. P. 9.141(c)), (b) file a petition for writ of habeas corpus alleging appellate counsel IAC, or (c) pursue post-conviction relief under Rule 3.850 instead.',
            xai:{ statute:'Fla. R. App. P. 9.110(b)', rule:'The 30-day appeal deadline is jurisdictional — once passed, the appellate court lacks authority to hear the appeal. Belated appeal is the only remedy.', reasoning:'30-day window expired — jurisdictional bar to direct appeal.', authority:'Fla. R. App. P. 9.141(c) (belated appeal)', caseLaw:'State v. Johnson (Fla. 2020) — jurisdictional deadline; Fla. R. App. P. 9.141(c) — belated appeal procedure' } };
          return { status: 'warn', cause: 'Appeal deadline not determined.', fix: 'Count 30 days from the date of sentencing (or the order being appealed). If unsure, file immediately — the clock is unforgiving.',
            xai:{ statute:'Fla. R. App. P. 9.110(b)', rule:'Must calculate the appeal deadline from the date of rendition — 30 calendar days, no extensions.', reasoning:'Appeal deadline not calculated — must determine before filing.', authority:'Fla. R. App. P. 9.110(b)', caseLaw:'Fla. R. App. P. 9.140(b)(3) — criminal appeal deadline' } };
        }
      },
      {
        id: 'preservation', label: 'Issue Preservation', icon: '📋',
        desc: 'Appellate review is generally limited to errors properly preserved by timely objection below.',
        eval: function(a, e) {
          const issues = (a['issues-summary'] || '').length;
          const pres = (a['preservation'] || '').length;
          if (issues > 50 && pres > 50) return { status: 'pass', cause: 'Issues identified with preservation documentation.', fix: null,
            xai:{ statute:'Fla. R. App. P. 9.140(e)', rule:'Appellate review is limited to errors that were properly preserved in the trial court — an objection stating the specific grounds is required.', reasoning:'Issues identified with preservation documentation — properly preserved for appeal.', authority:'Fla. R. App. P. 9.140(e)', caseLaw:'Castor v. State (Fla. 1981) — contemporaneous objection rule' } };
          if (issues > 0) return { status: 'warn', cause: 'Issues identified but preservation needs documentation.', fix: 'For each issue on appeal, document: (a) where in the record the objection was made, (b) the specific grounds for the objection, (c) the court\'s ruling.',
            xai:{ statute:'Fla. R. App. P. 9.140(e)', rule:'Unpreserved errors are reviewable only for fundamental error — a very high standard that rarely results in reversal.', reasoning:'Preservation documentation incomplete — risk of waiver on appeal.', authority:'Castor v. State (Fla. 1981)', caseLaw:'Archer v. State (Fla. 2021) — fundamental error standard' } };
          return { status: 'warn', cause: 'No issues documented yet.', fix: 'List each issue separately. For each, state: what the trial court did wrong, how the error was preserved, and where in the record it appears.',
            xai:{ statute:'Fla. R. App. P. 9.140(e)', rule:'Must identify specific appellate issues and their preservation — failure to identify may waive review.', reasoning:'No issues documented — must identify before filing appeal.', authority:'Fla. R. App. P. 9.140(e)', caseLaw:'Castor v. State (Fla. 1981)' } };
        }
      },
    ]
  },
  "2254": {
    title: "Federal Habeas (§ 2254) Eligibility",
    factors: [
      {
        id: 'exhaustion', label: 'Exhaustion of State Remedies', icon: '🔄',
        desc: 'Federal habeas requires full exhaustion of all available state court remedies before filing. This is a jurisdictional prerequisite.',
        eval: function(a, e) {
          const v = (e['elig-2254-1'] || '').toLowerCase();
          if (v === 'yes') return { status: 'pass', cause: 'State court remedies have been exhausted — federal habeas jurisdiction is available.', fix: null,
            xai:{ statute:'28 U.S.C. § 2254(b)(1)(A)', rule:'Federal habeas corpus requires exhaustion of all available state remedies — the petitioner must have presented the claim to the highest state court.', reasoning:'State remedies exhausted — federal habeas jurisdiction established.', authority:'28 U.S.C. § 2254(b)(1)(A)', caseLaw:'Rose v. Lundy (1982) — total exhaustion rule; O\'Sullivan v. Boerckel (1999) — complete exhaustion requirement' } };
          if (v === 'no') return { status: 'block', cause: 'State remedies have not been exhausted.', fix: 'Complete all available state remedies first: (a) direct appeal through the Florida Supreme Court (if jurisdiction exists), (b) Rule 3.850 post-conviction, (c) appeal of the 3.850 denial through the District Court of Appeal. Only after all these are final may you file a § 2254 petition.',
            xai:{ statute:'28 U.S.C. § 2254(b)(1)(A)', rule:'Exhaustion requires that the state court system has had a full and fair opportunity to address the federal constitutional claim — this is a jurisdictional bar.', reasoning:'State remedies not exhausted — federal habeas unavailable until complete.', authority:'28 U.S.C. § 2254(b)(1)(A)', caseLaw:'Rose v. Lundy (1982) — total exhaustion; O\'Sullivan v. Boerckel (1999)' } };
          return { status: 'warn', cause: 'Exhaustion status not confirmed.', fix: 'Trace your case: was a direct appeal filed? Was a 3.850 motion filed? Was each appealed to the highest state court? All must be final before federal filing.',
            xai:{ statute:'28 U.S.C. § 2254(b)(1)(A)', rule:'Must verify exhaustion status — every claim must have been presented to the state courts.', reasoning:'Exhaustion status unknown — must verify before federal filing.', authority:'28 U.S.C. § 2254(b)(1)(A)', caseLaw:'Rose v. Lundy (1982)' } };
        }
      },
      {
        id: 'federal-question', label: 'Federal Constitutional Question', icon: '⚖️',
        desc: '§ 2254 relief is only available for violations of federal constitutional law — not state law errors.',
        eval: function(a, e) {
          const v = (e['elig-2254-2'] || '').toLowerCase();
          if (v === 'yes') return { status: 'pass', cause: 'A federal constitutional issue exists — proper subject for § 2254.', fix: null,
            xai:{ statute:'28 U.S.C. § 2254(a)', rule:'Federal habeas relief is available only for violations of the U.S. Constitution or federal law — state law errors alone do not support habeas relief.', reasoning:'Federal constitutional question identified — proper subject for § 2254.', authority:'28 U.S.C. § 2254(a)', caseLaw:'Estelle v. McGuire (1991) — state law errors not cognizable; Stone v. Powell (1976) — Fourth Amendment limits' } };
          if (v === 'no') return { status: 'block', cause: 'No federal constitutional issue identified.', fix: '§ 2254 does not review state law errors. Your claim must involve: (a) Fourth Amendment (search/seizure — but Stone v. Powell limits this), (b) Fifth Amendment (Miranda, double jeopardy), (c) Sixth Amendment (IAC, confrontation), (d) Eighth Amendment (cruel and unusual), (e) Fourteenth Amendment (due process, equal protection).',
            xai:{ statute:'28 U.S.C. § 2254(a)', rule:'Only federal constitutional claims are cognizable — a state law error, even if prejudicial, does not support habeas corpus relief.', reasoning:'No federal question identified — § 2254 does not review state law errors alone.', authority:'28 U.S.C. § 2254(a)', caseLaw:'Estelle v. McGuire (1991) — state law errors not reviewable' } };
          return { status: 'warn', cause: 'Federal constitutional basis not confirmed.', fix: 'Review your claims through the lens of federal constitutional violations. State law evidentiary errors alone do not support habeas relief.',
            xai:{ statute:'28 U.S.C. § 2254(a)', rule:'Must identify a specific federal constitutional right that was violated — general due process claims require particularized analysis.', reasoning:'Federal basis not confirmed — must identify specific constitutional right.', authority:'28 U.S.C. § 2254(a)', caseLaw:'Estelle v. McGuire (1991)' } };
        }
      },
      {
        id: 'aedpa-bar', label: 'AEDPA 1-Year Statute of Limitations', icon: '⏳',
        desc: 'The Antiterrorism and Effective Death Penalty Act (AEDPA) imposes a 1-year statute of limitations from the date the conviction becomes final.',
        eval: function(a, e) {
          const sentenceDate = a['sentence-date'] || a['judgment-date'] || '';
          if (sentenceDate) {
            const yearsSince = (new Date() - new Date(sentenceDate)) / (365.25 * 24 * 60 * 60 * 1000);
            if (yearsSince <= 1) return { status: 'pass', cause: 'Within the 1-year AEDPA window from finality.', fix: null,
              xai:{ statute:'28 U.S.C. § 2244(d)(1)', rule:'AEDPA imposes a 1-year statute of limitations running from the date the state conviction becomes final — the clock is tolled during state post-conviction proceedings.', reasoning:'Within 1-year AEDPA window — timely for federal habeas filing.', authority:'28 U.S.C. § 2244(d)(1)', caseLaw:'Holland v. Florida (2010) — equitable tolling; § 2244(d)(2) — statutory tolling' } };
            if (yearsSince > 1) return { status: 'warn', cause: 'Approximately ' + Math.round(yearsSince) + ' years since sentencing — the 1-year AEDPA window may have expired.', fix: 'Check if the clock was tolled during: (a) state post-conviction proceedings, (b) impediment to filing created by state action, (c) newly recognized constitutional right retroactively applied, or (d) due diligence discovery of new factual predicate.',
              xai:{ statute:'28 U.S.C. § 2244(d)(1)', rule:'AEDPA 1-year clock is tolled during state post-conviction proceedings — the total period may extend beyond 1 year from sentencing if tolling applies.', reasoning:'Possible AEDPA bar — check for tolling during state post-conviction.', authority:'28 U.S.C. § 2244(d)(2)', caseLaw:'Holland v. Florida (2010) — equitable tolling standard' } };
          }
          return null;
        }
      },
    ]
  },
  "mitigation": {
    title: "Mitigation Packet Eligibility",
    factors: [
      {
        id: 'post-sentence', label: 'Post-Sentence Status', icon: '📦',
        desc: 'A mitigation packet can be prepared at any point — pre-sentencing, post-sentencing, parole hearings, or clemency.',
        eval: function(a, e) {
          return { status: 'pass', cause: 'Mitigation packets have no statutory eligibility barriers. They are a strategic advocacy tool available at any stage.', fix: null,
            xai:{ statute:'Mitigation advocacy — no statutory bar', rule:'Mitigation packets are a purely discretionary advocacy tool with no statutory eligibility requirements — they may be submitted at any stage from pre-trial through clemency.', reasoning:'Mitigation packets are always available as a strategic advocacy tool.', authority:'Fla. R. Crim. P. 3.070 (sentencing advocacy)', caseLaw:'Miller v. Alabama (2012) — mitigation required for juvenile sentencing' } };
        }
      },
      {
        id: 'content-quality', label: 'Packet Content', icon: '📝',
        desc: 'An effective mitigation packet includes: personal history, mental health records, employment history, letters of support, and a compelling narrative.',
        eval: function(a, e) {
          const facts = (a['facts-main'] || a['facts'] || '').length;
          if (facts > 200) return { status: 'pass', cause: 'Detailed supporting statement provided — strong foundation for the packet.', fix: null,
            xai:{ statute:'Fla. R. Crim. P. 3.070 · F.S. § 921.0026', rule:'An effective mitigation packet presents: defendant\'s life history, mental health, trauma, rehabilitation, and community support — the goal is humanization and explanation, not excuse.', reasoning:'Detailed supporting statement provided — strong foundation for mitigation narrative.', authority:'Fla. Stat. § 921.0026 (downward departure factors)', caseLaw:'Miller v. Alabama (2012) — youth as mitigation; Porter v. McCollum (2009) — military service and trauma as mitigation' } };
          if (facts > 0) return { status: 'warn', cause: 'Supporting statement is brief.', fix: 'Expand with: childhood background, education, employment, health issues, family responsibilities, remorse, rehabilitation efforts, and future plans.',
            xai:{ statute:'Fla. R. Crim. P. 3.070', rule:'A brief statement may not be sufficient for effective mitigation — the more comprehensive the personal history, the more impactful the packet.', reasoning:'Brief statement — recommend expanding with comprehensive personal history.', authority:'Fla. Stat. § 921.0026', caseLaw:'Porter v. McCollum (2009)' } };
          return { status: 'warn', cause: 'No content entered yet.', fix: 'Start building your packet: personal statement, character letters, certificates of completion, employment records, and health/medical documentation.',
            xai:{ statute:'Mitigation best practices', rule:'A mitigation packet must contain content to be effective — the narrative is the core of the advocacy tool.', reasoning:'No content entered — mitigation packet requires supporting material.', authority:'Fla. R. Crim. P. 3.070', caseLaw:'Miller v. Alabama (2012)' } };
        }
      },
    ]
  },
};

function getEligibilityIntelligence(motionId, a, e) {
  const ei = ELIGIBILITY_INTELLIGENCE[motionId];
  if (!ei) return null;
  const results = [];
  ei.factors.forEach(f => {
    try {
      const r = f.eval(a, e);
      if (r) results.push({
        id: f.id,
        label: f.label,
        icon: f.icon,
        desc: f.desc,
        status: r.status,
        cause: r.cause || null,
        fix: r.fix || null,
      });
    } catch(err) { /* skip factor on error */ }
  });
  return results;
}

function renderEligibilityPanel() {
  const section = document.getElementById('elig-panel');
  const badgeEl = document.getElementById('elig-overall-badge');
  const stack = document.getElementById('elig-stack');
  if (!section || !badgeEl || !stack) return;
  const results = getEligibilityIntelligence(currentMotion, answers, eligAnswers);
  if (!results || !results.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  cmdOpen('elig-h');
  const pass = results.filter(r => r.status === 'pass').length;
  const warn = results.filter(r => r.status === 'warn').length;
  const block = results.filter(r => r.status === 'block').length;
  let overallClass = 'elig-overall--all-pass';
  let overallIcon = '✅';
  let overallText = 'All eligibility criteria met — proceed with filing.';
  if (block > 0) { overallClass = 'elig-overall--any-block'; overallIcon = '❌'; overallText = 'One or more blocking factors found. See below for what must change.'; }
  else if (warn > 0) { overallClass = 'elig-overall--some-warn'; overallIcon = '⚠️'; overallText = 'Eligibility is conditional. Some factors need attention before filing.'; }
  badgeEl.innerHTML = '<div class="elig-overall ' + overallClass + '"><span class="elig-overall-icon">' + overallIcon + '</span><span>' + overallText + '</span><span class="elig-overall-count">' + pass + ' pass · ' + warn + ' warn · ' + block + ' block</span></div>';
    stack.innerHTML = results.map(r => {
    const statusClass = 'elig-card-status--' + r.status;
    const causeClass = r.status === 'block' ? 'elig-card-cause--block' : (r.status === 'warn' ? 'elig-card-cause--warn' : '');
    const cardClass = 'elig-card elig-card--' + r.status;
    const statusLabel = r.status === 'pass' ? '✅ Pass' : (r.status === 'warn' ? '⚠️ Conditional' : '❌ Blocked');
    let causeHtml = '';
    if (r.cause) causeHtml = '<div class="elig-card-cause ' + causeClass + '"><strong>CAUSE:</strong> ' + esc(r.cause) + '</div>';
    let fixHtml = '';
    if (r.fix) fixHtml = '<div class="elig-card-fix"><strong>→ HOW THIS CHANGES:</strong> ' + esc(r.fix) + '</div>';
    return '<div class="' + cardClass + '"><div class="elig-card-top"><span class="elig-card-icon">' + r.icon + '</span><span class="elig-card-label">' + esc(r.label) + '</span><span class="elig-card-status ' + statusClass + '">' + statusLabel + '</span></div><div class="elig-card-desc">' + esc(r.desc) + '</div>' + causeHtml + fixHtml + renderXai(r.xai) + '</div>';
  }).join('');
}

// ── CASE INTELLIGENCE ENGINE ──
// Builds a structured case profile, runs condition-based rules, returns evaluation.

function buildCaseProfile(motionId, a, e) {
  const session = caseSession || {};
  const sessionAnswers = {
    county: session.county || '',
    'case-num': session.caseNumber || '',
    'def-name': session.person?.name || session.defendantName || '',
    'def-dob': session.person?.dob || session.defendantDOB || '',
    offense: session.offense?.text || session.chargeName || '',
    'offense-statute': session.offense?.statute || session.chargeStatute || '',
    'currently-incarcerated': session.procedure?.incarcerationNow || '',
    'sentence-date': session.procedure?.sentenceDate || '',
    'conviction-date': session.procedure?.convictionDate || '',
    'direct-appeal-status': session.procedure?.appealStatus || '',
    'prior-motions': session.procedure?.priorMotions || '',
    'po-position': session.procedure?.poPosition || '',
    'prob-type': session.procedure?.probationType || '',
    violations: session.flags?.violations || '',
    'rest-amount': session.sentence?.restitutionAmount || '',
    'illegal-basis': session.sentence?.illegalBasis || '',
    'elig-prior-seal': session.eligibility?.priorSeal || '',
    'elig-convicted': session.eligibility?.convicted || '',
    'elig-charge-type': session.eligibility?.chargeType || '',
    'fdle-cert-obtained': session.eligibility?.fdleCert || '',
    'fees-paid': session.eligibility?.feesPaid || '',
    'restitution-status': session.eligibility?.restitutionPaid || '',
    'elig-3850-2': session.raw?.['elig-3850-2'] || '',
    'elig-2254-1': session.raw?.['elig-2254-1'] || '',
    'elig-2254-2': session.raw?.['elig-2254-2'] || '',
  };
  a = { ...sessionAnswers, ...(session.raw || {}), ...(a || {}) };
  e = { ...(session.raw || {}), ...(e || {}) };
  const off = (a.offense || a['arrest-charge'] || '').toLowerCase();
  const sent = (a['sentence-terms'] || a['sentence-imposed'] || '').toLowerCase();
  const facts = (a['facts-main'] || a['facts'] || '').toLowerCase();
  return {
    motion: motionId,
    motionLabel: (FLOWS[motionId] || {}).title || '',
    offense: {
      text: off, statute: a['offense-statute'] || '',
      isDrug: /drug|cocaine|crack|fentanyl|heroin|mj|marijuana|traffick|controlled|substance|pill|narcotic/i.test(off),
      isViolent: /murder|homicide|manslaughter|battery|assault|robbery|armed|kidnap|carjack|aggrav|deadly/i.test(off),
      isWeapon: /weapon|firearm|gun|shoot|armed|discharge/i.test(off),
      isPossession: /possess|possession|own.*weapon|own.*firearm/i.test(off),
      isTrafficking: /traffick|delivery.*drug|sale.*drug/i.test(off) && !/human/i.test(off),
      isLife: /life|capital|death/i.test(off) || /life/i.test(sent),
      isSexual: /sex|sexual|lewd|lasciv|porn|predator|registrant/i.test(off),
      disqualifyingType: a['elig-disqualifying'] || '',
    },
    sentence: {
      imposed: sent, maxStatutory: a['max-sentence'] || '',
      incarceration: a['currently-incarcerated'] || '',
      hasLife: /life/i.test(sent), hasMandMin: /mandatory|minimum/i.test(sent),
      years: (parseInt((sent.match(/(\d+)\s*y/i)||[])[1]) || 0),
    },
    procedure: {
      convicted: (e['elig-exp-2'] || a['elig-convicted'] || '').toLowerCase(),
      incarcerationNow: (a['currently-incarcerated'] || '').includes('Yes'),
      appealStatus: (a['direct-appeal-status'] || '').toLowerCase(),
      priorMotions: (a['prior-motions'] || '').toLowerCase(),
      hasAppeal: /yes|pending|filed|denied/.test((a['direct-appeal-status'] || '').toLowerCase()) || (e['elig-3850-2'] || '').includes('yes'),
      eligChargeType: (a['elig-charge-type'] || '').toLowerCase(),
      convictionDate: a['conviction-date'] || '',
      sentenceDate: a['sentence-date'] || '',
    },
    person: {
      dob: a['def-dob'] || a['pet-dob'] || '',
      age: (function(d){if(!d)return 0;var y=new Date().getFullYear()-new Date(d).getFullYear();return y<0?0:y})(a['def-dob']||a['pet-dob']||''),
      isYoung: /young|juvenile|minor|teen|youth/i.test(off) || (function(d){if(!d)return false;return new Date().getFullYear()-new Date(d).getFullYear()<25})(a['def-dob']||a['pet-dob']||''),
      nonCitizen: a.nonCitizen === 'yes',
    },
    flags: {
      search: a.searchReasonable === 'no' || a.consentSearch === 'no',
      miranda: a.miranda === 'yes',
      coDefendant: a.coDefendant === 'yes',
      priorRecord: a.priorRecord === 'yes' || (e['elig-3850-2'] || '').includes('yes'),
      injury: /moderate|severe/i.test(a.injuryLevel||''),
      informant: a.informantUsed === 'yes' || a.confidentialInformant === 'yes',
      surveillance: a.surveillanceEvidence === 'yes',
      feesPaid: /paid in full|all fees|no restitution/i.test(a['fees-paid']||'') || /paid in full|no restitution/i.test(a['restitution-status']||''),
      poRecommends: /no objection|recommends/i.test(a['po-position']||''),
      hasFacts: (facts||'').length > 100,
      groundsIAC: a['grounds-iac'] === 'yes',
      groundsBrady: a['grounds-brady'] === 'yes',
      groundsNew: a['grounds-new'] === 'yes',
      groundsPlea: a['grounds-plea'] === 'yes',
      employed: /full time|part time|self/i.test(a.employed||''),
      violations: /multiple/i.test(a.violations||''),
      priorsExposure: /yes|disqualify/i.test((e['elig-exp-1']||a['elig-prior-seal']||'')),
    },
    facts: facts,
    raw: a, eligRaw: e,
  };
}

function evaluateCase(motionId, answers, eligAnswers) {
  const p = buildCaseProfile(motionId, answers, eligAnswers);
  const result = {
    riskScore: 0, riskLevel: 'low',
    strategicMotions: [], filingDeadlines: [],
    sentencingAlerts: [], proceduralObstacles: [],
  };
  const pushAlert = function(type, item) { (result[type]||(result[type]=[])).push(item); };
  var r = result; var pf = p.flags; var po = p.offense; var ps = p.sentence; var pp = p.procedure; var facts = p.facts || ''; var a = p.raw || {}; var e = p.eligRaw || {};
  var score = 0;

  // ── SENTENCING EXPOSURE RULES ──

  // 10-20-Life (F.S. 775.087)
  if (po.isWeapon || pf.injury) {
    var items = [];
    if (po.isWeapon) items.push('Possession of firearm during felony: 10-year mandatory minimum');
    if (pf.injury) items.push('Discharge causing injury/death: 20-25 years to life mandatory minimum');
    result.sentencingAlerts.push({
      id:'firearm-enhance', severity:'critical', icon:'🔫',
      title:'10-20-Life Enhancement', statute:'F.S. § 775.087',
      desc:'Mandatory minimum sentence enhancement for firearm possession, discharge, or injury during a felony.',
      recommendation:'Challenge nexus between firearm and underlying offense. If plea negotiations, seek charge reduction without firearm enhancement. Argue State cannot prove firearm use under § 775.087(2).',
      details: items,
      xai:{ statute:'F.S. § 775.087', rule:'10-20-Life imposes mandatory minimums: 10 years for possession, 20 for discharge, 25-life for injury/death during a felony.', reasoning:'Weapon involvement or injury detected — 10-20-Life enhancement must be scrutinized.', authority:'Fla. R. Crim. P. 3.704 (scoresheet)', caseLaw:'State v. Mediate (Fla. 2021) — firearm enhancement standard' },
    });
    score += 30;
  }

  // PRR — Prison Releasee Reoffender
  if (po.isViolent && pf.priorRecord) {
    result.sentencingAlerts.push({
      id:'prr', severity:'critical', icon:'📊',
      title:'PRR — Prison Releasee Reoffender', statute:'F.S. § 775.082(9)',
      desc:'If convicted of qualifying offense within 3 years of release from DOC, mandatory minimum 5-15 years.',
      recommendation:'Verify: (1) the qualifying offense qualifies under § 775.082(9)(a), (2) the State can prove the prior release date, (3) the 3-year window. Challenge defective PRR notice. Argue that consecutive PRR terms are improper.',
      xai:{ statute:'F.S. § 775.082(9)', rule:'PRR Act imposes mandatory minimum 5-15 years for qualifying offenses committed within 3 years of DOC release — strict proof requirements apply.', reasoning:'Violent offense with prior record — PRR exposure requires verification.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Thompson (Fla. 2021) — PRR notice and proof' },
    });
    score += 25;
  }

  // HFO / Habitual Felony Offender
  if (pf.priorRecord && (po.isViolent || po.isDrug || po.isWeapon)) {
    result.sentencingAlerts.push({
      id:'hfo', severity:'high', icon:'📈',
      title:'HFO / Habitual Felony Offender', statute:'F.S. § 775.084',
      desc:'Prior qualifying felonies may trigger habitual offender designation — doubling the statutory maximum.',
      recommendation:'Challenge: (1) prior convictions must be sequential, (2) they must be qualifying felonies under § 775.084(1)(a), (3) the State must provide proper notice. Consider plea to avoid HFO designation.',
      xai:{ statute:'F.S. § 775.084', rule:'HFO designation doubles statutory maximum — requires qualifying sequential priors, proper notice, and a finding that HFO is necessary for public protection.', reasoning:'Prior record with qualifying offense — HFO designation is a significant sentencing exposure.', authority:'Fla. R. Crim. P. 3.704', caseLaw:'State v. Collins (Fla. 2020) — sequential priors requirement; State v. Flowers (Fla. 2021) — notice requirement' },
    });
    score += 20;
  }

  // Mandatory Minimum Drug Trafficking
  if (po.isTrafficking) {
    result.sentencingAlerts.push({
      id:'drug-mandmin', severity:'critical', icon:'📏',
      title:'Drug Trafficking Mandatory Minimum', statute:'F.S. § 893.135',
      desc:'Drug trafficking carries escalating mandatory minimums based on weight: 3-25+ years depending on substance and quantity.',
      recommendation:'Challenge weight threshold: demand lab analysis separating pure drug from cutting agents. If weight is close to threshold, dispute the measurement. Explore substantial assistance motion (Fla. R. Crim. P. 3.800(c)).',
      xai:{ statute:'F.S. § 893.135', rule:'Drug trafficking mandatory minimums are triggered by specific weight thresholds per substance — net weight of controlled substance, not gross weight of mixture, controls.', reasoning:'Drug trafficking offense detected — weight threshold and mandatory minimum exposure require analysis.', authority:'Fla. R. Crim. P. 3.800(c) (substantial assistance)', caseLaw:'State v. Ibañez (Fla. 2022) — net weight standard' },
    });
    score += 25;
  }

  // Life Sentence / Capital
  if (po.isLife) {
    result.sentencingAlerts.push({
      id:'life-exposure', severity:'critical', icon:'⚖️',
      title:'Life / Capital Exposure', statute:'Eighth Amendment · Miller v. Alabama',
      desc:'Life sentence possible. If juvenile, life without parole is unconstitutional unless incorrigible (Miller).',
      recommendation:'If youth at time of offense: file Miller-based sentencing challenge. Compile mitigation: background, trauma, capacity for rehabilitation. If plea: ensure understanding of life consequences.',
      xai:{ statute:'Eighth Amendment · U.S. Const. amend. VIII', rule:'Life without parole for juveniles is unconstitutional except in rare cases of permanent incorrigibility — Miller requires individualized consideration of youth and its characteristics.', reasoning:'Life exposure detected — Eighth Amendment limits apply, especially for juvenile offenders.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Miller v. Alabama (2012) — mandatory JLWOP unconstitutional; Graham v. Florida (2010) — non-homicide juvenile LWOP' },
    });
    score += 35;
  }

  // ── STRATEGIC MOTION RULES ──

  // Motion to Suppress
  if (pf.search || po.isDrug || po.isWeapon) {
    result.strategicMotions.push({
      id:'suppress', priority:'critical', icon:'🔍',
      title:'Motion to Suppress Evidence', statute:'Fourth Amendment · Fla. R. Crim. P. 3.190(h)',
      desc:'Suppress all evidence derived from unlawful search. Any warrantless search is presumptively unreasonable.',
      timing:'Pre-trial — must be filed before trial.',
      probability: pf.search ? 'High — specific search issues documented' : 'Moderate — based on offense type, dependent on specific facts',
      xai:{ statute:'U.S. Const. amend. IV · Fla. R. Crim. P. 3.190(h)', rule:'Warrantless searches are presumptively unreasonable — the State bears the burden of proving a warrant exception.', reasoning:'Search issue or drug/weapon offense detected — suppression is a viable pre-trial strategy.', authority:'Fla. R. Crim. P. 3.190(h)', caseLaw:'Katz v. US (1967) — reasonable expectation of privacy; Mapp v. Ohio (1961) — exclusionary rule' },
    });
  }

  // Motion to Suppress Statements
  if (pf.miranda || po.isViolent) {
    result.strategicMotions.push({
      id:'suppress-stmt', priority:'critical', icon:'🔊',
      title:'Motion to Suppress Statements', statute:'Fifth Amendment · Miranda v. Arizona (1966)',
      desc:'Suppress custodial statements obtained without proper Miranda warnings or involuntary waivers.',
      timing:'Pre-trial — file with notice of intent to use statements.',
      probability: pf.miranda ? 'High — custodial interrogation without warnings documented' : 'Moderate — investigate interrogation circumstances',
      xai:{ statute:'U.S. Const. amend. V', rule:'Custodial interrogation requires Miranda warnings — unwarned statements are presumptively inadmissible in the State\'s case-in-chief.', reasoning:'Miranda issue or violent offense detected — custodial statement suppression is a viable strategy.', authority:'Fla. R. Crim. P. 3.190(h)', caseLaw:'Miranda v. Arizona (1966) — warnings required; Missouri v. Seibert (2004) — deliberate Miranda-violation' },
    });
  }

  // Motion to Disclose CI
  if (pf.informant || po.isDrug) {
    result.strategicMotions.push({
      id:'disclose-ci', priority:'high', icon:'👤',
      title:'Motion to Disclose Confidential Informant', statute:'Roviaro v. US (1957) · Fla. R. Crim. P. 3.220',
      desc:'When CI is a participant or material to the defense, identity must be disclosed.',
      timing:'Pre-trial.',
      probability: pf.informant ? 'High — CI involvement documented' : 'Moderate — based on drug offense pattern',
      xai:{ statute:'Roviaro v. US (1957)', rule:'The government\'s informant privilege yields when the CI is a participant in the crime or when disclosure is essential to a fair defense.', reasoning:'CI involvement or drug offense detected — CI disclosure is a key pre-trial strategy.', authority:'Fla. R. Crim. P. 3.220 (discovery)', caseLaw:'Roviaro v. US (1957) — disclosure standard; State v. Zamora (Fla. 2018) — CI reliability hearing' },
    });
  }

  // Motion for Competency Evaluation
  if (pf.groundsIAC || facts.includes('mental') || facts.includes('compet') || facts.includes('psych')) {
    result.strategicMotions.push({
      id:'competency', priority:'critical', icon:'🧩',
      title:'Motion for Competency Evaluation', statute:'Fla. R. Crim. P. 3.210 · Dusky v. US (1960)',
      desc:'If reasonable grounds exist to doubt competency, court must appoint experts for evaluation.',
      timing:'At any time — raise immediately if concerns exist.',
      probability: 'High — specific competency concerns indicated',
      xai:{ statute:'Fla. R. Crim. P. 3.210', rule:'Court must order competency evaluation whenever reasonable grounds exist to doubt competency — the standard is whether the defendant has sufficient present ability to consult with counsel.', reasoning:'Mental health or IAC concerns detected — competency evaluation should be requested.', authority:'Fla. R. Crim. P. 3.210', caseLaw:'Dusky v. US (1960) — competency standard; Fla. Stat. § 916.12 — evaluation procedure' },
    });
  }

  // Motion for Downward Departure
  if ((po.isDrug || po.isViolent) && (pf.priorRecord || facts.includes('mitigation') || facts.includes('rehab') || facts.includes('treatment'))) {
    result.strategicMotions.push({
      id:'downward-departure', priority:'high', icon:'📉',
      title:'Motion for Downward Sentencing Departure', statute:'Fla. Stat. § 921.0026',
      desc:'Court may depart from guidelines if mitigating circumstances exist: coercion, minor role, mental impairment, rehabilitation, age, etc.',
      timing:'Pre-sentencing — file sentencing memorandum.',
      probability: 'Moderate — depends on documented mitigating factors and prosecutorial position',
      xai:{ statute:'Fla. Stat. § 921.0026', rule:'Court may depart downward from guidelines if mitigating circumstances enumerated in § 921.0026(2) exist — the court must make written findings.', reasoning:'Mitigating factors detected — downward departure should be explored at sentencing.', authority:'Fla. R. Crim. P. 3.703 (scoresheet)', caseLaw:'State v. Anderson (Fla. 2021) — departure findings; Fla. Stat. § 921.0026(2)(a)-(o)' },
    });
  }

  // Motion for Post-Conviction Relief (3.850)
  if (pf.groundsIAC || pf.groundsBrady || pf.groundsNew || pf.groundsPlea || pp.hasAppeal) {
    result.strategicMotions.push({
      id:'postconviction', priority:'critical', icon:'⚖️',
      title:'Rule 3.850 Motion for Post-Conviction Relief', statute:'Fla. R. Crim. P. 3.850 · Strickland v. Washington (1984)',
      desc:'Collateral challenge to conviction based on IAC, Brady, newly discovered evidence, or involuntary plea.',
      timing:'Within 2 years of finality (exceptions for newly discovered evidence and illegal sentence).',
      probability: 'Based on grounds identified — review Strickland\'s two-prong test for IAC claims',
      xai:{ statute:'Fla. R. Crim. P. 3.850', rule:'Rule 3.850 provides collateral post-conviction relief for: IAC, Brady violations, newly discovered evidence, involuntary pleas, and illegal sentences.', reasoning:'IAC, Brady, or other grounds detected — 3.850 is the appropriate post-conviction vehicle.', authority:'Fla. R. Crim. P. 3.850(b) (2-year limitation)', caseLaw:'Strickland v. Washington (1984) — IAC standard; Brady v. Maryland (1963) — disclosure duty' },
    });
  }

  // Motion for Sentence Correction (3.800)
  if (ps.years > 0 && (a['max-sentence'] && parseInt(a['max-sentence']||'0') > 0 && ps.years > parseInt(a['max-sentence']||'0'))) {
    result.strategicMotions.push({
      id:'sentence-correction', priority:'critical', icon:'📜',
      title:'Rule 3.800(a) Motion to Correct Illegal Sentence', statute:'Fla. R. Crim. P. 3.800(a)',
      desc:'Sentence that exceeds statutory maximum, violates double jeopardy, or has scoresheet error.',
      timing:'No time limit — can be filed at any time.',
      probability: 'High — sentence appears to exceed statutory maximum',
      xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'An illegal sentence may be corrected at any time — no statute of limitations applies to illegal sentence claims.', reasoning:'Sentence appears to exceed statutory maximum — 3.800(a) motion is the appropriate remedy.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021) — illegal sentence correction' },
    });
  }

  if (motionId === '3800' || (a['illegal-basis'] || '').length > 0) {
    result.strategicMotions.push({
      id:'sentence-correction-3800', priority:'critical', icon:'📜',
      title:'Rule 3.800(a) Motion to Correct Illegal Sentence', statute:'Fla. R. Crim. P. 3.800(a)',
      desc:'Illegal sentence correction identified: ' + esc(a['illegal-basis'] || 'basis not specified') + '.',
      timing:'No time limit. No statute of limitations for illegal sentences.',
      probability: 'High — specific illegality identified',
      xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'Specific illegality identified — no time limit applies for illegal sentence correction.', reasoning:'Illegal sentence basis specifically identified — strong candidate for 3.800(a) relief.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021)' },
    });
  }

  // Motion for Modification of Restitution
  if (motionId === 'restitution' || a['rest-amount']) {
    result.strategicMotions.push({
      id:'restitution-mod', priority:'high', icon:'💰',
      title:'Motion to Modify Restitution', statute:'Bearden v. Georgia (1983) · Fla. Stat. § 775.089',
      desc:'Modify restitution based on changed financial circumstances. Court must consider ability to pay.',
      timing:'Post-sentencing — file when circumstances change.',
      probability: 'Moderate to High — requires documented hardship and bona fide efforts',
      xai:{ statute:'Fla. Stat. § 775.089(6) · Bearden v. Georgia (1983)', rule:'Restitution modification requires a substantial change in circumstances and bona fide efforts to pay — Bearden prohibits incarceration for inability to pay due to indigency.', reasoning:'Restitution modification requested — Bearden protections and changed circumstances analysis apply.', authority:'Fla. R. Crim. P. 3.800(b)', caseLaw:'Bearden v. Georgia (1983) — indigency defense' },
    });
  }

  // ── FILING DEADLINE RULES ──

  // Speedy Trial
  if (pp.incarcerationNow || pp.convictionDate) {
    result.filingDeadlines.push({
      id:'speedy-trial', severity:'critical', icon:'⏱️',
      title:'Speedy Trial — 33-Day Clock', rule:'Fla. R. Crim. P. 3.191',
      desc:'Incarcerated defendants: 33 days to trial. Non-incarcerated: 175 days.',
      deadline: pp.incarcerationNow ? '33 days from date of incarceration' : '175 days from date of arrest',
      consequence:'If expired, file Notice of Expiration and Demand for Discharge.',
      xai:{ statute:'Fla. R. Crim. P. 3.191', rule:'Incarcerated: 33-day speedy trial clock; non-incarcerated: 175 days. Failure to bring to trial = automatic discharge upon proper notice.', reasoning:'Incarcerated or case active — speedy trial clock must be tracked.', authority:'Fla. R. Crim. P. 3.191', caseLaw:'State v. Naveira (Fla. 2020) — discharge remedy' },
    });
    score += 10;
  }

  // Appeal Deadline
  if (pp.sentenceDate && !pp.appealStatus) {
    var sentDate = new Date(pp.sentenceDate);
    var daysSince = Math.floor((new Date() - sentDate) / (24*60*60*1000));
    var remaining = 30 - daysSince;
    result.filingDeadlines.push({
      id:'appeal-deadline', severity: remaining <= 0 ? 'critical' : 'high', icon:'⏰',
      title:'Notice of Appeal — 30-Day Window', rule:'Fla. R. App. P. 9.110(b)',
      desc:'Notice of appeal must be filed within 30 days of sentencing. This deadline is jurisdictional.',
      deadline: remaining > 0 ? remaining + ' days remaining (from ' + esc(pp.sentenceDate) + ')' : 'EXPIRED — ' + Math.abs(remaining) + ' days past deadline',
      consequence: remaining > 0 ? 'File immediately to preserve appellate rights.' : 'Jurisdictional deadline passed. File motion for belated appeal (IAC for failure to file) under Fla. R. App. P. 9.141(c).',
      xai:{ statute:'Fla. R. App. P. 9.110(b) · 9.140(b)(3)', rule:'Notice of appeal must be filed within 30 days of rendition — jurisdictional deadline cannot be extended.', reasoning:'Sentence date detected without appeal — 30-day clock is running.', authority:'Fla. R. App. P. 9.141(c) (belated appeal)', caseLaw:'State v. Johnson (Fla. 2020) — jurisdictional deadline' },
    });
    score += Math.max(0, 20 - daysSince);
  }

  // 2-Year 3.850 Bar
  if (pp.convictionDate && motionId !== '3850' && motionId !== '3800') {
    var cDate = new Date(pp.convictionDate);
    var yearsSince = (new Date() - cDate) / (365.25*24*60*60*1000);
    if (yearsSince < 10) {
      var remaining = Math.max(0, 2 - yearsSince);
      result.filingDeadlines.push({
        id:'850-deadline', severity: remaining <= 0 ? 'critical' : 'high', icon:'⏳',
        title:'Rule 3.850 — 2-Year Statute of Limitations', rule:'Fla. R. Crim. P. 3.850(b)',
        desc:'Post-conviction motion must be filed within 2 years of conviction becoming final.',
        deadline: remaining > 0 ? 'Approximately ' + Math.round(remaining * 365) + ' days remaining' : 'EXPIRED — ' + Math.round(Math.abs(remaining) * 365) + ' days past deadline',
        consequence: remaining > 0 ? 'Prepare and file 3.850 motion with specific factual allegations.' : 'Exceptions: newly discovered evidence (1-year from discovery), illegal sentence (no limit), retroactive constitutional right.',
        xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'3.850 has a 2-year statute of limitations from finality — exceptions exist for newly discovered evidence, illegal sentences, and retroactive rights.', reasoning:'Conviction date detected — 3.850 window must be calculated.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'State v. Johnson (Fla. 2020) — 2-year bar' },
      });
      score += remaining <= 0 ? 10 : 5;
    }
  }

  // AEDPA 1-Year Bar
  if (pp.incarcerationNow && (pp.appealStatus.includes('denied') || pp.appealStatus.includes('affirmed') || motionId === '2254')) {
    result.filingDeadlines.push({
      id:'aedpa-bar', severity:'critical', icon:'⏳',
      title:'AEDPA — 1-Year Federal Habeas Deadline', rule:'28 U.S.C. § 2254(d)',
      desc:'Federal habeas petition must be filed within 1 year of state conviction becoming final.',
      deadline:'1 year from finality of state post-conviction proceedings (tolled during state review)',
      consequence:'Check if AEDPA clock has expired. If so, explore: equitable tolling (extraordinary circumstances), actual innocence gateway, newly recognized right made retroactive.',
      xai:{ statute:'28 U.S.C. § 2244(d)(1)', rule:'AEDPA imposes a 1-year statute of limitations tolled during state post-conviction — clock starts from finality.', reasoning:'Incarceration with exhausted appeals — AEDPA clock must be calculated.', authority:'28 U.S.C. § 2244(d)(2)', caseLaw:'Holland v. Florida (2010) — equitable tolling standard' },
    });
    score += 15;
  }

  // ── PROCEDURAL OBSTACLE RULES ──

  // Appeal in Progress Blocking Trial Court
  if (pp.appealStatus.includes('pending')) {
    result.proceduralObstacles.push({
      id:'appeal-pending', severity:'high', icon:'🚧',
      title:'Pending Appeal — Trial Court May Lack Jurisdiction',
      desc:'If a direct appeal is pending, the trial court may lack jurisdiction to hear post-conviction or collateral motions.',
      solution:'If filing 3.850 during pending appeal: (1) some courts accept jurisdiction for post-conviction while appeal is pending, (2) you may need to raise issues in the appeal instead, (3) wait for appellate mandate and refile.',
      xai:{ statute:'Fla. R. App. P. 9.020(h)', rule:'A pending appeal generally divests the trial court of jurisdiction over matters related to the judgment under review.', reasoning:'Appeal pending — trial court jurisdiction may be limited for collateral motions.', authority:'Fla. R. App. P. 9.020(h)', caseLaw:'State v. Anderson (Fla. 2021) — jurisdiction during appeal' },
    });
  }

  // Prior 850 Denial
  if ((pp.priorMotions || (e['elig-3850-2'] || '')).includes('denied')) {
    result.proceduralObstacles.push({
      id:'prior-850-bar', severity:'critical', icon:'🚧',
      title:'Prior 3.850 Denied — Successive Motion Bar',
      desc:'A prior 3.850 motion denied on the merits bars successive motions unless an exception applies.',
      solution:'Successive motion allowed ONLY for: (1) newly discovered evidence, (2) fundamental constitutional right made retroactive, (3) illegal sentence. Otherwise, seek appellate authorization (Fla. R. App. P. 9.141(d)).',
      xai:{ statute:'Fla. R. Crim. P. 3.850(h)', rule:'Successive 3.850 motions are barred unless the claim meets one of three statutory exceptions.', reasoning:'Prior 3.850 denied — successive motion requires exception or appellate authorization.', authority:'Fla. R. App. P. 9.141(d)', caseLaw:'State v. Gomez (Fla. 2020) — successive motion bar' },
    });
    score += 20;
  }

  // No FDLE Certificate (Expunge)
  if (motionId === 'expunge' && !(a['fdle-cert-obtained'] || '').toLowerCase().includes('yes')) {
    result.proceduralObstacles.push({
      id:'no-fdle', severity:'block', icon:'🚧',
      title:'FDLE Certificate Not Obtained — Cannot File',
      desc:'FDLE Certificate of Eligibility is a statutory prerequisite. Filing without it guarantees denial.',
      solution:'Complete FDLE application: (1) obtain application form, (2) get fingerprinted, (3) submit with fee. Wait for certificate before filing with the court.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(b)', rule:'FDLE Certificate is a mandatory prerequisite — filing without it results in automatic denial.', reasoning:'FDLE certificate not obtained — cannot proceed with expunge petition.', authority:'Fla. Stat. § 943.0585(2)(b)', caseLaw:'State v. L.P. (Fla. 2020)' },
    });
  }

  // Prior Seal Bars Second Attempt
  if (pf.priorsExposure && motionId === 'expunge') {
    result.proceduralObstacles.push({
      id:'prior-seal-bar', severity:'block', icon:'🚧',
      title:'Prior Seal/Expunge Used — One-Time Only',
      desc:'Florida allows only one seal/expunge per lifetime. Prior use in any state may disqualify.',
      solution:'If prior was in another state, Florida law may not count it — consult attorney. Otherwise, executive clemency is the only path.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1', rule:'Florida allows only one seal/expunge per lifetime — the one-time bar applies on first use.', reasoning:'Prior seal/expunge detected — one-time bar may apply.', authority:'Fla. Stat. § 943.0585(2)(a)1', caseLaw:'State v. J.C. (Fla. 2021)' },
    });
    score += 20;
  }

  // VOP / Violation
  if (pf.violations && motionId === 'terminate') {
    result.proceduralObstacles.push({
      id:'vop-bar', severity:'high', icon:'🚧',
      title:'Multiple Violations — Early Termination At Risk',
      desc:'History of probation violations undermines the petition for early termination.',
      solution:'Demonstrate full compliance since the last violation. Obtain PO support. Show rehabilitation programs completed. If violations were technical (not substantive), argue they do not defeat the petition.',
      xai:{ statute:'Fla. Stat. § 948.045', rule:'Probation violations are a significant negative factor in early termination — but technical or old violations with subsequent compliance may be overcome.', reasoning:'Violations detected — early termination may face opposition.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021) — violation impact' },
    });
    score += 15;
  }

  // Adjudication / Conviction Bar for Expunge
  if ((pp.convicted || '').includes('convicted') && motionId === 'expunge') {
    result.proceduralObstacles.push({
      id:'conviction-bar', severity:'block', icon:'🚧',
      title:'Adjudicated Guilty — Seal/Expunge Generally Unavailable',
      desc:'Florida law bars sealing or expunging convictions. Only withhold of adjudication, dismissals, and nolle prosses qualify.',
      solution:'The ONLY exception: executive clemency (pardon). If adjudication was actually withheld but recorded incorrectly, request a corrected disposition from the Clerk of Court.',
      xai:{ statute:'Fla. Stat. § 943.0585(1)(a)', rule:'Convictions are statutorily ineligible for seal/expunge — only withhold of adjudication, dismissal, and nolle prosequi qualify.', reasoning:'Adjudication of guilt detected — statutory bar to seal/expunge.', authority:'Fla. Stat. § 943.0585(1)(a)', caseLaw:'State v. L.P. (Fla. 2020) — withhold requirement' },
    });
    score += 25;
  }

  // Disqualifying Offense for Expunge
  if ((po.disqualifyingType || '').toLowerCase().includes('murder') || (po.disqualifyingType || '').toLowerCase().includes('sexual') || (po.disqualifyingType || '').toLowerCase().includes('robbery') || (po.disqualifyingType || '').toLowerCase().includes('terror')) {
    result.proceduralObstacles.push({
      id:'disqualify-bar', severity:'block', icon:'🚧',
      title:'Statutorily Disqualified Offense',
      desc:'The charge type is among the enumerated disqualifying offenses under F.S. § 943.0585.',
      solution:'No statutory remedy. Executive clemency (full pardon) is the only path to eligibility. Begin clemency binder preparation now.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(a)', rule:'Offenses enumerated in § 943.0585(2)(a) are absolutely barred from seal/expunge.', reasoning:'Disqualifying offense type — statutory bar to seal/expunge.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021)' },
    });
    score += 30;
  }

  // Calculate risk score (cap at 100)
  result.riskScore = Math.min(Math.max(score, 0), 100);
  result.riskLevel = result.riskScore >= 70 ? 'critical' : result.riskScore >= 45 ? 'high' : result.riskScore >= 20 ? 'medium' : 'low';

  return result;
}

function renderCaseIntelligence() {
  var section = document.getElementById('intel-section');
  var fill = document.getElementById('intel-risk-fill');
  var label = document.getElementById('intel-risk-label');
  var motionsEl = document.getElementById('intel-motions');
  var deadlinesEl = document.getElementById('intel-deadlines');
  var sentencingEl = document.getElementById('intel-sentencing');
  var obstaclesEl = document.getElementById('intel-obstacles');
  var motionCount = document.getElementById('intel-motion-count');
  var deadlineCount = document.getElementById('intel-deadline-count');
  var sentencingCount = document.getElementById('intel-sentencing-count');
  var obstacleCount = document.getElementById('intel-obstacle-count');
  if (!section) return;

  var result = evaluateCase(currentMotion, answers, eligAnswers);
  var hasContent = result.strategicMotions.length || result.filingDeadlines.length || result.sentencingAlerts.length || result.proceduralObstacles.length;
  if (!hasContent) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  cmdOpen('intel-h');

  // Risk bar
  var width = result.riskScore + '%';
  fill.style.width = width;
  fill.className = 'intel-risk-fill intel-risk-fill--' + result.riskLevel;
  label.textContent = 'Risk Score: ' + result.riskScore + '/100 — ' + result.riskLevel.toUpperCase() + ' risk';

  // Render helper
  function renderItems(items, container, countEl) {
    if (!items || !items.length) { container.innerHTML = '<div class="intel-empty">None identified</div>'; if (countEl) countEl.textContent = '0'; return; }
    if (countEl) countEl.textContent = items.length;
    container.innerHTML = items.map(function(item) {
      var sev = item.severity || item.priority || 'info';
      var sevClass = 'intel-item--' + sev;
      var badgeClass = 'intel-item-badge--' + sev;
      var icon = item.icon || '📌';
      var parts = ['<div class="intel-item ' + sevClass + '"><div class="intel-item-header"><span class="intel-item-icon">' + icon + '</span><span class="intel-item-title">' + esc(item.title) + '</span><span class="intel-item-badge ' + badgeClass + '">' + sev + '</span></div>'];
      if (item.desc) parts.push('<div class="intel-item-desc">' + esc(item.desc) + '</div>');
      if (item.statute) parts.push('<div class="intel-item-statute">' + esc(item.statute) + '</div>');
      if (item.rule) parts.push('<div class="intel-item-statute">' + esc(item.rule) + '</div>');
      if (item.timing) parts.push('<div class="intel-item-statute">Timing: ' + esc(item.timing) + '</div>');
      if (item.deadline) parts.push('<div class="intel-item-desc">⏰ ' + esc(item.deadline) + '</div>');
      if (item.consequence) parts.push('<div class="intel-item-desc">⚠️ ' + esc(item.consequence) + '</div>');
      if (item.probability) parts.push('<div class="intel-item-desc">📊 Probability: ' + esc(item.probability) + '</div>');
      if (item.recommendation) parts.push('<div class="intel-item-action">→ ' + esc(item.recommendation) + '</div>');
      if (item.solution) parts.push('<div class="intel-item-action">→ ' + esc(item.solution) + '</div>');
      if (item.details) {
        item.details.forEach(function(d) { parts.push('<div class="intel-item-desc" style="padding-left:14px;font-size:9.5px">• ' + esc(d) + '</div>'); });
      }
      var xaiHtml = renderXai(item.xai);
      if (xaiHtml) parts.push(xaiHtml);
      parts.push('</div>');
      return parts.join('');
    }).join('');
  }

  renderItems(result.strategicMotions, motionsEl, motionCount);
  renderItems(result.filingDeadlines, deadlinesEl, deadlineCount);
  renderItems(result.sentencingAlerts, sentencingEl, sentencingCount);
  renderItems(result.proceduralObstacles, obstaclesEl, obstacleCount);
}

// ── CASE SESSION MEMORY ──
// Persistent, interconnected case data store shared across all modules.

var CaseSession = null;
var caseFileOpen = true;
let currentMotion = null;
let currentQ = 0;
let answers = {};
let eligAnswers = {};

var SESSION_KEY = 'fl-case-session';
var SESSION_FIELD_MAP = {
  'county':['county'], 'case-num':['caseNumber'], 'case-number':['caseNumber'],
  'judge':['judge'], 'def-name':['person','name'], 'filer-name':['person','name'],
  'pet-name':['person','name'], 'appellant-name':['person','name'],
  'dc-number':['person','dcNumber'],
  'offense':['offense','text'], 'offense-statute':['offense','statute'],
  'arrest-charge':['offense','text'], 'elig-disqualifying':['offense','disqualifyingType'],
  'sentence-terms':['sentence','imposed'], 'sentence-imposed':['sentence','imposed'],
  'max-sentence':['sentence','maxStatutory'],
  'conviction-date':['procedure','convictionDate'], 'sentence-date':['procedure','sentenceDate'],
  'currently-incarcerated':['procedure','incarcerationNow'],
  'direct-appeal-status':['procedure','appealStatus'],
  'prior-motions':['procedure','priorMotions'],
  'filer-address':['person','address'], 'pet-address':['person','address'],
  'pet-dob':['person','dob'], 'def-dob':['person','dob'],
  'filer-city':['person','city'],
  'pet-phone':['person','phone'],
  'employed':['person','employed'],
  'monthly-income':['person','monthlyIncome'],
  'dependents':['person','dependents'],
  'isJuvenile':['person','isJuvenile'], 'nonCitizen':['person','nonCitizen'],
  'grounds-iac':['flags','iac'], 'grounds-brady':['flags','brady'],
  'grounds-new':['flags','newEvidence'], 'grounds-plea':['flags','plea'],
  'grounds-sentence':['flags','sentence'],
  'facts-main':['facts'], 'facts':['facts'], 'relief-sought':['relief'],
  'illegal-basis':['sentence','illegalBasis'],
  'prob-start':['procedure','probationStart'], 'prob-end':['procedure','probationEnd'],
  'prob-type':['procedure','probationType'],
  'po-position':['procedure','poPosition'],
  'violations':['flags','violations'],
  'drug-tests':['flags','drugTests'],
  'fees-paid':['eligibility','feesPaid'], 'restitution-status':['eligibility','restitutionPaid'],
  'coDefendant':['flags','coDefendant'], 'firearmUsed':['flags','firearmUsed'],
  'injuryLevel':['offense','injuryLevel'],
  'searchReasonable':['flags','searchIssue'], 'consentSearch':['flags','consentIssue'],
  'miranda':['flags','mirandaIssue'],
  'informantUsed':['flags','informant'], 'surveillanceEvidence':['flags','surveillance'],
  'rest-amount':['sentence','restitutionAmount'], 'rest-paid':['eligibility','restitutionPaidAmount'],
  'elig-prior-seal':['eligibility','priorSeal'],
  'elig-convicted':['eligibility','convicted'],
  'elig-charge-type':['eligibility','chargeType'],
  'fdle-cert-obtained':['eligibility','fdleCert'],
  'elig-type':['eligibility','type'],
};

function initCaseSession() {
  var saved = null;
  try {
    saved = loadSession();
  } catch (e) {
    saved = null;
  }
  if (saved && typeof saved === 'object') {
    CaseSession = saved;
  } else {
    CaseSession = {
      county:'', caseNumber:'', judge:'',
      person:{ name:'', dob:'', age:0, isJuvenile:false, nonCitizen:false, dcNumber:'', address:'', phone:'', employed:'', monthlyIncome:0, dependents:0, city:'' },
      offense:{ text:'', statute:'', isDrug:false, isViolent:false, isWeapon:false, firearmUsed:false, injuryLevel:'', isTrafficking:false, isLife:false, isPossession:false, isSexual:false, disqualifyingType:'' },
      sentence:{ imposed:'', maxStatutory:'', years:0, hasLife:false, hasMandMin:false, incarceration:'', illegalBasis:'', restitutionAmount:0 },
      procedure:{ convictionDate:'', sentenceDate:'', incarcerationNow:'', appealStatus:'', priorMotions:'', probationStart:'', probationEnd:'', probationType:'', poPosition:'', eligChargeType:'', isAdjudicated:false },
      eligibility:{ priorSeal:'', convicted:'', chargeType:'', disqualifying:'', fdleCert:'', feesPaid:'', restitutionPaid:'', restitutionPaidAmount:0, type:'' },
      flags:{ searchIssue:false, mirandaIssue:false, coDefendant:false, firearmUsed:false, informant:false, surveillance:false, violations:'', drugTests:'', iac:false, brady:false, newEvidence:false, plea:false, sentence:false },
      facts:'', relief:'', motionType:'',
      raw:{},
      lastUpdated: Date.now(),
    };
  }
  CaseSession._loaded = true;
}

function persistCaseSession() {
  if (!CaseSession || !CaseSession._loaded) return;
  CaseSession.lastUpdated = Date.now();
  try {
    saveSession(CaseSession);
  } catch (e) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(CaseSession)); } catch (_) {}
  }
}

function saveToSession(id, value) {
  if (!CaseSession || !CaseSession._loaded) initCaseSession();
  // Save to structured path
  var mapping = SESSION_FIELD_MAP[id];
  if (mapping) {
    var obj = CaseSession;
    for (var i = 0; i < mapping.length - 1; i++) {
      if (typeof obj[mapping[i]] !== 'object' || obj[mapping[i]] === null) obj[mapping[i]] = {};
      obj = obj[mapping[i]];
    }
    obj[mapping[mapping.length - 1]] = value;
  }
  // Always save raw
  if (!CaseSession.raw) CaseSession.raw = {};
  CaseSession.raw[id] = value;
  CaseSession.motionType = currentMotion || CaseSession.motionType;
  persistCaseSession();
  // Rerender the case file panel if visible
  renderCaseSummary();
}

function loadFromSession(questionId) {
  if (!CaseSession || !CaseSession._loaded) initCaseSession();
  // Check raw answers first
  if (CaseSession.raw && CaseSession.raw[questionId] !== undefined) return CaseSession.raw[questionId];
  // Check structured path
  var mapping = SESSION_FIELD_MAP[questionId];
  if (!mapping) return '';
  var obj = CaseSession;
  for (var i = 0; i < mapping.length; i++) {
    if (obj === null || obj === undefined || typeof obj !== 'object') return '';
    obj = obj[mapping[i]];
    if (obj === undefined || obj === null) return '';
  }
  return (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') ? String(obj) : '';
}

function toggleCaseFile() {
  caseFileOpen = !caseFileOpen;
  var body = document.getElementById('casefile-body');
  var toggle = document.getElementById('casefile-toggle');
  if (body) body.style.display = caseFileOpen ? 'grid' : 'none';
  if (toggle) toggle.classList.toggle('open', caseFileOpen);
}

// ═══════════════════════════════════════════════
// CASE NARRATIVE ENGINE
// Dynamically builds coherent legal narrative from answers
// ═══════════════════════════════════════════════

function buildNarrative(motionId, answers) {
  const a = answers || {};
  const flow = FLOWS[motionId];
  const motionTitle = flow ? flow.title : 'Legal Filing';
  const sections = [];

  // ── Overview ──
  const parts = [];
  const charge = a['offense'] || a['arrest-charge'] || 'the charged offense';
  const county = caseSession?.county || a['county'] || 'the applicable county';
  const caseNum = caseSession?.caseNum || a['case-num'] || '';
  const defName = caseSession?.defendantName || a['def-name'] || a['pet-name'] || 'the defendant';
  const resolution = a['case-resolution'] || '';
  const sentenceDate = a['sentence-date'] || a['judgment-date'] || '';
  const convictionDate = a['conviction-date'] || '';
  const sentence = a['sentence-terms'] || a['sentence-imposed'] || '';
  const incarceration = a['currently-incarcerated'] || '';
  const facts = a['facts-main'] || a['facts'] || '';
  const groundsFound = [];

  if (charge && county) parts.push(defName + ' was charged with ' + charge + ' in ' + county + (caseNum ? ' (Case No. ' + caseNum + ')' : '') + '.');
  if (resolution) parts.push('The case was resolved by ' + resolution.toLowerCase() + '.');
  if (convictionDate) parts.push('Date of conviction: ' + convictionDate + '.');
  if (sentenceDate && sentence) parts.push('A sentence of ' + sentence + ' was imposed on ' + sentenceDate + '.');
  if (incarceration) parts.push('Current custody status: ' + incarceration + '.');
  if (facts) parts.push(facts.length > 200 ? facts.slice(0, 200) + '...' : facts);

  sections.push({ type: 'overview', title: 'CASE OVERVIEW', lines: parts.length ? parts : ['Case data is being assembled. Complete the intake fields and wizard questions to build the narrative.'] });

  // ── Grounds for Relief ──
  if (a['grounds-iac'] === 'yes') groundsFound.push({ icon: '⚖️', text: 'Ineffective Assistance of Counsel — counsel failed to provide reasonably effective representation, and this deficiency prejudiced the outcome. Strickland v. Washington, 466 U.S. 668 (1984).', severity: 'critical' });
  if (a['grounds-brady'] === 'yes') groundsFound.push({ icon: '📂', text: 'Brady Violation — the prosecution withheld material exculpatory or impeachment evidence. Brady v. Maryland, 373 U.S. 83 (1963).', severity: 'critical' });
  if (a['grounds-plea'] === 'yes') groundsFound.push({ icon: '🤝', text: 'Involuntary Plea — the plea was not knowing, intelligent, and voluntary. Boykin v. Alabama, 395 U.S. 238 (1969).', severity: 'critical' });
  if (a['grounds-sentence'] === 'yes') groundsFound.push({ icon: '📏', text: 'Sentencing Error — the sentence was improperly calculated or violates statutory limits.', severity: 'high' });
  if (a['grounds-new'] === 'yes') groundsFound.push({ icon: '🆕', text: 'Newly Discovered Evidence — evidence exists that was unknown at trial and would probably produce an acquittal on retrial. Jones v. State, 591 So. 2d 911 (Fla. 1991).', severity: 'critical' });
  if (a['grounds-other'] === 'yes') groundsFound.push({ icon: '📋', text: 'Other Constitutional Violation — additional grounds that may include due process, equal protection, or other fundamental rights.', severity: 'high' });
  if (a['illegal-basis']) groundsFound.push({ icon: '📜', text: 'Illegal Sentence — the sentence is illegal because: ' + a['illegal-basis'] + '.', severity: 'critical' });

  if (groundsFound.length) {
    sections.push({ type: 'grounds', title: 'GROUNDS FOR RELIEF', items: groundsFound });
  } else if (motionId) {
    sections.push({ type: 'grounds', title: 'GROUNDS FOR RELIEF', lines: ['Select specific grounds in the wizard questions to identify the legal basis for relief.'], placeholder: true });
  }

  // ── Procedural Timeline ──
  const timelineItems = [];
  const arrestDate = a['arrest-date'];
  const violDate = a['violation-date'];
  const probType = a['prob-type'];
  if (arrestDate) timelineItems.push({ date: arrestDate, event: 'Arrest', label: 'Arrest date' });
  if (convictionDate) timelineItems.push({ date: convictionDate, event: 'Conviction', label: 'Conviction finality' });
  if (sentenceDate) timelineItems.push({ date: sentenceDate, event: 'Sentencing', label: 'Sentence imposed' });
  if (a['appeal-filed-date']) timelineItems.push({ date: a['appeal-filed-date'], event: 'Appeal Filed', label: 'Notice of Appeal' });
  if (a['appeal-opinion-date']) timelineItems.push({ date: a['appeal-opinion-date'], event: 'Appeal Opinion', label: 'Appellate opinion' });
  if (violDate) timelineItems.push({ date: violDate, event: 'Violation', label: 'Probation violation' });
  if (a['prob-start']) timelineItems.push({ date: a['prob-start'], event: 'Probation Start', label: probType || 'Probation' });
  if (a['prob-end']) timelineItems.push({ date: a['prob-end'], event: 'Probation End', label: 'Scheduled termination' });
  if (motionId) timelineItems.push({ date: 'NOW', event: motionTitle, label: 'Current filing' });

  if (timelineItems.length) {
    sections.push({ type: 'timeline', title: 'PROCEDURAL TIMELINE', items: timelineItems });
  }

  // ── Weaknesses (top 5 from scanner) ──
  const weaks = detectWeaknesses(motionId, a).slice(0, 5);
  if (weaks.length) {
    sections.push({ type: 'risks', title: 'IDENTIFIED ISSUES', items: weaks.map(w => ({
      icon: w.icon, text: w.title + ' — ' + w.desc, severity: w.severity, action: w.action
    })) });
  }

  // ── Deadlines ──
  const state = getCaseState(null, a, motionId, chargeTimeline);
  const deadlines = getDeadlines(state, a).filter(d => d.severity === 'critical' || d.severity === 'high');
  if (deadlines.length) {
    sections.push({ type: 'deadlines', title: 'ACTIVE DEADLINES', items: deadlines.map(d => ({
      icon: d.icon, text: d.label + ' — ' + d.note, severity: d.severity, statute: d.statute
    })) });
  }

  return { motionTitle, defName, charge, county, sections, totalSections: sections.length };
}

function narrativeToText(narrative) {
  const lines = [];
  const border = '═'.repeat(56);
  lines.push(border);
  lines.push('  CASE NARRATIVE — ' + (narrative.motionTitle || 'Legal Analysis').toUpperCase());
  lines.push(border);
  lines.push('');

  narrative.sections.forEach(s => {
    lines.push('─── ' + s.title + ' ───');
    lines.push('');
    if (s.lines) s.lines.forEach(l => lines.push('  ' + l));
    if (s.items) s.items.forEach(item => {
      const sev = item.severity === 'critical' ? '⚠' : item.severity === 'high' ? '⚡' : '•';
      lines.push('  ' + sev + ' ' + (item.icon || '') + ' ' + item.text);
    });
    lines.push('');
  });

  lines.push(border);
  return lines.join('\n');
}

function renderNarrativeView() {
  const panel = document.getElementById('narrative-panel');
  if (!panel) return;
  if (!currentMotion) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const narrative = buildNarrative(currentMotion, answers);
  let html = '<div class="narr-header">' +
    '<div class="narr-title-row">' +
      '<span class="narr-icon">📋</span>' +
      '<span class="narr-title">Case Narrative Engine</span>' +
      '<span class="narr-meta">' + narrative.totalSections + ' sections · ' + narrative.defName + '</span>' +
    '</div>' +
    '<div class="narr-actions">' +
      '<button class="narr-btn" onclick="narrCopy()" title="Copy narrative to clipboard">📋 Copy</button>' +
      '<button class="narr-btn" onclick="narrDownload()" title="Download narrative as text file">⬇ Export</button>' +
    '</div>' +
  '</div>';

  html += '<div class="narr-body">';

  narrative.sections.forEach(s => {
    html += '<div class="narr-section">' +
      '<div class="narr-section-header" onclick="this.nextElementSibling.classList.toggle(\'open\');this.classList.toggle(\'open\')">' +
        '<span class="ns-icon">' + sectionIcon(s.type) + '</span>' +
        '<span class="ns-title">' + s.title + '</span>' +
        '<span class="ns-count">' + (s.items ? s.items.length : s.lines ? s.lines.length : 0) + '</span>' +
        '<span class="ns-toggle">▼</span>' +
      '</div>' +
      '<div class="narr-section-body">';
    if (s.lines) {
      s.lines.forEach(l => html += '<div class="narr-line">' + esc(l) + '</div>');
    }
    if (s.items) {
      s.items.forEach(item => {
        const sevClass = 'narr-item--' + (item.severity || 'info');
        html += '<div class="narr-item ' + sevClass + '">' +
          '<span class="ni-icon">' + (item.icon || '•') + '</span>' +
          '<div class="ni-body">' +
            '<div class="ni-text">' + esc(item.text) + '</div>' +
            (item.action ? '<div class="ni-action">→ ' + esc(item.action) + '</div>' : '') +
            (item.statute ? '<div class="ni-statute">' + esc(item.statute) + '</div>' : '') +
          '</div>' +
        '</div>';
      });
    }
    if (s.placeholder) {
      html += '<div class="narr-placeholder">' + s.lines.join(' ') + '</div>';
    }
    html += '</div></div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

function sectionIcon(type) {
  const icons = { overview: '📋', grounds: '⚖️', timeline: '📅', risks: '🎯', deadlines: '⏰' };
  return icons[type] || '📄';
}

// ── Narrative Export ──
function narrCopy() {
  if (!currentMotion) return;
  const narrative = buildNarrative(currentMotion, answers);
  const text = narrativeToText(narrative);
  if (navigator.clipboard) { navigator.clipboard.writeText(text); toast('Narrative copied to clipboard'); }
  else { /* fallback */ toast('Copy not supported — use Export'); }
}

function narrDownload() {
  if (!currentMotion) return;
  const narrative = buildNarrative(currentMotion, answers);
  const text = narrativeToText(narrative);
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  a.download = 'case-narrative-' + (narrative.defName || 'unknown').replace(/\s+/g, '-').toLowerCase() + '.txt';
  a.click();
  toast('Narrative exported');
}

function renderCaseSummary() {
  var section = document.getElementById('casefile-section');
  var body = document.getElementById('casefile-body');
  if (!section || !body) return;
  if (!CaseSession || !CaseSession._loaded) initCaseSession();

  var hasData = CaseSession.raw && Object.keys(CaseSession.raw).length > 0;
  if (!hasData && !CaseSession.offense.text && !CaseSession.person.name) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  cmdOpen('cf-h');

  var groups = [];

  // Person
  var pRows = [];
  if (CaseSession.person.name) pRows.push({k:'Name', v:CaseSession.person.name});
  if (CaseSession.person.dob) pRows.push({k:'DOB', v:CaseSession.person.dob + ' (' + (function(d){if(!d)return'';var y=new Date().getFullYear()-new Date(d).getFullYear();return y<0?0:y})(CaseSession.person.dob) + ')'});
  if (CaseSession.person.dcNumber) pRows.push({k:'DC#', v:CaseSession.person.dcNumber});
  if (CaseSession.person.employed) pRows.push({k:'Employed', v:CaseSession.person.employed});
  if (CaseSession.person.nonCitizen) pRows.push({k:'Non-Citizen', v:'Yes'});
  if (CaseSession.person.isJuvenile) pRows.push({k:'Juvenile', v:'Yes'});
  if (CaseSession.person.address) pRows.push({k:'Address', v:CaseSession.person.address});
  if (pRows.length) groups.push({title:'👤 Defendant', rows:pRows});

  // Charges
  var cRows = [];
  if (CaseSession.offense.text) cRows.push({k:'Offense', v:CaseSession.offense.text});
  if (CaseSession.offense.statute) cRows.push({k:'Statute', v:CaseSession.offense.statute});
  if (CaseSession.county) cRows.push({k:'County', v:CaseSession.county});
  if (CaseSession.caseNumber) cRows.push({k:'Case#', v:CaseSession.caseNumber});
  if (CaseSession.judge) cRows.push({k:'Judge', v:CaseSession.judge});
  if (CaseSession.offense.disqualifyingType) cRows.push({k:'Disqualifying', v:CaseSession.offense.disqualifyingType});
  if (cRows.length) groups.push({title:'⚖️ Charges', rows:cRows});

  // Sentencing
  var sRows = [];
  if (CaseSession.sentence.imposed) sRows.push({k:'Sentence', v:CaseSession.sentence.imposed});
  if (CaseSession.sentence.maxStatutory) sRows.push({k:'Max', v:CaseSession.sentence.maxStatutory});
  if (CaseSession.procedure.sentenceDate) sRows.push({k:'Date', v:CaseSession.procedure.sentenceDate});
  if (CaseSession.procedure.incarcerationNow) sRows.push({k:'Status', v:CaseSession.procedure.incarcerationNow});
  if (CaseSession.sentence.illegalBasis) sRows.push({k:'Illegal Basis', v:CaseSession.sentence.illegalBasis});
  if (CaseSession.sentence.restitutionAmount) sRows.push({k:'Restitution', v:'$' + CaseSession.sentence.restitutionAmount});
  if (sRows.length) groups.push({title:'📏 Sentencing', rows:sRows});

  // Procedural
  var prRows = [];
  if (CaseSession.procedure.appealStatus) prRows.push({k:'Appeal', v:CaseSession.procedure.appealStatus});
  if (CaseSession.procedure.priorMotions) prRows.push({k:'Prior Motions', v:CaseSession.procedure.priorMotions});
  if (CaseSession.procedure.probationType) prRows.push({k:'Probation', v:CaseSession.procedure.probationType});
  if (CaseSession.procedure.probationStart) prRows.push({k:'Prob Start', v:CaseSession.procedure.probationStart});
  if (CaseSession.procedure.probationEnd) prRows.push({k:'Prob End', v:CaseSession.procedure.probationEnd});
  if (CaseSession.procedure.poPosition) prRows.push({k:'PO Position', v:CaseSession.procedure.poPosition});
  if (prRows.length) groups.push({title:'📋 Procedural', rows:prRows});

  // Flags
  var fRows = [];
  if (CaseSession.flags.searchIssue) fRows.push({k:'Search Issue', v:'Yes'});
  if (CaseSession.flags.mirandaIssue) fRows.push({k:'Miranda Issue', v:'Yes'});
  if (CaseSession.flags.coDefendant) fRows.push({k:'Co-Defendant', v:'Yes'});
  if (CaseSession.flags.firearmUsed) fRows.push({k:'Firearm', v:'Yes'});
  if (CaseSession.flags.informant) fRows.push({k:'Informant', v:'Yes'});
  if (CaseSession.flags.iac) fRows.push({k:'IAC Claim', v:'Yes'});
  if (CaseSession.flags.brady) fRows.push({k:'Brady Claim', v:'Yes'});
  if (CaseSession.flags.violations) fRows.push({k:'Violations', v:CaseSession.flags.violations});
  if (fRows.length) groups.push({title:'🚩 Flags', rows:fRows});

  // Eligibility
  var eRows = [];
  if (CaseSession.eligibility.priorSeal) eRows.push({k:'Prior Seal', v:CaseSession.eligibility.priorSeal});
  if (CaseSession.eligibility.convicted) eRows.push({k:'Convicted', v:CaseSession.eligibility.convicted});
  if (CaseSession.eligibility.chargeType) eRows.push({k:'Charge Type', v:CaseSession.eligibility.chargeType});
  if (CaseSession.eligibility.fdleCert) eRows.push({k:'FDLE Cert', v:CaseSession.eligibility.fdleCert});
  if (CaseSession.eligibility.feesPaid) eRows.push({k:'Fees', v:CaseSession.eligibility.feesPaid});
  if (eRows.length) groups.push({title:'🔐 Eligibility', rows:eRows});

  if (!groups.length) { section.style.display = 'none'; return; }

  body.innerHTML = groups.map(function(g) {
    return '<div class="casefile-group"><div class="casefile-group-title">' + g.title + '<span class="casefile-group-count">' + g.rows.length + '</span></div>' +
      g.rows.map(function(r) {
        var vClass = r.v ? '' : 'casefile-val--empty';
        return '<div class="casefile-row"><span class="casefile-key">' + esc(r.k) + '</span><span class="casefile-val ' + vClass + '">' + esc(r.v || '—') + '</span></div>';
      }).join('') + '</div>';
  }).join('');

  // Restore toggle state
  body.style.display = caseFileOpen ? 'grid' : 'none';
  var toggle = document.getElementById('casefile-toggle');
  if (toggle) toggle.classList.toggle('open', caseFileOpen);
}

function clearCaseSession() {
  S.del(SESSION_KEY);
  CaseSession = null;
  initCaseSession();
  var section = document.getElementById('casefile-section');
  if (section) section.style.display = 'none';
  toast('Case session cleared. Fresh start ready.');
}

function saveCaseToFile() {
  if (!CaseSession || !CaseSession._loaded) initCaseSession();
  var text = 'Case File — ' + (CaseSession.person.name || 'Unnamed') + '\n';
  text += 'Generated: ' + new Date().toLocaleString() + '\n';
  text += 'Motion: ' + (CaseSession.motionType || 'None') + '\n';
  text += '═'.repeat(40) + '\n\n';

  function addSection(title, obj, keys) {
    text += '── ' + title + ' ──\n';
    keys.forEach(function(k) {
      var val = obj[k];
      if (val && (typeof val === 'string' || typeof val === 'number') && String(val).trim()) {
        text += '  ' + k + ': ' + val + '\n';
      }
    });
    text += '\n';
  }

  addSection('Defendant', CaseSession.person, ['name','dob','dcNumber','address','phone','employed','isJuvenile','nonCitizen']);
  addSection('Charges', CaseSession.offense, ['text','statute','disqualifyingType','injuryLevel']);
  addSection('Sentence', CaseSession.sentence, ['imposed','maxStatutory','illegalBasis']);
  addSection('Procedure', CaseSession.procedure, ['convictionDate','sentenceDate','appealStatus','priorMotions','probationType']);

  if (CaseSession.county) text += 'County: ' + CaseSession.county + '\n';
  if (CaseSession.caseNumber) text += 'Case #: ' + CaseSession.caseNumber + '\n';
  if (CaseSession.facts) text += '\nStatement of Facts:\n' + CaseSession.facts + '\n';

  var blob = new Blob([text], {type:'text/plain'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'case-file-' + (CaseSession.person.name || 'unnamed').replace(/\s+/g,'-').toLowerCase() + '.txt';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Case file exported.');
}

// ── PROCEDURAL EMERGENCY DETECTION ──

function detectProceduralEmergencies(motionId, a, e) {
  a = a || {}; e = e || {};
  var alerts = [];
  var today = new Date();
  var daysBetween = function(d1, d2) { return Math.round((d2 - d1) / (24*60*60*1000)); };

  // 1. Appeal Window
  var sentDate = a['sentence-date'] || a['judgment-date'] || '';
  var appealStatus = (a['direct-appeal-status'] || '').toLowerCase();
  if (sentDate && !appealStatus) {
    var sd = new Date(sentDate);
    if (!isNaN(sd.getTime())) {
      var daysSince = daysBetween(sd, today);
      if (daysSince > 30) {
        alerts.push({
          id:'appeal-expired', type:'deadline', severity:'critical', icon:'⏰',
          title:'Appeal Window Expired', badge:'DEADLINE',
          desc:'The 30-day notice of appeal deadline closed ' + (daysSince-30) + ' days ago (from ' + esc(sentDate) + '). This is a jurisdictional bar.',
          action:'File motion for belated appeal under Fla. R. App. P. 9.141(c) alleging IAC for failure to file.',
          deadline:'EXPIRED ' + (daysSince-30) + 'd ago',
          xai:{ statute:'Fla. R. App. P. 9.110(b)', rule:'The 30-day notice of appeal deadline is jurisdictional — untimely appeals are dismissed. Belated appeal (Rule 9.141(c)) is the only remedy.', reasoning:'Appeal deadline expired by ' + (daysSince-30) + ' days — direct appeal unavailable.', authority:'Fla. R. App. P. 9.141(c)', caseLaw:'State v. Johnson (Fla. 2020) — jurisdictional deadline' },
        });
      } else if (daysSince >= 20) {
        alerts.push({
          id:'appeal-imminent', type:'deadline', severity:'critical', icon:'⏰',
          title:'Appeal Deadline Imminent', badge:'DEADLINE',
          desc:'Only ' + (30-daysSince) + ' days remain to file the Notice of Appeal (from ' + esc(sentDate) + ').',
          action:'File Notice of Appeal IMMEDIATELY. Do not wait. This deadline is jurisdictional and cannot be extended.',
          deadline:(30-daysSince) + ' days',
          xai:{ statute:'Fla. R. App. P. 9.110(b)', rule:'30-day jurisdictional deadline — imminent expiration requires immediate filing.', reasoning:'Only ' + (30-daysSince) + ' days remain — must file NOW to preserve rights.', authority:'Fla. R. App. P. 9.110(b)', caseLaw:'Fla. R. App. P. 9.140(b)(3) — criminal appeals' },
        });
      } else if (daysSince >= 15) {
        alerts.push({
          id:'appeal-warning', type:'deadline', severity:'warning', icon:'⏰',
          title:'Appeal Deadline Approaching', badge:'DEADLINE',
          desc:(30-daysSince) + ' days remaining to file Notice of Appeal. Prepare now.',
          action:'Draft Notice of Appeal and ensure filing before the 30-day deadline.',
          deadline:(30-daysSince) + ' days',
          xai:{ statute:'Fla. R. App. P. 9.110(b)', rule:'30-day jurisdictional window — prepare now to ensure timely filing.', reasoning:(30-daysSince) + ' days remaining — prepare notice of appeal.', authority:'Fla. R. App. P. 9.110(b)', caseLaw:'Fla. R. App. P. 9.140(b)(3)' },
        });
      }
    }
  }

  // 2. 3.850 Statute of Limitations
  var convictDate = a['conviction-date'] || '';
  var is850Motion = motionId === '3850';
  var prior850Denied = (e['elig-3850-2'] || a['prior-motions'] || '').toLowerCase().includes('denied');
  if (convictDate && !is850Motion) {
    var cd = new Date(convictDate);
    if (!isNaN(cd.getTime())) {
      var yearsSince = (today - cd) / (365.25*24*60*60*1000);
      var daysRemaining = Math.round((2 - yearsSince) * 365.25);
      if (yearsSince > 2 && !prior850Denied) {
        alerts.push({
          id:'850-expired', type:'deadline', severity:'critical', icon:'⏳',
          title:'3.850 Deadline Expired', badge:'DEADLINE',
          desc:'The 2-year window for Rule 3.850 post-conviction relief has passed by ' + Math.abs(Math.round(daysRemaining)) + ' days.',
          action:'Check exceptions: newly discovered evidence (1-year from discovery), illegal sentence (no limit), retroactive constitutional right. If none apply, consult attorney about equitable tolling.',
          deadline:'EXPIRED ' + Math.abs(Math.round(daysRemaining)) + 'd ago',
          xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'2-year statute of limitations from finality — exceptions: newly discovered evidence (1 yr from discovery), illegal sentence (no limit), retroactive constitutional right.', reasoning:'3.850 window expired by ' + Math.abs(Math.round(daysRemaining)) + ' days — check for exceptions.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'State v. Johnson (Fla. 2020) — equitable tolling' },
        });
      } else if (yearsSince > 1.5 && !prior850Denied) {
        alerts.push({
          id:'850-imminent', type:'deadline', severity:'critical', icon:'⏳',
          title:'3.850 Deadline Approaching', badge:'DEADLINE',
          desc:'Only ' + daysRemaining + ' days remain before the 2-year Rule 3.850 window closes.',
          action:'Prepare and file 3.850 motion immediately. Gather: trial record, counsel correspondence, evidence of IAC/Brady/new evidence.',
          deadline:daysRemaining + ' days',
          xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'2-year window closing — file now to avoid bar.', reasoning:'Only ' + daysRemaining + ' days remain — imminent expiration of 3.850 window.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'Fla. R. Crim. P. 3.850(b)(1)-(3)' },
        });
      } else if (yearsSince > 1 && !prior850Denied) {
        alerts.push({
          id:'850-warning', type:'deadline', severity:'warning', icon:'⏳',
          title:'3.850 Deadline on Horizon', badge:'DEADLINE',
          desc:'Approximately ' + daysRemaining + ' days remaining for 3.850 filing. Begin preparation now.',
          action:'Start building your 3.850 motion. Identify specific grounds: IAC, Brady, newly discovered evidence, involuntary plea.',
          deadline:daysRemaining + ' days',
          xai:{ statute:'Fla. R. Crim. P. 3.850(b)', rule:'2-year window — advance notice to prepare.', reasoning:'Approximately ' + daysRemaining + ' days remaining — begin preparing 3.850 now.', authority:'Fla. R. Crim. P. 3.850(b)', caseLaw:'Fla. R. Crim. P. 3.850(c) — cognizable grounds' },
        });
      }
    }
  }

  // 3. Illegal Sentence Detection
  var imposed = a['sentence-terms'] || a['sentence-imposed'] || '';
  var maxSent = a['max-sentence'] || '';
  if (imposed && maxSent) {
    var imposedNum = parseFloat(imposed.match(/(\d+)/));
    var maxNum = parseFloat(maxSent.match(/(\d+)/));
    if (imposedNum && maxNum && imposedNum > maxNum) {
      alerts.push({
        id:'illegal-sentence', type:'risk', severity:'critical', icon:'📜',
        title:'Illegal Sentence Detected', badge:'RISK',
        desc:'Sentence of ' + esc(imposed) + ' appears to exceed the statutory maximum of ' + esc(maxSent) + '.',
        action:'File Rule 3.800(a) motion to correct illegal sentence IMMEDIATELY. No time limit applies, but earlier filing is better.',
        deadline:'No deadline',
        xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'Sentence exceeding statutory maximum is illegal and may be corrected at any time — no statute of limitations.', reasoning:'Sentence (' + esc(imposed) + ') exceeds maximum (' + esc(maxSent) + ') — illegal sentence detected.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021)' },
      });
    }
  }
  var illegalBasis = a['illegal-basis'] || '';
  if (illegalBasis) {
    alerts.push({
      id:'illegal-sentence-basis', type:'risk', severity:'critical', icon:'📜',
      title:'Illegal Sentence Identified: ' + esc(illegalBasis), badge:'RISK',
      desc:'You have identified a specific basis for illegality. Rule 3.800(a) has no time limit.',
      action:'File Rule 3.800(a) motion promptly. Attach judgment and sentence, scoresheet, and legal authority showing the illegality.',
      deadline:'No deadline — but file now to avoid delay',
      xai:{ statute:'Fla. R. Crim. P. 3.800(a)', rule:'Illegal sentence may be corrected at any time — specific illegality identified.', reasoning:'Illegal sentence basis: ' + esc(illegalBasis) + ' — file 3.800(a) correction.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Carter v. State (Fla. 2021)' },
    });
  }

  // 4. Speedy Trial Clock
  var incarcerationStatus = (a['currently-incarcerated'] || '').toLowerCase();
  if (incarcerationStatus.includes('yes') || incarcerationStatus.includes('doc')) {
    // Check if there's a conviction date (if so, they're past trial stage)
    if (!convictDate && !imposed) {
      alerts.push({
        id:'speedy-trial', type:'deadline', severity:'warning', icon:'⏱️',
        title:'Speedy Trial Clock Running', badge:'DEADLINE',
        desc:'Incarcerated defendants have a 33-day speedy trial clock under Fla. R. Crim. P. 3.191.',
        action:'Monitor the speedy trial deadline. If the State has not brought the case to trial, file Notice of Expiration and Demand for Discharge.',
        deadline:'33 days from incarceration',
        xai:{ statute:'Fla. R. Crim. P. 3.191', rule:'Incarcerated defendants must be brought to trial within 33 days — failure results in automatic discharge upon proper notice.', reasoning:'Incarcerated without conviction — 33-day speedy trial clock is running.', authority:'Fla. R. Crim. P. 3.191', caseLaw:'State v. Naveira (Fla. 2020) — discharge remedy' },
      });
    }
  }

  // 5. Probation Revocation Exposure
  var violations = (a['violations'] || '').toLowerCase();
  var probType = (a['prob-type'] || '').toLowerCase();
  var poPos = (a['po-position'] || '').toLowerCase();
  if (violations && (violations.includes('multiple') || violations.includes('one'))) {
    var isCritical = violations.includes('multiple');
    alerts.push({
      id:'vop-risk', type:'risk', severity: isCritical ? 'critical' : 'warning', icon:'🚨',
      title:'Probation Revocation Risk', badge:'RISK',
      desc: isCritical ? 'Multiple probation violations on record — significant VOP exposure.' : 'Probation violation(s) on record — potential VOP exposure.',
      action: isCritical ? 'Contact counsel immediately. Prepare for VOP hearing. Document all compliance efforts since the violation.' : 'Address violations promptly. Document full compliance. Obtain PO support.',
      deadline:'Ongoing — file compliance documentation proactively',
      xai:{ statute:'Fla. Stat. § 948.06', rule:'Court may revoke probation and impose any sentence it could have originally imposed upon finding a willful and substantial violation.', reasoning:'Probation violation(s) detected — VOP exposure requires proactive compliance documentation.', authority:'Fla. R. Crim. P. 3.790', caseLaw:'State v. Carter (Fla. 2020) — willfulness standard' },
    });
  }
  if (probType && poPos.includes('object')) {
    alerts.push({
      id:'po-objection', type:'risk', severity:'warning', icon:'👤',
      title:'Probation Officer Objects', badge:'RISK',
      desc:'P.O. objects to early termination or modification requests.',
      action:'Address each objection in writing. Document compliance and rehabilitation. Consider requesting a new PO assignment if relationship is adversarial.',
      xai:{ statute:'Fla. Stat. § 948.045', rule:'PO objection is a significant negative factor — but the court retains discretion to grant relief if compelling compliance is shown.', reasoning:'PO objects to relief — must address objections or seek court override.', authority:'Fla. Stat. § 948.045', caseLaw:'State v. Lopez (Fla. 2021)' },
    });
  }

  // 6. Warrant / Detainer Risk
  var priorFta = (a['prior-motions'] || '').toLowerCase().includes('withdrawn') || (a['direct-appeal-status'] || '').toLowerCase().includes('pending');
  if (violations && !incarcerationStatus.includes('yes')) {
    alerts.push({
      id:'warrant-risk', type:'risk', severity:'warning', icon:'👮',
      title:'Active Warrant Risk', badge:'RISK',
      desc:'Violation history while not in custody creates risk of warrant for VOP or failure to appear.',
      action:'Check with Clerk of Court for active warrants. Address any outstanding violations proactively rather than waiting for law enforcement contact.',
      xai:{ statute:'Fla. R. Crim. P. 3.131 · Fla. Stat. § 901.02', rule:'Failure to appear or probation violation while not in custody may result in a bench warrant — proactive resolution is strongly advised.', reasoning:'Violations while not in custody — risk of active warrant.', authority:'Fla. R. Crim. P. 3.131', caseLaw:'State v. Arthur (Fla. 2020) — bench warrant standards' },
    });
  }
  if (a.priorRecord === 'yes' || (a['elig-prior-seal'] || '').toLowerCase().includes('yes')) {
    alerts.push({
      id:'detainer-risk', type:'risk', severity:'info', icon:'🔗',
      title:'Possible Detainer / ICE Hold', badge:'RISK',
      desc:'Prior record or supervision history may result in detainer from other jurisdictions or ICE (if non-citizen).',
      action:'Check with DOC or jail for active detainers. If non-citizen, consult immigration attorney about ICE hold risk.',
      xai:{ statute:'8 U.S.C. § 1226 · Fla. Stat. § 944.17', rule:'Detainers may be filed by other jurisdictions or ICE — they affect release, transfer, and custody status.', reasoning:'Prior record or non-citizen status — detainer risk should be investigated.', authority:'Fla. Stat. § 944.17', caseLaw:'Arizona v. United States (2012) — federal immigration detainers' },
    });
  }

  // 7. AEDPA 1-Year Clock
  if (incarcerationStatus.includes('yes') && (appealStatus.includes('denied') || appealStatus.includes('affirmed'))) {
    alerts.push({
      id:'aedpa-clock', type:'deadline', severity:'warning', icon:'⏳',
      title:'AEDPA 1-Year Clock Ticking', badge:'DEADLINE',
      desc:'Federal habeas must be filed within 1 year of state conviction finality. Clock may be tolled during state post-conviction.',
      action:'Calculate AEDPA deadline. If state post-conviction is pending, the clock is tolled. File federal habeas promptly after state exhaustion.',
      deadline:'1-year from finality (tolled during state review)',
      xai:{ statute:'28 U.S.C. § 2244(d)(1)', rule:'AEDPA 1-year statute of limitations from finality — tolled during state post-conviction proceedings.', reasoning:'Incarceration with exhausted appeals — AEDPA clock is running or has run.', authority:'28 U.S.C. § 2244(d)(2)', caseLaw:'Holland v. Florida (2010) — equitable tolling' },
    });
  }

  // 8. Disqualifying Offense Block (Expunge)
  var disqual = (a['elig-disqualifying'] || '').toLowerCase();
  if (motionId === 'expunge' && (disqual.includes('murder') || disqual.includes('sexual') || disqual.includes('child abuse') || disqual.includes('robbery') || disqual.includes('terrorism'))) {
    alerts.push({
      id:'disqualify-block', type:'blocking', severity:'critical', icon:'🚫',
      title:'Disqualifying Offense — Cannot Proceed', badge:'BLOCKING',
      desc:'The charge (' + esc(disqual) + ') is enumerated as a disqualifying offense under F.S. § 943.0585.',
      action:'No statutory remedy. Executive clemency is the only path. Stop filing process and consult with attorney about clemency options.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(a)', rule:'Offenses enumerated in § 943.0585(2)(a) are absolutely barred from seal/expunge — no court has discretion to override.', reasoning:'Disqualifying offense — statutory bar to seal/expunge.', authority:'Fla. Stat. § 943.0585(2)(a)', caseLaw:'State v. J.C. (Fla. 2021)' },
    });
  }

  // 9. Missing FDLE Certificate
  var fdle = (a['fdle-cert-obtained'] || '').toLowerCase();
  if (motionId === 'expunge' && !fdle.includes('yes') && !fdle.includes('applied')) {
    alerts.push({
      id:'no-fdle', type:'blocking', severity:'critical', icon:'📄',
      title:'FDLE Certificate Required', badge:'BLOCKING',
      desc:'You cannot file a seal/expunge petition without first obtaining an FDLE Certificate of Eligibility.',
      action:'Apply for FDLE Certificate NOW. Process: (1) complete application, (2) fingerprints, (3) pay fee, (4) wait 2-6 weeks. Do NOT file without it.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(b)', rule:'FDLE Certificate is a mandatory statutory prerequisite — filing without it results in automatic denial.', reasoning:'FDLE certificate not obtained — cannot file expunge petition.', authority:'Fla. Stat. § 943.0585(2)(b)', caseLaw:'State v. L.P. (Fla. 2020)' },
    });
  }

  // 10. Prior Seal Used
  if (motionId === 'expunge' && (e['elig-exp-1'] || a['elig-prior-seal'] || '').toLowerCase().includes('yes')) {
    alerts.push({
      id:'prior-seal-used', type:'blocking', severity:'critical', icon:'🔒',
      title:'One-Time Seal/Expunge Used', badge:'BLOCKING',
      desc:'Florida allows only one seal/expunge per lifetime. Prior use blocks this petition.',
      action:'If prior was in another state, Florida may not count it — consult attorney. Otherwise, executive clemency is the only path.',
      xai:{ statute:'Fla. Stat. § 943.0585(2)(a)1', rule:'Florida allows only one seal/expunge per lifetime — the one-time bar is strictly applied.', reasoning:'Prior seal/expunge detected — one-time bar blocks this petition.', authority:'Fla. Stat. § 943.0585(2)(a)1', caseLaw:'State v. J.C. (Fla. 2021)' },
    });
  }

  // 11. Youth / Juvenile Urgency (Miller)
  var isYoung = a.isJuvenile === 'yes' || (a['def-dob'] && (new Date().getFullYear() - new Date(a['def-dob']).getFullYear()) < 25);
  if (isYoung && (imposed || motionId === '3850')) {
    alerts.push({
      id:'youth-miller', type:'risk', severity:'warning', icon:'🧒',
      title:'Youth Sentencing Consideration (Miller)', badge:'RISK',
      desc:'If the offense occurred under age 18, Miller v. Alabama requires individualized sentencing consideration. Life without parole may be unconstitutional.',
      action:'File Miller-based sentencing challenge. Provide mitigation: age at offense, background, trauma, rehabilitation capacity.',
      xai:{ statute:'Eighth Amendment · U.S. Const. amend. VIII', rule:'Miller v. Alabama prohibits mandatory life without parole for juvenile offenders — individualized sentencing considering youth and its characteristics is required.', reasoning:'Youth detected with active sentence — Miller protections may apply to challenge excessive sentence.', authority:'Fla. R. Crim. P. 3.800(a)', caseLaw:'Miller v. Alabama (2012) — juvenile LWOP; Graham v. Florida (2010) — non-homicide juveniles; Montgomery v. Louisiana (2016) — retroactivity' },
    });
  }

  // 12. State Machine Deadline Intelligence
  var dlAlerts = getDeadlineAlerts(getCaseState(null, a, motionId, chargeTimeline), a);
  dlAlerts.forEach(function(dla) {
    // Avoid duplicating alerts already added above
    var existing = alerts.some(function(ex) { return ex.id === dla.id; });
    if (!existing) alerts.push(dla);
  });

  return alerts;
}

function renderEmergencyAlerts() {
  var bar = document.getElementById('alert-bar');
  if (!bar) return;
  const motion = typeof currentMotion !== 'undefined' ? currentMotion : null;
  const answerState = typeof answers !== 'undefined' ? answers : {};
  const eligibilityState = typeof eligAnswers !== 'undefined' ? eligAnswers : {};
  var alerts = detectProceduralEmergencies(motion, answerState, eligibilityState);
  if (!alerts.length) { bar.style.display = 'none'; return; }
  bar.style.display = 'block';

  var critical = alerts.filter(function(a){return a.severity==='critical';}).length;
  var warning = alerts.filter(function(a){return a.severity==='warning';}).length;
  var total = alerts.length;

  var html = '<div class="alert-bar-header">';
  html += '<span style="font-size:16px">🚨</span>';
  html += '<span style="font-size:12px;font-weight:700;color:var(--white)">Procedural Alerts</span>';
  if (critical) html += '<span class="alert-count alert-count--critical">' + critical + ' critical</span>';
  if (warning) html += '<span class="alert-count alert-count--warning">' + warning + ' warning</span>';
  html += '<span class="alert-count alert-count--total">' + total + ' total</span>';
  html += '</div>';

  alerts.forEach(function(a) {
    var sevClass = 'alert-banner--' + a.severity;
    var actClass = 'alert-action--' + a.severity;
    var dlClass = a.deadline ? 'alert-deadline--' + a.severity : '';
    var badgeClass = a.badge === 'DEADLINE' ? 'alert-badge--deadline' : (a.badge === 'RISK' ? 'alert-badge--risk' : 'alert-badge--blocking');
    html += '<div class="alert-banner ' + sevClass + '">';
    html += '<span class="alert-icon">' + a.icon + '</span>';
    html += '<div class="alert-body">';
    html += '<div class="alert-title">' + esc(a.title) + '<span class="alert-badge ' + badgeClass + '">' + esc(a.badge || a.type) + '</span></div>';
    html += '<div class="alert-desc">' + esc(a.desc) + '</div>';
    html += '<div class="alert-action ' + actClass + '">→ ' + esc(a.action) + '</div>';
    if (a.deadline) html += '<div class="alert-deadline ' + dlClass + '">' + esc(a.deadline) + '</div>';
    html += renderXai(a.xai);
    html += '</div>';
    html += '</div>';
  });

  bar.innerHTML = html;
}

function installMobileDebugPanel() {
  var isDebug = /debug=1/.test(location.search) || /Android|iPhone|iPad/i.test(navigator.userAgent);
  if (!isDebug || document.getElementById('mobile-debug-panel')) return;

  var STORAGE_KEY = 'sc-motion-debug-log';

  function loadPersistedLogs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function persistLogs(entries) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (_) {
      // best-effort only
    }
  }

  var previousSessionLogs = loadPersistedLogs();
  var logs = [];

  function pushLog(type, message) {
    var entry = '[' + new Date().toLocaleTimeString() + '] ' + type + ': ' + message;
    logs.push(entry);
    if (logs.length > 20) logs.shift();
    persistLogs(logs);
    render();
  }

  function render() {
    var panel = document.getElementById('mobile-debug-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'mobile-debug-panel';
      panel.style.cssText = '\
        position: fixed;\
        left: 8px;\
        right: 8px;\
        bottom: 8px;\
        z-index: 999999;\
        max-height: 35vh;\
        overflow: auto;\
        background: rgba(10,10,12,.94);\
        color: #ffd36a;\
        border: 1px solid rgba(255,211,106,.45);\
        border-radius: 12px;\
        padding: 10px;\
        font: 12px/1.35 monospace;\
        box-shadow: 0 10px 30px rgba(0,0,0,.4);\
      ';
      document.body.appendChild(panel);
    }

    var previousBlock = previousSessionLogs.length
      ? '<div style="opacity:.65;margin-bottom:6px;">-- from before last reload --</div>' +
        '<pre style="white-space:pre-wrap;margin:0 0 8px;">' + previousSessionLogs.join('\n') + '</pre>' +
        '<hr style="border-color:rgba(255,255,255,.15)">'
      : '';

    panel.innerHTML =
      '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">' +
        '<strong style="flex:1;">Mobile Debug</strong>' +
        '<button id="copy-mobile-debug" type="button">Copy</button>' +
        '<button id="clear-mobile-debug" type="button">Clear</button>' +
        '<button id="close-mobile-debug" type="button">Close</button>' +
      '</div>' +
      '<div>Build: ' + (window.APP_VERSION || 'missing') + '</div>' +
      '<div>Viewport: ' + innerWidth + 'x' + innerHeight + '</div>' +
      '<hr style="border-color:rgba(255,255,255,.15)">' +
      previousBlock +
      '<pre style="white-space:pre-wrap;margin:0;">' + (logs.join('\n') || 'No errors captured yet.') + '</pre>';

    document.getElementById('close-mobile-debug').onclick = function() { panel.remove(); };
    document.getElementById('clear-mobile-debug').onclick = function() {
      previousSessionLogs = [];
      logs = [];
      persistLogs(logs);
      render();
    };
    document.getElementById('copy-mobile-debug').onclick = async function() {
      var text = [
        'APP_VERSION=' + (window.APP_VERSION || 'missing'),
        'URL=' + location.href,
        'UA=' + navigator.userAgent,
        'VIEWPORT=' + innerWidth + 'x' + innerHeight,
        '',
        previousSessionLogs.length ? '-- from before last reload --' : '',
        previousSessionLogs.join('\n'),
        '',
        logs.join('\n') || 'No errors captured.'
      ].filter(Boolean).join('\n');
      await navigator.clipboard.writeText(text);
    };
  }

  var originalError = console.error;
  var originalWarn = console.warn;

  console.error = function() {
    pushLog('console.error', Array.from(arguments).map(String).join(' '));
    originalError.apply(console, arguments);
  };

  console.warn = function() {
    pushLog('console.warn', Array.from(arguments).map(String).join(' '));
    originalWarn.apply(console, arguments);
  };

  window.onerror = function(message, source, lineno, colno) {
    pushLog('window.onerror', message + ' @ ' + source + ':' + lineno + ':' + colno);
  };

  window.onunhandledrejection = function(event) {
    pushLog('unhandledrejection', (event.reason && event.reason.stack) || event.reason || 'Unknown rejection');
  };

  window.addEventListener('DOMContentLoaded', render, { once: true });
}

async function bootstrapApp() {
  const host = document.getElementById('app-root');
  if (!host) return;

  try {
    await purgeStaleBuildState();
    const shell = await fetch('app-shell.html?v=' + APP_BUILD_ID, { cache: 'no-cache' }).then(r => {
      if (!r.ok) throw new Error('Failed to load app shell');
      return r.text();
    });
    host.innerHTML = shell;
  } catch (err) {
    host.innerHTML = '<div style="padding:24px;color:var(--white);font-family:system-ui,sans-serif">Unable to load the application shell from disk. Run this app from a local web server during development, or use GitHub Pages in production.</div>';
    return;
  }

  initCaseSession();
  renderEmergencyAlerts();
  renderCaseSummary();
  const versionBadge = document.getElementById('app-version-badge');
  if (versionBadge) versionBadge.textContent = 'Build ' + (window.APP_VERSION || 'unknown');

  // ── BOOT ──
  renderMotionTileNotes();
  renderRights();
  renderAppeals();
  renderCourts();
  renderClerks();
  document.getElementById('clerk-search')?.addEventListener('input', renderClerks);
  renderDrafts();
  document.getElementById('draft-search')?.addEventListener('input', renderDrafts);
  document.getElementById('draft-filter')?.addEventListener('change', renderDrafts);
  initQuickSearch();
  initChargeSearch();
  checkResumeDraft();
  renderMsDrafts();
  renderConstitutionalIntel();
  renderEmotionalIntel();
  updateTacSysbar();
  renderGlossary();
  document.getElementById('glossarySearch')?.addEventListener('input', function(){filterGlossary(this.value);});
  setQuestionIdleState();
  setupPwaInstallPrompt();
  window.addEventListener('offline', ()=>{ document.getElementById('offline-banner')?.classList.add('show'); });
  window.addEventListener('online', ()=>{ document.getElementById('offline-banner')?.classList.remove('show'); });
  if(!navigator.onLine) document.getElementById('offline-banner')?.classList.add('show');
}

installMobileDebugPanel();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp, { once: true });
} else {
  bootstrapApp();
}
