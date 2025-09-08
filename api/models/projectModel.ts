export interface ProjectCreateBody {
  name: string;
  description: string;
  ownerId: string;
}

export interface CreatedProject {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
}
