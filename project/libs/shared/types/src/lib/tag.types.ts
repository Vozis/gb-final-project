export interface ITag {
  id: number;
  name: string;
  shortName: string;
  typeId: number;
  type?: string;
}

export interface ITagResponse {
  tags: ITag[];
}
