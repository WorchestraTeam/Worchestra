export type Page = "Dashboard" | "Workflows" | "Jobs" | "Runs" | "Settings";

export type JobStatus = "Pending" | "Running" | "Success" | "Failed" | "Skipped";

export interface Job {
  id: string;
  name: string;
  script: string;
  inputs: string[];
  outputs: string[];
  status: JobStatus;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  jobs: Job[];
  createdAt: string;
}
