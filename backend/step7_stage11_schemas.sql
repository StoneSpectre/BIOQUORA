-- BIOQUORA STEP 7, STAGE 11: BioInference
-- Defines the schema for the distributed AI inference execution infrastructure.

CREATE TABLE inference_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID,
    assigned_model_id VARCHAR(100),
    status VARCHAR(50), -- 'Queued', 'Processing', 'Completed', 'Failed'
    latency_ms INT
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    version VARCHAR(50),
    hardware_requirements JSONB
);

CREATE TABLE deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    deployment_zone VARCHAR(100),
    replica_count INT
);

CREATE TABLE gpu_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100),
    gpu_type VARCHAR(100), -- 'A100', 'H100'
    vram_total_gb INT,
    vram_used_gb FLOAT
);

CREATE TABLE cpu_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100),
    core_count INT,
    cpu_utilization FLOAT
);

CREATE TABLE edge_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(100),
    location VARCHAR(100),
    supported_models JSONB
);

CREATE TABLE cloud_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider VARCHAR(50), -- 'AWS', 'GCP', 'Azure'
    region VARCHAR(50),
    active_instances INT
);

CREATE TABLE workload_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workload_type VARCHAR(50), -- 'Batch', 'Realtime', 'Streaming'
    priority_level INT,
    payload_size_bytes INT
);

CREATE TABLE routing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID,
    source_ip VARCHAR(50),
    destination_node VARCHAR(100),
    routing_reason VARCHAR(100)
);

CREATE TABLE optimization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    quantization_level VARCHAR(50), -- 'FP16', 'INT8'
    tensorrt_enabled BOOLEAN
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100),
    temperature_c FLOAT,
    power_draw_w FLOAT
);

CREATE TABLE latency_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    p50_latency_ms FLOAT,
    p99_latency_ms FLOAT
);

CREATE TABLE throughput_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    tokens_per_second FLOAT,
    requests_per_second FLOAT
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID,
    encryption_status VARCHAR(50),
    anomaly_detected BOOLEAN
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    approved_by UUID,
    compliance_tags JSONB
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID,
    user_id UUID,
    action_taken VARCHAR(100)
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    throughput_score FLOAT,
    latency_score FLOAT
);

CREATE TABLE session_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    active_node VARCHAR(100),
    context_window_used INT
);

CREATE TABLE pipeline_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID,
    stage_execution_times JSONB
);

CREATE TABLE infrastructure_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_id VARCHAR(100),
    overall_health_score FLOAT,
    active_alerts JSONB
);
