export interface Process {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  owner: string;
}
