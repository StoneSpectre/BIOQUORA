// ── API types ────────────────────────────────────────────────────────────────

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface SHAPFeature {
  feature: string;
  display_name: string;
  value: number;
  shap_value: number;
  direction: 'up' | 'down';
  normal_range: string | null;
}

export interface PredictionResponse {
  module: string;
  risk_score: number;
  risk_level: RiskLevel;
  risk_percent: number;
  top_factors: SHAPFeature[];
  summary: string;
  anomalies: string[];
  model_version: string;
}

// ── Form field definitions (from /fields endpoints) ──────────────────────────

export interface SelectOption {
  value: number;
  label: string;
}

export interface FormField {
  key: string;
  label: string;
  type: 'number' | 'select';
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  normal?: string;
  tooltip?: string;
  options?: SelectOption[];
  showIf?: Record<string, number>;
}

export interface FieldsResponse {
  module: string;
  title: string;
  fields: FormField[];
}

// ── Module definitions ────────────────────────────────────────────────────────

export type ModuleId = 'hepatic' | 'diabetes' | 'thyroid' | 'respiratory';

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  description: string;
  icon: string;
  color: string;
  fieldsEndpoint: string;
  predictEndpoint: string;
}

// ── Feedback ──────────────────────────────────────────────────────────────────

export interface FeedbackPayload {
  module: string;
  prediction_id: string;
  agree: boolean;
  doctor_diagnosis?: string;
  notes?: string;
}

export interface FeedbackStats {
  total: number;
  by_module: Record<string, {
    total: number;
    agree: number;
    agreement_rate: number;
  }>;
}
