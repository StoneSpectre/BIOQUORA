-- ============================================================
-- MEDINEX — Step 7: Collaboration Layer
-- Migration: 001_step7_collaboration.sql
-- ============================================================

-- Project Members (roles: owner / editor / viewer)
CREATE TABLE IF NOT EXISTS project_members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
    role        VARCHAR(20) NOT NULL
                    CHECK (role IN ('owner', 'editor', 'viewer')),
    invited_by  UUID REFERENCES users(id),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (project_id, user_id)
);

CREATE INDEX idx_project_members_project ON project_members(project_id);
CREATE INDEX idx_project_members_user    ON project_members(user_id);

-- ----------------------------------------------------------------
-- Paper Assignments
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS paper_assignments (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id     UUID NOT NULL REFERENCES saved_papers(id) ON DELETE CASCADE,
    assigned_to  UUID NOT NULL REFERENCES users(id),
    assigned_by  UUID NOT NULL REFERENCES users(id),
    status       VARCHAR(20) NOT NULL DEFAULT 'assigned'
                     CHECK (status IN ('assigned', 'in_progress', 'reviewed', 'done')),
    note         TEXT,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_paper_assignments_paper   ON paper_assignments(paper_id);
CREATE INDEX idx_paper_assignments_user    ON paper_assignments(assigned_to);

-- ----------------------------------------------------------------
-- Comments  (threaded: parent_comment_id for replies)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comments (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id        UUID REFERENCES projects(id)          ON DELETE CASCADE,
    paper_id          UUID REFERENCES saved_papers(id)      ON DELETE CASCADE,
    note_id           UUID REFERENCES notes(id)             ON DELETE CASCADE,
    user_id           UUID NOT NULL REFERENCES users(id),
    parent_comment_id UUID REFERENCES comments(id)          ON DELETE CASCADE,
    content           TEXT NOT NULL,
    edited_at         TIMESTAMP WITH TIME ZONE,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- at least one target must be set
    CONSTRAINT comments_has_target CHECK (
        project_id IS NOT NULL OR paper_id IS NOT NULL OR note_id IS NOT NULL
    )
);

CREATE INDEX idx_comments_project ON comments(project_id);
CREATE INDEX idx_comments_paper   ON comments(paper_id);
CREATE INDEX idx_comments_note    ON comments(note_id);
CREATE INDEX idx_comments_parent  ON comments(parent_comment_id);

-- ----------------------------------------------------------------
-- Activity Events  (audit log + activity feed)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id     UUID REFERENCES users(id),
    event_type  VARCHAR(50) NOT NULL,   -- e.g. 'paper_saved', 'comment_added'
    target_type VARCHAR(50),            -- e.g. 'paper', 'note', 'comment'
    target_id   UUID,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_project    ON activity_events(project_id);
CREATE INDEX idx_activity_user       ON activity_events(user_id);
CREATE INDEX idx_activity_event_type ON activity_events(event_type);
CREATE INDEX idx_activity_created_at ON activity_events(created_at DESC);

-- ----------------------------------------------------------------
-- Invitation Tokens  (email-based invite flow)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_invitations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    email       VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL DEFAULT 'viewer'
                    CHECK (role IN ('editor', 'viewer')),
    token       VARCHAR(64)  NOT NULL UNIQUE,
    invited_by  UUID NOT NULL REFERENCES users(id),
    accepted_at TIMESTAMP WITH TIME ZONE,
    expires_at  TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invitations_token   ON project_invitations(token);
CREATE INDEX idx_invitations_project ON project_invitations(project_id);
CREATE INDEX idx_invitations_email   ON project_invitations(email);
