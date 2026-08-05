-- BIOQUORA STEP 6, STAGE 19: BioFuture (Future Biomedical Intelligence Platform)
-- Defines the schema for Strategic Foresight, Scenarios, and Roadmaps.

CREATE TABLE forecasting_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic VARCHAR(255),
    time_horizon INT, -- Years into the future
    confidence_score FLOAT,
    evidence_sources JSONB,
    forecast_data JSONB
);

CREATE TABLE scenario_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_name VARCHAR(255),
    type VARCHAR(100), -- 'Optimistic', 'Conservative', 'Disruptive'
    assumptions JSONB,
    predicted_outcomes JSONB
);

CREATE TABLE roadmap_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    title VARCHAR(255),
    milestones JSONB,
    target_year INT
);

CREATE TABLE observatory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    technology_domain VARCHAR(255),
    maturity_level VARCHAR(100),
    growth_velocity FLOAT,
    key_breakthroughs JSONB
);

CREATE TABLE trend_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_name VARCHAR(255),
    signal_strength FLOAT,
    supporting_publications JSONB,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opportunity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_name VARCHAR(255),
    cross_disciplinary_fields JSONB,
    potential_impact FLOAT,
    status VARCHAR(50)
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(100), -- 'Institution', 'Country'
    metrics JSONB,
    global_rank INT
);

CREATE TABLE mission_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_title VARCHAR(255),
    grand_challenge VARCHAR(255),
    participating_federations JSONB,
    status VARCHAR(50)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    strategic_approvals JSONB,
    audit_trail JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    forecast_accuracy FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE future_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_score FLOAT,
    components JSONB,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE readiness_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    workforce_readiness FLOAT,
    ai_readiness FLOAT,
    infrastructure_maturity FLOAT
);

CREATE TABLE technology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tech_name VARCHAR(255),
    category VARCHAR(100),
    adoption_curve JSONB
);

CREATE TABLE sustainability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    long_term_plan VARCHAR(255),
    resource_efficiency_score FLOAT,
    climate_impact_forecast JSONB
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    strategic_alignment_score FLOAT,
    shared_roadmaps JSONB
);

CREATE TABLE strategy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name VARCHAR(255),
    author_id UUID,
    decisions JSONB,
    status VARCHAR(50)
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_name VARCHAR(255),
    parameters JSONB,
    results JSONB,
    executed_at TIMESTAMP
);

CREATE TABLE policy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_domain VARCHAR(255),
    evidence_summaries JSONB,
    impact_forecasts JSONB
);

CREATE TABLE legacy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discovery_id UUID,
    evolution_timeline JSONB,
    societal_impact JSONB
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    performance_metrics JSONB,
    drift_score FLOAT
);
