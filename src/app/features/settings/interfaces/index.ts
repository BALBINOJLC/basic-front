export interface IPanelSettigns {
  id: string;
  title: string;
  icon: string;
  description: string;
  path?: string;
  children?: IPanelSettigns[];
}
