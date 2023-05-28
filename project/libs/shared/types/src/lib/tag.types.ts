export interface ITag {
  id: number;
  name: string;
  shortName: string;
  type: string;
}

export interface ITagResponse {
  tags: ITag[];
}
