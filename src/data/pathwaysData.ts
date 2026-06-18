export interface PathwayConcept {
  id: string;
  title: string;
  category: string;
  overview: string;
  mechanisms: string[];
  clinical: string[];
  investigations?: string[];
  treatment?: string[];
  pharmacology?: string[];
}

export const pathwaysData: Record<string, PathwayConcept> = {
  "heart-failure": {
    id: "heart-failure",
    title: "Heart Failure (HFrEF)",
    category: "Cardiovascular Pathology",
    overview: "Heart Failure with reduced Ejection Fraction (HFrEF) is a clinical syndrome characterized by the progressive decline in the heart's ability to contract effectively, leading to inadequate cardiac output to meet the body's metabolic demands. It represents a complex interplay of initial myocardial injury and subsequent maladaptive neurohormonal compensation.",
    mechanisms: [
      "Initial myocardial insult (e.g., ischemia, infarction, myopathy) reduces myocardial contractility.",
      "Down-shifting of the Frank-Starling curve: at any given preload, the stroke volume is significantly lower.",
      "Activation of the Sympathetic Nervous System (SNS) increases heart rate and contractility but leads to chronic beta-receptor down-regulation and direct myocyte toxicity.",
      "Activation of the Renin-Angiotensin-Aldosterone System (RAAS) causes severe fluid retention (increasing preload) and vasoconstriction (increasing afterload), exacerbating wall stress.",
      "Ventricular remodeling: eccentric hypertrophy, chamber dilation, and interstitial fibrosis worsen systolic function."
    ],
    clinical: [
      "Left-sided forward failure: fatigue, weakness, altered mental status due to low perfusion.",
      "Left-sided backward failure: pulmonary edema, dyspnea on exertion, orthopnea, paroxysmal nocturnal dyspnea (PND).",
      "Right-sided backward failure (cor pulmonale): jugular venous distension (JVD), hepatosplenomegaly, peripheral pitting edema."
    ],
    investigations: [
      "Echocardiography: The gold standard for diagnosis, demonstrating an Ejection Fraction (EF) ≤ 40%, ventricular dilation, and structural abnormalities.",
      "BNP or NT-proBNP: Markedly elevated due to ventricular stretch and wall tension. Highly sensitive for ruling out heart failure.",
      "Chest X-Ray: Cardiomegaly, prominent pulmonary vasculature, Kerley B lines, and pleural effusions.",
      "ECG: May show signs of prior myocardial infarction, left ventricular hypertrophy, or arrhythmias (e.g., atrial fibrillation)."
    ],
    treatment: [
      "Lifestyle Modifications: Sodium restriction (< 2g/day), fluid restriction in severe cases, daily weight monitoring, and cardiac rehabilitation.",
      "Device Therapy: Implantable Cardioverter-Defibrillator (ICD) for EF ≤ 35% to prevent sudden cardiac death. Cardiac Resynchronization Therapy (CRT) if QRS duration > 150ms.",
      "Advanced Therapies: Left Ventricular Assist Device (LVAD) as a bridge to transplant or destination therapy, or ultimately Heart Transplantation for end-stage refractory disease."
    ],
    pharmacology: [
      "ACE Inhibitors / ARBs / ARNIs (Sacubitril/Valsartan): Block RAAS, reduce afterload and preload, reverse remodeling. Proven mortality benefit.",
      "Beta-blockers (Carvedilol, Metoprolol succinate, Bisoprolol): Blunt sympathetic toxicity, upregulate beta-receptors, decrease myocardial oxygen demand.",
      "Mineralocorticoid Receptor Antagonists (Spironolactone): Block aldosterone-induced fibrosis and sodium retention.",
      "SGLT2 Inhibitors (Dapagliflozin, Empagliflozin): Osmotic diuresis, reduction in preload and afterload, improved myocardial energetics.",
      "Loop Diuretics (Furosemide): Symptomatic relief of congestion and edema (no mortality benefit)."
    ]
  },
  "hypertension": {
    id: "hypertension",
    title: "Essential Hypertension",
    category: "Cardiovascular Pathology",
    overview: "Essential (Primary) Hypertension is a chronic elevation of resting systemic arterial blood pressure without a single identifiable reversible cause. It is characterized by pathological changes in vascular tone, renal sodium handling, and vascular structure, leading to insidious end-organ damage over decades.",
    mechanisms: [
      "Chronic elevation of Systemic Vascular Resistance (SVR) driven by sympathetic overactivity and endothelial dysfunction (reduced Nitric Oxide bioavailability).",
      "Defective pressure natriuresis: the kidneys require a higher systemic pressure to excrete a given sodium load.",
      "Arteriosclerosis and hyaline arteriolosclerosis: chronic high pressure causes vessel walls to thicken, lose elasticity, and further increase resistance.",
      "Concentric left ventricular hypertrophy (LVH): the myocardium thickens inward to overcome the increased afterload (Laplace's Law), eventually leading to diastolic dysfunction (HFpEF)."
    ],
    clinical: [
      "Often termed the 'Silent Killer' as it is largely asymptomatic until end-organ damage occurs.",
      "Cardiac effects: LVH, angina, myocardial infarction, heart failure (HFpEF and HFrEF).",
      "Neurological effects: Ischemic stroke, intracerebral hemorrhage, hypertensive encephalopathy.",
      "Renal effects: Hypertensive nephrosclerosis leading to chronic kidney disease (CKD).",
      "Ophthalmic effects: Hypertensive retinopathy (AV nicking, cotton wool spots, flame hemorrhages)."
    ],
    investigations: [
      "Blood Pressure Monitoring: Repeated in-office measurements, ambulatory BP monitoring (ABPM), or home BP monitoring (HBPM) to rule out white-coat hypertension.",
      "Basic Metabolic Panel (BMP): Assess renal function (BUN, Creatinine) and electrolytes (Potassium, Sodium) to screen for secondary causes and establish baseline before therapy.",
      "Urinalysis & Urine Microalbumin/Creatinine Ratio: Screen for hypertensive nephrosclerosis and early renal damage.",
      "ECG: Screen for left ventricular hypertrophy (LVH) or prior silent ischemia.",
      "Lipid Panel & HbA1c: Assess for concomitant cardiovascular risk factors (metabolic syndrome)."
    ],
    treatment: [
      "Dietary Modifications: DASH diet (Dietary Approaches to Stop Hypertension), rich in fruits, vegetables, and low-fat dairy, with sodium restriction (< 1.5g/day).",
      "Weight Loss: Significant reduction in BP (approx. 1 mmHg per 1 kg of weight loss).",
      "Physical Activity: 150 minutes of moderate-intensity aerobic exercise per week.",
      "Moderation of Alcohol Intake and Smoking Cessation to reduce overall cardiovascular risk."
    ],
    pharmacology: [
      "Thiazide diuretics (Chlorthalidone, Hydrochlorothiazide): Initial sodium/water depletion followed by long-term vasodilation.",
      "Calcium Channel Blockers (Amlodipine): Block L-type calcium channels in vascular smooth muscle, causing profound vasodilation.",
      "ACE Inhibitors / ARBs (Lisinopril, Losartan): Decrease angiotensin II production/action, lowering SVR and preventing adverse cardiac/renal remodeling."
    ]
  },
  "aom": {
    id: "aom",
    title: "Acute Otitis Media (AOM)",
    category: "Otolaryngology",
    overview: "Acute Otitis Media is an acute inflammation and infection of the middle ear space, most commonly occurring in children due to their shorter, more horizontal Eustachian tubes. It frequently follows a viral upper respiratory tract infection.",
    mechanisms: [
      "Viral URI causes inflammation and mucosal edema of the nasopharynx and Eustachian tube.",
      "Eustachian tube dysfunction/obstruction leads to negative pressure in the middle ear space.",
      "Negative pressure transudates fluid into the middle ear (effusion).",
      "Nasopharyngeal bacteria (S. pneumoniae, H. influenzae, M. catarrhalis) ascend the tube, colonize the effusion, and trigger acute suppurative inflammation."
    ],
    clinical: [
      "Otalgia (ear pain), fever, irritability, and tugging at the ear (in infants).",
      "Otoscopy reveals a bulging, erythematous (red), and opaque tympanic membrane.",
      "Loss of the normal light reflex and decreased mobility of the tympanic membrane on pneumatic otoscopy.",
      "Potential for tympanic membrane rupture, presenting as sudden relief of pain followed by purulent otorrhea."
    ],
    investigations: [
      "Pneumatic Otoscopy: The gold standard for diagnosis; demonstrates impaired or absent mobility of the tympanic membrane.",
      "Tympanometry: Typically yields a Type B (flat) tympanogram, indicating fluid behind the eardrum.",
      "Audiometry: May show a mild to moderate conductive hearing loss.",
      "Tympanocentesis: Aspiration of middle ear fluid. Rarely performed in routine practice but is the gold standard for identifying the causative pathogen in highly refractory cases."
    ],
    treatment: [
      "Observation Strategy: 'Watchful waiting' for 48-72 hours without antibiotics is recommended for children >2 years with mild symptoms and unilateral disease.",
      "Surgical Intervention: Myringotomy with Tympanostomy tube placement is indicated for recurrent AOM (≥3 distinct episodes in 6 months, or ≥4 episodes in 1 year)."
    ],
    pharmacology: [
      "Analgesics (Acetaminophen, Ibuprofen) for pain control.",
      "High-dose Amoxicillin is the first-line antibiotic choice to overcome resistant S. pneumoniae.",
      "Amoxicillin-Clavulanate if there is no improvement after 48-72 hours, covering beta-lactamase producing H. influenzae."
    ]
  },
  "rhinitis": {
    id: "rhinitis",
    title: "Allergic Rhinitis",
    category: "Otolaryngology / Immunology",
    overview: "Allergic rhinitis is an IgE-mediated inflammatory disease of the nasal mucosa triggered by exposure to aeroallergens. It is part of the 'atopic triad' (alongside asthma and atopic dermatitis).",
    mechanisms: [
      "Sensitization phase: Allergen exposure leads to APC presentation, Th2 cell activation, and B cell class switching to produce specific IgE antibodies.",
      "Early-phase reaction (minutes): Allergen cross-links IgE on mast cells in the nasal mucosa, triggering massive degranulation of histamine, leukotrienes, and prostaglandins.",
      "Histamine stimulates H1 receptors, increasing vascular permeability (edema/congestion) and glandular secretion (rhinorrhea).",
      "Late-phase reaction (hours): Eosinophils and basophils infiltrate the mucosa, releasing major basic protein and leukotrienes, sustaining chronic congestion and hyperreactivity."
    ],
    clinical: [
      "Paroxysms of sneezing, severe nasal pruritus (itching), and clear rhinorrhea.",
      "Nasal congestion leading to mouth breathing and snoring.",
      "Physical exam findings: 'Allergic shiners' (infraorbital edema), 'Allergic salute' (transverse nasal crease), and pale, boggy nasal turbinates."
    ],
    investigations: [
      "Clinical Diagnosis: Often diagnosed based entirely on characteristic history and physical exam.",
      "Skin Prick Testing (SPT): Highly sensitive, immediate results to identify specific triggers for avoidance or immunotherapy.",
      "Serum Specific IgE (ImmunoCAP/RAST): Used when skin testing is contraindicated (e.g., severe eczema, unable to stop antihistamines).",
      "Nasal Endoscopy: Useful to rule out structural abnormalities, nasal polyps, or chronic rhinosinusitis."
    ],
    treatment: [
      "Environmental Control: Allergen avoidance measures such as HEPA filters, dust mite impermeable covers, and keeping windows closed during high pollen seasons.",
      "Allergen Immunotherapy (AIT): Subcutaneous (SCIT) or sublingual (SLIT) immunotherapy introduces escalating doses of the allergen to induce immune tolerance. It is the only disease-modifying treatment."
    ],
    pharmacology: [
      "Intranasal Corticosteroids (Fluticasone, Budesonide): Most effective maintenance therapy; suppresses broad inflammatory pathways including the late-phase response.",
      "Second-generation H1 Antihistamines (Cetirizine, Loratadine): Reduce itching, sneezing, and rhinorrhea (less effective for severe congestion).",
      "Intranasal Antihistamines (Azelastine): Provide rapid onset of symptom relief.",
      "Leukotriene Receptor Antagonists (Montelukast): Can be used as an adjunct, especially if comorbid asthma is present."
    ]
  },
  "t2dm": {
    id: "t2dm",
    title: "Type 2 Diabetes Mellitus",
    category: "Endocrinology",
    overview: "Type 2 Diabetes is a progressive metabolic disorder characterized by chronic hyperglycemia resulting from a combination of peripheral insulin resistance and inadequate compensatory insulin secretion by pancreatic beta cells.",
    mechanisms: [
      "Peripheral Insulin Resistance: Adipose, muscle, and hepatic tissues exhibit reduced responsiveness to insulin, often driven by visceral adiposity, free fatty acids, and inflammatory cytokines (adipokines).",
      "Hepatic Gluconeogenesis: The liver fails to suppress glucose production despite fasting, continuously dumping glucose into the bloodstream.",
      "Beta-Cell Dysfunction: Initially, beta cells hyper-secrete insulin to compensate. Over time, glucotoxicity, lipotoxicity, and amyloid deposition lead to beta-cell exhaustion and apoptosis.",
      "Incretin Defect: Diminished response to GLP-1, reducing the meal-dependent insulin spike."
    ],
    clinical: [
      "Polyuria (osmotic diuresis), polydipsia (thirst from hyperosmolarity), and polyphagia.",
      "Acanthosis nigricans (velvety hyperpigmentation in skin folds) as a cutaneous marker of insulin resistance.",
      "Microvascular complications over time: Diabetic retinopathy, nephropathy (albuminuria), and symmetric peripheral neuropathy.",
      "Macrovascular complications: Accelerated atherosclerosis leading to CAD, stroke, and peripheral arterial disease."
    ],
    investigations: [
      "Fasting Plasma Glucose (FPG): ≥ 126 mg/dL indicates diabetes.",
      "Hemoglobin A1c (HbA1c): ≥ 6.5% indicates diabetes. Also reflects average blood glucose over the past 3 months.",
      "2-Hour Oral Glucose Tolerance Test (OGTT): ≥ 200 mg/dL after a 75g glucose load.",
      "Urine Microalbumin/Creatinine Ratio: Annual screening for early diabetic nephropathy.",
      "Comprehensive Eye Exam: Annual screening for diabetic retinopathy."
    ],
    treatment: [
      "Medical Nutrition Therapy: Carbohydrate counting, low glycemic index foods, and caloric restriction.",
      "Weight Management: Significant weight loss (5-10%) can dramatically improve insulin sensitivity and even induce remission in early stages.",
      "Exercise: 150 minutes of moderate-intensity exercise per week enhances non-insulin-dependent glucose uptake into skeletal muscle.",
      "Bariatric Surgery: Considered for patients with BMI > 35 kg/m² with inadequate glycemic control."
    ],
    pharmacology: [
      "Biguanides (Metformin): First-line; decreases hepatic gluconeogenesis and improves peripheral insulin sensitivity. No hypoglycemia risk.",
      "GLP-1 Receptor Agonists (Semaglutide): Stimulate glucose-dependent insulin release, delay gastric emptying, and promote significant weight loss.",
      "SGLT2 Inhibitors (Empagliflozin): Inhibit glucose reabsorption in the proximal renal tubule; proven cardiovascular and renal protection.",
      "DPP-4 Inhibitors (Sitagliptin): Prevent breakdown of endogenous GLP-1.",
      "Exogenous Insulin: Required in advanced disease when beta-cell function fails entirely."
    ]
  },
  "hashimotos": {
    id: "hashimotos",
    title: "Hashimoto's Thyroiditis",
    category: "Endocrinology",
    overview: "Hashimoto's Thyroiditis (Chronic Autoimmune Thyroiditis) is the most common cause of hypothyroidism in iodine-sufficient regions. It involves cell-mediated and antibody-mediated immune destruction of the thyroid gland.",
    mechanisms: [
      "Breakdown of self-tolerance leads to the generation of autoreactive CD4+ Th1 cells specific to thyroid antigens.",
      "Cytotoxic CD8+ T cells infiltrate the gland, causing direct apoptotic death of thyroid follicular cells.",
      "B-cells produce anti-thyroid peroxidase (anti-TPO) and anti-thyroglobulin (anti-Tg) autoantibodies.",
      "The thyroid parenchyma is gradually replaced by dense lymphocytic infiltrates with germinal centers and fibrotic connective tissue.",
      "Resultant loss of functional thyroid follicles dramatically drops T3 and T4 synthesis, eliminating negative feedback and causing TSH to rise."
    ],
    clinical: [
      "Early phase: May present with transient hyperthyroidism (Hashitoxicosis) due to the release of pre-formed hormones from dying follicles.",
      "Late phase (Hypothyroidism): Fatigue, cold intolerance, weight gain, constipation, dry skin, and brittle hair.",
      "Physical exam: Painless, firm, symmetrically enlarged goiter (in early/mid stages), later becoming a small, atrophic gland.",
      "Myxedema: Accumulation of glycosaminoglycans causing non-pitting edema, facial puffiness, and macroglossia."
    ],
    investigations: [
      "Serum TSH: Universally elevated in overt primary hypothyroidism; the most sensitive screening test.",
      "Free T4: Decreased in overt hypothyroidism; may be normal in subclinical hypothyroidism.",
      "Autoantibodies: Positive Anti-TPO (Thyroid Peroxidase) antibodies (present in >90% of cases) and Anti-Tg (Thyroglobulin) antibodies.",
      "Ultrasound: Diffuse, heterogeneous, hypoechoic enlargement of the thyroid gland with coarse echotexture (though rarely necessary for diagnosis)."
    ],
    treatment: [
      "Routine Monitoring: Patients with subclinical hypothyroidism (elevated TSH, normal Free T4) may just be monitored unless symptomatic or pregnant.",
      "Dietary Considerations: Ensure adequate (but not excessive) dietary iodine. Excessive iodine can paradoxically worsen hypothyroidism (Wolff-Chaikoff effect).",
      "Surgical Intervention: Rarely indicated, unless a massively enlarged goiter causes compressive symptoms (dysphagia, stridor)."
    ],
    pharmacology: [
      "Levothyroxine (synthetic T4): Standard replacement therapy. Converted peripherally to active T3. Dosed to normalize TSH levels.",
      "Careful titration is required; overtreatment can lead to iatrogenic hyperthyroidism, accelerating osteoporosis and causing atrial fibrillation.",
      "Liothyronine (synthetic T3): Rarely used due to short half-life and risk of cardiac toxicity, but sometimes combined with T4 in refractory symptoms."
    ]
  },
  "cirrhosis": {
    id: "cirrhosis",
    title: "Liver Cirrhosis",
    category: "Hepatology",
    overview: "Cirrhosis represents the irreversible end-stage of chronic liver disease, characterized by diffuse bridging fibrosis and regenerative nodule formation, completely disrupting the normal hepatic architecture and vascular flow.",
    mechanisms: [
      "Chronic hepatocyte injury (from alcohol, viral hepatitis, or NASH) triggers chronic inflammation.",
      "Kupffer cells secrete TGF-beta, activating Hepatic Stellate Cells (Ito cells) in the Space of Disse.",
      "Activated Stellate cells transform into myofibroblasts, losing their vitamin A stores and wildly overproducing Type I and III collagen.",
      "Fibrosis compresses the central veins and sinusoids, dramatically increasing intrahepatic vascular resistance (Portal Hypertension).",
      "Loss of functional hepatocyte mass leads to failure of synthesis (albumin, clotting factors) and failure of detoxification (ammonia, bilirubin)."
    ],
    clinical: [
      "Signs of Portal Hypertension: Esophageal varices, ascites, caput medusae, splenomegaly (causing thrombocytopenia).",
      "Signs of Hepatic Insufficiency: Jaundice, scleral icterus, hepatic encephalopathy (asterixis, altered mental status).",
      "Hyperestrinism (due to failed hepatic breakdown of estrogen): Spider angiomata, palmar erythema, gynecomastia, testicular atrophy.",
      "Coagulopathy: Bleeding diathesis due to lack of factors II, VII, IX, X."
    ],
    investigations: [
      "Liver Function Tests: May show elevated AST/ALT (often AST > ALT in alcoholic etiology), elevated alkaline phosphatase, and elevated bilirubin.",
      "Synthetic Function Markers: Decreased serum albumin, prolonged PT/INR (due to lack of clotting factors).",
      "Complete Blood Count (CBC): Thrombocytopenia is an early and sensitive marker of portal hypertension (due to splenic sequestration).",
      "Ultrasound with Doppler: Evaluates liver morphology (nodular, shrunken), detects ascites, and assesses portal vein flow direction.",
      "FibroScan (Transient Elastography): Non-invasive measurement of liver stiffness to quantify fibrosis."
    ],
    treatment: [
      "Abstinence: Absolute cessation of alcohol or hepatotoxins.",
      "Dietary Modifications: Sodium restriction (< 2000 mg/day) for ascites. Avoidance of raw seafood (Vibrio vulnificus risk).",
      "Endoscopy (EGD): Routine screening for esophageal varices. Variceal band ligation for high-risk varices.",
      "Paracentesis: Therapeutic removal of ascitic fluid for symptomatic relief and diagnostic fluid analysis (ruling out Spontaneous Bacterial Peritonitis).",
      "TIPS Procedure: Transjugular Intrahepatic Portosystemic Shunt for refractory ascites or recurrent variceal bleeding.",
      "Liver Transplantation: The only definitive cure for end-stage liver disease."
    ],
    pharmacology: [
      "Non-selective Beta-blockers (Nadolol, Propranolol): Prevent variceal bleeding by splanchnic vasoconstriction.",
      "Spironolactone + Furosemide: Manage ascites by countering extreme secondary hyperaldosteronism.",
      "Lactulose and Rifaximin: Treat hepatic encephalopathy by acidifying the gut (trapping NH4+) and killing ammonia-producing gut bacteria."
    ]
  },
  "ra": {
    id: "ra",
    title: "Rheumatoid Arthritis",
    category: "Immunology / Rheumatology",
    overview: "Rheumatoid Arthritis (RA) is a chronic, systemic autoimmune inflammatory disease primarily targeting the synovial lining of diarthrodial joints. It is characterized by symmetric polyarthritis and progressive joint destruction.",
    mechanisms: [
      "Genetic susceptibility (HLA-DR4) and environmental triggers (smoking) lead to the citrullination of self-proteins.",
      "Loss of tolerance results in autoantibodies: Rheumatoid Factor (IgM anti-IgG Fc) and Anti-Citrullinated Protein Antibodies (ACPA).",
      "Immune complexes deposit in the joint, activating complement and recruiting massive numbers of macrophages and neutrophils.",
      "Macrophages secrete TNF-alpha and IL-6, driving intense synovial inflammation and angiogenesis.",
      "The inflamed synovium proliferates into a thick, destructive tissue mass called 'Pannus', which invades and destroys articular cartilage and subchondral bone via osteoclast activation (RANKL)."
    ],
    clinical: [
      "Symmetric, inflammatory polyarthritis, particularly affecting the MCP and PIP joints of the hands (sparing the DIP).",
      "Prolonged morning stiffness (usually > 1 hour) that improves with use throughout the day.",
      "Joint deformities: Ulnar deviation, Swan-neck deformity, Boutonnière deformity.",
      "Systemic manifestations: Rheumatoid nodules, interstitial lung disease, pericarditis, and an elevated risk of cardiovascular disease."
    ],
    investigations: [
      "Serology: Rheumatoid Factor (RF) is sensitive but less specific. Anti-CCP (ACPA) is highly specific for RA and correlates with severe disease.",
      "Inflammatory Markers: Elevated ESR and CRP correlate directly with disease activity.",
      "X-Rays of Hands/Feet: Look for classic early signs (periarticular osteopenia, soft tissue swelling) and late signs (marginal bony erosions, joint space narrowing).",
      "Ultrasound / MRI: Highly sensitive for detecting early synovitis and bone marrow edema before X-ray changes occur.",
      "Arthrocentesis: Synovial fluid shows inflammatory characteristics (WBCs 2,000 - 50,000/μL, predominantly neutrophils)."
    ],
    treatment: [
      "Physical and Occupational Therapy: Joint protection strategies, splinting to prevent deformities, and tailored exercise programs to maintain mobility.",
      "Cardiovascular Risk Reduction: Aggressive management of lipids, blood pressure, and smoking cessation, as RA patients have highly accelerated atherosclerosis.",
      "Surgical Intervention: Joint replacement (arthroplasty) or joint fusion (arthrodesis) for severely damaged joints."
    ],
    pharmacology: [
      "NSAIDs & Glucocorticoids: Provide rapid symptomatic relief and bridge therapy, but do not stop disease progression.",
      "Conventional DMARDs (Methotrexate): First-line foundation of therapy; a folate antagonist that halts immune cell proliferation.",
      "Biologic DMARDs: Used if inadequate response to MTX. Includes TNF-alpha inhibitors (Adalimumab, Etanercept), IL-6 inhibitors (Tocilizumab), or CD20 depleters (Rituximab).",
      "Targeted Synthetic DMARDs: JAK Inhibitors (Tofacitinib) which block intracellular cytokine signaling pathways."
    ]
  },
  "sepsis": {
    id: "sepsis",
    title: "Sepsis & Septic Shock",
    category: "Immunology / Critical Care",
    overview: "Sepsis is a life-threatening organ dysfunction caused by a dysregulated, hyperactive host immune response to an infection. Septic shock is a subset of sepsis with profound circulatory and cellular/metabolic abnormalities, carrying a high mortality rate.",
    mechanisms: [
      "Pathogen-Associated Molecular Patterns (PAMPs), such as LPS from Gram-negative bacteria, bind to Toll-Like Receptors (TLR-4) on macrophages.",
      "Macrophages release a massive 'cytokine storm' of TNF-alpha, IL-1, and IL-6 into the systemic circulation.",
      "Systemic Vasodilation: Cytokines induce endothelial expression of iNOS, generating massive amounts of Nitric Oxide, causing profound smooth muscle relaxation and plunging SVR.",
      "Endothelial Leak: Cytokines increase capillary permeability, leading to third-spacing of fluid and severe intravascular volume depletion.",
      "Microvascular Thrombosis: Inflammation triggers the coagulation cascade (DIC), leading to microthrombi that choke off capillary beds, causing ischemic multi-organ failure."
    ],
    clinical: [
      "Hemodynamic collapse: Hypotension refractory to fluid resuscitation (defining characteristic of shock), bounding peripheral pulses (warm shock early on).",
      "Tachycardia, tachypnea, and fever (or hypothermia).",
      "Organ failure signs: Oliguria (renal failure), altered mental status, elevated lactate (tissue hypoxia), and ARDS (respiratory failure)."
    ],
    investigations: [
      "Lactate: Elevated serum lactate (>2 mmol/L) is a critical marker of tissue hypoperfusion and anaerobic metabolism.",
      "Blood Cultures: At least two sets drawn BEFORE administering antibiotics to identify the causative organism.",
      "Procalcitonin (PCT) and CRP: Biomarkers of severe systemic bacterial inflammation.",
      "Complete Blood Count: Leukocytosis with a 'left shift' (immature band cells) or profound leukopenia.",
      "Coagulation Panel: PT/PTT, Fibrinogen, and D-dimer to assess for Disseminated Intravascular Coagulation (DIC)."
    ],
    treatment: [
      "The 'Hour-1 Bundle': Measure lactate, obtain blood cultures, administer broad-spectrum antibiotics, begin rapid 30 mL/kg crystalloid fluid bolus for hypotension, and apply vasopressors if fluids fail.",
      "Source Control: Urgent surgical intervention (e.g., draining an abscess, removing an infected catheter, bowel resection) is mandatory if a focal source is identified.",
      "Mechanical Ventilation: Often required to protect the airway and reduce the massive metabolic work of breathing.",
      "Glycemic Control: Maintaining blood glucose < 180 mg/dL using insulin protocols."
    ],
    pharmacology: [
      "Aggressive IV fluid resuscitation (crystalloids) to restore intravascular volume.",
      "Broad-spectrum IV antibiotics administered within the first hour of recognition.",
      "Vasopressors (Norepinephrine is first-line): Alpha-1 agonist to aggressively clamp down blood vessels, increasing SVR and restoring MAP > 65 mmHg.",
      "Inotropes (Dobutamine): Added if there is myocardial dysfunction (septic cardiomyopathy).",
      "Hydrocortisone: Used only in refractory shock to reverse relative adrenal insufficiency and upregulate vascular alpha-receptors."
    ]
  },
  "alzheimers": {
    id: "alzheimers",
    title: "Alzheimer's Disease",
    category: "Neurology",
    overview: "Alzheimer's Disease is the most common cause of progressive, irreversible neurodegenerative dementia. It is characterized by the insidious loss of memory, cognitive decline, and massive cerebral atrophy due to specific protein misfolding and aggregation.",
    mechanisms: [
      "Amyloid Cascade Hypothesis: Abnormal cleavage of Amyloid Precursor Protein (APP) by beta and gamma-secretases generates insoluble Amyloid-beta (Aβ) 42 peptides.",
      "Aβ peptides oligomerize and aggregate outside neurons, forming extracellular Senile Plaques. These plaques are highly toxic and trigger microglial inflammation.",
      "Tau Pathology: Intra-neuronal tau proteins, which normally stabilize microtubules, become hyperphosphorylated. They detach and clump together inside the neuron, forming Neurofibrillary Tangles (NFTs).",
      "Microtubule collapse and tangle formation physically choke the neuron, leading to apoptosis.",
      "Profound loss of cholinergic neurons in the Nucleus Basalis of Meynert disrupts memory circuits."
    ],
    clinical: [
      "Early stage: Anterograde amnesia (inability to form new memories), getting lost in familiar places, misplacing items.",
      "Middle stage: Language deficits (aphasia), impaired motor execution (apraxia), loss of recognition (agnosia), and wandering.",
      "Late stage: Severe global cognitive loss, loss of basic ADLs, dysphagia, bedbound state. Death usually occurs secondary to aspiration pneumonia."
    ],
    investigations: [
      "Neurocognitive Testing: Mini-Mental State Examination (MMSE) or Montreal Cognitive Assessment (MoCA) to quantify cognitive deficits.",
      "MRI Brain: Demonstrates generalized cortical atrophy, disproportionately severe in the medial temporal lobes and hippocampi, with ex-vacuo ventricular enlargement.",
      "PET Scan: Fluorodeoxyglucose (FDG) PET shows hypometabolism in temporoparietal regions. Amyloid-PET specifically visualizes amyloid plaque burden.",
      "CSF Analysis: Reveals low levels of Aβ42 (due to deposition in plaques) and high levels of phosphorylated Tau.",
      "Laboratory Screening: B12, TSH, RPR, and HIV to rule out reversible causes of dementia."
    ],
    treatment: [
      "Cognitive Stimulation Therapy: Engagement in meaningful activities and puzzles to maintain cognitive reserve.",
      "Environmental Structuring: Safe home environments, removal of fall hazards, and preventing wandering (e.g., door locks, GPS trackers).",
      "Caregiver Support: Respite care and support groups are critical, as caregiver burnout is exceptionally high."
    ],
    pharmacology: [
      "Acetylcholinesterase Inhibitors (Donepezil, Rivastigmine): Modestly improve cognitive symptoms temporarily by increasing synaptic acetylcholine. Do not halt disease progression.",
      "NMDA Receptor Antagonists (Memantine): Block excitotoxic damage from excessive glutamate.",
      "Monoclonal Antibodies (Lecanemab, Donanemab): Target and clear amyloid plaques. May modestly slow progression in early disease, but carry risk of ARIA (amyloid-related imaging abnormalities)."
    ]
  },
  "ms": {
    id: "ms",
    title: "Multiple Sclerosis",
    category: "Neurology",
    overview: "Multiple Sclerosis (MS) is an autoimmune demyelinating disease of the Central Nervous System (CNS). It is characterized by episodic neurologic deficits separated in time and space, primarily affecting young women.",
    mechanisms: [
      "Autoreactive T-cells (specifically Th1 and Th17) breach the Blood-Brain Barrier and target myelin basic protein.",
      "T-cells recruit macrophages and B-cells, generating a localized inflammatory plaque.",
      "Oligodendrocytes (which produce CNS myelin) are destroyed, stripping the myelin sheath off axons.",
      "Loss of myelin causes dramatic slowing or complete conduction block of saltatory action potentials.",
      "Over time, the exposed axons suffer irreversible degeneration, transitioning the disease from inflammatory to progressive neurodegenerative."
    ],
    clinical: [
      "Relapsing-Remitting MS (RRMS) is the most common phenotype, marked by acute attacks followed by partial or complete recovery.",
      "Optic Neuritis: Painful, monocular vision loss with an afferent pupillary defect.",
      "Internuclear Ophthalmoplegia (INO): Due to an MLF lesion. When looking left, the right eye fails to adduct, and the left eye exhibits nystagmus.",
      "Sensory disturbances (numbness, tingling), motor weakness, spasticity, and severe fatigue."
    ],
    investigations: [
      "MRI of Brain and Spinal Cord (with Gadolinium): The most sensitive test. Shows hyperintense demyelinating plaques in the periventricular (Dawson's fingers), juxtacortical, infratentorial, and spinal cord regions.",
      "Lumbar Puncture: CSF analysis shows Oligoclonal Bands (IgG) that are not present in the serum, indicating intrathecal antibody production.",
      "Visual Evoked Potentials (VEPs): Shows delayed conduction velocity in the optic nerve, highly suggestive of demyelination."
    ],
    treatment: [
      "Physical and Occupational Therapy: Essential to manage spasticity, maintain mobility, and adapt to neurological deficits.",
      "Vitamin D Supplementation: Low Vitamin D is strongly associated with an increased risk and worse severity of MS.",
      "Plasma Exchange (Plasmapheresis): Used for acute, severe relapses that fail to respond to high-dose corticosteroids."
    ],
    pharmacology: [
      "Acute flare management: High-dose IV Corticosteroids (Methylprednisolone) to rapidly shut down inflammation and speed recovery.",
      "Highly Effective Disease-Modifying Therapies (DMTs): Ocrelizumab (Anti-CD20, depletes B-cells), Natalizumab (Anti-alpha-4 integrin, blocks leukocyte entry into CNS).",
      "Symptomatic Management: Baclofen for spasticity, Amantadine for severe fatigue, Oxybutynin for neurogenic bladder."
    ]
  },
  "ckd": {
    id: "ckd",
    title: "Chronic Kidney Disease (CKD)",
    category: "Nephrology",
    overview: "Chronic Kidney Disease is the progressive, irreversible loss of renal function over months to years. It is most commonly driven by diabetic nephropathy and hypertensive nephrosclerosis.",
    mechanisms: [
      "Initial insult damages nephrons. The surviving nephrons undergo compensatory hypertrophy and hyperfiltration to maintain overall GFR.",
      "While temporarily helpful, high intraglomerular pressure causes shear stress on the podocytes.",
      "Podocyte detachment and glomerular basement membrane damage lead to proteinuria.",
      "Proteins in the tubular fluid trigger intense tubular inflammation and activation of interstitial fibroblasts.",
      "The final common pathway is progressive glomerulosclerosis and tubulointerstitial fibrosis, permanently destroying the architecture."
    ],
    clinical: [
      "Asymptomatic until GFR drops below 30 mL/min (Stage 4).",
      "Volume overload leading to edema and secondary hypertension.",
      "Electrolyte derangements: Hyperkalemia, hyperphosphatemia.",
      "Metabolic acidosis (inability to excrete daily acid load).",
      "Uremia (end-stage): Nausea, anorexia, pericarditis, asterixis, and uremic frost.",
      "Endocrinopathies: Anemia (loss of EPO production), Secondary Hyperparathyroidism and Renal Osteodystrophy."
    ],
    investigations: [
      "Estimated GFR (eGFR): Calculated using serum creatinine, age, and sex. Used to stage CKD (Stage 1 to 5).",
      "Urine Albumin/Creatinine Ratio (UACR): The earliest marker of diabetic nephropathy and a strong predictor of cardiovascular mortality.",
      "Renal Ultrasound: Typically shows small, echogenic (scarred) kidneys with loss of corticomedullary differentiation (except in early diabetes or polycystic kidney disease, where they may be enlarged).",
      "Metabolic Panel: Shows hyperkalemia, hyperphosphatemia, hypocalcemia, and metabolic acidosis (low bicarbonate).",
      "CBC: Normocytic, normochromic anemia due to EPO deficiency."
    ],
    treatment: [
      "Dietary Modifications: Protein restriction (in advanced non-dialysis CKD), sodium restriction (< 2g/day), and potassium/phosphorus restriction.",
      "Cardiovascular Risk Management: Aggressive blood pressure control and statin therapy.",
      "Renal Replacement Therapy (RRT): Indicated in Stage 5 (eGFR < 15) when uremic symptoms appear. Modalities include Hemodialysis, Peritoneal Dialysis, or Renal Transplantation (the optimal therapy)."
    ],
    pharmacology: [
      "ACE Inhibitors / ARBs: Critical to dilate the efferent arteriole, dropping intraglomerular pressure and halting the cycle of hyperfiltration and proteinuria.",
      "SGLT2 Inhibitors (Dapagliflozin): Profound renoprotection across multiple stages of CKD.",
      "Phosphate binders (Sevelamer) and active Vitamin D (Calcitriol) to manage bone-mineral disease and secondary hyperparathyroidism.",
      "Erythropoiesis-stimulating agents (EPO) combined with Iron supplementation to treat anemia."
    ]
  },
  "aki": {
    id: "aki",
    title: "Acute Kidney Injury (AKI)",
    category: "Nephrology",
    overview: "Acute Kidney Injury is a sudden, rapid decline in renal function occurring over hours to days, leading to an accumulation of nitrogenous waste products (azotemia) and inability to maintain fluid/electrolyte balance.",
    mechanisms: [
      "Prerenal AKI: Decreased renal perfusion (hypovolemia, heart failure). The kidney is intact and avidly reabsorbs sodium and urea to restore volume (BUN:Cr ratio > 20:1, FENa < 1%).",
      "Intrinsic AKI (e.g., Acute Tubular Necrosis): Direct ischemic or nephrotoxic damage to the highly metabolically active proximal tubule cells. Dead cells slough off into the lumen, forming obstructing 'muddy brown' granular casts.",
      "Postrenal AKI: Bilateral obstruction of urinary outflow (e.g., BPH, kidney stones), increasing retrograde hydrostatic pressure and halting glomerular filtration."
    ],
    clinical: [
      "Oliguria (< 400 mL/day) or anuria, though some AKI is non-oliguric.",
      "Rapidly rising serum Creatinine and BUN.",
      "Fluid retention manifesting as pulmonary edema or peripheral edema.",
      "Life-threatening hyperkalemia, presenting with peaked T waves and risk of ventricular fibrillation.",
      "Metabolic acidosis."
    ],
    investigations: [
      "Serum Creatinine & BUN: Rapid elevation. The BUN/Cr ratio helps differentiate Prerenal (>20:1) from Intrinsic (<15:1).",
      "Urinalysis & Urine Microscopy: Identifies casts. 'Muddy brown' granular casts indicate ATN. Red Blood Cell casts indicate Glomerulonephritis. White Blood Cell casts indicate Acute Interstitial Nephritis.",
      "Fractional Excretion of Sodium (FENa): < 1% implies Prerenal (kidney is saving sodium); > 2% implies Intrinsic ATN (tubules are dead and leaking sodium).",
      "Renal Ultrasound: Essential to rule out Postrenal obstruction (hydronephrosis)."
    ],
    treatment: [
      "Fluid Management: Aggressive IV crystalloid resuscitation for Prerenal AKI. Conversely, strict fluid restriction and diuretics if Intrinsic AKI presents with volume overload.",
      "Elimination of Nephrotoxins: Discontinue NSAIDs, ACEi/ARBs, Aminoglycosides, and avoid IV contrast.",
      "Urgent Decompression: Foley catheter or percutaneous nephrostomy tubes for Postrenal AKI.",
      "Renal Replacement Therapy (Dialysis): Emergent indications include Acidosis, Electrolyte derangements (refractory hyperkalemia), Intoxications, Overload (fluid), and Uremia (AEIOU)."
    ],
    pharmacology: [
      "Treatment depends strictly on the cause.",
      "Hyperkalemia management: Calcium Gluconate (stabilizes myocardium), Insulin + Dextrose (shifts K+ intracellularly), and Albuterol.",
      "Loop Diuretics (Furosemide): Used ONLY for volume overload, not to convert oliguric to non-oliguric AKI."
    ]
  },
  "pcos": {
    id: "pcos",
    title: "Polycystic Ovary Syndrome (PCOS)",
    category: "Endocrinology / Gynecology",
    overview: "PCOS is the most common endocrine disorder in women of reproductive age. It is characterized by hyperandrogenism, ovulatory dysfunction, and polycystic ovarian morphology, heavily intertwined with insulin resistance.",
    mechanisms: [
      "The exact etiology is a complex interaction of genetics and environment. A central feature is hyperinsulinemia due to profound peripheral insulin resistance.",
      "Insulin acts directly on the ovarian theca cells, synergizing with LH to massively increase androgen (testosterone/androstenedione) production.",
      "Insulin also suppresses hepatic production of Sex Hormone-Binding Globulin (SHBG), leaving more free, active testosterone in the blood.",
      "High intraovarian androgens arrest follicular development. Follicles never mature to the dominant stage, resulting in anovulation.",
      "Arrested follicles accumulate at the periphery of the ovary, appearing as a 'string of pearls' on ultrasound."
    ],
    clinical: [
      "Menstrual irregularities: Oligomenorrhea or secondary amenorrhea.",
      "Hyperandrogenism: Hirsutism (excess male-pattern hair growth), severe cystic acne, and androgenic alopecia.",
      "Metabolic features: Obesity, acanthosis nigricans, incredibly high risk of developing Type 2 Diabetes.",
      "Long-term risk: Unopposed estrogen (due to lack of ovulation and progesterone) significantly increases the risk of endometrial hyperplasia and carcinoma."
    ],
    investigations: [
      "Rotterdam Criteria: Diagnosis requires 2 of 3: Oligo/anovulation, Clinical/Biochemical Hyperandrogenism, Polycystic ovaries on ultrasound.",
      "Androgen Profile: Elevated Total and Free Testosterone. Elevated DHEA-S (rules out adrenal tumors).",
      "Pelvic Ultrasound: Shows ≥ 20 follicles per ovary or an ovarian volume > 10 mL ('String of Pearls' appearance).",
      "Metabolic Screening: 2-hour Oral Glucose Tolerance Test (OGTT), Fasting Lipid Panel, and HbA1c to screen for insulin resistance and metabolic syndrome.",
      "Hormonal Rule-Out Panel: TSH, Prolactin, and 17-hydroxyprogesterone (to rule out congenital adrenal hyperplasia)."
    ],
    treatment: [
      "Weight Loss and Lifestyle Modification: The absolute first-line intervention. Even a 5% weight loss can restore spontaneous ovulation and drastically improve insulin sensitivity.",
      "Hair Removal Therapies: Laser therapy or electrolysis for cosmetic management of hirsutism.",
      "Endometrial Protection: Cyclical progestin therapy (if not using OCPs) every 1-3 months to induce withdrawal bleeding and prevent endometrial hyperplasia."
    ],
    pharmacology: [
      "Combined Oral Contraceptives (COCs): First-line medical therapy. Estrogen increases SHBG (binding free testosterone), decreases LH, and protects the endometrium.",
      "Spironolactone: Androgen receptor antagonist used as an adjunct to treat hirsutism and acne.",
      "Metformin: Improves insulin resistance and can help restore ovulatory cycles.",
      "Clomiphene Citrate or Letrozole: First-line agents used specifically for ovulation induction in patients actively desiring pregnancy."
    ]
  },
  "endometriosis": {
    id: "endometriosis",
    title: "Endometriosis",
    category: "Gynecology",
    overview: "Endometriosis is an estrogen-dependent, chronic inflammatory condition characterized by the presence of endometrial-like tissue (glands and stroma) outside the uterine cavity, most commonly on the ovaries and pelvic peritoneum.",
    mechanisms: [
      "Pathogenesis theories include Retrograde Menstruation (Sampson's theory) where menstrual tissue flows backward through the fallopian tubes and implants on pelvic organs.",
      "These ectopic endometrial implants are highly responsive to the normal cyclic hormonal fluctuations of the menstrual cycle.",
      "During menstruation, the ectopic tissue also bleeds into the closed pelvic cavity.",
      "This cyclical bleeding triggers severe localized inflammation, macrophage infiltration, and ultimately dense, fibrotic adhesions.",
      "Ovarian implants can form large cysts filled with old, oxidized blood, known as Endometriomas or 'Chocolate Cysts'."
    ],
    clinical: [
      "The classic triad: Dysmenorrhea (severe, cyclical pelvic pain), Dyspareunia (deep pain with intercourse), and Infertility (due to anatomical distortion from adhesions or inflammatory hostility to sperm/embryos).",
      "Pain often begins days before menstruation and peaks during flow.",
      "Can cause dyschezia (pain with defecation) if implants are on the bowel."
    ],
    investigations: [
      "Transvaginal Ultrasound (TVUS): Excellent for detecting ovarian endometriomas ('chocolate cysts' showing homogenous ground-glass echoes) but very poor at detecting superficial peritoneal implants.",
      "Diagnostic Laparoscopy: The gold standard. Allows direct visualization of 'powder-burn' or 'gunmetal' lesions and thick fibrous adhesions.",
      "Histopathological Biopsy: Taken during laparoscopy; definitive diagnosis requires the presence of both endometrial glands and stroma.",
      "MRI Pelvis: Useful for mapping deep infiltrating endometriosis (e.g., rectovaginal septum) prior to complex surgery."
    ],
    treatment: [
      "Laparoscopic Surgery: Excision or ablation of endometriotic implants and lysis of adhesions. Excision is generally preferred for deep lesions. It is the only treatment that definitively improves fertility.",
      "Ovarian Cystectomy: Surgical removal of large endometriomas to preserve surrounding healthy ovarian tissue.",
      "Assisted Reproductive Technology (ART): IVF is often required for patients suffering from endometriosis-associated infertility that does not respond to surgery."
    ],
    pharmacology: [
      "NSAIDs: First-line for pain management targeting prostaglandin release.",
      "Continuous Combined Oral Contraceptives or Progestin-only pills: Suppress the HPO axis, stopping cyclical estrogen swings and inducing atrophy of the ectopic tissue.",
      "GnRH Agonists (Leuprolide) or Antagonists (Elagolix): Cause pituitary downregulation, creating a profound hypoestrogenic 'medical menopause' to starve the implants (limited use due to bone density loss).",
      "Aromatase Inhibitors: Used off-label in refractory cases to block peripheral and local estrogen production."
    ]
  },
  "copd": {
    id: "copd",
    title: "Chronic Obstructive Pulmonary Disease (COPD)",
    category: "Pulmonology",
    overview: "COPD is an inflammatory lung disease characterized by progressive, poorly reversible airflow limitation. It encompasses two major clinical phenotypes: Chronic Bronchitis and Emphysema, primarily caused by long-term inhalation of noxious particles (tobacco smoke).",
    mechanisms: [
      "Emphysema: Cigarette smoke recruits alveolar macrophages and neutrophils, which release proteases (elastase). Smoke also inactivates alpha-1 antitrypsin (the anti-elastase).",
      "The unrestrained elastase destroys the elastin framework of the alveolar walls, leading to permanent enlargement of airspaces and loss of elastic recoil. Airways collapse during exhalation.",
      "Chronic Bronchitis: Noxious stimuli cause severe hypertrophy and hyperplasia of mucus-secreting goblet cells in the bronchi.",
      "The resulting hypersecretion of thick mucus plugs the airways, leading to chronic obstruction and susceptibility to bacterial infections.",
      "Chronic hypoxia leads to hypoxic pulmonary vasoconstriction, driving pulmonary hypertension and eventual right heart failure (Cor Pulmonale)."
    ],
    clinical: [
      "Chronic, progressive dyspnea on exertion.",
      "'Pink Puffers' (Emphysema predominant): Barrel chest, pursed-lip breathing (to generate auto-PEEP and keep airways open), cachexia, thin appearance.",
      "'Blue Bloaters' (Bronchitis predominant): Chronic productive cough, cyanosis, peripheral edema from right heart failure."
    ],
    investigations: [
      "Spirometry (PFTs): The gold standard. Shows an obstructive pattern with a post-bronchodilator FEV1/FVC ratio < 0.70. Air trapping leads to increased Total Lung Capacity (TLC) and Residual Volume (RV).",
      "Chest X-Ray: Hyperinflated lungs, flattened diaphragms, increased retrosternal airspace, and a long, narrow heart shadow.",
      "Arterial Blood Gas (ABG): Used in severe disease to detect chronic respiratory acidosis (elevated CO2) and hypoxemia.",
      "Alpha-1 Antitrypsin Levels: Checked in all patients who present with early-onset emphysema (under 45 years) or without a smoking history."
    ],
    treatment: [
      "Smoking Cessation: The single most important intervention. It is the only measure that halts the accelerated decline in lung function.",
      "Pulmonary Rehabilitation: Supervised exercise training and education to improve exercise capacity and quality of life.",
      "Supplemental Oxygen Therapy: Proven to decrease mortality in patients with severe resting hypoxemia (PaO2 ≤ 55 mmHg or SaO2 ≤ 88%).",
      "Lung Volume Reduction Surgery (LVRS) or Lung Transplantation: Considered in end-stage, highly symptomatic emphysema."
    ],
    pharmacology: [
      "Short-Acting Bronchodilators (SABA/SAMA): Used as rescue inhalers for acute symptoms.",
      "Long-Acting Muscarinic Antagonists (LAMA - Tiotropium): Mainstay of maintenance therapy; reduces exacerbations by blocking vagal bronchoconstriction.",
      "Long-Acting Beta Agonists (LABA - Salmeterol): Synergistic with LAMAs to relax airway smooth muscle.",
      "Inhaled Corticosteroids (ICS): Reserved for severe disease with frequent exacerbations or eosinophilia (increases risk of pneumonia).",
      "Acute Exacerbations: Treated aggressively with Oral Corticosteroids, Antibiotics (Azithromycin/Doxycycline), and continuous nebulized bronchodilators."
    ]
  },
  "cardiorenal": {
    id: "cardiorenal",
    title: "Cardiorenal Syndrome",
    category: "Systemic Integration",
    overview: "Cardiorenal Syndrome (CRS) encompasses a spectrum of disorders involving the heart and kidneys whereby acute or chronic dysfunction in one organ induces acute or chronic dysfunction of the other. It highlights the profound interconnectedness of hemodynamics and volume regulation.",
    mechanisms: [
      "Type 1 CRS (Acute Cardiorenal): Acute heart failure (e.g., cardiogenic shock) leads to a sudden drop in cardiac output (forward failure) and a spike in central venous pressure (backward failure).",
      "The high central venous pressure (venous congestion) transmits backward to the renal veins. The kidney becomes physically engorged, severely restricting glomerular filtration (renal tamponade).",
      "Low forward flow causes renal ischemia. The kidney interprets this as absolute hypovolemia and maximally activates the RAAS and Sympathetic systems.",
      "RAAS activation forces sodium and water retention, profoundly worsening the heart's volume overload, creating a lethal positive feedback loop."
    ],
    clinical: [
      "Patient presents with decompensated heart failure (pulmonary edema, JVD) alongside rapidly rising creatinine and oliguria.",
      "Diuretic resistance is common because the engorged kidneys are under-perfused and cannot deliver the diuretic to the tubular lumen effectively.",
      "Delicate clinical balancing act: removing volume helps the heart but can theoretically worsen renal perfusion if done too aggressively."
    ],
    investigations: [
      "Basic Metabolic Panel: Shows rapidly climbing BUN and Creatinine, often with a disproportionately high BUN/Cr ratio indicating perceived hypovolemia.",
      "Urinalysis & FENa: Typically shows very low fractional excretion of sodium (<1%), as the kidney is desperately trying to retain volume.",
      "Echocardiogram: Demonstrates severe cardiac dysfunction (reduced EF, severe valvular regurgitation, or diastolic stiffness).",
      "Invasive Hemodynamic Monitoring (Swan-Ganz Catheter): May be required to directly measure Central Venous Pressure (CVP) and Cardiac Output to guide diuresis versus inotropy."
    ],
    treatment: [
      "Ultrafiltration (Aquapheresis): Mechanical, controlled removal of isotonic fluid using a machine. Used when pharmacological diuresis completely fails or causes severe electrolyte derangements.",
      "Renal Replacement Therapy (Dialysis): Required if the patient develops life-threatening hyperkalemia, profound acidemia, or profound uremia.",
      "Mechanical Circulatory Support: Intra-aortic balloon pump (IABP) or LVAD for refractory cardiogenic shock driving the renal failure."
    ],
    pharmacology: [
      "High-dose IV Loop Diuretics (Furosemide, Bumetanide): Given as boluses or continuous infusions to overcome diuretic resistance. Relieving venous congestion often paradoxically improves renal function.",
      "Sequential Nephron Blockade: Adding a thiazide diuretic (Metolazone) to a loop diuretic to completely block sodium reabsorption across multiple tubular segments.",
      "Inotropes (Dobutamine, Milrinone): Used to temporarily boost cardiac output, increasing forward flow to the kidneys and allowing diuretics to reach their target.",
      "Vasodilators (Nitroglycerin, Nitroprusside): Used cautiously to drop afterload and preload, provided the patient is not hypotensive."
    ]
  },
  "acid-base": {
    id: "acid-base",
    title: "Acid-Base Balance",
    category: "Systemic Integration",
    overview: "Acid-base balance represents the highly coordinated effort between the lungs (respiratory system) and the kidneys (metabolic system) to maintain blood pH within the narrow, critical range of 7.35 to 7.45, essential for enzyme function and cellular survival.",
    mechanisms: [
      "The primary buffering system in the blood is the Bicarbonate-Carbonic Acid buffer: CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3-.",
      "Lungs (Fast response, minutes to hours): Regulate CO2. Hypoventilation retains CO2 (respiratory acidosis). Hyperventilation blows off CO2 (respiratory alkalosis).",
      "Kidneys (Slow response, days): Regulate Bicarbonate (HCO3-) and excrete fixed acids. The proximal tubule reabsorbs filtered bicarb, while the intercalated cells of the collecting duct excrete H+ and generate new bicarb.",
      "Compensation: If a metabolic acidosis occurs (low HCO3-), the lungs rapidly hyperventilate (Kussmaul breathing) to drop CO2 and normalize pH."
    ],
    clinical: [
      "Metabolic Acidosis (low pH, low HCO3-): Evaluated using the Anion Gap (Na - (Cl + HCO3)). High AG indicates unmeasured acid accumulation (MUDPILES). Normal AG indicates bicarb loss (diarrhea).",
      "Metabolic Alkalosis (high pH, high HCO3-): Caused by H+ loss (severe vomiting) or volume depletion driving RAAS to inappropriately retain bicarb.",
      "Respiratory Acidosis (low pH, high CO2): Due to hypoventilation (opiate overdose, severe COPD, Guillain-Barre).",
      "Respiratory Alkalosis (high pH, low CO2): Due to hyperventilation (panic attack, high altitude, early salicylate toxicity)."
    ],
    investigations: [
      "Arterial Blood Gas (ABG): The gold standard. Directly measures pH, PaCO2, and calculated PaO2 to determine the primary derangement.",
      "Basic Metabolic Panel (BMP): Essential to measure serum bicarbonate (often reported as total CO2) and to calculate the Anion Gap.",
      "Urine Electrolytes and Urine Anion Gap: Helps differentiate the causes of a Normal Anion Gap Metabolic Acidosis (e.g., diarrhea vs. Renal Tubular Acidosis).",
      "Lactate & Ketones: Checked if there is a High Anion Gap Metabolic Acidosis to identify lactic acidosis or diabetic ketoacidosis."
    ],
    treatment: [
      "Always Treat the Underlying Cause: Acid-base derangements are symptoms, not diseases. E.g., Give insulin for DKA, restore volume for lactic acidosis, reverse opiates with naloxone for hypoventilation.",
      "Mechanical Ventilation: Used to strictly control CO2 levels in severe respiratory failure (Respiratory Acidosis) or to support the extreme work of breathing during compensatory hyperventilation.",
      "Dialysis: Used for severe, refractory acidosis, especially in the setting of acute kidney injury or toxic alcohol ingestions."
    ],
    pharmacology: [
      "Sodium Bicarbonate IV: Highly controversial. Reserved only for severe, life-threatening metabolic acidosis (pH < 7.1) or specific toxicities (Tricyclic Antidepressant overdose).",
      "Acetazolamide: Carbonic anhydrase inhibitor that forces renal bicarb excretion, useful for correcting severe metabolic alkalosis.",
      "IV Fluids (Normal Saline): Used to correct contraction metabolic alkalosis by restoring volume and turning off the RAAS system."
    ]
  },
  "glaucoma": {
    id: "glaucoma",
    title: "Primary Open-Angle Glaucoma",
    category: "Ophthalmology",
    overview: "Primary Open-Angle Glaucoma (POAG) is a progressive optic neuropathy characterized by the gradual death of retinal ganglion cells and their axons, typically associated with elevated intraocular pressure (IOP).",
    mechanisms: [
      "Aqueous humor is produced by the ciliary body and normally drains through the trabecular meshwork into the Canal of Schlemm.",
      "In POAG, the drainage angle remains structurally 'open', but there is increased resistance to flow at a microscopic level within the trabecular meshwork.",
      "The resulting accumulation of aqueous humor slowly raises the intraocular pressure (IOP).",
      "Elevated IOP mechanically compresses the optic nerve head (optic disc) and severely compromises its microvascular blood supply.",
      "This chronic ischemia triggers apoptosis of the retinal ganglion cells, leading to irreversible optic nerve cupping."
    ],
    clinical: [
      "Extremely insidious onset. Completely asymptomatic until late in the disease course.",
      "Loss of vision begins in the extreme periphery (tunnel vision) and slowly marches inward.",
      "Fundoscopic exam reveals 'cupping' of the optic disc: the cup-to-disc ratio becomes enlarged (e.g., > 0.6) as neural tissue is hollowed out."
    ],
    investigations: [
      "Tonometry: Measures Intraocular Pressure (IOP). Normal is 10-21 mmHg. Elevated IOP is the primary risk factor, though 'Normal Tension Glaucoma' also exists.",
      "Fundoscopy / Slit-Lamp Exam: Direct visualization of the optic nerve head to assess the Cup-to-Disc ratio, looking for neural rim thinning and disc hemorrhages.",
      "Optical Coherence Tomography (OCT): Highly sensitive imaging that quantifies structural loss by measuring Retinal Nerve Fiber Layer (RNFL) thickness.",
      "Visual Field Testing (Perimetry): Functional test to map out and quantify peripheral vision loss (scotomas).",
      "Gonioscopy: Uses a special mirrored lens to view the iridocorneal angle, confirming it is physically 'open' and ruling out Angle-Closure Glaucoma."
    ],
    treatment: [
      "Laser Therapy (Selective Laser Trabeculoplasty - SLT): Often used as first-line therapy today. Uses laser energy to stimulate biochemical remodeling of the trabecular meshwork, enhancing outflow.",
      "Surgical - Trabeculectomy: The traditional gold standard surgery. Creates a surgically formed fistula (bleb) under the conjunctiva to bypass the meshwork entirely.",
      "Surgical - Aqueous Shunts (Tube Shunts): Implantation of a tiny silicone tube to drain fluid to a reservoir plate placed far back on the eye.",
      "Minimally Invasive Glaucoma Surgery (MIGS): Insertion of microscopic stents (e.g., iStent) directly into the Canal of Schlemm to prop it open."
    ],
    pharmacology: [
      "Prostaglandin Analogs (Latanoprost, Bimatoprost): First-line medical therapy. Increase aqueous outflow through the alternative uveoscleral pathway. (Side effects: darkens iris color, lengthens eyelashes).",
      "Beta-blockers (Timolol): Decrease aqueous production by the ciliary epithelium. (Contraindicated in severe asthma/COPD).",
      "Alpha-2 Agonists (Brimonidine): Dual action—decrease production and increase outflow.",
      "Carbonic Anhydrase Inhibitors (Dorzolamide): Decrease aqueous production.",
      "Rho Kinase Inhibitors (Netarsudil): Increase trabecular outflow by relaxing the meshwork cytoskeleton."
    ]
  },
  "cataract": {
    id: "cataract",
    title: "Cataract",
    category: "Ophthalmology",
    overview: "A cataract is the progressive opacification (clouding) of the naturally transparent crystalline lens of the eye. It is the leading cause of reversible blindness worldwide, strongly associated with aging.",
    mechanisms: [
      "The crystalline lens lacks a blood supply and relies on a highly ordered arrangement of crystallin proteins to maintain absolute transparency.",
      "With age (and accelerated by smoking, UV light, diabetes, or steroids), the lens undergoes severe oxidative stress.",
      "Oxidation causes the crystallin proteins to denature, cross-link, and precipitate out of solution.",
      "These high-molecular-weight protein aggregates scatter light rays rather than focusing them on the retina.",
      "The lens gradually thickens, turns yellow-brown (nuclear sclerosis), and loses its accommodative flexibility."
    ],
    clinical: [
      "Painless, gradual blurring and dimming of vision.",
      "Severe glare and halos around lights at night (especially problematic for driving).",
      "Myopic shift: The thickening lens increases its refractive power, temporarily allowing older patients to read without glasses ('second sight').",
      "Loss of red reflex on ophthalmoscopy; the lens appears visibly cloudy or white in advanced stages."
    ],
    investigations: [
      "Comprehensive Eye Exam with Slit-Lamp Biomicroscopy: Allows direct, magnified visualization of the lens after pupillary dilation to classify the cataract type (Nuclear, Cortical, or Posterior Subcapsular).",
      "Visual Acuity Testing: Essential to quantify the functional impairment and justify surgical intervention.",
      "Ophthalmoscopy: To examine the retina and optic nerve to ensure the vision loss is solely due to the cataract and not concomitant macular degeneration or glaucoma.",
      "Biometry (A-Scan Ultrasound or Optical Coherence Biometry): Crucial pre-operative test to precisely measure the length of the eye and corneal curvature. This data calculates the exact power of the artificial Intraocular Lens (IOL) implant required."
    ],
    treatment: [
      "Surgical Extraction (Phacoemulsification): The definitive, gold-standard treatment. A tiny incision is made in the cornea, the anterior lens capsule is opened, and an ultrasonic probe shatters and vacuums out the cloudy lens.",
      "Intraocular Lens (IOL) Implantation: After the natural lens is removed, a foldable artificial plastic or silicone lens is injected into the empty capsular bag.",
      "Refractive Correction: IOLs can be monofocal (set for distance, requiring reading glasses), multifocal (allowing both distance and near vision), or toric (to correct astigmatism)."
    ],
    pharmacology: [
      "There is no pharmacological treatment capable of preventing, reversing, or clearing a cataract. Medical management is purely perioperative.",
      "Pre-operative: Mydriatic eye drops (Tropicamide, Phenylephrine) to maximize pupillary dilation for surgical access.",
      "Post-operative: Topical antibiotics (Fluoroquinolones) to prevent endophthalmitis, and topical Corticosteroids/NSAIDs to control surgical inflammation and prevent macular edema."
    ]
  }
};
