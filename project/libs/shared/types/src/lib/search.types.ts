export interface ISearchItem {
  paramsSearch: string;
  valuesSearch: string;
}

export interface IFilterNestedFieldsItem {
  paramsCategory: string;
  paramsType: string;
  nestedFieldValue: number | string;
}

export interface IFilterEventFieldsItem {
  paramsFilter: string;
  eventFieldValue: number | string;
}

export interface ISearch {
  searchParams?: ISearchItem[];
  filterNestedFieldsParams?: IFilterNestedFieldsItem[];
  filterEventFieldsParams?: IFilterEventFieldsItem[];
}

export interface ISearchForm {
  valuesSearch?: string;
  paramsSearch?: string;
  tags?: string[] | number[];
  searchTerm?: string;
}
