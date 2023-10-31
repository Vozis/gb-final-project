import { ITypeTag } from './type-tag.types';

export interface ITag {
  id: number;
  name: string;
  shortName: string;
  type: ITypeTag;
}

export interface ITagResponse {
  tags: ITag[];
}
