export interface Interaction {
  id: string;
  timestamp: Date;
  content: string;
  public: boolean;
  relatedHumans: Array<string>;
}

export interface Interactions {
  interactions: Array<Interaction>;
  count: number;
}
