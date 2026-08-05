-- BIOQUORA STEP 6, STAGE 15: BioLearn (Biomedical Learning Ecosystem)
-- Defines the schema for Adaptive Learning, Courses, Virtual Labs, and Certifications.

CREATE TABLE learner_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    learning_style VARCHAR(50),
    current_level VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE course_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    instructor_id UUID,
    difficulty VARCHAR(50),
    is_published BOOLEAN DEFAULT FALSE
);

CREATE TABLE curriculum_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,
    modules JSONB,
    prerequisites JSONB
);

CREATE TABLE assessment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,
    title VARCHAR(255),
    questions JSONB,
    passing_score FLOAT
);

CREATE TABLE certification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    course_id UUID,
    issue_date TIMESTAMP,
    credential_hash VARCHAR(255)
);

CREATE TABLE competency_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    skill_name VARCHAR(100),
    mastery_level FLOAT, -- 0.0 to 1.0
    last_assessed TIMESTAMP
);

CREATE TABLE mentor_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID,
    expertise_areas JSONB,
    availability JSONB
);

CREATE TABLE portfolio_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    projects JSONB,
    completed_courses JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    course_id UUID,
    time_spent_seconds BIGINT,
    engagement_score FLOAT
);

CREATE TABLE tutor_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    session_logs JSONB,
    adaptive_recommendations JSONB
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    type VARCHAR(100), -- 'biolab_virtual', 'molecular_viewer'
    environment_config JSONB
);

CREATE TABLE community_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,
    learner_id UUID,
    post_content TEXT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_name VARCHAR(255),
    asset_type VARCHAR(50), -- 'course', 'simulation', 'flashcards'
    creator_id UUID,
    price_credits INT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    accreditation_rules JSONB
);

CREATE TABLE accessibility_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,
    compliance_score FLOAT,
    issues JSONB
);

CREATE TABLE repository_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    open_license VARCHAR(50),
    download_url VARCHAR(500)
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    shared_courses JSONB,
    api_endpoint VARCHAR(500)
);

CREATE TABLE recommendation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    recommended_courses JSONB,
    recommended_skills JSONB
);

CREATE TABLE career_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    target_role VARCHAR(100),
    missing_competencies JSONB
);

CREATE TABLE learning_history_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    event_type VARCHAR(50), -- 'watched_video', 'completed_lab', 'failed_quiz'
    event_data JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
