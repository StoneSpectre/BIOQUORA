-- ============================================================
-- MEDINEX — Step 8: Research Workflow Data Asset
-- Migration: 002_step8_research_events.sql
-- ============================================================

-- ----------------------------------------------------------------
-- Core Research Events  (the behavioral raw log — never delete rows)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS research_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id)    ON DELETE SET NULL,
    project_id  UUID REFERENCES projects(id) ON DELETE SET NULL,
    session_id  VARCHAR(64),                 -- browser session bucket
    event_type  VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id   UUID,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partition by month in production for scale
CREATE INDEX idx_re_user       ON research_events(user_id);
CREATE INDEX idx_re_project    ON research_events(project_id);
CREATE INDEX idx_re_event_type ON research_events(event_type);
CREATE INDEX idx_re_created_at ON research_events(created_at DESC);
CREATE INDEX idx_re_entity     ON research_events(entity_type, entity_id);
CREATE INDEX idx_re_session    ON research_events(session_id);

-- GIN index for JSONB metadata queries
CREATE INDEX idx_re_metadata   ON research_events USING GIN (metadata);

-- ----------------------------------------------------------------
-- Co-Save Graph  (paper ↔ paper relationship strength)
-- Powers: "users who saved A also saved B"
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS paper_co_saves (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id_a   UUID NOT NULL,   -- always the lower UUID lexically
    paper_id_b   UUID NOT NULL,   -- always the higher UUID lexically
    project_id   UUID REFERENCES projects(id) ON DELETE CASCADE,
    co_save_count INTEGER NOT NULL DEFAULT 1,
    last_seen_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (paper_id_a, paper_id_b, project_id),
    CONSTRAINT paper_co_saves_order CHECK (paper_id_a < paper_id_b)
);

CREATE INDEX idx_cosave_a ON paper_co_saves(paper_id_a);
CREATE INDEX idx_cosave_b ON paper_co_saves(paper_id_b);

-- ----------------------------------------------------------------
-- Aggregated Analytics Tables  (populated by nightly jobs)
-- ----------------------------------------------------------------

-- Popular topics
CREATE TABLE IF NOT EXISTS topic_analytics (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic         VARCHAR(255) NOT NULL,
    search_count  INTEGER NOT NULL DEFAULT 0,
    view_count    INTEGER NOT NULL DEFAULT 0,
    save_count    INTEGER NOT NULL DEFAULT 0,
    period_date   DATE NOT NULL,              -- the day this row covers
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (topic, period_date)
);

CREATE INDEX idx_topic_analytics_date  ON topic_analytics(period_date DESC);
CREATE INDEX idx_topic_analytics_topic ON topic_analytics(topic);

-- Popular papers
CREATE TABLE IF NOT EXISTS paper_analytics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pmid            VARCHAR(20)  NOT NULL,
    view_count      INTEGER NOT NULL DEFAULT 0,
    save_count      INTEGER NOT NULL DEFAULT 0,
    review_count    INTEGER NOT NULL DEFAULT 0,
    avg_time_on_paper_seconds INTEGER,
    period_date     DATE NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (pmid, period_date)
);

CREATE INDEX idx_paper_analytics_date ON paper_analytics(period_date DESC);
CREATE INDEX idx_paper_analytics_pmid ON paper_analytics(pmid);

-- Emerging / trending topics  (velocity-based)
CREATE TABLE IF NOT EXISTS trend_analytics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic           VARCHAR(255) NOT NULL,
    velocity_score  FLOAT NOT NULL DEFAULT 0,   -- (recent - baseline) / baseline
    baseline_count  INTEGER,
    recent_count    INTEGER,
    period_date     DATE NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (topic, period_date)
);

CREATE INDEX idx_trend_date  ON trend_analytics(period_date DESC);
CREATE INDEX idx_trend_score ON trend_analytics(velocity_score DESC);

-- ----------------------------------------------------------------
-- Nightly Job Audit
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_job_runs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_name     VARCHAR(100) NOT NULL,
    status       VARCHAR(20)  NOT NULL DEFAULT 'running'
                     CHECK (status IN ('running','success','failed')),
    rows_written INTEGER,
    error_msg    TEXT,
    started_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at  TIMESTAMP WITH TIME ZONE
);
