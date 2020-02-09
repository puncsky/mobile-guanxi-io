export interface Article {
  id: string;
  short: string;
  isFave: Boolean;
  url: string;
  title: string;
  content: string;
  forwardedFor: string;
  date: string;
  visitorCount: number;
  tags: [string];
}
